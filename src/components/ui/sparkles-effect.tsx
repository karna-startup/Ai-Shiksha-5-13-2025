
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

const Sparkle: React.FC<SparkleProps> = ({ size, color, style }) => {
  return (
    <span
      className="absolute block animate-fade-out"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        transformOrigin: 'center',
        animation: 'sparkle 700ms forwards',
        ...style,
      }}
    />
  );
};

interface SparklesProps {
  className?: string;
  children: React.ReactNode;
}

export const Sparkles: React.FC<SparklesProps> = ({ className, children }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; color: string; size: number; style: React.CSSProperties }>>([]);
  const spanRef = useRef<HTMLSpanElement>(null);
  const colors = ["#FFD700", "#FFC0CB", "#00BFFF", "#7FFFD4", "#FF69B4"];
  const generatedSparklesCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!spanRef.current) return;
      
      const rect = spanRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
      const getRandomSize = () => Math.random() * 5 + 3; // 3-8px
      const getRandomPosition = () => ({
        left: Math.random() * width,
        top: Math.random() * height,
      });

      generatedSparklesCount.current += 1;
      const newSparkle = {
        id: generatedSparklesCount.current,
        color: getRandomColor(),
        size: getRandomSize(),
        style: { ...getRandomPosition(), zIndex: 2 }
      };

      setSparkles(sparkles => [...sparkles, newSparkle]);

      // Remove sparkle after animation completes
      setTimeout(() => {
        setSparkles(sparkles => sparkles.filter(s => s.id !== newSparkle.id));
      }, 700);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={spanRef} className={cn("relative inline-block", className)}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className="relative z-1" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
};
