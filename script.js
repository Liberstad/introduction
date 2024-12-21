document.addEventListener("DOMContentLoaded", function () {
    const swup = new Swup({
        containers: ["#swup"]
    });

    function init() {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = "none";
            }
        });

        function navigateSlide(direction) {
            const currentSlide = document.querySelector('.slide:not([style*="display: none"])');
            const currentId = parseInt(currentSlide.id.replace("slide", ""));
            const nextId = direction === "next" ? currentId + 1 : currentId - 1;

            if (nextId >= 1 && nextId <= slides.length) {
                currentSlide.style.display = "none";
                document.getElementById(`slide${nextId}`).style.display = "flex";
            }
        }

        // Handle click events
        document.addEventListener("click", (e) => {
            if (e.target.tagName === "SPAN") {
                const isNext = e.target.textContent.includes("Next");
                const isPrev = e.target.textContent.includes("Previous");

                if (isNext || isPrev) {
                    e.preventDefault();
                    navigateSlide(isNext ? "next" : "prev");
                }
            }
        });

        // Handle keyboard events
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                navigateSlide("next");
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                navigateSlide("prev");
            }
        });

        // Add touch swipe handling
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigateSlide("next");
                } else {
                    navigateSlide("prev");
                }
            }
        }
    }

    // Initialize on first load
    init();

    // Initialize on every Swup page view
    swup.on("contentReplaced", init);
});
