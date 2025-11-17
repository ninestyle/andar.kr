/*
    Version: 2.2.0
    Last Modified: 2025-11-17
    Author: Maxim
    License: © 2025 Maxim. All Rights Reserved.
*/

const siteConfig = {
    canvas_effect: 'starsEffect',
    canvas_image_type: 'cover',
    canvas_image_count: 3,
    canvas_image_format: 'jpg',
    canvas_indicators: true,
    canvas_overlay: 'dotted',

    icon_buttons: [
        { name: 'Profile', icon: 'mail', url: '#profile' }
    ],

    TURNSTILE_SITE_KEY: '0x4AAAAAACBUaQ2J0vXkPSAt'
};

const starsEffect = {
    canvas: null,
    ctx: null,
    animationFrameId: null,
    stars: [],
    headerElement: null,
    boundHandleResize: null,

    init: function(headerEl) {
        this.headerElement = headerEl;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'ce-bg-canvas';
        this.canvas.style.mixBlendMode = 'screen';
        this.ctx = this.canvas.getContext('2d');
        this.headerElement.prepend(this.canvas);

        this.boundHandleResize = this.handleResize.bind(this);

        this.resizeCanvas();
        this.initStars();
        this.animateStars();
        
        window.addEventListener('resize', this.boundHandleResize);
    },

    destroy: function() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.boundHandleResize);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    },

    handleResize: function() {
        this.resizeCanvas();
        this.initStars();
    },

    resizeCanvas: function() {
        if (!this.headerElement || !this.canvas || !this.ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = this.headerElement.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
    },

    initStars: function() {
        if (!this.canvas) return;
        this.stars = [];
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        const starCount = Math.floor((w * h) / 10000);
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 2 + 0.5,
                alpha: 0.5 + Math.random() * 0.4,
                speed: Math.random() * 0.2 + 0.05
            });
        }
    },

    animateStars: function() {
        if (!this.ctx || !this.canvas) return;
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        this.ctx.clearRect(0, 0, w, h);
        
        this.stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = h;
                star.x = Math.random() * w;
            }
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this.ctx.fill();
        });
        
        this.animationFrameId = requestAnimationFrame(this.animateStars.bind(this));
    }
};


document.addEventListener('DOMContentLoaded', () => {
    PE_V2.registerEffect('starsEffect', starsEffect);
    PE_V2.init(siteConfig);
});