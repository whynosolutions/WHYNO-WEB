/**
 * WHYNO — v4.0
 * Minimal. Clean. Professional.
 */
document.addEventListener('DOMContentLoaded', () => {

    /* Loader */
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hide'), 1500);

    /* Year */
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();

    /* Header scroll */
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');

    function onScroll() {
        const y = window.scrollY;
        header?.classList.toggle('scrolled', y > 10);
        scrollTop?.classList.toggle('show', y > 400);

        /* Active nav */
        const links = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        let cur = '';
        sections.forEach(s => {
            if (s.offsetTop - 120 <= y) cur = s.id;
        });
        links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Back to top */
    scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* Mobile menu */
    const toggle = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        if (!nav || !toggle || !overlay) return;
        nav.classList.add('open');
        overlay.classList.add('show');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (!nav || !toggle || !overlay) return;
        nav.classList.remove('open');
        overlay.classList.remove('show');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle?.addEventListener('click', () => nav?.classList.contains('open') ? closeMenu() : openMenu());
    overlay?.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 680) closeMenu();
    });

    /* Scroll reveal */
    const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                o.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.anim').forEach(el => obs.observe(el));

    /* Contact form */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }

            const em = document.getElementById('email').value.trim();
            const sub = document.getElementById('subject').value.trim();
            const msg = document.getElementById('content').value.trim();
            const url = 'https://mail.google.com/mail/?view=cm&fs=1'
                + '&to=whyno.contactus@gmail.com'
                + '&su=' + encodeURIComponent(sub)
                + '&body=' + encodeURIComponent('From: ' + em + '\n\n' + msg);

            window.open(url, '_blank', 'noopener,noreferrer');

            const btn = form.querySelector('.btn');
            btn.textContent = 'Opening Gmail…';
            setTimeout(() => { btn.textContent = 'Send Message'; }, 3000);
        });
    }
});
