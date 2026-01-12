document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');

    // screen update
    function updateUI() {
        const user = localStorage.getItem('user_name');
        if (user) {
            loginText.textContent = user;
            // border update login succeed
            loginBtn.classList.add('border-green-500');
        } else {
            loginText.textContent = 'Login';
            loginBtn.classList.remove('border-green-500');
        }
    }

    // login & logout function
    updateUI();

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const currentUser = localStorage.getItem('user_name');
            
            if (currentUser) {
                if (confirm(`คุณต้องการออกจากระบบใช่หรือไม่? (${currentUser})`)) {
                    localStorage.removeItem('user_name');
                    updateUI();
                }
            } else {
                const name = prompt('กรุณากรอกชื่อของคุณเพื่อเข้าสู่ระบบ :');
                if (name && name.trim()) {
                    // chek language
                    if (/^[a-zA-Z\s]+$/.test(name)) {
                        localStorage.setItem('user_name', name.trim());
                        updateUI();
                    } else {
                        alert('กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น');
                    }
                }
            }
        });
    }

    // picSlid
    const slider = document.getElementById('slider');
    if (slider) {
        setInterval(() => {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            }
        }, 3500);
    }

    // Background Animation (Twinkling Stars)
    let canvas = document.getElementById('tech-bg');
    
    // Auto-inject canvas if not present (for other pages)
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'tech-bg';
        canvas.className = 'fixed top-0 left-0 w-full h-full -z-10 opacity-60';
        document.body.prepend(canvas);
    }

    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 8 + 4; // Size 4-12
                this.opacity = Math.random() * 0.5 + 0.1;
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
                this.speedX = (Math.random() - 0.5) * 0.3; // Slow movement
                this.speedY = (Math.random() - 0.5) * 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Twinkle effect
                this.opacity += this.twinkleSpeed * this.twinkleDir;
                if (this.opacity >= 0.7 || this.opacity <= 0.1) {
                    this.twinkleDir = -this.twinkleDir;
                }

                // Wrap around screen
                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#1DCD9F'; 

                ctx.beginPath();
                // Draw 4-pointed star (Diamond/Sparkle shape)
                ctx.moveTo(0, -this.size);
                ctx.quadraticCurveTo(0, 0, this.size, 0);
                ctx.quadraticCurveTo(0, 0, 0, this.size);
                ctx.quadraticCurveTo(0, 0, -this.size, 0);
                ctx.quadraticCurveTo(0, 0, 0, -this.size);
                ctx.fill();
                ctx.restore();
            }
        }

        const stars = [];
        for (let i = 0; i < 40; i++) {
            stars.push(new Star());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});