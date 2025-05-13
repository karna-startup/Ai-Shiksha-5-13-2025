
import React, { useEffect, useRef } from 'react';
import { Flower, Star } from 'lucide-react';

interface AnimatedBackgroundProps {
  numberOfElements?: number;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  numberOfElements = 20,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing elements
    const existingElements = container.querySelectorAll('.star, .flower');
    existingElements.forEach(element => element.remove());

    // Create stars and flowers
    for (let i = 0; i < numberOfElements; i++) {
      const isSmall = Math.random() > 0.7;
      const isFlower = Math.random() > 0.8; // 20% chance to be a flower

      const element = document.createElement('div');
      element.className = isFlower ? 'flower' : 'star';

      // Random size
      const size = isFlower 
        ? Math.floor(Math.random() * 15) + 20  // Flowers: 20-35px
        : isSmall 
          ? Math.floor(Math.random() * 10) + 5  // Small stars: 5-15px
          : Math.floor(Math.random() * 15) + 15; // Large stars: 15-30px

      element.style.width = `${size}px`;
      element.style.height = `${size}px`;

      // Random position across full viewport
      const left = Math.floor(Math.random() * window.innerWidth);
      const top = isFlower ? -size : Math.floor(Math.random() * window.innerHeight);
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;

      // Add random opacity
      element.style.opacity = (Math.random() * 0.5 + 0.3).toString(); // 0.3 to 0.8

      // Add random animation delay
      element.style.animationDelay = `${Math.random() * 5}s`;

      // Add random color from our color palette for stars
      if (!isFlower) {
        const colors = [
          '#9b87f5', // Primary Purple
          '#7E69AB', // Secondary Purple
          '#D6BCFA', // Light Purple
          '#FEF7CD', // Soft Yellow
          '#FEC6A1', // Soft Orange
          '#8B5CF6', // Vivid Purple
          '#D946EF', // Magenta Pink
          '#0EA5E9', // Ocean Blue
          '#1EAEDB', // Bright Blue
          '#33C3F0'  // Sky Blue
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        element.style.color = color;
      }

      // For flowers, set falling animation
      if (isFlower) {
        // Set random fall duration between 10-20 seconds
        const fallDuration = Math.random() * 10 + 10;
        element.style.setProperty('--fall-duration', `${fallDuration}s`);
        element.classList.add('falling');

        // Add slight rotation swing
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        element.style.setProperty('--rotation-direction', rotationDirection.toString());
      } else {
        element.classList.add('twinkling');
      }

      // Create the SVG element for the flower or star
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("fill", "none");
      svgElement.setAttribute("stroke", "currentColor");
      svgElement.setAttribute("stroke-width", "2");
      svgElement.setAttribute("stroke-linecap", "round");
      svgElement.setAttribute("stroke-linejoin", "round");

      if (isFlower) {
        // Flower path from Lucide Flower icon
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 1-4.5-4.5M16.5 12H15m-3 0a3 3 0 1 1 0-.001");
        svgElement.appendChild(path);
      } else {
        // Star path from Lucide Star icon
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2");
        svgElement.appendChild(polygon);
      }

      element.appendChild(svgElement);
      container.appendChild(element);
    }
  }, [numberOfElements]);

  return (
    <div 
      ref={containerRef} 
      aria-hidden="true" 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    >
      <div className="circuit-overlay absolute inset-0"></div>
    </div>
  );
};

export default AnimatedBackground;
