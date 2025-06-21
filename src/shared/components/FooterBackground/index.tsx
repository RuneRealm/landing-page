import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Simple RPG-style sword model that will be animated
const GameSword = ({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number], scale = 0.2 }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  // Animate the sword
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <boxGeometry args={[0.4, 0.1, 0.1]} attach="handle" />
      <meshStandardMaterial color="#ba7867" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// Simple shield model
const GameShield = ({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number], scale = 0.2 }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  // Animate the shield
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1 - 0.2;
    }
  });
  
  // Create a simple shield shape
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 32, 1, false, 0, Math.PI]} />
      <meshStandardMaterial color="#705264" metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

// Simple potion model
const GamePotion = ({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number], scale = 0.15 }) => {
  const ref = useRef<THREE.Group>(null);
  
  // Animate the potion
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.4;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15 + 0.2;
    }
  });
  
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 16]} />
        <meshStandardMaterial color="#1e88e5" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.3, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
};

// Create a magical rune circle
const RuneCircle = ({ position = [0, 0, 0] as [number, number, number], scale = 1 }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.001;
    }
  });
  
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0] as [number, number, number]} scale={scale}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#ba7867" transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Main scene component
const Scene = () => {
  return (
    <>
      <color attach="background" args={['#000']} />
      <fog attach="fog" args={['#000', 5, 15]} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ba7867" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <GameSword position={[-1.5, 0, 0] as [number, number, number]} />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <GameShield position={[0, -0.2, -0.5] as [number, number, number]} />
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <GamePotion position={[1.5, 0, 0] as [number, number, number]} />
      </Float>
      
      <RuneCircle position={[0, -1, -1] as [number, number, number]} scale={2} />
      
      <Sparkles count={50} scale={10} size={0.4} speed={0.3} opacity={0.2} color="#ba7867" />
      
      <Environment preset="sunset" />
    </>
  );
};

interface FooterBackgroundProps {
  className?: string;
}

const FooterBackground: React.FC<FooterBackgroundProps> = ({ className }) => {
  return (
    <div className={className} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas style={{ filter: 'blur(2px)' }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default FooterBackground;
