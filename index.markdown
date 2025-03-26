---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Ruth Garbus
css: "/static/css/home.css"
---

 <canvas id="pastelCanvas"></canvas>
<script>
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const canvas = document.getElementById('pastelCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // More vibrant, design-forward color palette
    const colors = [
        'rgba(255, 60, 172, 0.15)',  // Hot pink
        'rgba(64, 223, 255, 0.15)',  // Cyan
        'rgba(255, 220, 0, 0.15)',   // Yellow
        'rgba(141, 0, 255, 0.15)',   // Electric purple
        'rgba(0, 255, 149, 0.15)'    // Mint
    ];
    // Performance optimization settings
    const MAX_DROPS = isMobile ? 100 : 300;  // Limit total particles
    const SPAWN_RATE = isMobile ? 1 : 3;   // Drops per frame
    const CLEANUP_THRESHOLD = isMobile ? 80 : 250; // When to start removing old particles
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    const drops = [];
    window.addEventListener('mousemove', (e) => {
        handlePointerMovement(e.clientX, e.clientY);
    });
    // Add touch support for mobile devices
    window.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling when touching the canvas
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            lastX = touch.clientX;
            lastY = touch.clientY;
            lastMoveTime = Date.now();
        }
    });
    window.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling when touching the canvas
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handlePointerMovement(touch.clientX, touch.clientY);
        }
    });
    window.addEventListener('touchend', (e) => {
        // Create a small burst of particles when touch ends
        if (drops.length < MAX_DROPS) {
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                drops.push(new VectorDrop(lastX, lastY, vx, vy));
            }
        }
    });
    // Unified function to handle both mouse and touch movement
    function handlePointerMovement(x, y) {
        const dx = x - lastX;
        const dy = y - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        // Create drops along the pointer movement
        const spacing = 5;
        const steps = Math.min(SPAWN_RATE, Math.floor(distance / spacing));
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const posX = lastX + dx * t;
            const posY = lastY + dy * t;
            // Base velocity on pointer movement
            const speed = Math.min(15, distance) * 0.2;
            const spreadAngle = angle + (Math.random() - 0.5) * Math.PI * 0.5;
            const vx = Math.cos(spreadAngle) * speed;
            const vy = Math.sin(spreadAngle) * speed;
            // Only add new drops if under the limit
            if (drops.length < MAX_DROPS) {
                drops.push(new VectorDrop(posX, posY, vx, vy));
            }
        }
        lastX = x;
        lastY = y;
        lastMoveTime = Date.now();
    }
    // Add gentle autonomous movement when mouse isn't moving
    let lastMoveTime = Date.now();
    let autoX = window.innerWidth / 2;
    let autoY = window.innerHeight / 2;
    function updateAutonomousPosition() {
        const now = Date.now();
        const timeSinceMove = now - lastMoveTime;
        if (timeSinceMove > 100) { // Start autonomous movement after 100ms of no mouse movement
            const time = now * 0.001;
            autoX = window.innerWidth * (0.3 + 0.4 * Math.sin(time * 0.3));
            autoY = window.innerHeight * (0.3 + 0.4 * Math.cos(time * 0.4));
            const dx = autoX - lastX;
            const dy = autoY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            // Create drops along the autonomous movement
            if (drops.length < MAX_DROPS) {
                const speed = Math.min(5, distance) * 0.1;
                const spreadAngle = angle + (Math.random() - 0.5) * Math.PI * 0.5;
                const vx = Math.cos(spreadAngle) * speed;
                const vy = Math.sin(spreadAngle) * speed;                
                drops.push(new VectorDrop(lastX, lastY, vx, vy));
            }
            lastX += dx * 0.05;
            lastY += dy * 0.05;
        }
    }
    function animate() {
        ctx.fillStyle = 'rgba(242,246,245, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Update autonomous movement
        updateAutonomousPosition();
        // Performance optimization: Remove oldest drops when over threshold
        if (drops.length > CLEANUP_THRESHOLD) {
            drops.splice(0, drops.length - CLEANUP_THRESHOLD);
        }
        // Update and draw drops
        for (let i = drops.length - 1; i >= 0; i--) {
            const drop = drops[i];
            if (!drop.update()) {
                drops.splice(i, 1);
                continue;
            }
            drop.draw();
        }
        requestAnimationFrame(animate);
    }
    // Update last move time on mouse movement
    canvas.addEventListener('mousemove', () => {
        lastMoveTime = Date.now();
    });
    // Make sure canvas resizes properly on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    animate();
    class VectorDrop {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.baseSize = 15 + Math.random() * 25;
            this.age = 0;
            this.maxAge = 300 + Math.random() * 200;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.shapeType = Math.random(); // Determines shape variation
            this.friction = 0.985;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            const size = this.baseSize * (1 - Math.pow(this.age / this.maxAge, 2));
            const alpha = Math.max(0, 1 - (this.age / this.maxAge));
            const color = this.color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
            // Create multiple layers for depth
            for (let i = 0; i < 3; i++) {
                const layerSize = size * (1 - i * 0.2);
                ctx.beginPath();
                if (this.shapeType < 0.33) {
                    // Geometric circle with slight distortion
                    const segments = 12;
                    for (let j = 0; j <= segments; j++) {
                        const angle = (j / segments) * Math.PI * 2;
                        const radius = layerSize * (1 + Math.sin(angle * 3 + this.age * 0.02) * 0.1);
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                } else if (this.shapeType < 0.66) {
                    // Sharp diamond shape
                    ctx.moveTo(0, -layerSize);
                    ctx.lineTo(layerSize * 0.7, 0);
                    ctx.lineTo(0, layerSize);
                    ctx.lineTo(-layerSize * 0.7, 0);
                } else {
                    // Rounded square
                    const cornerRadius = layerSize * 0.2;
                    this.roundedRect(ctx, -layerSize/2, -layerSize/2, layerSize, layerSize, cornerRadius);
                }
                ctx.closePath();
                // Create gradient with sharp edges
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerSize);
                gradient.addColorStop(0, color);
                gradient.addColorStop(0.7, color);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            ctx.restore();
        }
        roundedRect(ctx, x, y, width, height, radius) {
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        }
        update() {
            this.age++;
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.rotation += this.rotationSpeed;
            return this.age < this.maxAge;
        }
    }
