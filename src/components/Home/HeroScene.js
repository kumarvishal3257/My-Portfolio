import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function canUseWebGL() {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia === "function" && window.matchMedia("(max-width: 820px)").matches) {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch (error) {
    return false;
  }
}

function CssStage() {
  return (
    <div className="css-stage" aria-hidden="true">
      <div className="css-glow" />
      <div className="css-orb css-orb-a" />
      <div className="css-orb css-orb-b" />
      <div className="css-crystal" />
      <div className="css-panel css-panel-a">
        <span>React</span>
        <span>TypeScript</span>
        <span>Redux</span>
      </div>
      <div className="css-panel css-panel-b">
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
      </div>
      <div className="css-ring" />
    </div>
  );
}

function makePanel(THREE, x, y, z, rotY) {
  const geo = new THREE.PlaneGeometry(1.5, 0.95);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: 0x12141f,
      metalness: 0.2,
      roughness: 0.45,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  mesh.rotation.x = -0.12;
  mesh.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x8b7cff, transparent: true, opacity: 0.7 })
    )
  );
  return mesh;
}

function HeroScene() {
  const reduce = useReducedMotion();
  const mountRef = useRef(null);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    if (reduce || !canUseWebGL() || !mountRef.current) {
      setWebgl(false);
      return undefined;
    }

    import("three").then((THREE) => {
      if (cancelled || !mountRef.current) return;

      const host = mountRef.current;
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070812, 0.055);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
      camera.position.set(0, 0.15, 7.4);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const key = new THREE.PointLight(0x8b7cff, 12, 18);
      key.position.set(-2.4, 1.8, 4);
      const fill = new THREE.PointLight(0x4f7dff, 8, 16);
      fill.position.set(3.2, -1.2, 3);
      scene.add(new THREE.AmbientLight(0x9aa7ff, 0.35), key, fill);

      const world = new THREE.Group();
      scene.add(world);

      const crystal = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.35, 0),
        new THREE.MeshStandardMaterial({
          color: 0x9b8cff,
          metalness: 0.55,
          roughness: 0.22,
          emissive: 0x2a1d66,
          emissiveIntensity: 0.35,
        })
      );
      const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.62, 0),
        new THREE.MeshBasicMaterial({
          color: 0xa78bfa,
          wireframe: true,
          transparent: true,
          opacity: 0.28,
        })
      );
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.045, 12, 80),
        new THREE.MeshStandardMaterial({
          color: 0x60a5fa,
          metalness: 0.7,
          roughness: 0.25,
          emissive: 0x1d4ed8,
          emissiveIntensity: 0.2,
        })
      );
      torus.rotation.x = Math.PI / 2.6;
      const octa = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.42),
        new THREE.MeshStandardMaterial({
          color: 0x818cf8,
          metalness: 0.4,
          roughness: 0.3,
          emissive: 0x312e81,
          emissiveIntensity: 0.5,
        })
      );
      octa.position.set(2.1, 1.15, 0.4);
      const panel = makePanel(THREE, -2.05, -0.35, 0.8, 0.45);
      const panel2 = makePanel(THREE, 1.85, -1.15, 0.2, -0.55);
      world.add(crystal, wire, torus, octa, panel, panel2);

      const size = () => {
        const w = Math.max(host.clientWidth, 1);
        const h = Math.max(host.clientHeight, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      size();

      const mouse = { x: 0, y: 0 };
      const onPointer = (event) => {
        const rect = host.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      let visible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(host);

      const tick = (time) => {
        frame = window.requestAnimationFrame(tick);
        if (!visible) return;
        const t = time * 0.001;
        crystal.rotation.y = t * 0.18;
        crystal.rotation.x = t * 0.08;
        wire.rotation.y = -t * 0.12;
        torus.rotation.z = t * 0.16;
        octa.position.y = 1.15 + Math.sin(t * 1.4) * 0.12;
        octa.rotation.y = t * 0.6;
        panel.position.y = -0.35 + Math.sin(t * 0.9) * 0.08;
        panel2.position.y = -1.15 + Math.cos(t * 1.1) * 0.1;
        world.rotation.y += (mouse.x * 0.35 - world.rotation.y) * 0.045;
        world.rotation.x += (-mouse.y * 0.2 - world.rotation.x) * 0.045;
        camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.04;
        camera.position.y += (0.15 + mouse.y * 0.2 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      frame = window.requestAnimationFrame(tick);
      window.addEventListener("resize", size);

      cleanup = () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", size);
        window.removeEventListener("pointermove", onPointer);
        observer.disconnect();
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((mat) => mat.dispose());
            else obj.material.dispose();
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };

      if (cancelled) {
        cleanup();
        return;
      }
      setWebgl(true);
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduce]);

  return (
    <div className={`hero-stage ${webgl ? "has-webgl" : ""}`}>
      <div className="hero-stage-bg" />
      <CssStage />
      <div ref={mountRef} className="hero-canvas" aria-hidden="true" />
    </div>
  );
}

export default HeroScene;
