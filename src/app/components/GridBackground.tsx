'use client';
import { useState, useEffect, useRef } from 'react';

type Dot = {
  cx: string;
  cy: string;
  r: string;
};

type Line = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

type DynamicPoint = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
};

export default function GridBackground() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dots, setDots] = useState<Dot[]>([]);
  const [tinyDots, setTinyDots] = useState<Dot[]>([]);
  const [dynamicPoints, setDynamicPoints] = useState<DynamicPoint[]>([]);
  const staticLines = useRef<Line[]>([]); // Ref to hold static lines

  useEffect(() => {
    const numberOfDots = 10; // Medium dots
    const numberOfTinyDots = 50; // Tiny dots

    const generatedDots: Dot[] = Array.from({ length: numberOfDots }).map(() => ({
      cx: `${Math.random() * 100}%`,
      cy: `${Math.random() * 100}%`,
      r: '3px',
    }));

    const generatedTinyDots: Dot[] = Array.from({ length: numberOfTinyDots }).map(() => ({
      cx: `${Math.random() * 100}%`,
      cy: `${Math.random() * 100}%`,
      r: '1px',
    }));

    setDots(generatedDots);
    setTinyDots(generatedTinyDots);

    if (staticLines.current.length === 0) {
      staticLines.current = Array.from({ length: 5 }).map(() => ({
        x1: `${Math.random() * 100}%`,
        y1: `${Math.random() * 100}%`,
        x2: `${Math.random() * 100}%`,
        y2: `${Math.random() * 100}%`,
      }));
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      setDynamicPoints((prevPoints) => {
        const newPoint: DynamicPoint = {
          cx: e.clientX + (Math.random() * 20 - 10),
          cy: e.clientY + (Math.random() * 20 - 10),
          r: Math.random() * 2 + 1,
          opacity: 1,
        };

        return [...prevPoints.slice(-30), newPoint];
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicPoints((prevPoints) =>
        prevPoints
          .map((point) => ({ ...point, opacity: point.opacity - 0.05 }))
          .filter((point) => point.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 ai-background -z-10" />

      <div
        className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0.9))`,
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{ mixBlendMode: 'overlay' }}
        >
          <g fill="none" className="ai-line">
            {staticLines.current.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#00f9ff"
                strokeWidth="1"
              />
            ))}
          </g>

          <g>
            {dots.map((dot, index) => (
              <circle
                key={index}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                className="ai-node"
              />
            ))}
          </g>

          <g>
            {tinyDots.map((dot, index) => (
              <circle
                key={index}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#00f9ff"
                opacity="0.5"
              />
            ))}
          </g>

          <g>
            {dynamicPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.cx}
                cy={point.cy}
                r={point.r}
                fill="#00f9ff"
                opacity={point.opacity}
              />
            ))}
          </g>
        </svg>
      </div>

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
