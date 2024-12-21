document.addEventListener('DOMContentLoaded', () => {
    const swup = new Swup();

    // Optional: Add any additional initialization or event handlers here
    swup.on('contentReplaced', () => {
        // Code to run after content is replaced
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentPage = window.location.pathname;
        const pageNumber = currentPage.includes('slide') 
            ? parseInt(currentPage.match(/\d+/)[0]) 
            : 0;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextPage = pageNumber === 0 ? 'slide2.html' : `slide${pageNumber + 1}.html`;
            if (document.querySelector(`a[href="${nextPage}"]`)) {
                swup.loadPage({ url: nextPage });
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevPage = pageNumber === 2 ? 'index.html' : `slide${pageNumber - 1}.html`;
            if (document.querySelector(`a[href="${prevPage}"]`)) {
                swup.loadPage({ url: prevPage });
            }
        }
    });
});
