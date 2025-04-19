// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear()

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop")

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show")
  } else {
    scrollToTopBtn.classList.remove("show")
  }
})

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        document.querySelector(".navbar-toggler").click()
      }
    }
  })
})

// Form submission with validation
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Basic validation
    if (!name || !email || !subject || !message) {
      showFormMessage("Por favor completa todos los campos", "error")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showFormMessage("Por favor ingresa un email válido", "error")
      return
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalBtnText = submitBtn.innerHTML
    submitBtn.disabled = true
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...'

    // Here you would typically send the form data to a server
    // For demonstration, we'll use EmailJS
    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    }

    // Simulate sending (replace with actual EmailJS call)
    setTimeout(() => {
      // Success scenario
      showFormMessage("¡Mensaje enviado con éxito! Te contactaré pronto.", "success")

      // Reset form and button
      contactForm.reset()
      submitBtn.disabled = false
      submitBtn.innerHTML = originalBtnText
    }, 1500)
  })
}

// Helper function to show form messages
function showFormMessage(message, type) {
  const responseEl = document.getElementById("responseMessage")
  responseEl.innerText = message
  responseEl.className = type === "success" ? "text-success mt-3" : "text-danger mt-3"

  // Clear message after 5 seconds
  setTimeout(() => {
    responseEl.innerText = ""
    responseEl.className = ""
  }, 5000)
}

// Add animation to skill bars on scroll
const animateSkillBars = () => {
  const skillSection = document.getElementById("skills")
  if (!skillSection) return

  const progressBars = skillSection.querySelectorAll(".progress-bar")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute("aria-valuenow") + "%"

            // Reset width first
            bar.style.width = "0%"

            // Animate after a small delay
            setTimeout(() => {
              bar.style.transition = "width 1s ease-in-out"
              bar.style.width = width
            }, 200)
          })

          // Unobserve after animation
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  observer.observe(skillSection)
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateSkillBars()

  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init("Y641OwDIqqHyJn4la")
  }

  // Initialize skill carousel with auto-rotation
  const skillsCarousel = document.getElementById("skillsCarousel")
  if (skillsCarousel) {
    const carousel = new bootstrap.Carousel(skillsCarousel, {
      interval: 2000,
      touch: true,
    })
  }

  // Add current year to footer
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Add lazy loading to images
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
  })
})

// Handle contact form submission with EmailJS
document.getElementById("contactForm")?.addEventListener("submit", function (event) {
  event.preventDefault()

  const submitBtn = this.querySelector('button[type="submit"]')
  const originalBtnText = submitBtn.innerHTML
  submitBtn.disabled = true
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...'

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }

  emailjs
    .send("service_x6otkmt", "template_aai16kk", formData)
    .then(
      (response) => {
        showFormMessage("¡Mensaje enviado correctamente!", "success")
        document.getElementById("contactForm").reset()
      },
      (error) => {
        showFormMessage("Error al enviar el mensaje. Por favor intenta nuevamente.", "error")
      },
    )
    .finally(() => {
      submitBtn.disabled = false
      submitBtn.innerHTML = originalBtnText
    })
})

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle")
if (themeToggle) {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme =
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  // Apply saved theme on page load
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
    themeToggle.checked = true
  }

  // Toggle theme when switch is clicked
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
    }
  })
}
