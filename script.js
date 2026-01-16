// Waitlist form handling
const waitlistForm = document.getElementById('waitlistForm');
const emailInput = document.getElementById('emailInput');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        return;
    }
    
    // Add loading state
    const submitBtn = waitlistForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.setAttribute('data-original-text', originalText);
    submitBtn.innerHTML = 'Joining...';
    submitBtn.disabled = true;
    
    // Google Sheets API call via Google Apps Script
    // Use hidden iframe approach to avoid CORS issues
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-Cj7BuLZhAh7KH_vW4Bz6I9p-CQuc2cbN5nEzDqwKQcuGY6XBVK5A1yPbffoIPwdKDw/exec';
    
    // Create a hidden form and iframe to submit data
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe-' + Date.now();
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SCRIPT_URL;
    form.target = iframe.name;
    form.style.display = 'none';
    
    const hiddenEmailInput = document.createElement('input');
    hiddenEmailInput.type = 'hidden';
    hiddenEmailInput.name = 'email';
    hiddenEmailInput.value = email;
    form.appendChild(hiddenEmailInput);
    
    document.body.appendChild(form);
    
    // Handle iframe load (success)
    iframe.onload = function() {
        // Success feedback
        submitBtn.innerHTML = '✓ Joined!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        emailInput.value = '';
        
        console.log('Successfully joined waitlist:', email);
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
        }, 1000);
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    };
    
    // Submit the form
    form.submit();
    
    // Fallback: show success after a short delay (in case iframe doesn't fire onload)
    setTimeout(() => {
        if (submitBtn.innerHTML === 'Joining...') {
            submitBtn.innerHTML = '✓ Joined!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }, 2000);
});

// Add some subtle interactive effects
emailInput.addEventListener('focus', () => {
    const glassCard = document.querySelector('.glass-card');
    glassCard.style.transform = 'scale(1.01)';
    glassCard.style.transition = 'transform 0.3s ease';
});

emailInput.addEventListener('blur', () => {
    const glassCard = document.querySelector('.glass-card');
    glassCard.style.transform = 'scale(1)';
});

// Listen for messages from Google Apps Script iframe
window.addEventListener('message', function(event) {
    // Verify origin for security (optional but recommended)
    if (event.origin.includes('script.google.com')) {
        const result = event.data;
        const submitBtn = document.querySelector('.submit-btn');
        const emailInput = document.getElementById('emailInput');
        
        if (result.success) {
            submitBtn.innerHTML = '✓ Joined!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Join waitlist';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            submitBtn.innerHTML = result.message || 'Try again';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Join waitlist';
            }, 2000);
        }
    }
});

// Header button navigation
const joinWaitlistBtn = document.querySelector('.btn-join-waitlist');
const contactUsBtn = document.querySelector('.btn-contact-us');

if (joinWaitlistBtn) {
    joinWaitlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

if (contactUsBtn) {
    contactUsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Particle system
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = 100;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-4px
        const size = Math.random() * 2 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration (8-15 seconds) - faster for more movement
        const duration = Math.random() * 7 + 8;
        particle.style.animationDuration = duration + 's';
        
        // No delay - start immediately
        particle.style.animationDelay = '0s';
        
        // Start animation at a random point in the cycle for variety
        const randomStart = Math.random() * 100;
        particle.style.animationDelay = `-${randomStart * duration / 100}s`;
        
        container.appendChild(particle);
        particles.push(particle);
    }
}

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Recreate particles on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('particlesContainer');
        if (container) {
            container.innerHTML = '';
            createParticles();
        }
    }, 250);
});
