import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
  themeVariables: {
    darkMode: true,
    primaryColor: '#c41e3a',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#c41e3a',
    lineColor: '#525252',
    secondaryColor: '#171717',
    tertiaryColor: '#0a0a0a',
    fontSize: '16px',
    nodeSpacing: 160,
    rankSpacing: 120,
  },
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis',
    padding: 20,
  },
});

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (ref.current) {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        try {
          const { svg } = await mermaid.render(id, chart);
          ref.current.innerHTML = svg;
          
          // Force SVG to be responsive
          const svgElement = ref.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.maxWidth = '100%';
          }
        } catch (error) {
          console.error('Mermaid render error:', error);
          ref.current.innerHTML = `<pre class="text-red-500 text-xs p-4">${error}</pre>`;
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="mermaid-container w-full my-12 group">
      <div 
        ref={ref} 
        className="w-full bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-16 group-hover:border-white/10 transition-all duration-500 shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-visible flex justify-center"
      />
    </div>
  );
};

export default Mermaid;
