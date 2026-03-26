import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import textMessageImg from "figma:asset/d627b9ef44db9d768b99b459a09eb99491f548e3.png";
import shoeRackPhoto1 from "figma:asset/dccf60f70c8f85f3e959d0acf4e3873608cb00cf.png";
import shoeRackPhoto2 from "figma:asset/6c13d8e0e6c99439c36e60e45a472b7233770e85.png";
import shoeRackPhoto3 from "figma:asset/06dd05b4f0c56dba730a8e4a4c721703b03f3865.png";

// Placeholder model fallback - MUST BE DEFINED BEFORE USE
function createPlaceholderModel(group: THREE.Group) {
  console.log('🔨 Creating placeholder model...');
  
  // Wood-like materials for the shoe rack
  const shelfMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B7355,
    metalness: 0.2,
    roughness: 0.8
  });
  const supportMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x6B5345,
    metalness: 0.2,
    roughness: 0.8
  });

  // Bottom shelf
  const bottomShelf = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.1, 1),
    shelfMaterial
  );
  bottomShelf.position.set(0, 0, 0);
  bottomShelf.castShadow = true;
  bottomShelf.receiveShadow = true;
  group.add(bottomShelf);

  // Middle shelf
  const middleShelf = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.1, 1),
    shelfMaterial
  );
  middleShelf.position.set(0, 1, 0);
  middleShelf.castShadow = true;
  middleShelf.receiveShadow = true;
  group.add(middleShelf);

  // Top shelf
  const topShelf = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.1, 1),
    shelfMaterial
  );
  topShelf.position.set(0, 2, 0);
  topShelf.castShadow = true;
  topShelf.receiveShadow = true;
  group.add(topShelf);

  // Left support
  const leftSupport = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 2.2, 1),
    supportMaterial
  );
  leftSupport.position.set(-1.45, 1, 0);
  leftSupport.castShadow = true;
  leftSupport.receiveShadow = true;
  group.add(leftSupport);

  // Right support
  const rightSupport = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 2.2, 1),
    supportMaterial
  );
  rightSupport.position.set(1.45, 1, 0);
  rightSupport.castShadow = true;
  rightSupport.receiveShadow = true;
  group.add(rightSupport);
  
  console.log('✅ Placeholder model created with', group.children.length, 'objects');
}

function ShoeRack3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const zoom = useRef(2.5);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>("Loading model...");

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFF4EA);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Create shoe rack group
    const shoeRack = new THREE.Group();

    // Load the GLTF model from GitHub
    const loader = new GLTFLoader();
    loader.load(
      'https://raw.githubusercontent.com/amyyliuu/shoerack/main/shoerack_gltf.glb',
      (gltf) => {
        shoeRack.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    scene.add(shoeRack);

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      rotation.current.y += deltaX * 0.01;
      rotation.current.x += deltaY * 0.01;

      // Limit vertical rotation
      rotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom.current += e.deltaY * 0.005;
      zoom.current = Math.max(2, Math.min(8, zoom.current)); // Limit zoom range
    };

    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    canvasRef.current.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation loop
    let autoRotate = 0;
    let frameCount = 0;
    function animate() {
      requestAnimationFrame(animate);

      if (!isDragging.current) {
        autoRotate += 0.002; // Slower rotation speed
      }

      shoeRack.rotation.y = rotation.current.y + autoRotate;
      shoeRack.rotation.x = rotation.current.x;

      // Update camera position based on zoom
      const distance = zoom.current;
      camera.position.set(distance, distance / 2, distance);
      camera.lookAt(0, 1, 0);
      
      // Debug logging every 60 frames
      frameCount++;
      if (frameCount === 60) {
        console.log('🎬 Scene info:', {
          shoeRackChildren: shoeRack.children.length,
          sceneChildren: scene.children.length,
          cameraPosition: camera.position,
          shoeRackRotation: shoeRack.rotation
        });
        frameCount = 0;
      }

      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current?.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {loadingError && (
        <div className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded-lg text-xs">
          {loadingError}
        </div>
      )}
      {!loadingError && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-gray-600 pointer-events-none">
          {loadingStatus}
        </div>
      )}
    </>
  );
}

