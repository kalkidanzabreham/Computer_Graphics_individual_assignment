import * as THREE from 'three';

export function createProduct(scene) {
  const parts = {};
  const group = new THREE.Group(); // Wrap everything in this group

  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 });
  const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 1, roughness: 0.3 });
  const plasticMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x111144, emissive: 0x3333ff });

  // === Desk ===
  const tabletop = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 1), woodMaterial);
  tabletop.position.set(0, 1, 0);
  tabletop.name = 'Desk Top';
  group.add(tabletop);
  parts.tabletop = tabletop;

  // Desk legs (4)
  const legGeom = new THREE.CylinderGeometry(0.05, 0.05, 1);
  const legPositions = [
    [-0.95, 0.5, -0.45],
    [0.95, 0.5, -0.45],
    [-0.95, 0.5, 0.45],
    [0.95, 0.5, 0.45],
  ];
  legPositions.forEach((pos, idx) => {
    const leg = new THREE.Mesh(legGeom, metalMaterial);
    leg.position.set(...pos);
    leg.name = `Desk Leg ${idx + 1}`;
    group.add(leg);
    parts[`deskLeg${idx + 1}`] = leg;
  });

  // Drawers
  const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 1), woodMaterial);
  drawer.position.set(-1.2, 0.7, 0);
  drawer.name = 'Desk Drawer';
  group.add(drawer);
  parts.drawer = drawer;

  // === Monitor ===
  const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.05), screenMaterial);
  monitor.position.set(0.6, 1.35, 0);
  monitor.name = 'Monitor';
  group.add(monitor);
  parts.monitor = monitor;

  const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3), metalMaterial);
  monitorStand.position.set(0.6, 1.15, 0);
  monitorStand.name = 'Monitor Stand';
  group.add(monitorStand);
  parts.monitorStand = monitorStand;

  // === Keyboard ===
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.2), plasticMaterial);
  keyboard.position.set(0.5, 1.05, -0.25);
  keyboard.name = 'Keyboard';
  group.add(keyboard);
  parts.keyboard = keyboard;

  // === Office Chair ===
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), plasticMaterial);
  seat.position.set(0, 0.6, -1.2);
  seat.name = 'Chair Seat';
  group.add(seat);
  parts.chairSeat = seat;

  const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.1), plasticMaterial);
  backrest.position.set(0, 1.0, -1.5);
  backrest.name = 'Chair Backrest';
  group.add(backrest);
  parts.backrest = backrest;

  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), metalMaterial);
  stand.position.set(0, 0.35, -1.2);
  stand.name = 'Chair Stand';
  group.add(stand);
  parts.chairStand = stand;

  // Chair wheels (5)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const x = Math.cos(angle) * 0.3;
    const z = Math.sin(angle) * 0.3 - 1.2;

    const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), metalMaterial);
    wheel.position.set(x, 0.05, z);
    wheel.name = `Chair Wheel ${i + 1}`;
    group.add(wheel);
    parts[`wheel${i + 1}`] = wheel;
  }

  // === Scale and position the full group ===
  group.scale.set(2, 2, 2); // ⬅️ Increase size uniformly (2x)
  group.position.set(0, 0, 0); // Optional: center it at origin

  scene.add(group);
  return parts;
}
