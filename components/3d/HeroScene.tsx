"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Lightweight value-noise so we avoid an extra dependency. */
function noise(x: number, y: number) {
  return (
    Math.sin(x * 1.5) * Math.cos(y * 1.3) * 0.5 +
    Math.sin(x * 0.6 + y * 0.8) * 0.3 +
    Math.cos(x * 2.3 - y * 1.1) * 0.2
  );
}

function Terrain({ color, z = 0 }: { color: string; z?: number }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 8, 120, 60);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const ridge = Math.abs(noise(x * 0.35, y * 0.35));
      const h = ridge * 2.6 + noise(x * 0.9, y * 0.9) * 0.25;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2.35, 0, 0]}
      position={[0, -1.4, z]}
    >
      <meshStandardMaterial color={color} flatShading roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

function SnowField({ count = 450 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= delta * (0.4 + (i % 5) * 0.06);
      arr[i * 3] += Math.sin(arr[i * 3 + 1] + i) * delta * 0.04;
      if (arr[i * 3 + 1] < -1) arr[i * 3 + 1] = 9;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Gentle ambient drift so it never feels static…
    const driftX = Math.sin(t * 0.08) * 0.6;
    const driftY = Math.sin(t * 0.12) * 0.1;
    // …blended with cursor-driven parallax (pointer is normalised -1..1).
    const desiredX = driftX + pointer.x * 2.2;
    const desiredY = 1.6 + driftY + pointer.y * 0.7;
    // Frame-rate-independent smoothing for a buttery follow.
    const lambda = 3.5;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredX, lambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredY, lambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7 - Math.abs(pointer.x) * 0.4, lambda, delta);
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 7], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#13230f"]} />
      <fogExp2 attach="fog" args={["#1a2e1a", 0.06]} />
      <ambientLight intensity={0.7} color="#ffd4a0" />
      <directionalLight position={[6, 8, 4]} intensity={1.5} color="#ffe0b0" />
      <directionalLight position={[-6, 4, -2]} intensity={0.5} color="#9fc6ff" />

      <Terrain color="#24471f" z={0} />
      <Terrain color="#1c3a1a" z={-5} />
      <SnowField />
      <Rig />
    </Canvas>
  );
}
