import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Safe rounded rectangle helper compatible with all browsers
function drawRoundRect(ctx, x, y, width, height, radius) {
  try {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, width, height, radius);
      return;
    }
  } catch {
    // fallback to manual bezier/quadratic path
  }
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

// Helper to draw card face on HTML Canvas and generate a Three.js CanvasTexture
function createCardTexture(card) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    // Background
    const colorMap = {
      health: '#ef4444',
      having: '#f59e0b',
      loving: '#10b981',
      being: '#3b82f6',
      wild: '#1e1b4b',
    };
    const bgColor = colorMap[card?.color] || '#1e1b4b';

    // Card outer rounded box
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    drawRoundRect(ctx, 8, 8, 240, 344, 20);
    ctx.fill();

    // Card inner color fill
    if (card?.color === 'wild') {
      // Rainbow 4-quadrant fill
      const grad = ctx.createLinearGradient(16, 16, 240, 344);
      grad.addColorStop(0, '#ef4444');
      grad.addColorStop(0.33, '#f59e0b');
      grad.addColorStop(0.66, '#10b981');
      grad.addColorStop(1, '#3b82f6');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.beginPath();
    drawRoundRect(ctx, 16, 16, 224, 328, 16);
    ctx.fill();

    // Inner oval ellipse
    ctx.save();
    ctx.translate(128, 180);
    ctx.rotate(-0.35);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, 0, 75, 115, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Text / Symbol in center
    ctx.fillStyle = card?.color === 'wild' ? '#111827' : bgColor;
    ctx.font = 'bold 54px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let displayVal = card?.value || '1';
    if (card?.type === 'reverse') displayVal = '🔄';
    else if (card?.type === 'skip') displayVal = '🚫';
    else if (card?.type === 'draw2') displayVal = '+2';
    else if (card?.type === 'wild4') displayVal = '+4';
    else if (card?.type === 'wild') displayVal = 'WILD';

    ctx.fillText(displayVal, 128, 180);

    // Corner symbols
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(displayVal, 38, 46);
    ctx.fillText(displayVal, 218, 314);

    // Dimension label at bottom
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 14px Nunito, sans-serif';
    const labelMap = {
      health: 'HEALTH',
      having: 'HAVING',
      loving: 'LOVING',
      being: 'BEING',
      wild: 'CERITA',
    };
    ctx.fillText(labelMap[card?.color] || '', 128, 326);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  } catch (e) {
    console.warn("createCardTexture fallback:", e);
    return new THREE.Texture();
  }
}

function createCardBackTexture() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    drawRoundRect(ctx, 8, 8, 240, 344, 20);
    ctx.fill();

    // Deep dark blue / purple back
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    drawRoundRect(ctx, 16, 16, 224, 328, 16);
    ctx.fill();

    // Glowing center circle
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(128, 180, 75, 105, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Yellow badge
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.ellipse(128, 180, 65, 90, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 36px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('UNO', 128, 165);

    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText('CERITA', 128, 200);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  } catch (e) {
    console.warn("createCardBackTexture fallback:", e);
    return new THREE.Texture();
  }
}

