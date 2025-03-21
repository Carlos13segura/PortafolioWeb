// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it to console
        console.log({
            name,
            email,
            subject,
            message
        });
        
        // Show success message (in a real application)
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add animation to skill bars on scroll
const animateSkillBars = () => {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;
    
    const progressBars = skillSection.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('aria-valuenow') + '%';
                    
                    // Reset width first
                    bar.style.width = '0%';
                    
                    // Animate after a small delay
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease-in-out';
                        bar.style.width = width;
                    }, 200);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillSection);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
});

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    let formData = new FormData(this);

    try {
        let response = await fetch("send_mail.php", {
            method: "POST",
            body: formData,
        });

        let result = await response.text();
        document.getElementById("responseMessage").innerText = result;
    } catch (error) {
        document.getElementById("responseMessage").innerText = "Error al enviar el mensaje.";
    }
});