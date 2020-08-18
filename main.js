const TypeWriter = function(textElement, words, delay = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.delay = delay;
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const currentIndex = this.wordIndex % this.words.length;
    const currentWord = this.words[currentIndex];
    let typeSpeed = 300;

    if (this.isDeleting) {
        this.text = currentWord.substring(0, this.text.length - 1);
        typeSpeed /= 2;
    }
    else this.text = currentWord.substring(0, this.text.length + 1);

    this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

    if (!this.isDeleting && this.text === currentWord) {
        typeSpeed = this.delay;
        this.isDeleting = true;
    }
    else if (this.isDeleting && this.text === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = this.delay / 2;
    }

    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    const textElement = document.querySelector('.type-text');
    const delay = textElement.getAttribute('data-delay');
    const words = JSON.parse(textElement.getAttribute('data-words'));

    new TypeWriter(textElement, words, delay);

    document.getElementById("projects-close-button").addEventListener("click", closeProjectsPanel);
    document.getElementById("projects-open-button").addEventListener("click", openProjectsPanel);


    function closeProjectsPanel() {
        const projects = document.getElementById("projects");
        projects.style.display = "none";
    }
    function openProjectsPanel() {
        const projects = document.getElementById("projects");
        projects.style.display = "block";
    }
}