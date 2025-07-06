
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Book3D = () => {
  const bookRef = useRef<THREE.Group>(null);
  const pagesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      bookRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (pagesRef.current) {
      pagesRef.current.children.forEach((page, index) => {
        const offset = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.02;
        page.position.z = index * 0.01 + offset;
      });
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={bookRef} position={[0, 0, 0]}>
        {/* Book Cover */}
        <Box args={[2.5, 3.5, 0.2]} position={[0, 0, 0.6]}>
          <meshPhysicalMaterial
            color="#8B4513"
            roughness={0.3}
            metalness={0.1}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </Box>
        
        {/* Book Spine */}
        <Box args={[0.2, 3.5, 1.2]} position={[-1.25, 0, 0]}>
          <meshPhysicalMaterial
            color="#654321"
            roughness={0.4}
            metalness={0.1}
          />
        </Box>
        
        {/* Back Cover */}
        <Box args={[2.5, 3.5, 0.2]} position={[0, 0, -0.6]}>
          <meshPhysicalMaterial
            color="#654321"
            roughness={0.3}
            metalness={0.1}
          />
        </Box>
        
        {/* Pages */}
        <group ref={pagesRef}>
          {Array.from({ length: 8 }, (_, i) => (
            <Box key={i} args={[2.3, 3.3, 0.05]} position={[0, 0, -0.5 + i * 0.1]}>
              <meshLambertMaterial color="#f8f8f8" />
            </Box>
          ))}
        </group>
        
        {/* Title Text on Cover */}
        <Text
          position={[0, 0.5, 0.71]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          خانه کتاب
        </Text>
        
        <Text
          position={[0, -0.5, 0.71]}
          fontSize={0.15}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          کتاب‌های الکترونیک
        </Text>
        
        {/* Decorative elements */}
        <Box args={[2.1, 0.05, 0.01]} position={[0, 1.2, 0.71]}>
          <meshBasicMaterial color="#FFD700" />
        </Box>
        <Box args={[2.1, 0.05, 0.01]} position={[0, -1.2, 0.71]}>
          <meshBasicMaterial color="#FFD700" />
        </Box>
      </group>
    </Float>
  );
};

const AnimatedBook3D = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <Book3D />
          
          <Environment preset="sunset" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnimatedBook3D;
