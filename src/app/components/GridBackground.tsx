'use client'
import { useState, useEffect } from 'react';

export default function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Dark AI Background */}
      <div className="fixed inset-0 ai-background -z-10" />

      {/* Brain/Neural Network-like Effect */}
      <div
        className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0.9))`,
        }}
      >
        <svg
          width="100%"
          height="100%"
          // viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{ mixBlendMode: 'overlay' }}
        >
          {/* Neural Network-like Connections */}
          <g fill="none" className="ai-line">
            {/* Adjusted to fewer lines in a grid-like or circuit formation */}
            <line x1="10%" y1="10%" x2="80%" y2="20%" />
            <line x1="20%" y1="20%" x2="50%" y2="40%" />
            <line x1="60%" y1="30%" x2="30%" y2="60%" />
            <line x1="40%" y1="50%" x2="70%" y2="70%" />
            <line x1="50%" y1="50%" x2="90%" y2="80%" />
            {/* More controlled lines */}
          </g>

          {/* Glowing dots for neural network nodes */}
          <g>
            {Array.from({ length: 5 }).map((_, index) => (
              <circle
                key={index}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={`${Math.random() * 4 + 6}px`} // Slightly bigger nodes
                className="ai-node"
                style={{
                  animation: `pulse ${Math.random() * 3 + 1}s ease-in-out infinite`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Focus/Processing Mask */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />
    </>
  );
}
