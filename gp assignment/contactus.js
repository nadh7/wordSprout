// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
});

// Handle collapsible FAQ behavior
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";  // Get the full height of the content
        }
    });
});
