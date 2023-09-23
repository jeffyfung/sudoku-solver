"use client";

import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { OrbitControls, Text } from "@react-three/drei";

export const Cube: React.FC<{}> = () => {
  return (
    <Canvas style={{ maxWidth: "12vw", height: "80px" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Box position={[0, 0, 0]} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
};

const Box: React.FC<{ position: Vector3 | undefined }> = (props) => {
  const ref = useRef<Mesh | null>(null);
  const [hovered, hover] = useState(false);
  useFrame((state, delta) => (ref.current!.rotation.y += delta));
  return (
    <mesh
      {...props} //
      ref={ref}
      scale={1}
      rotation={[Math.PI / 5, 0, 0]}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={(_e) => hover(false)}
    >
      <boxGeometry args={[4, 4, 4]} />
      <meshLambertMaterial color={hovered ? "#ffffff" : "#fffa60"} />
      <Text color="black" position={[0, 0, 2.01]} anchorX="center" anchorY="middle" fontSize={3}>
        1
      </Text>
      <Text color="black" position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]} anchorX="center" anchorY="middle" fontSize={3}>
        2
      </Text>
      <Text color="black" position={[0, 0, -2.01]} rotation={[Math.PI, 0, Math.PI]} anchorX="center" anchorY="middle" fontSize={3}>
        3
      </Text>
      <Text color="black" position={[2.01, 0, 0]} rotation={[0, Math.PI / 2, 0]} anchorX="center" anchorY="middle" fontSize={3}>
        4
      </Text>
      <Text color="black" position={[-2.01, 0, 0]} rotation={[Math.PI, -Math.PI / 2, Math.PI]} anchorX="center" anchorY="middle" fontSize={3}>
        5
      </Text>
    </mesh>
  );
};
