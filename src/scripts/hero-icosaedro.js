// src/scripts/hero-icosaedro.jshero-icosaedro.js
// Icosaedro wireframe decorativo para el hero. Vanilla Three.js — sin React,
// sin @react-three/fiber, sin drei. Mismo resultado visual que el experimento
// 004-icosaedro-interactivo, con una fracción del peso en JS.
//
// Este módulo se carga con import() dinámico desde Hero.astro, solo en
// desktop (la comprobación de matchMedia vive ahí, no acá, para no
// duplicar el breakpoint en dos archivos).

// src/scripts/hero-icosaedro.js
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  IcosahedronGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
  Mesh,
  Color,
} from "three";

const canvas = document.getElementById("hero-icosaedro");

if (canvas) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4;

  const geometry = new IcosahedronGeometry(1.3, 0);
  const edges = new EdgesGeometry(geometry);

  const COLOR_START = new Color(0x4fc3d9); // teal actual
  const COLOR_END = new Color(0x7c8cff);   // azul/violeta (ajústalo a tu acento)
  const LINE_OPACITY = 0.85;
  const FILL_OPACITY = 0.18;

  const lineMaterial = new LineBasicMaterial({
    color: COLOR_START.clone(),
    transparent: true,
    opacity: LINE_OPACITY,
  });
  const wireframe = new LineSegments(edges, lineMaterial);
  scene.add(wireframe);

  const fillMaterial = new MeshBasicMaterial({
    color: 0x102734,
    transparent: true,
    opacity: FILL_OPACITY,
  });
  const fillMesh = new Mesh(geometry, fillMaterial);
  scene.add(fillMesh);

  function resize() {
    const size = canvas.clientWidth;
    if (size === 0) return;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    // --- Scroll ---
    const hero = canvas.closest(".hero") ?? canvas.parentElement;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    let targetProgress = 0; // 0 = hero arriba, 1 = hero fuera de pantalla
    let progress = 0;       // valor suavizado

    function readScroll() {
      const rect = hero.getBoundingClientRect();
      targetProgress = clamp(-rect.top / rect.height, 0, 1);
    }
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    // --- Pausar el render cuando el hero no se ve ---
    let visible = true;
    let running = false;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !running) loop();
    });
    observer.observe(canvas);

    let autoX = 0;
    let autoY = 0;

    function loop() {
      if (!visible) {
        running = false;
        return;
      }
      running = true;

      progress += (targetProgress - progress) * 0.08;

      // Rotación automática + rotación extra ligada al scroll
      autoX += 0.0018;
      autoY += 0.0028;
      wireframe.rotation.x = autoX + progress * Math.PI * 1.2;
      wireframe.rotation.y = autoY + progress * Math.PI * 2;
      fillMesh.rotation.copy(wireframe.rotation);

      // Escala, color y opacidad
      const scale = 1 + progress * 0.35;
      wireframe.scale.setScalar(scale);
      fillMesh.scale.setScalar(scale);

      lineMaterial.color.lerpColors(COLOR_START, COLOR_END, progress);
      lineMaterial.opacity = LINE_OPACITY * (1 - progress * 0.6);
      fillMaterial.opacity = FILL_OPACITY * (1 - progress * 0.6);

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    loop();
  }
}