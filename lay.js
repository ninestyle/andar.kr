/*
    Version: Express 4.0
    Last Modified: 2025-12-11 20:10 (KST)
    File Name: lay.js
    Project Name: ANDAR
    Theme: ANDAR - Aroma & Spa
*/

const siteConfig = {
    // ------------------------------------------------
    // 1. [Tier 1] Core Essentials
    // ------------------------------------------------
    language: 'ko',
    theme_color: '#5A7D7C', // Andar Accent Color (Muted Teal)
    
    // [API Strategy] Demo Mode Active
    demo_mode: true,

    // ------------------------------------------------
    // 2. [Tier 2] Visual Engine & Canvas
    // ------------------------------------------------
    canvas_target: '#home',
    
    // Custom Effect (Fireflies for Spa vibe)
    canvas_effect: 'fireflyEffect',
    
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
        { name: 'Location', icon: 'location_on', url: '#location' },
        { name: 'Reservation', icon: 'calendar_month', url: '#demo' }
    ],
    scroll_smooth: true
};

// [Tier 3] Custom Effect: Fireflies (Calm & Natural)
const fireflyEffect = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    flies: [],
    animationFrameId: null,

    init(container) {
        this.container = container;
        this.canvas = container.querySelector('.ex-canvas__effect');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'ex-canvas__effect';
            container.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');
        
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        
        window.addEventListener('resize', this.resize);
        this.resize();
        this.createFlies();
        this.animate();
    },

    resize() {
        if (!this.container) return;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    createFlies() {
        const count = 50;
        this.flies = [];
        for (let i = 0; i < count; i++) {
            this.flies.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                alpha: Math.random(),
                fading: Math.random() > 0.5
            });
        }
    },

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.flies.forEach(fly => {
            fly.x += fly.speedX;
            fly.y += fly.speedY;

            // Bounce off edges gently
            if (fly.x < 0 || fly.x > this.width) fly.speedX *= -1;
            if (fly.y < 0 || fly.y > this.height) fly.speedY *= -1;

            // Twinkle effect
            if (fly.fading) {
                fly.alpha -= 0.01;
                if (fly.alpha <= 0.2) fly.fading = false;
            } else {
                fly.alpha += 0.01;
                if (fly.alpha >= 0.8) fly.fading = true;
            }

            this.ctx.beginPath();
            this.ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 200, ${fly.alpha})`; // Warm soft yellow
            this.ctx.fill();
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    }
};

// [Tier 3] V4 Initialization Pattern
document.addEventListener('DOMContentLoaded', () => {
    if (typeof PE_V4 !== 'undefined') {
        // Initialize Engine first
        PE_V4.init(siteConfig).then(engine => {
            // Then register effect securely
            engine.registerEffect('fireflyEffect', fireflyEffect);
        });
    }
});