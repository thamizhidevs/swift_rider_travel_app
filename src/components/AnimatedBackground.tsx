
import { useState, useEffect } from 'react';
import { ParallaxBackground, GradientMorphBlob, FloatingElements, NoiseOverlay } from './animations';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  type?: 'parallax' | 'blob' | 'floating' | 'noise' | 'combined';
}

const AnimatedBackground = ({ 
  children, 
  type = 'combined' 
}: AnimatedBackgroundProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return <div className="min-h-screen">{children}</div>;
  
  switch (type) {
    case 'parallax':
      return <ParallaxBackground>{children}</ParallaxBackground>;
    case 'blob':
      return <GradientMorphBlob>{children}</GradientMorphBlob>;
    case 'floating':
      return <FloatingElements>{children}</FloatingElements>;
    case 'noise':
      return <NoiseOverlay>{children}</NoiseOverlay>;
    case 'combined':
    default:
      return (
        <GradientMorphBlob>
          <FloatingElements count={15}>
            <ParallaxBackground intensity={0.1}>
              <NoiseOverlay opacity={0.03}>
                {children}
              </NoiseOverlay>
            </ParallaxBackground>
          </FloatingElements>
        </GradientMorphBlob>
      );
  }
};

export default AnimatedBackground;
