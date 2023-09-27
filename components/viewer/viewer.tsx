"use client"

import React, { useRef, useState, ChangeEvent } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Button } from '../ui/button';

extend({ GLTFLoader });

const ThreeDObjectViewer = () => {
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const loader = new GLTFLoader();
      loader.load(URL.createObjectURL(file), (gltf: GLTF) => {
        // Convert the GLTF object to a THREE.Object3D object
        const threeModel = gltf.scene;

        // Set the model
        setModel(threeModel);
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".glb, .gltf"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button onClick={() => fileInputRef.current?.click()}>Upload 3D Model</Button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {model && <primitive object={model} />}
      </Canvas>
    </div>
  );
};

export default ThreeDObjectViewer;
