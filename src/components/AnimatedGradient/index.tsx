"use client";

import { useRef, useEffect, useMemo, useState, CSSProperties } from "react";
import { PatternShapes, presets, GradientConfig, NoiseConfig, PresetParams } from "./presets";
import { FRAGMENT_SHADER } from "./shaders";
import { hexToRgba } from "./utils";

interface AnimatedGradientProps {
  config?: GradientConfig;
  noise?: NoiseConfig;
  radius?: string;
  style?: CSSProperties;
  className?: string;
}

export default function AnimatedGradient({
  config = { preset: "Prism" },
  noise,
  radius = "0px",
  style,
  className,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const params = useMemo((): PresetParams => {
    if (config.preset === "custom") {
      return {
        color1: config.color1,
        color2: config.color2,
        color3: config.color3,
        rotation: config.rotation ?? 0,
        proportion: config.proportion ?? 35,
        scale: config.scale ?? 1,
        speed: config.speed ?? 25,
        distortion: config.distortion ?? 12,
        swirl: config.swirl ?? 80,
        swirlIterations: config.swirlIterations ?? 10,
        softness: config.softness ?? 100,
        offset: config.offset ?? 0,
        shape: config.shape ?? "Checks",
        shapeSize: config.shapeSize ?? 10,
      };
    }
    const preset = presets[config.preset] || presets.Prism;
    return {
      ...preset,
      speed: config.speed ?? preset.speed,
    };
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isMounted) return;

    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: true,
    });
    if (!gl) return;

    const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    void main() {
      gl_Position = a_position;
    }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_scale: gl.getUniformLocation(program, "u_scale"),
      u_rotation: gl.getUniformLocation(program, "u_rotation"),
      u_color1: gl.getUniformLocation(program, "u_color1"),
      u_color2: gl.getUniformLocation(program, "u_color2"),
      u_color3: gl.getUniformLocation(program, "u_color3"),
      u_proportion: gl.getUniformLocation(program, "u_proportion"),
      u_softness: gl.getUniformLocation(program, "u_softness"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
      u_shapeScale: gl.getUniformLocation(program, "u_shapeScale"),
      u_distortion: gl.getUniformLocation(program, "u_distortion"),
      u_swirl: gl.getUniformLocation(program, "u_swirl"),
      u_swirlIterations: gl.getUniformLocation(program, "u_swirlIterations"),
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTimeRef.current) / 1000;
      const speed = (params.speed / 100) * 5;

      gl.uniform1f(uniforms.u_time, elapsed * speed + params.offset * 0.01);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_pixelRatio, window.devicePixelRatio || 1);
      gl.uniform1f(uniforms.u_scale, params.scale);
      gl.uniform1f(uniforms.u_rotation, (params.rotation * Math.PI) / 180);

      const c1 = hexToRgba(params.color1);
      const c2 = hexToRgba(params.color2);
      const c3 = hexToRgba(params.color3);
      gl.uniform4f(uniforms.u_color1, c1[0], c1[1], c1[2], c1[3]);
      gl.uniform4f(uniforms.u_color2, c2[0], c2[1], c2[2], c2[3]);
      gl.uniform4f(uniforms.u_color3, c3[0], c3[1], c3[2], c3[3]);

      gl.uniform1f(uniforms.u_proportion, params.proportion / 100);
      gl.uniform1f(uniforms.u_softness, params.softness / 100);
      gl.uniform1f(uniforms.u_shape, PatternShapes[params.shape]);
      gl.uniform1f(uniforms.u_shapeScale, params.shapeSize / 100);
      gl.uniform1f(uniforms.u_distortion, params.distortion / 50);
      gl.uniform1f(uniforms.u_swirl, params.swirl / 100);
      gl.uniform1f(
        uniforms.u_swirlIterations,
        params.swirl === 0 ? 0 : params.swirlIterations
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current !== undefined) {
        cancelAnimationFrame(frameIdRef.current);
      }
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isMounted, params]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        borderRadius: radius,
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCgkGBAVJOAVJAAAASklEQVQ4y2NgGAWjYBSMglEwCgY/YGRgZBQUYmJiZGQEkYwMjIyMgoKCjIyMIJKBgRFIMjIyAklGRkYGRkFBYEcwMDIyMjAOUQAA1I4HwVwZAkYAAAAASUVORK5CYII=")`,
            backgroundSize: (noise.scale ?? 1) * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
