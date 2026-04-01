"use client";

import React, { useRef, useEffect, useState, FC } from "react";

const vsSource = `
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

const fsSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_scroll;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform int u_hasTextures;
uniform int u_isMobile;

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x)
       + (c - a) * u.y * (1.0 - u.x)
       + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  // Reduced octaves drastically for mobile
  int octaves = (u_isMobile == 1) ? 2 : 3; 
  for (int i = 0; i < 4; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// Define the camera and tunnel spline path (S-curve)
vec2 getCurve(float z) {
  float x = sin(z * 0.7) * 0.6; // Strong left-right snake curve
  return vec2(x, 0.0);
}

float mapScene(vec3 p) {
  p.xy += getCurve(p.z);
  
  float radius = 0.5
    + fbm(p.xz * 0.5 + u_scroll * 0.1) * 0.25;
      
  return sdBox(p.xy, vec2(0.6, 0.4) * radius);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.01, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

vec2 rayMarch(vec3 ro, vec3 rd) {
  float distO = 0.0;
  float distS = 0.0;
  // Reduced iterations for performance
  int iterations = (u_isMobile == 1) ? 28 : 64;
  for (int i = 0; i < 64; i++) {
    if (i >= iterations) break;
    vec3 p = ro + rd * distO;
    distS = mapScene(p);
    distO += distS;
    if (distO > 20.0 || abs(distS) < 0.001) break;
  }
  return vec2(distO, distS);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy)
           / u_resolution.y;

  // Camera settings that follow the tunnel curve
  float camZ = -u_scroll * 3.0;
  vec2 camOffset = getCurve(camZ);
  vec3 ro = vec3(-camOffset.x, -camOffset.y, camZ);
  
  float lookAtZ = camZ - 1.0; 
  vec2 lookOffset = getCurve(lookAtZ);
  vec3 lookAt = vec3(-lookOffset.x, -lookOffset.y, lookAtZ);
  
  // Look-At Matrix configuration
  vec3 f = normalize(lookAt - ro);
  vec3 r = normalize(cross(vec3(0.0, 1.0, 0.0), f));
  vec3 u = cross(f, r);

  float zoom = 1.5 + (u_scroll * 1.2);
  vec3 rd = normalize(r * uv.x + u * uv.y + f * zoom);

  float mx = (u_mouse.x / u_resolution.x - 0.5) * 3.14;
  float my = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
  mat3 rotX = mat3(
    1.0,    0.0,     0.0,
    0.0, cos(my), -sin(my),
    0.0, sin(my),  cos(my)
  );
  mat3 rotY = mat3(
    cos(mx), 0.0, sin(mx),
    0.0,     1.0,    0.0,
   -sin(mx), 0.0, cos(mx)
  );
  rd = rotY * rotX * rd;

  vec2 rm = rayMarch(ro, rd);
  float d = rm.x;
  vec3 col = vec3(0.0);

  if (d < 20.0) {
    vec3 p = ro + rd * d;
    vec3 n = calcNormal(p);
    
    // Convert to local tunnel coordinates so texturing doesn't break on curves
    vec3 pLocal = p;
    pLocal.xy += getCurve(p.z);

    float pattern = fbm(pLocal.xy * 2.0 + p.z * 0.5 - u_scroll * 2.0);

    // Pure white base
    vec3 white = vec3(1.0, 1.0, 1.0);
    float glow = pow(pattern, 2.0);
    col = white * (0.9 + glow * 0.3);

    // Add images to the tunnel
    if (u_hasTextures == 1) {
      vec2 panelUV = vec2(0.0);
      float valid = 0.0;
      
      float zFrequency = 1.25;
      float zLocal = fract(abs(p.z) * zFrequency);
      
      // Calculate continuous scale with noise EXACTLY like mapScene
      float currentRadius = 0.5 + fbm(p.xz * 0.5 + u_scroll * 0.1) * 0.25;
      float boxW = 0.6 * currentRadius;
      float boxH = 0.4 * currentRadius;
      
      if (zLocal > 0.0 && zLocal < 1.0) { // full coverage
        if (abs(n.x) > abs(n.y)) {
          float ySpan = boxH * 2.0;
          float yNorm = (pLocal.y + boxH) / ySpan;
          if (yNorm > 0.0 && yNorm < 1.0) {
            panelUV = vec2(n.x > 0.0 ? zLocal : 1.0 - zLocal, yNorm);
            valid = 1.0;
          }
        } else {
          float xSpan = boxW * 2.0;
          float xNorm = (pLocal.x + boxW) / xSpan;
          if (xNorm > 0.0 && xNorm < 1.0) {
            panelUV = vec2(zLocal, xNorm);
            valid = 1.0;
          }
        }
        
        // Add a little wiggle effect to the images inside the panels
        panelUV.x += sin(u_time * 2.0 + p.z * 1.5) * 0.03;
        panelUV.y += cos(u_time * 1.8 + p.z * 1.2) * 0.03;
      }
      
      if (valid > 0.5) {
        vec3 tColor = vec3(0.0);
        if (n.x > 0.5) tColor = texture2D(u_tex0, panelUV).rgb;
        else if (n.x < -0.5) tColor = texture2D(u_tex1, panelUV).rgb;
        else tColor = texture2D(u_tex2, panelUV).rgb;
        col = tColor; // 100% opaque overlay
      }
    }
  }

  col = mix(col, vec3(0.0), smoothstep(0.0, 15.0, d));
  
  // Quick fade out of tunnel as we reach the end (to white)
  float tunnelFade = 1.0 - smoothstep(2.0, 2.5, u_scroll);
  col = mix(vec3(1.0, 1.0, 1.0), col, tunnelFade);
  
  gl_FragColor = vec4(col, 1.0);
}
`;

