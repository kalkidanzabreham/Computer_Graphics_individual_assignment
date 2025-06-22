# Interactive 3D Product Viewer (Basic Mesh Edition)

This project is an interactive 3D product viewer built using Three.js. It showcases a modular, low-poly 3D scene composed entirely of basic geometries like boxes, cylinders, and spheres — representing a realistic office workspace with a desk, chair, monitor, and accessories.

---

## Features

- Fully modeled 3D office workspace (desk, drawers, chair, monitor, keyboard)
- Realistic lighting using ambient and directional lights
- Mouse interaction using raycasting:
  - Hover highlights parts
  - Click animates parts (scale pulse)
  - Info panel shows part names
- Smooth automatic camera rotation with user override
- Responsive canvas and resize handling
- Clean modular code structure with reusable JavaScript modules

---

## Project Structure

├── index.html # Main entry point

├── style.css # UI styling

├── README.md # Project overview and instructions

└── scripts/

  ├── initScene.js # Scene, camera, renderer, and controls
  
  ├── createProduct.js # Builds the 3D product from basic geometries
  
  ├── addLighting.js # Adds ambient and directional lights
  
  ├── interaction.js # Mouse interaction logic using raycasting
  
  └── cameraAnimation.js # Camera auto-rotation and user override


## How to Run

This project uses `npm` to run a local development server.

### 1. Install dependencies

If you are using a simple static development server such as `lite-server`, run the following command:
npm install
### 2. Start the development server
To launch the viewer locally:
    npm start
  
This will open the application at http://localhost:3000 or the configured port.

Note: Ensure that your system has Node.js and npm installed. If you are using lite-server, make sure it is included as a development dependency in your package.json file.

Educational Purpose

This project was developed as part of an academic assignment for a computer graphics course. It demonstrates understanding of:

  -Three.js fundamentals
  
  -Mesh modeling using basic geometries
  
  -Lighting and material properties
  
  -Raycasting and interaction
  
  -Animation and camera behavior
  
  -Modular project organization

Author
Kalkidan Abreham
Section 1
Computer Graphics Assignment — Individual Project
UGR/3534/15







