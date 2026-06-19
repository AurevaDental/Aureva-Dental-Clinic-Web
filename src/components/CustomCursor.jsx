import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configurations: stiffness: 150, damping: 20
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it is a touch device or mobile screen
    const checkTouchDevice = () => {
      const isTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };

    checkTouchDevice();

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return; // Disable on touch screen
    }

    const moveCursor = (e) => {
      // Offset by half of cursor size (e.g. 16px for a 32px diameter circle)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Scaling micro-interaction on hover over interactive tags
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button';
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render cursor on mobile/touch screens or if hidden
  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-japandi-charcoal/40 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovered ? 1.6 : 1,
        backgroundColor: isHovered ? 'rgba(74, 87, 78, 0.15)' : 'rgba(212, 201, 187, 0.1)',
        transition: 'scale 0.25s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease',
      }}
    />
  );
}
