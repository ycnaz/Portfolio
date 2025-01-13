document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(".projects-con");
    const projectsSection = document.querySelector("#projects");

    let projectsWidth = projectsContainer.offsetWidth
    let amountToScroll = projectsWidth - window.innerWidth

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