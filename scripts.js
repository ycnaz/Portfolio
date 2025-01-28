document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(".projects-con");
    const projectsSection = document.querySelector("#projects");
    const themeToggler = document.querySelector("#theme-toggler");
    const lightModeIcon = document.querySelector(".light-icon")
    const darkModeIcon = document.querySelector(".dark-icon")
    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const scrollUpButton = document.querySelector(".scroll-up-button");
    const heroSection = document.querySelector(".hero");
    
    let prefersDarkMode = null;
    let projectsWidth = projectsContainer.offsetWidth
    let amountToScroll = projectsWidth - window.innerWidth
    let theme = localStorage.getItem("theme");

    const disableLightMode = () => {
        document.body.classList.remove("light-mode");
        lightModeIcon.style.display = "block";
        darkModeIcon.style.display = "none";
        localStorage.setItem("theme", "dark");
    }

    const enableLightMode = () => {
        document.body.classList.add("light-mode");
        lightModeIcon.style.display = "none";
        darkModeIcon.style.display = "block";
        localStorage.setItem("theme", "light")
    }

    themeMediaQuery.addEventListener('change', (event) => {
        if (event.matches) {
            prefersDarkMode = true;
            disableLightMode();
        } else {
            prefersDarkMode = false;
            enableLightMode();
        }
    });

    if (!prefersDarkMode && theme === "light") enableLightMode();

    themeToggler.addEventListener("click", () => {
        theme = localStorage.getItem("theme")
        if (theme === "light") {
            disableLightMode();
        } else {
            enableLightMode();
        }
    })

    window.addEventListener("scroll", () => {
        if (window.scrollY > (projectsContainer.offsetWidth)) {
            scrollUpButton.style.display = "block";
            setTimeout(() => {
                scrollUpButton.style.opacity = 1;
            }, 10)
        } else {
            scrollUpButton.style.display = "none";
            setTimeout(() => {
                scrollUpButton.style.opacity = 0;
            }, 300)
        }
    })

    scrollUpButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    // GSAP Animations

    const updateScrollValues = () => {
        projectsWidth = projectsContainer.offsetWidth;
        amountToScroll = projectsWidth - window.innerWidth;
    };

    window.addEventListener("resize", updateScrollValues);

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(projectsContainer, {
        x: () => -amountToScroll, // Calculate scroll distance
        ease: "none",
        duration: 3,
        scrollTrigger: {
            trigger: projectsSection,
            start: "top top", // When the section reaches the top of the viewport
            end: () => '+=' + amountToScroll, // End after scrolling the entire width
            scrub: true, // Smooth scrolling
            pin: true, // Pin the section during scrolling
            anticipatePin: 1, // Prevent flickering
            marker: true,
        },
    });

    const navLinks = document.querySelectorAll('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                scrollTo: target,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    const rightPanel = document.querySelector('.right-panel');
    const techStackSection = document.querySelector('#tech-stack-section');

    // ScrollTrigger for pinning the left panel
    ScrollTrigger.create({
        trigger: techStackSection,
        start: "top top",
        end: () => "+=" + (rightPanel.offsetHeight - window.innerHeight),
        pin: ".left-panel",
        pinSpacing: false,
        scrub: true,
    });

    // Optional: Smooth scrolling to the next section
    // ScrollTrigger.create({
    //     trigger: techStackSection,
    //     start: () => "bottom bottom",
    //     onEnter: () => {
    //     gsap.to(window, { scrollTo: { y: "#next-section" }, duration: 1 });
    //     },
    // });
});