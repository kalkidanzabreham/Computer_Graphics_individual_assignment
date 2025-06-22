
let angle = 0;
let autoRotate = true;
let lastInteractionTime = Date.now();

export function animateCamera(camera, controls) {
  function onUserInteraction() {
    lastInteractionTime = Date.now();
    autoRotate = false;
  }

  window.addEventListener('mousedown', onUserInteraction);
  window.addEventListener('wheel', onUserInteraction);
  window.addEventListener('keydown', onUserInteraction);

  function updateCamera() {
    const now = Date.now();
    const elapsed = (now - lastInteractionTime) / 1000;

    if (elapsed > 5) {
      autoRotate = true;
    }

    if (autoRotate) {
      angle += 0.01;
      const radius = 10;
      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);
      camera.position.set(x, 5, z);
      camera.lookAt(0, 2, 0);
    }

    requestAnimationFrame(updateCamera);
  }

  // Initial camera position
  camera.position.set(2.5, 2, 2.5);  
  controls.target.set(0, 1.2, 0);  
  controls.update();

  // Track if user is interacting
  let isUserInteracting = false;
  controls.addEventListener('start', () => {
    isUserInteracting = true;
    controls.autoRotate = false;
  });

  controls.addEventListener('end', () => {
    isUserInteracting = false;
    // Resume auto-rotation after a delay
    setTimeout(() => {
      if (!isUserInteracting) {
        controls.autoRotate = true;
      }
    }, 2000);
  });

  // some subtle camera movement
  let time = 0;
  function animate() {
    time += 0.001;
    
    // subtle vertical movement when not user interacting
    if (!isUserInteracting) {
      
      camera.position.y = Math.sin(time) * 0.1;
    }
    
    requestAnimationFrame(animate);
  }
  animate();

  updateCamera();
}
