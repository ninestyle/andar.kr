/*
    Version: 3.0.0 (V3 Refactored)
    Framework: User Configuration (Tier 3)
    Last Modified: 2025-11-23
    Author: Maxim
    Theme: ANDAR - Aroma & Spa
*/

const siteConfig = {
    // [기본 설정]
    language: 'ko',

    // [캔버스 헤더 설정]
    canvas_effect: 'starsEffect',
    canvas_image_type: 'cover',
    canvas_image_path: './section/home/',
    canvas_image_count: 3,
    canvas_image_format: 'jpg',
    canvas_image_slide: 10,
    canvas_indicators: true,
    canvas_overlay: 'dotted',

    // [아이콘 버튼] Profile 및 Request 섹션 연결
    icon_buttons: [
        { name: 'Profile', icon: 'mail', url: '#profile' },
        { name: 'Request', icon: 'auto_awesome', url: '#request' }
    ]
    
    // [API 설정] Demo Mode이므로 API Path 및 Turnstile Key 불필요
};

// [커스텀 이펙트] 별 내리는 효과 (V3 Migration)
const starsEffect = {
    init: (headerElement) => {
        const canvas = document.createElement('canvas');
        canvas.id = 'ce-bg-canvas';
        canvas.style.mixBlendMode = 'screen';
        headerElement.prepend(canvas);

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = headerElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        const initStars = () => {
            stars = [];
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);
            const starCount = Math.floor((w * h) / 10000);
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    radius: Math.random() * 2 + 0.5,
                    alpha: 0.5 + Math.random() * 0.4,
                    speed: Math.random() * 0.2 + 0.05
                });
            }
        };

        const animateStars = () => {
            if (!ctx) return;
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, w, h);
            
            stars.forEach(star => {
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = h;
                    star.x = Math.random() * w;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });
            
            animationFrameId = requestAnimationFrame(animateStars);
        };

        const handleResize = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            resizeCanvas();
            initStars();
            animateStars();
        };

        resizeCanvas();
        initStars();
        animateStars();
        window.addEventListener('resize', handleResize);
    }
};

// V3 Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (typeof PE_V3 !== 'undefined') {
        PE_V3.registerEffect('starsEffect', starsEffect);
        PE_V3.init(siteConfig);
    } else {
        console.error("Page Express V3 libraries not loaded.");
    }
});