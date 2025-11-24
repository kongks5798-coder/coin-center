'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
}

export default function Counter({ 
    value, 
    suffix = '', 
    prefix = '',
    decimals = 0,
    duration = 2,
    className = ''
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    
    const spring = useSpring(0, {
        stiffness: 100,
        damping: 30
    });

    const display = useTransform(spring, (current) => {
        return current.toFixed(decimals);
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    // 숫자 포맷팅 (천 단위 콤마)
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(decimals) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(decimals) + 'K';
        }
        return num.toFixed(decimals);
    };

    // 값이 큰 경우 포맷팅 적용
    const shouldFormat = value >= 1000;
    const formattedValue = shouldFormat ? formatNumber(value) : value.toFixed(decimals);

    return (
        <motion.span
            ref={ref}
            className={className}
        >
            {prefix}
            {shouldFormat ? (
                <motion.span>
                    {formattedValue}
                </motion.span>
            ) : (
                <motion.span>
                    {display}
                </motion.span>
            )}
            {suffix}
        </motion.span>
    );
}

