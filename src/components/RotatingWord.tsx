"use client";

import { useEffect, useState } from "react";

const words = ["subscriptions", "machines"];

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 200);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block text-[var(--accent)]"
      style={{
        animation: animating ? "rotate-word-out 200ms ease-in forwards" : "rotate-word-in 200ms ease-out forwards",
      }}
    >
      {words[index]}
    </span>
  );
}
