'use client';

import { useState, useEffect, useRef } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: string[];
  price: string;
}

export default function ProductShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 'raspberry-pi',
      name: 'Raspberry Pi 4 (8GB)',
      description: 'NEXUS OS 중앙 제어 시스템',
      image: '🖥️',
      specs: ['8GB RAM', 'ARM Cortex-A72', 'WiFi 6', 'Bluetooth 5.0'],
      price: '₩85,000'
    },
    {
      id: 'rfid-reader',
      name: 'RC522 RFID Reader',
      description: '블록체인 검증 스캐너',
      image: '📡',
      specs: ['13.56MHz', 'SPI 인터페이스', '5cm 범위', '초당 100회 스캔'],
      price: '₩5,200'
    },
    {
      id: 'rfid-tags',
      name: 'RFID Tags (10,000개)',
      description: '100% 추적 가능 태그',
      image: '🏷️',
      specs: ['NFC Type 2', '방수 코팅', '10년 수명', '블록체인 연동'],
      price: '₩1,800,000'
    }
  ];

  // Apple-style scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current) return;
      
      const element = showcaseRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        )
      );
      
      setScrollProgress(progress);
      
      // Update active product based on scroll
      const productIndex = Math.floor(progress * products.length);
      setActiveProduct(Math.min(productIndex, products.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  return (
    <div ref={showcaseRef} className="relative min-h-screen py-24">
      <div className="container-premium">
        {/* Title */}
        <div className="text-center mb-20 scroll-fade visible">
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-primary">하드웨어</span>
            <br />
            <span className="text-foreground">투자 ₩2.1M</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Tesla Factory 수준의 자동화를 위한 프리미엄 하드웨어 솔루션
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => {
            const isActive = index === activeProduct;
            const scale = isActive ? 1.05 : 0.95;
            const opacity = isActive ? 1 : 0.6;

            return (
              <div
                key={product.id}
                className="product-showcase cursor-pointer"
                onClick={() => setActiveProduct(index)}
                style={{
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: `scale(${scale})`,
                  opacity
                }}
              >
                <div className="product-3d card-stripe">
                  {/* Product Icon */}
                  <div className="text-8xl mb-6 text-center">
                    {product.image}
                  </div>

                  {/* Product Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-gradient-primary">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground-secondary mb-4">
                      {product.description}
                    </p>
                    <div className="text-3xl font-bold text-accent-gold">
                      {product.price}
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2">
                    {product.specs.map((spec, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-primary-600">
                      <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      <span>선택됨</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-center gap-4">
          <div className="text-sm text-foreground-tertiary">스크롤 진행도</div>
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="text-sm font-semibold text-primary-600">
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        {/* Total Investment */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-gold/10 border border-primary-500/20">
            <div className="text-sm text-foreground-secondary mb-2">총 투자 금액</div>
            <div className="text-5xl font-bold text-gradient-accent mb-2">
              ₩2,100,000
            </div>
            <div className="text-sm text-success font-semibold">
              ✓ ROI: <1개월 (₩2.4M/월 절감)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