function checkWebGLSupport() {
  try {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function ThreeCanvas({
  players,
  activePlayerIndex,
  direction, // 1 for clockwise, -1 for counter-clockwise
  topCard,
  lastAction, // { type: 'play'|'draw'|'plusTwo', fromPlayerIndex, toPlayerIndex, card }
  onDrawDeckClick,
  isLobby = false,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);

  // Dynamic references
  const discardMeshRef = useRef(null);
  const deckMeshRef = useRef(null);
  const directionRingRef = useRef(null);
  const chairMeshesRef = useRef([]);
  const flyingObjectsRef = useRef([]);

  const propsRef = useRef({ direction, isLobby, activePlayerIndex, onDrawDeckClick });
  useEffect(() => {
    propsRef.current = { direction, isLobby, activePlayerIndex, onDrawDeckClick };
  }, [direction, isLobby, activePlayerIndex, onDrawDeckClick]);

  const [webglSupported, setWebglSupported] = useState(() => checkWebGLSupport());

  useEffect(() => {
    if (!webglSupported) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;
    const safeAspect = height > 0 ? width / height : 16 / 9;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900
    scene.fog = new THREE.FogExp2(0x0f172a, 0.04);
    sceneRef.current = scene;

    // CAMERA (isometric tilted view)
    const camera = new THREE.PerspectiveCamera(45, safeAspect, 0.1, 100);
    camera.position.set(0, 10.5, 9.5);
    camera.lookAt(0, 0.6, 0);
    cameraRef.current = camera;

    // RENDERER
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn("WebGL Renderer creation failed, running in fallback mode:", err);
      setTimeout(() => {
        setWebglSupported(false);
      }, 0);
      return;
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    dirLight.position.set(5, 14, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.camera.left = -6;
    dirLight.shadow.camera.right = 6;
    dirLight.shadow.camera.top = 6;
    dirLight.shadow.camera.bottom = -6;
    scene.add(dirLight);

    const centerPointLight = new THREE.PointLight(0x60a5fa, 1.2, 10);
    centerPointLight.position.set(0, 3, 0);
    scene.add(centerPointLight);

    // FLOOR / ROOM CARPET
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // LARGE UNDER-TABLE ROUND RUG
    const rugGeo = new THREE.CylinderGeometry(5.2, 5.2, 0.04, 48);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.85,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.y = -0.47;
    rug.receiveShadow = true;
    scene.add(rug);

    // ROUND TABLE BASE (Wood rim)
    const tableRadius = 3.6;
    const tableHeight = 0.5;
    const tableBaseGeo = new THREE.CylinderGeometry(tableRadius, tableRadius - 0.2, tableHeight, 48);
    const tableBaseMat = new THREE.MeshStandardMaterial({
      color: 0x78350f, // Warm varnished wood
      roughness: 0.4,
      metalness: 0.1,
    });
    const tableBase = new THREE.Mesh(tableBaseGeo, tableBaseMat);
    tableBase.position.y = tableHeight / 2;
    tableBase.castShadow = true;
    tableBase.receiveShadow = true;
    scene.add(tableBase);

    // TABLE TOP FELT (Velvety Blue Felt)
    const feltGeo = new THREE.CylinderGeometry(tableRadius - 0.2, tableRadius - 0.2, 0.05, 48);
    const feltMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Royal Blue Felt
      roughness: 0.75,
    });
    const tableFelt = new THREE.Mesh(feltGeo, feltMat);
    tableFelt.position.y = tableHeight + 0.01;
    tableFelt.receiveShadow = true;
    scene.add(tableFelt);

    // GOLDEN TABLE RIM RING
    const rimGeo = new THREE.TorusGeometry(tableRadius - 0.15, 0.08, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.6,
      roughness: 0.3,
    });
    const tableRim = new THREE.Mesh(rimGeo, rimMat);
    tableRim.rotation.x = Math.PI / 2;
    tableRim.position.y = tableHeight + 0.03;
    scene.add(tableRim);

    // TABLE PEDESTAL LEG
    const legGeo = new THREE.CylinderGeometry(0.8, 1.2, tableHeight + 0.4, 24);
    const leg = new THREE.Mesh(legGeo, tableBaseMat);
    leg.position.y = 0;
    scene.add(leg);

    // ROTATING DIRECTION INDICATOR RING
    const dirRingGeo = new THREE.TorusGeometry(1.5, 0.035, 16, 32);
    const dirRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const dirRing = new THREE.Mesh(dirRingGeo, dirRingMat);
    dirRing.rotation.x = Math.PI / 2;
    dirRing.position.y = tableHeight + 0.04;
    scene.add(dirRing);
    directionRingRef.current = dirRing;

    // Add 4 directional arrow nubs along ring
    const arrowGroup = new THREE.Group();
    for (let a = 0; a < 4; a++) {
      const angle = (a * Math.PI) / 2;
      const arrowGeo = new THREE.ConeGeometry(0.1, 0.25, 12);
      const arrowMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xeab308,
        emissiveIntensity: 0.9,
      });
      const arrow = new THREE.Mesh(arrowGeo, arrowMat);
      arrow.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      arrow.rotation.y = -angle + Math.PI / 2;
      arrow.rotation.z = -Math.PI / 2;
      arrowGroup.add(arrow);
    }
    dirRing.add(arrowGroup);

    // DRAW PILE (Tumpukan Kartu 3D di meja)
    const cardGeo = new THREE.BoxGeometry(0.9, 0.25, 1.3);
    const cardBackTex = createCardBackTexture();
    const deckMat = [
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // right
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // left
      new THREE.MeshStandardMaterial({ map: cardBackTex, roughness: 0.3 }), // top
      new THREE.MeshStandardMaterial({ color: 0x1e1b4b }), // bottom
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // front
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // back
    ];
    const deckMesh = new THREE.Mesh(cardGeo, deckMat);
    deckMesh.position.set(-1.1, tableHeight + 0.15, 0);
    deckMesh.rotation.y = 0.15;
    deckMesh.castShadow = true;
    deckMesh.receiveShadow = true;
    scene.add(deckMesh);
    deckMeshRef.current = deckMesh;

    // DISCARD PILE (Kartu Terbuka di Tengah)
    const singleCardGeo = new THREE.BoxGeometry(0.95, 0.03, 1.35);
    const initialDiscardMat = [
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // 0 right
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // 1 left
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 }), // 2 top face
      new THREE.MeshStandardMaterial({ color: 0x1e1b4b }), // 3 bottom
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // 4 front
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // 5 back
    ];
    const discardMesh = new THREE.Mesh(singleCardGeo, initialDiscardMat);
    discardMesh.position.set(0.6, tableHeight + 0.05, 0);
    discardMesh.rotation.y = -0.1;
    discardMesh.castShadow = true;
    discardMesh.receiveShadow = true;
    scene.add(discardMesh);
    discardMeshRef.current = discardMesh;

    // Raycaster for clicking Draw Pile
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (deckMeshRef.current) {
        const intersects = raycaster.intersectObject(deckMeshRef.current);
        if (intersects.length > 0 && propsRef.current.onDrawDeckClick) {
          propsRef.current.onDrawDeckClick();
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', handleClick);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      if (!w || !h || h <= 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Spin direction ring
      if (directionRingRef.current) {
        const spinSpeed = (propsRef.current.direction || 1) * 0.9;
        directionRingRef.current.rotation.z -= spinSpeed * delta;
      }

      // Lobby floating cards & gentle camera sway
      if (propsRef.current.isLobby) {
        camera.position.x = Math.sin(elapsed * 0.25) * 2.2;
        camera.position.z = 9.5 + Math.cos(elapsed * 0.25) * 1.0;
        camera.lookAt(0, 0.6, 0);
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, delta * 3);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 10.5, delta * 3);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 9.5, delta * 3);
        camera.lookAt(0, 0.6, 0);
      }

      // Pulse active player seat glow
      chairMeshesRef.current.forEach((chairObj, idx) => {
        if (!chairObj) return;
        const isActive = idx === propsRef.current.activePlayerIndex;
        if (chairObj.glowDisc) {
          if (isActive) {
            const scale = 1 + Math.sin(elapsed * 5) * 0.08;
            chairObj.glowDisc.scale.set(scale, scale, 1);
            chairObj.glowDisc.material.opacity = 0.8 + Math.sin(elapsed * 5) * 0.15;
          } else {
            chairObj.glowDisc.scale.set(1, 1, 1);
            chairObj.glowDisc.material.opacity = 0.2;
          }
        }
      });

      // Update Flying Cards Animation
      const remainingFlying = [];
      flyingObjectsRef.current.forEach((item) => {
        item.progress += delta / item.duration;
        const t = Math.min(item.progress, 1);

        // Interpolate X, Z linearly, parabolic arc on Y
        const currentX = THREE.MathUtils.lerp(item.startPos.x, item.endPos.x, t);
        const currentZ = THREE.MathUtils.lerp(item.startPos.z, item.endPos.z, t);
        const arcY = Math.sin(t * Math.PI) * item.arcHeight;
        const currentY = THREE.MathUtils.lerp(item.startPos.y, item.endPos.y, t) + arcY;

        item.mesh.position.set(currentX, currentY, currentZ);
        item.mesh.rotation.y += delta * 4;
        item.mesh.rotation.x = Math.sin(t * Math.PI) * 0.4;

        if (t < 1) {
          remainingFlying.push(item);
        } else {
          // Finished animation, clean up mesh
          scene.remove(item.mesh);
          if (item.mesh.geometry) item.mesh.geometry.dispose();
        }
      });
      flyingObjectsRef.current = remainingFlying;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [webglSupported]);

  // Update chairs when players count changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !players || players.length === 0) return;

    // Clean existing chairs
    chairMeshesRef.current.forEach((obj) => {
      if (obj && obj.group) scene.remove(obj.group);
    });
    chairMeshesRef.current = [];

    const playerCount = players.length;
    const chairDistance = 4.4;

    const chairs = players.map((player, idx) => {
      const angle = (idx * (2 * Math.PI)) / playerCount + Math.PI / 2;
      const chairX = Math.cos(angle) * chairDistance;
      const chairZ = Math.sin(angle) * chairDistance;

      const group = new THREE.Group();
      group.position.set(chairX, 0, chairZ);
      group.lookAt(0, 0, 0);

      // Player seat base cushion
      const seatGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.25, 24);
      const seatMat = new THREE.MeshStandardMaterial({
        color: 0x334155, // Slate 700
        roughness: 0.6,
      });
      const seat = new THREE.Mesh(seatGeo, seatMat);
      seat.position.y = 0.3;
      seat.castShadow = true;
      group.add(seat);

      // Chair backrest
      const backGeo = new THREE.BoxGeometry(0.8, 0.7, 0.15);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.5,
      });
      const back = new THREE.Mesh(backGeo, backMat);
      back.position.set(0, 0.75, -0.45);
      back.castShadow = true;
      group.add(back);

      // Emissive Glow Disc beneath chair
      const glowGeo = new THREE.RingGeometry(0.3, 1.1, 32);
      const glowColor =
        idx === 0
          ? 0xef4444
          : idx === 1
          ? 0x3b82f6
          : idx === 2
          ? 0x22c55e
          : 0xf59e0b;
      const glowMat = new THREE.MeshBasicMaterial({
        color: glowColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      });
      const glowDisc = new THREE.Mesh(glowGeo, glowMat);
      glowDisc.rotation.x = Math.PI / 2;
      glowDisc.position.y = -0.45;
      group.add(glowDisc);

      scene.add(group);
      return { group, glowDisc, chairX, chairZ, idx };
    });

    chairMeshesRef.current = chairs;
  }, [players]);

  // Update top discard card visual texture
  useEffect(() => {
    if (!discardMeshRef.current || !topCard) return;
    try {
      const cardTex = createCardTexture(topCard);
      const meshMat = discardMeshRef.current.material;
      if (Array.isArray(meshMat) && meshMat[2]) {
        meshMat[2].map = cardTex;
        meshMat[2].needsUpdate = true;
      }
      // Add subtle random rotation to look natural like on real game table
      discardMeshRef.current.rotation.y = (Math.random() - 0.5) * 0.35;
    } catch (e) {
      console.warn("Error updating discard card texture:", e);
    }
  }, [topCard]);

  // Trigger 3D flying card animations on action
  useEffect(() => {
    if (!lastAction || !sceneRef.current) return;
    const scene = sceneRef.current;
    const tableHeight = 0.5;

    const chairs = chairMeshesRef.current;
    const fromChair = chairs[lastAction.fromPlayerIndex];
    const toChair = chairs[lastAction.toPlayerIndex];

    const cardTex = lastAction.card ? createCardTexture(lastAction.card) : createCardBackTexture();
    const cardMat = new THREE.MeshStandardMaterial({ map: cardTex, roughness: 0.4 });
    const flyGeo = new THREE.BoxGeometry(0.85, 0.02, 1.25);
    const flyingMesh = new THREE.Mesh(flyGeo, cardMat);
    flyingMesh.castShadow = true;

    if (lastAction.type === 'play' && fromChair) {
      // Card flies from player chair to central discard pile
      flyingMesh.position.set(fromChair.chairX, 0.6, fromChair.chairZ);
      scene.add(flyingMesh);

      flyingObjectsRef.current.push({
        mesh: flyingMesh,
        startPos: new THREE.Vector3(fromChair.chairX, 0.7, fromChair.chairZ),
        endPos: new THREE.Vector3(0.6, tableHeight + 0.06, 0),
        progress: 0,
        duration: 0.5,
        arcHeight: 2.2,
      });
    } else if (lastAction.type === 'draw' && toChair) {
      // Card glides from deck pile to player chair
      flyingMesh.position.set(-1.1, tableHeight + 0.2, 0);
      scene.add(flyingMesh);

      flyingObjectsRef.current.push({
        mesh: flyingMesh,
        startPos: new THREE.Vector3(-1.1, tableHeight + 0.2, 0),
        endPos: new THREE.Vector3(toChair.chairX, 0.8, toChair.chairZ),
        progress: 0,
        duration: 0.45,
        arcHeight: 1.5,
      });
    } else if (lastAction.type === 'plusTwo' && fromChair && toChair) {
      // Card flies across from thrower to target player chair!
      flyingMesh.position.set(fromChair.chairX, 0.6, fromChair.chairZ);
      scene.add(flyingMesh);

      flyingObjectsRef.current.push({
        mesh: flyingMesh,
        startPos: new THREE.Vector3(fromChair.chairX, 0.8, fromChair.chairZ),
        endPos: new THREE.Vector3(toChair.chairX, 0.8, toChair.chairZ),
        progress: 0,
        duration: 0.65,
        arcHeight: 3.0,
      });
    }
  }, [lastAction]);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center select-none pointer-events-auto">
        {/* Fallback stylized round table */}
        <div className="relative w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-900 border-8 border-amber-800 shadow-2xl flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border-2 border-amber-400/40 pointer-events-none" />
          <div className="flex items-center gap-4 z-10">
            {/* Draw pile */}
            <button
              onClick={onDrawDeckClick}
              className="w-16 h-24 rounded-xl bg-indigo-950 border-2 border-indigo-400 flex flex-col items-center justify-center text-white text-xs font-bold hover:scale-105 shadow-xl transition-all"
            >
              <span>DECK</span>
              <span className="text-[10px] text-amber-400">(Ambil)</span>
            </button>
            {/* Discard top card */}
            {topCard && (
              <div
                className={`w-16 h-24 rounded-xl border-2 p-1.5 flex flex-col justify-between items-center text-white shadow-xl ${
                  topCard.color === 'health'
                    ? 'bg-red-600 border-red-300'
                    : topCard.color === 'having'
                    ? 'bg-amber-500 border-amber-200 text-slate-950'
                    : topCard.color === 'loving'
                    ? 'bg-emerald-600 border-emerald-300'
                    : topCard.color === 'being'
                    ? 'bg-blue-600 border-blue-300'
                    : 'bg-indigo-900 border-amber-400'
                }`}
              >
                <span className="text-[10px] font-bold">{topCard.value}</span>
                <span className="text-sm font-extrabold">{topCard.value}</span>
                <span className="text-[8px]">{topCard.color?.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
    />
  );
}
