const imgs = document.querySelectorAll('.slider__img');
let current = 0;
let slideInterval;

const nextSlide = () => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
};

const prevSlide = () => {
    imgs[current].classList.remove('active');
    current = (current - 1 + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
};

const resetInterval = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
};

document.querySelector('.slider__btn--next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.slider__btn--prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

resetInterval();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('nav').classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav').classList.remove('open');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            const targetHeight = target.offsetHeight;
            const isMobile = window.innerWidth <= 768;
            const targetId = link.getAttribute('href');
            
            let offset;
            if (isMobile || targetId === '#menu') {
                offset = targetTop - headerHeight;
            } else {
                offset = targetTop - (window.innerHeight / 2) + (targetHeight / 2) - headerHeight / 2;
            }

            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
        document.getElementById('nav').classList.remove('open');
    });
});

emailjs.init('vTiIu-D_Pcqv4MY1v');

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    emailjs.sendForm('service_n3sdfgu', 'template_rte1y5h', e.target)
        .then(() => {
            btn.textContent = 'Sent!';
            e.target.reset();
            document.getElementById('form-success').classList.add('visible');
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                document.getElementById('form-success').classList.remove('visible');
            }, 4000);
        })
        .catch(() => {
            btn.textContent = 'Error. Try again';
            btn.disabled = false;
        });
});