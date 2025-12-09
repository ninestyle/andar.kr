/*
    Version: Express 4.0
    Last Modified: 2025-12-09 18:30 (KST)
    File Name: lay.js
    Project Name: ANDAR
    Theme: ANDAR - Aroma & Spa
*/

const siteConfig = {
    // ------------------------------------------------
    // 1. [Tier 1] Core Essentials
    // ------------------------------------------------
    language: 'ko',
    theme_color: '#5A7D7C', // Andar Accent Color
    
    // [API Strategy] Demo Mode Active
    demo_mode: true,

    // ------------------------------------------------
    // 2. [Tier 2] Visual Engine & Canvas
    // ------------------------------------------------
    canvas_target: '#home',
    canvas_mode: 'lite',
    
    // Custom Effect Injection (Defined below)
    canvas_effect: 'starsEffect',
    
    // Canvas Options
    canvas_overlay: 'dotted',
    canvas_image_type: 'cover',
    canvas_image_count: 3,
    canvas_image_slide: 10,
    canvas_image_path: './section/home/',
    canvas_image_format: 'jpg',

    // ------------------------------------------------
    // 3. [Tier 2] Interaction & Dynamics
    // ------------------------------------------------
    icon_buttons: [
        { name: 'Profile', icon: 'mail', url: '#profile' },
        { name: 'Request', icon: 'auto_awesome', url: '#demo' }
    ],

    scroll_smooth: true,
    nav_active_class: 'active'
};

// [Custom Effect] Stars Effect (Migrated from V3)
const starsEffect = {
    init: (headerElement) => {
        const canvas = document.createElement('canvas');
        canvas.id = 'ce-bg-canvas';
        canvas.style.mixBlendMode = 'screen';
        
        // V4: Ensure canvas is absolutely positioned within the container
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1'; // Above Image, Below Content

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

// V4 Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (typeof PE_V4 !== 'undefined') {
        // Register custom effect before init
        PE_V4.init(siteConfig).then(engine => {
             engine.registerEffect('starsEffect', starsEffect.init);
        });
    } else {
        console.error("Express V4 Libraries not loaded.");
    }
});