interface FireTunnelShaderProps {
  scrollProgress?: number;
  scrollProgressRef?: React.RefObject<number>;
  images?: string[];
}

const FireTunnelShader: FC<FireTunnelShaderProps> = ({ 
  scrollProgress = 0,
  scrollProgressRef,
  images = ['/p1.jpg', '/p2.jpg', '/p3.jpg']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const frameId = useRef<number>();

  const currentScrollRef = useRef(0);
  // Support both ref-based (zero re-renders) and prop-based usage
  const targetScrollRef = useRef(scrollProgress);
  if (!scrollProgressRef) {
    targetScrollRef.current = scrollProgress;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext)
      || (canvas.getContext("webgl") as WebGLRenderingContext);
    if (!gl) {
      setError("WebGL not supported");
      return;
    }

    function compileShader(
      type: GLenum,
      src: string
    ): WebGLShader | null {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        setError("Shader compile error (see console)");
        return null;
      }
      return sh;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      setError("Program link error (see console)");
      return;
    }

    const posLoc   = gl.getAttribLocation(program, "a_position");
    const resLoc   = gl.getUniformLocation(program, "u_resolution")!;
    const scrollLoc = gl.getUniformLocation(program, "u_scroll")!;
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse")!;
    const texLocs = [
        gl.getUniformLocation(program, "u_tex0"),
        gl.getUniformLocation(program, "u_tex1"),
        gl.getUniformLocation(program, "u_tex2"),
    ];
    const hasTexLoc = gl.getUniformLocation(program, "u_hasTextures");
    const mobileLoc = gl.getUniformLocation(program, "u_isMobile");

    const textures: (WebGLTexture | null)[] = [null, null, null];
    let loadedCount = 0;

    images.forEach((src, idx) => {
        if (idx > 2) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            if (!gl) return;
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            textures[idx] = tex;
            loadedCount++;
        };
        img.src = src;
    });

    const quad = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    const buf  = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const resize = () => {
      // Cap DPR at 1.5 — beyond that GPUs struggle for no visible gain
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = () => {
      if (!gl) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      // Read from the ref if provided — avoids all React re-renders
      const targetScroll = scrollProgressRef
        ? (scrollProgressRef.current ?? 0)
        : targetScrollRef.current;
      currentScrollRef.current += (targetScroll - currentScrollRef.current) * 0.05;

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const currentTime = performance.now() * 0.001;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(scrollLoc, currentScrollRef.current);
      if (timeLoc) gl.uniform1f(timeLoc, currentTime);
      gl.uniform2f(mouseLoc, canvas.width / 2, canvas.height / 2);
      
      const isMobile = window.innerWidth < 768 ? 1 : 0;
      if (mobileLoc) gl.uniform1i(mobileLoc, isMobile);

      const targetLoads = Math.min(images.length, 3);
      if (loadedCount === targetLoads && targetLoads > 0) {
          if (hasTexLoc) gl.uniform1i(hasTexLoc, 1);
          for (let i = 0; i < 3; i++) {
              if (textures[i] && texLocs[i]) {
                  gl.activeTexture(gl.TEXTURE0 + i);
                  gl.bindTexture(gl.TEXTURE_2D, textures[i]);
                  gl.uniform1i(texLocs[i]!, i);
              }
          }
      } else {
          if (hasTexLoc) gl.uniform1i(hasTexLoc, 0);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId.current!);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white font-mono p-4">
          {error}
        </div>
      )}
      <canvas ref={canvasRef} className="block" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default FireTunnelShader;