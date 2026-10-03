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

  // Color: teal (hero) -> azul/violeta (final de la página)
  const COLOR_START = new Color(0x4fc3d9);
  const COLOR_END = new Color(0x7c8cff);

  // Opacidad: presente en el hero, discreta mientras lees contenido
  const LINE_OPACITY_HERO = 0.85;
  const LINE_OPACITY_PAGE = 0.28;
  const FILL_OPACITY_HERO = 0.18;
  const FILL_OPACITY_PAGE = 0.05;

  const lineMaterial = new LineBasicMaterial({
    color: COLOR_START.clone(),
    transparent: true,
    opacity: LINE_OPACITY_HERO,
  });
  const wireframe = new LineSegments(edges, lineMaterial);
  scene.add(wireframe);

  const fillMaterial = new MeshBasicMaterial({
    color: 0x102734,
    transparent: true,
    opacity: FILL_OPACITY_HERO,
  });
  const fillMesh = new Mesh(geometry, fillMaterial);
  scene.add(fillMesh);

  function resize() {
    const size = canvas.clientWidth;
    if (size === 0) return; // wrapper oculto en mobile
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  if (prefersReducedMotion) {
    // Un frame estático, sin animación ni reacción al scroll.
    renderer.render(scene, camera);
  } else {
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (t) => t * t * (3 - 2 * t);

    let targetY = window.scrollY;
    let currentY = targetY; // scroll suavizado

    window.addEventListener(
      "scroll",
      () => {
        targetY = window.scrollY;
      },
      { passive: true }
    );

    let autoX = 0;
    let autoY = 0;

    function loop() {
      requestAnimationFrame(loop);

      // Si el wrapper está oculto (mobile), no renderizar.
      if (canvas.clientWidth === 0) return;

      // Suavizado: evita el movimiento "a saltos" de la rueda del mouse
      currentY += (targetY - currentY) * 0.08;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const page = clamp(currentY / maxScroll, 0, 1); // 0..1 en toda la página
      const intro = smoothstep(clamp(currentY / window.innerHeight, 0, 1)); // 0..1 en el primer viewport

      // Rotación automática + rotación ligada al scroll (en px, no en %,
      // para que la sensación sea igual aunque la página crezca)
      autoX += 0.0018;
      autoY += 0.0028;
      wireframe.rotation.x = autoX + currentY * 0.0025;
      wireframe.rotation.y = autoY + currentY * 0.004;
      fillMesh.rotation.copy(wireframe.rotation);

      // Se encoge un poco al salir del hero para estorbar menos
      const scale = lerp(1, 0.8, intro);
      wireframe.scale.setScalar(scale);
      fillMesh.scale.setScalar(scale);

      // Color según avance total de la página
      lineMaterial.color.lerpColors(COLOR_START, COLOR_END, page);

      // Opacidad: baja rápido en el primer viewport y se mantiene discreta
      lineMaterial.opacity = lerp(LINE_OPACITY_HERO, LINE_OPACITY_PAGE, intro);
      fillMaterial.opacity = lerp(FILL_OPACITY_HERO, FILL_OPACITY_PAGE, intro);

      renderer.render(scene, camera);
    }
    loop();
  }
}