'use client';

import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';

type KineticTextProps = {
    children: string;
    className?: string;
};

export function KineticText({ children, className = '' }: KineticTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Velocity-based skew
    const skewY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);
    const smoothSkew = useSpring(skewY, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            style={{
                skewY: smoothSkew,
            }}
            className={`${className} mix-blend-difference`}
        >
            {children}
        </motion.div>
    );
}

