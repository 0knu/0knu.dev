// three-bg.js
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambient = new THREE.AmbientLight(0x333355);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(1, 1, 1);
  scene.add(dirLight);

  const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x9D4EDD,
    emissive: 0x220044,
    roughness: 0.3,
    metalness: 0.7,
    wireframe: true
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.002;
    torusKnot.rotation.y += 0.003;
    torusKnot.rotation.z += 0.001;
    camera.position.y = 1.5 + (scrollY * 0.001);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
