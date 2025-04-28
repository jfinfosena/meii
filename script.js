// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });
    
    // Inicializar el carrusel de imágenes
    initCarrusel();

    // Configuración de partículas para el fondo del hero
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Navegación móvil
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('active');

        // Animar links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animación del burger
        burger.classList.toggle('toggle');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Carrusel de testimonios
    initTestimonios();

    // Formulario de preinscripción
    const form = document.getElementById('preinscripcion-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se podría implementar la lógica para enviar los datos a un servidor
            // Por ahora, mostraremos un mensaje de éxito simulado
            
            const formData = new FormData(form);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Datos del formulario:', formValues);
            
            // Simular envío exitoso
            form.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Preinscripción enviada con éxito!</h3>
                    <p>Gracias por tu interés en nuestro programa. Pronto recibirás un correo con más información.</p>
                </div>
            `;
        });
    }

    // Efecto de scroll para la navegación
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Animación para la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    }

    // Inicializar con opacidad 0
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    // Observador de intersección para animar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observar la sección de inscripción
    const inscripcionSection = document.querySelector('.inscripcion');
    if (inscripcionSection) {
        observer.observe(inscripcionSection);
    }

    // Animación para las líneas tecnológicas en CTA final
    const techLines = document.querySelector('.tech-lines');
    if (techLines) {
        window.addEventListener('scroll', function() {
            const ctaSection = document.querySelector('.cta-final');
            const ctaPosition = ctaSection.getBoundingClientRect();
            
            if (ctaPosition.top < window.innerHeight && ctaPosition.bottom > 0) {
                const scrollPosition = (window.innerHeight - ctaPosition.top) / window.innerHeight;
                techLines.style.transform = `translateX(${scrollPosition * 20}px)`;
            }
        });
    }
});

// Función para controlar el carrusel de imágenes
function initCarrusel() {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicators = document.querySelectorAll('.carrusel-indicator');
    const prevBtn = document.querySelector('.carrusel-prev');
    const nextBtn = document.querySelector('.carrusel-next');
    let currentIndex = 0;
    
    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Ocultar todas las diapositivas y desactivar indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Mostrar la diapositiva actual y activar su indicador
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    // Evento para el botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            showSlide(currentIndex);
        });
    }
    
    // Evento para el botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            showSlide(currentIndex);
        });
    }
    
    // Eventos para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Cambio automático de diapositivas cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    }, 5000);
}

// Función para controlar el carrusel de testimonios
function initTestimonios() {
    const testimonios = document.querySelectorAll('.testimonio');
    const dots = document.querySelectorAll('.dot');
    const prevBtnTest = document.querySelector('.prev');
    const nextBtnTest = document.querySelector('.next');
    let currentTestIndex = 0;

    function showTestimonio(index) {
        testimonios.forEach(testimonio => testimonio.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonios[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestIndex = index;
    }

    // Evento para los puntos indicadores
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonio(index);
        });
    });

    // Eventos para los botones de navegación
    if (prevBtnTest) {
        prevBtnTest.addEventListener('click', () => {
            currentTestIndex = (currentTestIndex === 0) ? testimonios.length - 1 : currentTestIndex - 1;
            showTestimonio(currentTestIndex);
        });
    }

    if (nextBtnTest) {
        nextBtnTest.addEventListener('click', () => {
            currentTestIndex = (currentTestIndex === testimonios.length - 1) ? 0 : currentTestIndex + 1;
            showTestimonio(currentTestIndex);
        });
    }

    // Cambio automático de testimonios
    setInterval(() => {
        currentTestIndex = (currentTestIndex === testimonios.length - 1) ? 0 : currentTestIndex + 1;
        showTestimonio(currentTestIndex);
    }, 5000);
}