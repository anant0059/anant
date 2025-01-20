'use client';
import { useState, useEffect } from 'react';

type Star = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  isBroken?: boolean;
};

type Shard = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  dx: number;
  dy: number;
};

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
};

export default function CreativeBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shards, setShards] = useState<Shard[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [brokenStarsCount, setBrokenStarsCount] = useState(0);
  const [isAllStarsBroken, setIsAllStarsBroken] = useState(false);
  const [cursorEffect, setCursorEffect] = useState(false);

  useEffect(() => {
    // Generate stars
    const numberOfStars = 100;
    const generatedStars: Star[] = Array.from({ length: numberOfStars }).map(() => ({
      cx: Math.random() * window.innerWidth,
      cy: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1, // Star size between 1px and 3px
      opacity: Math.random() * 0.5 + 0.5, // Random opacity
    }));

    setStars(generatedStars);
  }, []);

  useEffect(() => {
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate star breakage when the mouse is close to the star
    const triggerStarBreak = () => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          const distance = Math.hypot(star.cx - mousePosition.x, star.cy - mousePosition.y);
          if (distance < 50 && !star.isBroken) { // Trigger breakage if close to mouse
            const newShards: Shard[] = [];
            // Generate shards (particles)
            for (let i = 0; i < 10; i++) {
              newShards.push({
                cx: star.cx,
                cy: star.cy,
                r: Math.random() * 2 + 1,
                opacity: 1,
                dx: (Math.random() - 0.5) * 5, // Random speed in x direction
                dy: (Math.random() - 0.5) * 5, // Random speed in y direction
              });
            }
            setShards((prevShards) => [...prevShards, ...newShards]);
            setBrokenStarsCount((prevCount) => prevCount + 1); // Increase the count of broken stars
            return { ...star, isBroken: true }; // Mark as broken
          }
          return star;
        })
      );
    };

    // Trigger star break when mouse moves
    triggerStarBreak();
  }, [mousePosition]);

  useEffect(() => {
    // Check breakage thresholds for big effects
    if (brokenStarsCount >= stars.length * 0.5 && !isAllStarsBroken) {
      // Trigger 50% break effect
      console.log('50% stars broken - Medium explosion effect!');
      // Medium explosion effect
      document.body.style.backgroundColor = 'rgba(255, 165, 0, 0.1)'; // Light orange background
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 500); // Reset background after the effect
    }

    if (brokenStarsCount >= stars.length && !isAllStarsBroken) {
      // Trigger 100% break effect
      setIsAllStarsBroken(true);
      console.log('All stars broken - Massive explosion effect!');
      // Massive explosion effect
      document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Red background for massive explosion
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 1000); // Reset background after the effect

      // Enable cursor effect after all stars are broken
      setCursorEffect(true);
    }

    if (brokenStarsCount >= stars.length * 0.7 && !cursorEffect) {
      // Activate cursor effect when 70% stars are broken
      setCursorEffect(true);
    }
  }, [brokenStarsCount, stars.length, isAllStarsBroken, cursorEffect]);

  useEffect(() => {
    // Update shard positions and opacity to simulate the explosion fading
    const interval = setInterval(() => {
      setShards((prevShards) =>
        prevShards
          .map((shard) => ({
            ...shard,
            cx: shard.cx + shard.dx,
            cy: shard.cy + shard.dy,
            opacity: shard.opacity - 0.05, // Fade out over time
          }))
          .filter((shard) => shard.opacity > 0) // Remove invisible shards
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate constellations near the mouse
    const nearbyStars = stars.filter(
      (star) => Math.hypot(star.cx - mousePosition.x, star.cy - mousePosition.y) < 150
    );

    const generatedLines: Line[] = [];
    for (let i = 0; i < nearbyStars.length; i++) {
      for (let j = i + 1; j < nearbyStars.length; j++) {
        if (Math.random() > 0.8) {
          generatedLines.push({
            x1: nearbyStars[i].cx,
            y1: nearbyStars[i].cy,
            x2: nearbyStars[j].cx,
            y2: nearbyStars[j].cy,
            opacity: Math.random() * 0.5 + 0.5,
          });
        }
      }

      setLines(generatedLines);
    }
  }, [mousePosition, stars]);

  return (
    <div className="absolute inset-0 bg-black -z-10">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: 'screen' }}
      >
        {/* Stars */}
        <g>
          {stars.map((star, index) => (
            <circle
              key={index}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="white"
              opacity={star.opacity}
              className="twinkling"
            />
          ))}
        </g>

        {/* Star Shards (Explosion Effect) */}
        <g>
          {shards.map((shard, index) => (
            <circle
              key={index}
              cx={shard.cx}
              cy={shard.cy}
              r={shard.r}
              fill="cyan"
              opacity={shard.opacity}
            />
          ))}
        </g>

        {/* Constellations */}
        <g>
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="0.5"
              opacity={line.opacity}
            />
          ))}
        </g>
      </svg>

      {/* Cursor Light Effect */}
      {cursorEffect && (
        <div
          style={{
            position: 'fixed',
            top: mousePosition.y - 500,
            left: mousePosition.x - 500,
            width: 1000,
            height: 1000,
            background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(15, 54, 54, 0) 100%)',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            filter: 'blur(60px)',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        ></div>
      )}

      <style jsx>{`
        .twinkling {
          animation: twinkling 1.5s infinite alternate;
        }

        @keyframes twinkling {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