export function ShoeRackViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-32"
    >
      {/* Project Title and Description - Outside Box */}
      <div className="mb-8">
        <h3 className="text-5xl md:text-6xl mb-6 text-[#BF4646]">
          Shoe Rack
        </h3>
        
        {/* Description with Text Message Image Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              My first ever design class at MIT was <span className="font-semibold">4.021</span>, a class focused on optimizing practicality and aesthetics into objects. For our final project, we were asked to create a functional object out of only a 4 x 3 ft sheet of metal.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              As an avid fashion lover with a special interest in shoes, I realized my dorm-supplied shoe rack was made for a normal person's shoe collection and not my own. Thus, I present to you: My Shoe Rack.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              src={textMessageImg} 
              alt="Text message about shoe rack design" 
              className="rounded-2xl shadow-lg max-w-[300px] w-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Project Content with Diagonal Background */}
      <div className="relative -mx-4 md:-mx-8 px-4 md:px-8 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#BF4646]/15 to-[#EDDCC6]/30 transform skew-y-2 origin-top-right"></div>
        
        <div className="relative">
          {/* 3D Model Section */}
          <div className="mb-16">
            <h4 className="text-3xl mb-6 text-[#BF4646]">This was my mockup in Rhino</h4>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF4EA] to-[#EDDCC6] shadow-xl">
              <ShoeRack3D />
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 pointer-events-none">
                Drag to rotate • Scroll to zoom ✨
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3 italic">
              Note: Some design features like arches may not render fully due to Rhino's glTF export limitations. See finished product photos below for complete details.
            </p>
            
            {/* Thought Process */}
            <div className="mt-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                When designing, I knew my design needed to 1) be structurally sound, 2) store many different types of shoes, and 3) maximize utility out of the metal sheet.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                I came up with my final design: square cutouts on the top would allow high heels to hang, oval cutouts would fold downwards (stabilized by a triangular flap that swigs out to rest against the frame) to hold shoes, and a large, elongated cutout in the back would hold boots.
              </p>
            </div>
          </div>

          {/* Real Life Photos with Diagram */}
          <div>
            <h4 className="text-3xl mb-6 text-[#BF4646]">The Finished Product</h4>
            
            {/* Photos Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                src={shoeRackPhoto2}
                alt="Shoe rack detail view"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                src={shoeRackPhoto3}
                alt="Finished shoe rack with shoes"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>

            {/* Diagram Explanation */}
            <div className="bg-gradient-to-br from-[#FFF4EA] to-[#EDDCC6] rounded-2xl p-8">
              <h5 className="text-2xl mb-4 text-[#BF4646]">Design Features</h5>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-[#7EACB5] rounded-lg mb-3 flex items-center justify-center text-white text-xl">
                    □
                  </div>
                  <h6 className="font-semibold text-gray-800 mb-2">Top Squares</h6>
                  <p className="text-gray-600 text-sm">Designed for heels to sit upright and maintain their shape</p>
                </div>
                
                <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-[#BF4646] rounded-lg mb-3 flex items-center justify-center text-white text-xl">
                    ∩
                  </div>
                  <h6 className="font-semibold text-gray-800 mb-2">Arched Sections</h6>
                  <p className="text-gray-600 text-sm">Perfect for sneakers, flats, and everyday footwear</p>
                </div>
                
                <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-[#7EACB5] rounded-lg mb-3 flex items-center justify-center text-white text-xl">
                    ||
                  </div>
                  <h6 className="font-semibold text-gray-800 mb-2">Back Section</h6>
                  <p className="text-gray-600 text-sm">Accommodates boots and taller shoes with extra height</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}