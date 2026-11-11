/**
 * Teodoro Nadres 3D Gamified WebGL Physics Profile Engine
 * =======================================================
 * Powered by Three.js & Cannon.js
 * Features:
 *  - Bouncing Metallic Silver Chrome Physics Ball player controller
 *  - Stacked 3D Baby Blocks replacing bowling pins (knockdown physics & score)
 *  - Cluttered Developer Workspace Objects replacing monolith blocks:
 *    Monitor, Keyboard, Mouse, Laptop, Tablet, Stylus Pen, Books, Coffee Mug, Notebook
 *  - Active Theory-style WebGL reactive lighting & floor grid
 *  - Robin Mastromarino-style elastic micro-interactions & HUD controls
 */

(function () {
  'use strict';

  // State Management
  let scene, camera, renderer, world;
  let ballBody, ballMesh, outerRingMesh;
  let keys = { forward: false, backward: false, left: false, right: false, brake: false };
  let babyBlocks = [];
  let projectObjects = [];
  let clutterObjects = [];
  let padTriggers = [];
  let score = 0;
  let is3DMode = true;
  let clock = new THREE.Clock();

  // Web Audio Context for Physics Sound FX
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playThudSound(pitch = 140, duration = 0.15) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playChimeSound() {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  }

  // Initialize Engine
  function init() {
    const container = document.getElementById('canvas-3d-container');
    if (!container) return;

    // 1. Three.js Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c14);
    scene.fog = new THREE.FogExp2(0x080c14, 0.018);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 15, 25);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Cannon.js Physics World Setup
    world = new CANNON.World();
    world.gravity.set(0, -14, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // Contact Materials with High Bounciness
    const groundMaterial = new CANNON.Material("groundMaterial");
    const ballMaterial = new CANNON.Material("ballMaterial");
    const contactMat = new CANNON.ContactMaterial(groundMaterial, ballMaterial, {
      friction: 0.5,
      restitution: 0.75 // Bouncy physics!
    });
    world.addContactMaterial(contactMat);

    // 3. Lighting (Atmospheric Metallic Lighting)
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe2e8f0, 2.8);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 2.5, 35);
    cyanPointLight.position.set(-15, 8, -10);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 2.5, 35);
    purplePointLight.position.set(15, 8, -10);
    scene.add(purplePointLight);

    // 4. Build Environment & Objects
    buildGround(groundMaterial);
    buildNeonBallWithGoldHalo(ballMaterial);
    buildBabyBlocks(ballMaterial);
    buildClutteredProjectObjects(ballMaterial);
    buildActionPads();

    // 5. Event Listeners
    setupControls();
    window.addEventListener('resize', onWindowResize);

    // 6. Start Loop
    animate();
  }

  // Ground Plane
  function buildGround(groundMat) {
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, material: groundMat });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    const size = 200;
    const gridHelper = new THREE.GridHelper(size, 80, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    const groundGeo = new THREE.PlaneGeometry(size, size);
    const groundMeshMat = new THREE.MeshStandardMaterial({
      color: 0x080c14,
      roughness: 0.7,
      metalness: 0.3
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMeshMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);
  }

  // Original Neon Cyber Sphere with Retained Metallic Golden Halo
  function buildNeonBallWithGoldHalo(ballMat) {
    const radius = 1.1;
    const sphereShape = new CANNON.Sphere(radius);

    ballBody = new CANNON.Body({ mass: 35, material: ballMat });
    ballBody.addShape(sphereShape);
    ballBody.position.set(0, 3, 20);
    ballBody.linearDamping = 0.3;
    ballBody.angularDamping = 0.3;
    world.addBody(ballBody);

    // Three.js Bouncing Ball Group
    ballMesh = new THREE.Group();

    // Original Neon Emerald Green / Cyan Core Sphere
    const coreGeo = new THREE.SphereGeometry(radius, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00ffa3,        // Original Neon Emerald Green
      emissive: 0x06b6d4,     // Cyan Emissive Glow
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    ballMesh.add(coreMesh);

    // Retained Metallic Golden Halo Torus Ring
    const ringGeo = new THREE.TorusGeometry(radius * 1.25, 0.06, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,        // Rich Metallic Gold
      emissive: 0xf59e0b,     // Warm Golden Glow
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    outerRingMesh = new THREE.Mesh(ringGeo, ringMat);
    outerRingMesh.rotation.x = Math.PI / 3;
    ballMesh.add(outerRingMesh);

    // Attached Radiant Golden Halo Point Light
    const ballLight = new THREE.PointLight(0xffd700, 3.5, 20);
    ballLight.position.set(0, 0, 0);
    ballMesh.add(ballLight);

    scene.add(ballMesh);

    // Collision Thud / Bounce Sound
    ballBody.addEventListener("collide", (e) => {
      const vel = e.contact.getImpactVelocityAlongNormal();
      if (Math.abs(vel) > 1.5) {
        playThudSound(120 + Math.min(vel * 15, 250), 0.15);
      }
    });
  }

  // 3D Knockdown Baby Blocks (Replaces bowling pins)
  function buildBabyBlocks(objMat) {
    const size = 1.2;
    const halfSize = size / 2;
    const blockShape = new CANNON.Box(new CANNON.Vec3(halfSize, halfSize, halfSize));

    const blockData = [
      { letter: 'A', color: 0xef4444 }, // Red
      { letter: 'B', color: 0x3b82f6 }, // Blue
      { letter: 'C', color: 0x10b981 }, // Green
      { letter: '1', color: 0xf59e0b }, // Yellow
      { letter: '2', color: 0x8b5cf6 }, // Purple
      { letter: '3', color: 0xec4899 }, // Pink
      { letter: 'AI', color: 0x06b6d4 }, // Cyan
      { letter: 'OT', color: 0x84cc16 }, // Lime
      { letter: 'IT', color: 0xf97316 }, // Orange
      { letter: 'DAF', color: 0x6366f1 }, // Indigo
      { letter: 'NAE', color: 0x14b8a6 }, // Teal
      { letter: 'SYS', color: 0xd946ef }  // Fuchsia
    ];

    // Pyramid & Stack positions
    const positions = [
      // Bottom Layer 1
      [-2.2, 0, -14], [-0.7, 0, -14], [0.7, 0, -14], [2.2, 0, -14],
      // Layer 2
      [-1.45, 1.25, -14], [0, 1.25, -14], [1.45, 1.25, -14],
      // Layer 3
      [-0.7, 2.5, -14], [0.7, 2.5, -14],
      // Top Layer 4
      [0, 3.75, -14],
      // Side Clutter Blocks
      [-3.8, 0, -16], [3.8, 0, -16]
    ];

    positions.forEach((pos, idx) => {
      const data = blockData[idx % blockData.length];
      const x = pos[0];
      const y = pos[1] + halfSize;
      const z = pos[2];

      const body = new CANNON.Body({ mass: 2.5, material: objMat });
      body.addShape(blockShape);
      body.position.set(x, y, z);
      body.linearDamping = 0.2;
      body.angularDamping = 0.2;
      world.addBody(body);

      // Canvas Texture for Baby Block Faces
      const canvas = document.createElement('canvas');
      canvas.width = 128; canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#' + data.color.toString(16).padStart(6, '0');
      ctx.fillRect(0, 0, 128, 128);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(10, 10, 108, 108);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 56px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.letter, 64, 64);

      const tex = new THREE.CanvasTexture(canvas);
      const geo = new THREE.BoxGeometry(size, size, size);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.3,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      scene.add(mesh);

      babyBlocks.push({ body: body, mesh: mesh, knocked: false });

      body.addEventListener("collide", () => {
        if (!body.knocked) {
          body.knocked = true;
          score += 10;
          updateScoreHUD();
          playThudSound(240 + Math.random() * 100, 0.12);
        }
      });
    });
  }

  // Helper: Create Canvas Label Texture for Desk Objects
  function createObjectLabelTexture(text, bgColor = '#0f172a', textColor = '#00ffa3') {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 256, 128);
    ctx.lineWidth = 6;
    ctx.strokeStyle = textColor;
    ctx.strokeRect(6, 6, 244, 116);
    ctx.fillStyle = textColor;
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 64);
    return new THREE.CanvasTexture(canvas);
  }

  // 3D Cluttered Developer Workspace Objects (Replaces monolith blocks)
  function buildClutteredProjectObjects(objMat) {
    const projects = [
      { id: 'daf', name: 'DAF', title: 'Digital Asset Factory', type: 'monitor', pos: [-12, 0, 4] },
      { id: 'nae', name: 'NAE', title: 'Newsletter Automation Engine', type: 'keyboard', pos: [12, 0, 4] },
      { id: 'msai', name: 'MSAI', title: 'Micro-SaaS Agent APIs', type: 'laptop', pos: [-14, 0, -8] },
      { id: 'agams', name: 'AGAMS', title: 'Air-Gapped Telemetry RAG', type: 'tablet', pos: [14, 0, -8] },
      { id: 'yp', name: 'YP / Arcane', title: 'Consciousness Audiobooks', type: 'books', pos: [-6, 0, -22] },
      { id: 'ap', name: 'AP / NextGadget', title: '@nextgadget.lab Pipeline', type: 'notebook', pos: [6, 0, -22] }
    ];

    projects.forEach(p => {
      const meshGroup = new THREE.Group();
      let cannonShape, mass = 20, pWidth = 3, pHeight = 2, pDepth = 2;

      const labelTex = createObjectLabelTexture(p.name);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, side: THREE.DoubleSide });

      if (p.type === 'monitor') {
        // 3D Desktop Monitor & Stand
        pWidth = 3.8; pHeight = 3.2; pDepth = 1.4;
        const panelGeo = new THREE.BoxGeometry(3.6, 2.2, 0.2);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
        const panelMesh = new THREE.Mesh(panelGeo, frameMat);
        panelMesh.position.y = 1.5;
        panelMesh.castShadow = true;
        meshGroup.add(panelMesh);

        // Screen Label
        const screenGeo = new THREE.PlaneGeometry(3.4, 2.0);
        const screenMesh = new THREE.Mesh(screenGeo, labelMat);
        screenMesh.position.set(0, 1.5, 0.11);
        meshGroup.add(screenMesh);

        // Stand Neck & Base
        const standNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.0, 16), frameMat);
        standNeck.position.set(0, 0.5, 0);
        meshGroup.add(standNeck);
        const standBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.0), frameMat);
        standBase.position.set(0, 0.05, 0);
        meshGroup.add(standBase);

        cannonShape = new CANNON.Box(new CANNON.Vec3(1.9, 1.6, 0.7));
      } else if (p.type === 'keyboard') {
        // 3D Mechanical Keyboard & Wireless Mouse
        pWidth = 4.0; pHeight = 0.8; pDepth = 1.8;
        const kbGeo = new THREE.BoxGeometry(3.8, 0.3, 1.6);
        const kbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.3 });
        const kbMesh = new THREE.Mesh(kbGeo, kbMat);
        kbMesh.position.y = 0.15;
        kbMesh.castShadow = true;
        meshGroup.add(kbMesh);

        // Label on Keyboard Top
        const labelGeo = new THREE.PlaneGeometry(3.6, 1.4);
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.position.set(0, 0.31, 0);
        meshGroup.add(labelMesh);

        // Wireless Mouse beside keyboard
        const mouseGeo = new THREE.SphereGeometry(0.35, 16, 16);
        mouseGeo.scale(1, 0.5, 1.4);
        const mouseMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.7, roughness: 0.2 });
        const mouseMesh = new THREE.Mesh(mouseGeo, mouseMat);
        mouseMesh.position.set(2.4, 0.18, 0.2);
        meshGroup.add(mouseMesh);

        cannonShape = new CANNON.Box(new CANNON.Vec3(2.0, 0.4, 0.9));
      } else if (p.type === 'laptop') {
        // 3D Opened Laptop & Stylus Pen
        pWidth = 3.6; pHeight = 2.4; pDepth = 2.4;
        const baseGeo = new THREE.BoxGeometry(3.4, 0.2, 2.2);
        const laptopMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.1 });
        const baseMesh = new THREE.Mesh(baseGeo, laptopMat);
        baseMesh.position.set(0, 0.1, 0.5);
        baseMesh.castShadow = true;
        meshGroup.add(baseMesh);

        // Tilted Screen Lid
        const lidGeo = new THREE.BoxGeometry(3.4, 2.2, 0.15);
        const lidMesh = new THREE.Mesh(lidGeo, laptopMat);
        lidMesh.position.set(0, 1.1, -0.6);
        lidMesh.rotation.x = -0.3; // Tilted back
        meshGroup.add(lidMesh);

        const screenGeo = new THREE.PlaneGeometry(3.2, 2.0);
        const screenMesh = new THREE.Mesh(screenGeo, labelMat);
        screenMesh.position.set(0, 1.1, -0.52);
        screenMesh.rotation.x = -0.3;
        meshGroup.add(screenMesh);

        cannonShape = new CANNON.Box(new CANNON.Vec3(1.8, 1.2, 1.2));
      } else if (p.type === 'tablet') {
        // 3D Smart Tablet & Digital Stylus
        pWidth = 3.2; pHeight = 0.6; pDepth = 2.2;
        const tabGeo = new THREE.BoxGeometry(3.0, 0.18, 2.0);
        const tabMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2 });
        const tabMesh = new THREE.Mesh(tabGeo, tabMat);
        tabMesh.position.y = 0.09;
        tabMesh.castShadow = true;
        meshGroup.add(tabMesh);

        const labelGeo = new THREE.PlaneGeometry(2.8, 1.8);
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.position.set(0, 0.19, 0);
        meshGroup.add(labelMesh);

        // Stylus Pen
        const stylusGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 12);
        const stylusMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9 });
        const stylusMesh = new THREE.Mesh(stylusGeo, stylusMat);
        stylusMesh.rotation.z = Math.PI / 2;
        stylusMesh.rotation.y = 0.3;
        stylusMesh.position.set(0, 0.24, 1.2);
        meshGroup.add(stylusMesh);

        cannonShape = new CANNON.Box(new CANNON.Vec3(1.6, 0.3, 1.1));
      } else if (p.type === 'books') {
        // 3D Stack of Books & Coffee Mug
        pWidth = 3.0; pHeight = 1.6; pDepth = 2.0;
        const bookMat1 = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.4 });
        const bookMat2 = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });
        const bookMat3 = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 });

        const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.4, 2.0), bookMat1);
        b1.position.y = 0.2; b1.castShadow = true; meshGroup.add(b1);
        const b2 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.4, 1.9), bookMat2);
        b2.position.set(0.1, 0.6, 0.05); b2.rotation.y = 0.15; b2.castShadow = true; meshGroup.add(b2);
        const b3 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.4, 1.8), bookMat3);
        b3.position.set(-0.05, 1.0, -0.05); b3.rotation.y = -0.1; b3.castShadow = true; meshGroup.add(b3);

        // Top Label
        const labelGeo = new THREE.PlaneGeometry(2.4, 1.6);
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.position.set(-0.05, 1.21, -0.05);
        meshGroup.add(labelMesh);

        // Coffee Mug beside stack
        const mugGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.8, 16);
        const mugMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1 });
        const mugMesh = new THREE.Mesh(mugGeo, mugMat);
        mugMesh.position.set(1.8, 0.4, 0.2);
        meshGroup.add(mugMesh);

        cannonShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.8, 1.0));
      } else {
        // 3D Tech Notebook & Pencil
        pWidth = 3.0; pHeight = 0.5; pDepth = 2.2;
        const nbGeo = new THREE.BoxGeometry(2.8, 0.25, 2.0);
        const nbMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5 });
        const nbMesh = new THREE.Mesh(nbGeo, nbMat);
        nbMesh.position.y = 0.125;
        nbMesh.castShadow = true;
        meshGroup.add(nbMesh);

        const labelGeo = new THREE.PlaneGeometry(2.6, 1.8);
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.position.set(0, 0.26, 0);
        meshGroup.add(labelMesh);

        // Pencil lying on top
        const pencilGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 8);
        const pencilMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
        const pencilMesh = new THREE.Mesh(pencilGeo, pencilMat);
        pencilMesh.rotation.z = Math.PI / 2;
        pencilMesh.rotation.y = -0.4;
        pencilMesh.position.set(0.2, 0.32, 0.1);
        meshGroup.add(pencilMesh);

        cannonShape = new CANNON.Box(new CANNON.Vec3(1.4, 0.3, 1.0));
      }

      const body = new CANNON.Body({ mass: mass, material: objMat });
      body.addShape(cannonShape);
      body.position.set(p.pos[0], pHeight / 2, p.pos[2]);
      body.linearDamping = 0.4;
      body.angularDamping = 0.4;
      world.addBody(body);

      scene.add(meshGroup);

      projectObjects.push({ id: p.id, name: p.name, title: p.title, body: body, mesh: meshGroup });

      body.addEventListener("collide", (e) => {
        const vel = e.contact.getImpactVelocityAlongNormal();
        if (Math.abs(vel) > 2.0) {
          playChimeSound();
          openProjectModal(p);
        }
      });
    });

    // Scatter 14 Additional Clutter Tech Items across the stage
    scatterDeskClutter(objMat);
  }

  // Scatter Extra Clutter Items (Mice, Pens, Coffee Cups, USB drives, Mini Books)
  function scatterDeskClutter(objMat) {
    const clutterTypes = ['mouse', 'coffee', 'pen', 'usb', 'book'];
    for (let i = 0; i < 14; i++) {
      const type = clutterTypes[i % clutterTypes.length];
      const x = (Math.random() - 0.5) * 32;
      const z = -22 + Math.random() * 32;
      if (Math.abs(x) < 3 && z > 15) continue; // Keep player spawn clear

      const group = new THREE.Group();
      let shape, cMass = 3;

      if (type === 'mouse') {
        const geo = new THREE.SphereGeometry(0.35, 16, 16);
        geo.scale(1, 0.5, 1.4);
        const mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.6 });
        const m = new THREE.Mesh(geo, mat); m.castShadow = true; group.add(m);
        shape = new CANNON.Box(new CANNON.Vec3(0.35, 0.2, 0.5));
      } else if (type === 'coffee') {
        const geo = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 16);
        const mat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 });
        const m = new THREE.Mesh(geo, mat); m.castShadow = true; group.add(m);
        shape = new CANNON.Cylinder(0.3, 0.3, 0.7, 8);
      } else if (type === 'pen') {
        const geo = new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8);
        const mat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
        const m = new THREE.Mesh(geo, mat); m.rotation.z = Math.PI / 2; m.castShadow = true; group.add(m);
        shape = new CANNON.Box(new CANNON.Vec3(0.8, 0.08, 0.08));
      } else if (type === 'usb') {
        const geo = new THREE.BoxGeometry(0.6, 0.15, 0.3);
        const mat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.8 });
        const m = new THREE.Mesh(geo, mat); m.castShadow = true; group.add(m);
        shape = new CANNON.Box(new CANNON.Vec3(0.3, 0.1, 0.15));
      } else {
        const geo = new THREE.BoxGeometry(1.4, 0.25, 1.0);
        const mat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
        const m = new THREE.Mesh(geo, mat); m.castShadow = true; group.add(m);
        shape = new CANNON.Box(new CANNON.Vec3(0.7, 0.13, 0.5));
      }

      const body = new CANNON.Body({ mass: cMass, material: objMat });
      body.addShape(shape);
      body.position.set(x, 0.5, z);
      body.linearDamping = 0.3;
      body.angularDamping = 0.3;
      world.addBody(body);

      scene.add(group);
      clutterObjects.push({ body: body, mesh: group });
    }
  }

  // Action Checkpoint Pads
  function buildActionPads() {
    const pads = [
      { id: 'work', title: 'View My Work', color: 0x00ffa3, pos: [0, 0, 8] },
      { id: 'listen', title: 'Listen Pitch', color: 0x3b82f6, pos: [-7, 0, 12] },
      { id: 'watch', title: 'Watch Video', color: 0xec4899, pos: [7, 0, 12] },
      { id: 'infographic', title: 'Infographic', color: 0xf59e0b, pos: [-10, 0, 18] },
      { id: 'contact', title: 'Get In Touch', color: 0xa855f7, pos: [10, 0, 18] }
    ];

    pads.forEach(pad => {
      const geo = new THREE.CylinderGeometry(2.2, 2.2, 0.1, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: pad.color,
        emissive: pad.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pad.pos[0], 0.05, pad.pos[2]);
      scene.add(mesh);

      const ringGeo = new THREE.TorusGeometry(1.8, 0.08, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: pad.color });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(pad.pos[0], 1.3, pad.pos[2]);
      scene.add(ringMesh);

      padTriggers.push({ id: pad.id, title: pad.title, pos: pad.pos, ring: ringMesh, triggered: false });
    });
  }

  // Setup Keyboard & Touch Controls for Bouncing Silver Ball
  function setupControls() {
    window.addEventListener('keydown', (e) => {
      initAudio();
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.forward = true; break;
        case 'KeyS': case 'ArrowDown': keys.backward = true; break;
        case 'KeyA': case 'ArrowLeft': keys.left = true; break;
        case 'KeyD': case 'ArrowRight': keys.right = true; break;
        case 'Space':
          // HIGH BOUNCE BOOST!
          if (ballBody && ballBody.position.y < 3.5) {
            ballBody.velocity.y = 11;
            playChimeSound();
          }
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.forward = false; break;
        case 'KeyS': case 'ArrowDown': keys.backward = false; break;
        case 'KeyA': case 'ArrowLeft': keys.left = false; break;
        case 'KeyD': case 'ArrowRight': keys.right = false; break;
      }
    });

    // Touch Joystick Controls
    const btnUp = document.getElementById('btn-3d-up');
    const btnDown = document.getElementById('btn-3d-down');
    const btnLeft = document.getElementById('btn-3d-left');
    const btnRight = document.getElementById('btn-3d-right');
    const btnJump = document.getElementById('btn-3d-jump');

    if (btnUp) {
      btnUp.addEventListener('touchstart', (e) => { e.preventDefault(); keys.forward = true; });
      btnUp.addEventListener('touchend', (e) => { e.preventDefault(); keys.forward = false; });
    }
    if (btnDown) {
      btnDown.addEventListener('touchstart', (e) => { e.preventDefault(); keys.backward = true; });
      btnDown.addEventListener('touchend', (e) => { e.preventDefault(); keys.backward = false; });
    }
    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
      btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys.left = false; });
    }
    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
      btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keys.right = false; });
    }
    if (btnJump) {
      btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (ballBody && ballBody.position.y < 3.5) {
          ballBody.velocity.y = 11;
          playChimeSound();
        }
      });
    }

    const resetBtn = document.getElementById('btn-3d-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetBall);
    }
  }

  function resetBall() {
    if (ballBody) {
      ballBody.position.set(0, 3, 20);
      ballBody.velocity.set(0, 0, 0);
      ballBody.angularVelocity.set(0, 0, 0);
    }
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (is3DMode && world && ballBody) {
      // 1. Step Physics World
      world.step(1 / 60);

      // 2. Ball Rolling & Impulse Driving
      const forceMultiplier = 160;

      if (keys.forward) ballBody.applyForce(new CANNON.Vec3(0, 0, -forceMultiplier), ballBody.position);
      if (keys.backward) ballBody.applyForce(new CANNON.Vec3(0, 0, forceMultiplier), ballBody.position);
      if (keys.left) ballBody.applyForce(new CANNON.Vec3(-forceMultiplier, 0, 0), ballBody.position);
      if (keys.right) ballBody.applyForce(new CANNON.Vec3(forceMultiplier, 0, 0), ballBody.position);

      // Sync Ball Mesh Position & Rotation
      ballMesh.position.copy(ballBody.position);
      ballMesh.quaternion.copy(ballBody.quaternion);

      // Rotate Outer Energy Ring
      if (outerRingMesh) {
        outerRingMesh.rotation.y += 0.04;
        outerRingMesh.rotation.z += 0.02;
      }

      // Calculate Speed Readout
      const speedKmH = Math.round(ballBody.velocity.length() * 3.6);
      const speedEl = document.getElementById('hud-speed');
      if (speedEl) speedEl.textContent = `${speedKmH} KM/H`;

      // 3. Sync Baby Blocks & Cluttered Workspace Objects
      babyBlocks.forEach(bb => {
        bb.mesh.position.copy(bb.body.position);
        bb.mesh.quaternion.copy(bb.body.quaternion);
      });

      projectObjects.forEach(po => {
        po.mesh.position.copy(po.body.position);
        po.mesh.quaternion.copy(po.body.quaternion);
      });

      clutterObjects.forEach(co => {
        co.mesh.position.copy(co.body.position);
        co.mesh.quaternion.copy(co.body.quaternion);
      });

      // Rotate Action Hologram Rings & Check Activation
      padTriggers.forEach(pad => {
        if (pad.ring) pad.ring.rotation.z += 0.03;

        const dist = ballMesh.position.distanceTo(new THREE.Vector3(pad.pos[0], 0, pad.pos[2]));
        if (dist < 2.5 && !pad.triggered) {
          pad.triggered = true;
          playChimeSound();
          triggerActionPadModal(pad.id);
          setTimeout(() => { pad.triggered = false; }, 3000);
        }
      });

      // 4. Smooth Dynamic Follow Camera
      const targetCamPos = new THREE.Vector3()
        .copy(ballMesh.position)
        .add(new THREE.Vector3(0, 11, 16));
      
      camera.position.lerp(targetCamPos, 0.08);
      camera.lookAt(ballMesh.position.x, ballMesh.position.y + 0.5, ballMesh.position.z);

      renderer.render(scene, camera);
    }
  }

  // HUD & Action Callbacks
  function updateScoreHUD() {
    const scoreEl = document.getElementById('hud-score');
    if (scoreEl) scoreEl.textContent = `SCORE: ${score}`;
  }

  function triggerActionPadModal(actionId) {
    if (actionId === 'work') {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'listen') {
      const el = document.getElementById('listen');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'watch') {
      const el = document.getElementById('watch');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'infographic') {
      const el = document.getElementById('infographic');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openProjectModal(project) {
    const modal = document.getElementById('3d-project-modal');
    const titleEl = document.getElementById('3d-modal-title');
    const descEl = document.getElementById('3d-modal-desc');

    if (modal && titleEl && descEl) {
      titleEl.textContent = project.title;
      descEl.textContent = `3D Physics Workspace Collision! Interactive telemetry for ${project.name} loaded into 3D viewport.`;
      modal.classList.remove('hidden');
    }
  }

  function onWindowResize() {
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

})();
