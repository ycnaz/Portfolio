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
});