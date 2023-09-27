"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import throttle from 'lodash/throttle';
import { useTheme } from 'next-themes';

const PI_2 = Math.PI * 2;
const X_CNT = 30;
const Y_CNT = 30;
const SCALE = 200;

const SliderWave: React.FC = () => {
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const theme: any = useTheme();


  const dots: THREE.Sprite[] = [];

  useEffect(() => {
    let widthHalf = window.innerWidth / 2;
    let heightHalf = window.innerHeight / 2;

    const handleResize = throttle(() => {
      widthHalf = window.innerWidth / 2;
      heightHalf = window.innerHeight / 2;

      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }

      rendererRef.current?.setSize(window.innerWidth, window.innerHeight);
    }, 100, { trailing: false });

    window.addEventListener('resize', handleResize, false);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (ev: MouseEvent) => {
      mouseX = ev.pageX - window.innerWidth / 2;
      mouseY = ev.pageY - window.innerHeight / 2 - window.scrollY;
    };

    window.document.addEventListener('mousemove', handleMouseMove, false);

    const animate = () => {
      if (!stop) {
        requestAnimationFrame(animate);
      }
      tick();
    };

    const tick = () => {
      let t = time;
      if (cameraRef.current && sceneRef.current) {
        cameraRef.current.position.x += (x - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (-y - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(sceneRef.current.position);
      }

      for (let i = 0; i < X_CNT; ++i) {
        for (let j = 0; j < Y_CNT; ++j) {
          let dot = dots[i * X_CNT + j];
          if (dot) {
            dot.position.y = Math.sin((i + t) * 0.5) * 50 + Math.sin((j + t) * 0.5) * 50;
            dot.scale.x = dot.scale.y = Math.sin((i + t) * 0.3) * 4 + Math.sin((j + t) * 0.5) * 4 + 8;
          }
        }
      }

      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
      setTime(time + 0.1);
    };

    animate();

    return () => {
      window.document.removeEventListener('mousemove', handleMouseMove);
      setStop(true);
    };
  }, [stop, time]);

  useEffect(() => {
    setX(window.innerWidth / 2);
    setY(-window.innerHeight / 2);
    setTime(0);

    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    cameraRef.current.position.z = 1000;

    sceneRef.current = new THREE.Scene();

    const material = new THREE.SpriteMaterial({ color: theme.currentTheme === 'dark' ? 0xffffff : 0x000000 });

    for (let i = 0; i < X_CNT; ++i) {
      for (let j = 0; j < Y_CNT; ++j) {
        let dot = new THREE.Sprite(material);
        dot.position.x = (i - X_CNT / 2) * SCALE;
        dot.position.z = (j - Y_CNT / 2) * SCALE;
        dots.push(dot);

        if (sceneRef.current) {
          sceneRef.current.add(dot);
        }
      }
    }

    rendererRef.current = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, [theme]);

  return (
    <canvas
      key="slider-wave"
      ref={canvasRef}
      className="canvas-fade-in"
    />
  );
};

export default SliderWave;
