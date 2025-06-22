import * as THREE from 'three';

export function setupInteraction(renderer, camera, scene, productParts) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('info-panel');
    let hoveredObject = null;
    const originalMaterials = new Map();

    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(Object.values(productParts));

        // Reset previous hover effect
        if (hoveredObject && originalMaterials.has(hoveredObject)) {
            hoveredObject.material = originalMaterials.get(hoveredObject);
            originalMaterials.delete(hoveredObject);
        }

        if (intersects.length > 0) {
            hoveredObject = intersects[0].object;
            
            // Store original material if not already stored
            if (!originalMaterials.has(hoveredObject)) {
                originalMaterials.set(hoveredObject, hoveredObject.material.clone());
                
                // Create highlight material
                const highlightMaterial = hoveredObject.material.clone();
                highlightMaterial.emissive = new THREE.Color(0x333333);
                hoveredObject.material = highlightMaterial;
            }

            // Update info panel
            infoPanel.style.display = 'block';
            infoPanel.style.left = event.clientX + 10 + 'px';
            infoPanel.style.top = event.clientY + 10 + 'px';
            infoPanel.textContent = hoveredObject.name;
        } else {
            hoveredObject = null;
            infoPanel.style.display = 'none';
        }
    }

    function onClick(event) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Object.values(productParts));

        if (intersects.length > 0) {
            const clicked = intersects[0].object;
            
            // Store original scale
            const originalScale = clicked.scale.clone();
            
            // Animate scale
            clicked.scale.multiplyScalar(1.2);
            
            // Reset scale after animation
            setTimeout(() => {
                clicked.scale.copy(originalScale);
            }, 200);
        }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
}
