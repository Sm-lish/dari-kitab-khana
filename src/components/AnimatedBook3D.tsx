
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

const Book3D = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh rotation={[0, Math.PI / 6, 0]} position={[0, 0, 0]}>
        {/* Book Cover */}
        <boxGeometry args={[2, 2.8, 0.2]} />
        <meshStandardMaterial 
          color="#2C1810" 
          roughness={0.8}
          metalness={0.1}
        />
        
        {/* Book Pages */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[1.9, 2.7, 0.3]} />
          <meshStandardMaterial color="#F8F6F0" />
        </mesh>
        
        {/* Book Spine */}
        <mesh position={[-1, 0, -0.1]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.4, 2.8, 0.2]} />
          <meshStandardMaterial color="#1A0F08" />
        </mesh>
        
        {/* Gold decorative border on cover */}
        <mesh position={[0.01, 0, 0.11]}>
          <boxGeometry args={[1.8, 2.6, 0.01]} />
          <meshStandardMaterial 
            color="#FFD700" 
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </mesh>
      
      {/* Book Title Text */}
      <Text
        position={[0, 0.5, 0.12]}
        rotation={[0, Math.PI / 6, 0]}
        fontSize={0.15}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansArabic-Regular.ttf"
      >
        تاریخ افغانستان
      </Text>
      
      {/* Author Text */}
      <Text
        position={[0, -0.3, 0.12]}
        rotation={[0, Math.PI / 6, 0]}
        fontSize={0.08}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansArabic-Regular.ttf"
      >
        احمد علی کوهزاد
      </Text>
      
      {/* Decorative Islamic pattern elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 0.6,
            Math.sin((i / 8) * Math.PI * 2) * 0.8,
            0.12
          ]}
          rotation={[0, Math.PI / 6, 0]}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color="#FFD700"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
      
      {/* Floating sparkles around the book */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={`sparkle-${i}`}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 3
          ]}
        >
          <sphereGeometry args={[0.015]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(0.15, 0.8, 0.8)} 
            emissive={new THREE.Color().setHSL(0.15, 0.6, 0.4)}
          />
        </mesh>
      ))}
    </Float>
  );
};

const AnimatedBook3D = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting for book */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
          />
          <pointLight position={[-5, 5, 5]} intensity={0.8} color="#FFD700" />
          <spotLight
            position={[0, 10, 10]}
            intensity={0.5}
            angle={Math.PI / 6}
            penumbra={0.5}
            color="#FFF8DC"
          />
          
          {/* 3D Book */}
          <Book3D />
          
          {/* Controls */}
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
