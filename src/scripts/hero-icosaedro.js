// hero-icosaedro.js
// Icosaedro wireframe decorativo para el hero. Vanilla Three.js — sin React,
// sin @react-three/fiber, sin drei. Mismo resultado visual que el experimento
// 004-icosaedro-interactivo, con una fracción del peso en JS.

import * as THREE from 'three';

const canvas = document.getElementById('hero-icosaedro');

// Solo se inicializa en desktop. En mobile el espacio no existe (el layout
// colapsa a una columna) y no vale la pena pagar el costo de WebGL ahí.
const isDesktop = window.matchMedia('(min-width: 761px)').matches;

if (canvas && isDesktop) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true, // fondo transparente: se ve el gradiente del .hero detrás
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4;

  const geometry = new THREE.IcosahedronGeometry(1.3, 0);

  // Líneas del wireframe — mismo tono que el glow teal ya existente en el
  // hero, para que se lea como "la fuente" de ese glow, no un objeto aparte.
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4fc3d9,
    transparent: true,
    opacity: 0.85,
  });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  scene.add(wireframe);

  // Relleno translúcido muy sutil, solo para dar sensación de volumen sin
  // perder el look de línea/diagrama.
  const fillMaterial = new THREE.MeshBasicMaterial({
    color: 0x102734,
    transparent: true,
    opacity: 0.18,
  });
  const fillMesh = new THREE.Mesh(geometry, fillMaterial);
  scene.add(fillMesh);

  function resize() {
    const size = canvas.clientWidth;
    if (size === 0) return;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

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