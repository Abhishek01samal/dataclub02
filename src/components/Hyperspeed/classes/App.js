import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';
import { BloomEffect, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import { CarLights } from './CarLights';
import { LightsSticks } from './LightsSticks';
import { Road } from './Road';
import { distortions } from '../distortions';

let lerp = (current, target, speed = 0.1, limit = 0.001) => {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) {
    change = target - current;
  }
  return change;
};

export class App {
  constructor(container, options = {}) {
    this.options = options;
    if (this.options.distortion == null) {
      this.options.distortion = distortions['turbulentDistortion'];
    }
    this.container = container;
    this.hasValidSize = false;
    this.isPaused = false;

    const initW = Math.max(1, container.offsetWidth);
    const initH = Math.max(1, container.offsetHeight);

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(initW, initH, false);
    // Use 1x pixel ratio to maximize GPU budget for backdrop-filter blur
    this.renderer.setPixelRatio(1);
    this.composer = new EffectComposer(this.renderer);
    container.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(options.fov, initW / initH, 0.1, 10000);
    this.camera.position.z = -5;
    this.camera.position.y = 8;
    this.camera.position.x = 0;
    this.scene = new THREE.Scene();
    this.scene.background = null;

    let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
    this.scene.fog = fog;
    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    };
    this.clock = new THREE.Clock();
    this.assets = {};
    this.disposed = false;

    this.road = new Road(this, options);
    this.leftCarLights = new CarLights(
      this,
      options,
      options.colors.leftCars,
      options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade)
    );
    this.rightCarLights = new CarLights(
      this,
      options,
      options.colors.rightCars,
      options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade)
    );
    this.leftSticks = new LightsSticks(this, options);

    this.fovTarget = options.fov;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);

    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize);

    if (container.offsetWidth > 0 && container.offsetHeight > 0) {
      this.hasValidSize = true;
    }
  }

  onWindowResize() {
    if (this._resizeTimer) clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      const width = this.container.offsetWidth;
      const height = this.container.offsetHeight;

      if (width <= 0 || height <= 0) {
        this.hasValidSize = false;
        return;
      }

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.composer.setSize(width, height);
      this.hasValidSize = true;
    }, 100); // Debounce resize by 100ms
  }

  initPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 0.5 // Half-res bloom for massive perf gain
      })
    );

    this.renderPass.renderToScreen = false;
    this.bloomPass.renderToScreen = true; // Final pass renders to screen
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
  }

  loadAssets() {
    const assets = this.assets;
    return new Promise(resolve => {
      const manager = new THREE.LoadingManager(resolve);

      const searchImage = new Image();
      const areaImage = new Image();
      assets.smaa = {};
      searchImage.addEventListener('load', function () {
        assets.smaa.search = this;
        manager.itemEnd('smaa-search');
      });

      areaImage.addEventListener('load', function () {
        assets.smaa.area = this;
        manager.itemEnd('smaa-area');
      });
      manager.itemStart('smaa-search');
      manager.itemStart('smaa-area');

      searchImage.src = SMAAEffect.searchImageDataURL;
      areaImage.src = SMAAEffect.areaImageDataURL;
    });
  }

  init() {
    this.initPasses();
    const options = this.options;
    this.road.init();
    this.leftCarLights.init();

    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
    this.rightCarLights.init();
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
    this.leftSticks.init();
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

    this.container.addEventListener('mousedown', this.onMouseDown);
    this.container.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('mouseout', this.onMouseUp);

    this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.container.addEventListener('touchend', this.onTouchEnd, { passive: true });
    this.container.addEventListener('touchcancel', this.onTouchEnd, { passive: true });

    this.container.addEventListener('contextmenu', this.onContextMenu);

    this.tick();
  }

  onMouseDown(ev) {
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  onMouseUp(ev) {
    if (this.options.onSlowDown) this.options.onSlowDown(ev);
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  onTouchStart(ev) {
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  onTouchEnd(ev) {
    if (this.options.onSlowDown) this.options.onSlowDown(ev);
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  onContextMenu(ev) {
    ev.preventDefault();
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  update(delta) {
    let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
    this.timeOffset += this.speedUp * delta;

    let time = this.clock.elapsedTime + this.timeOffset;

    this.rightCarLights.update(time);
    this.leftCarLights.update(time);
    this.leftSticks.update(time);
    this.road.update(time);

    let updateCamera = false;
    let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6;
      updateCamera = true;
    }

    if (this.options.distortion.getJS) {
      const distortion = this.options.distortion.getJS(0.025, time);

      // Reuse cached vector instead of allocating new one every frame
      if (!this._lookAtTarget) this._lookAtTarget = new THREE.Vector3();
      this._lookAtTarget.set(
        this.camera.position.x + distortion.x,
        this.camera.position.y + distortion.y,
        this.camera.position.z + distortion.z
      );
      this.camera.lookAt(this._lookAtTarget);
      updateCamera = true;
    }
    if (updateCamera) {
      this.camera.updateProjectionMatrix();
    }
  }

  render(delta) {
    this.composer.render(delta);
  }

  dispose() {
    this.disposed = true;

    if (this.scene) {
      this.scene.traverse(object => {
        const obj = object;
        if (!obj.isMesh) return;

        if (obj.geometry) obj.geometry.dispose();

        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.scene.clear();
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
    if (this.composer) {
      this.composer.dispose();
    }

    window.removeEventListener('resize', this.onWindowResize);
    if (this.container) {
      this.container.removeEventListener('mousedown', this.onMouseDown);
      this.container.removeEventListener('mouseup', this.onMouseUp);
      this.container.removeEventListener('mouseout', this.onMouseUp);

      this.container.removeEventListener('touchstart', this.onTouchStart);
      this.container.removeEventListener('touchend', this.onTouchEnd);
      this.container.removeEventListener('touchcancel', this.onTouchEnd);
      this.container.removeEventListener('contextmenu', this.onContextMenu);
    }
  }

  setSize(width, height, updateStyles) {
    if (width <= 0 || height <= 0) {
      this.hasValidSize = false;
      return;
    }
    this.composer.setSize(width, height, updateStyles);
    this.hasValidSize = true;
  }

  tick() {
    if (this.disposed) return;

    if (this.isPaused) {
      requestAnimationFrame(this.tick);
      return;
    }

    if (!this.hasValidSize) {
      const w = this.container.offsetWidth;
      const h = this.container.offsetHeight;
      if (w > 0 && h > 0) {
        this.renderer.setSize(w, h, false);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(w, h);
        this.hasValidSize = true;
      } else {
        requestAnimationFrame(this.tick);
        return;
      }
    }

    if (this.hasValidSize) {
      const delta = this.clock.getDelta();
      this.render(delta);
      this.update(delta);
    }

    requestAnimationFrame(this.tick);
  }
}