</script>
<nav>
    <ul>
        <li class="collection-item-3 w-dyn-item">
            <a href="/releases" class="tag-link w-inline-block">
                <div class="tag-big">
                    <div style="background-color: #7168d5" class="tag-color-big"></div>
                    <div class="button-text">Releases</div>
                </div>
            </a>
        </li>
        <li class="collection-item-3 w-dyn-item">
            <a href="/performances" class="tag-link w-inline-block">
                <div class="tag-big">
                    <div style="background-color: #ffa9e2" class="tag-color-big"></div>
                    <div class="button-text">Performances</div>
                </div>
            </a>
        </li>
                <li class="collection-item-3 w-dyn-item">
            <a href="/works" class="tag-link w-inline-block">
                <div class="tag-big">
                    <div style="background-color: #f9f66b" class="tag-color-big"></div>
                    <div class="button-text">Other</div>
                </div>
            </a>
        </li>
        <li class="collection-item-3 w-dyn-item">
            <a href="/about" class="tag-link w-inline-block">
                <div class="tag-big">
                    <div style="background-color: #009f82" class="tag-color-big"></div>
                    <div class="button-text">Bio/Press Kit</div>
                </div>
            </a>
        </li>
        <li class="collection-item-3 w-dyn-item">
            <a href="/inquiry" class="tag-link w-inline-block">
                <div class="tag-big">
                    <div style="background-color: #e8963f" class="tag-color-big"></div>
                    <div class="button-text">Contact</div>
                </div>
            </a>
        </li>
    </ul>
</nav>