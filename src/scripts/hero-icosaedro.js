// hero-icosaedro.js
// Icosaedro wireframe decorativo para el hero. Vanilla Three.js — sin React,
// sin @react-three/fiber, sin drei. Mismo resultado visual que el experimento
// 004-icosaedro-interactivo, con una fracción del peso en JS.
//
// Este módulo se carga con import() dinámico desde Hero.astro, solo en
// desktop (la comprobación de matchMedia vive ahí, no acá, para no
// duplicar el breakpoint en dos archivos).

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
} from "three";

const canvas = document.getElementById("hero-icosaedro");

if (canvas) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true, // fondo transparente: se ve el gradiente del .hero detrás
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4;

  const geometry = new IcosahedronGeometry(1.3, 0);

  // Líneas del wireframe — mismo tono que el glow teal ya existente en el
  // hero, para que se lea como "la fuente" de ese glow, no un objeto aparte.
  const edges = new EdgesGeometry(geometry);
  const lineMaterial = new LineBasicMaterial({
    color: 0x4fc3d9,
    transparent: true,
    opacity: 0.85,
  });
  const wireframe = new LineSegments(edges, lineMaterial);
  scene.add(wireframe);

  // Relleno translúcido muy sutil, solo para dar sensación de volumen sin
  // perder el look de línea/diagrama.
  const fillMaterial = new MeshBasicMaterial({
    color: 0x102734,
    transparent: true,
    opacity: 0.18,
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
    // Respetar preferencia del sistema: un frame estático, sin animación.
    renderer.render(scene, camera);
  } else {
    function animate() {
      wireframe.rotation.x += 0.0018;
      wireframe.rotation.y += 0.0028;
      fillMesh.rotation.copy(wireframe.rotation);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }
}