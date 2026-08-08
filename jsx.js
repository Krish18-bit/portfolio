const hero = document.getElementById('hero');
        const bgLayer = document.getElementById('bgLayer');
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            bgLayer.style.webkitMaskImage = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
            bgLayer.style.maskImage = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
        });

        hero.addEventListener('mouseleave', () => {
            const transparentMask = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)';
            bgLayer.style.webkitMaskImage = transparentMask;
            bgLayer.style.maskImage = transparentMask;
        });