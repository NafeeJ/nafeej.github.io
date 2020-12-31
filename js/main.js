const projectsData = {
    "size": 4,
    "titles": [
        "BatteryEstimate",
        "InputPrefs",
        "Fumo Bounce",
        "Bushido in Samurai Films"
    ],
    "descriptions": [
        "Brings back the estimated battery time remaining to the menu bar for MacOS",
        "Quickly change function row and scrolling defaults on MacOS",
        "<em>Bounce Fumos</em>. Simple physics sandbox game built with Unity.",
        "Analyzes the role of bushidō in samurai films."
    ],
    "projectLinks": [
        "https://github.com/NafeeJ/BatteryEstimate",
        "https://github.com/NafeeJ/InputPrefs",
        "https://nafeej.github.io/Fumo-Bounce",
        "https://nafeej.github.io/Bushido-in-Samurai-Films"
    ]
}

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

    this.textElement.innerHTML = `<span class='text'>${this.text}</span>`;

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

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.cssText += 'animation: fade-out 1s;';
    loadingScreen.innerHTML = '';
    setTimeout(() => loadingScreen.remove(), 1000);
});

document.addEventListener('DOMContentLoaded', init);

function init() {
    const textElement = document.querySelector('.type-text');
    const delay = textElement.getAttribute('data-delay');
    const words = JSON.parse(textElement.getAttribute('data-words'));

    new TypeWriter(textElement, words, delay);

    const cards = document.querySelector('.cards');

    for (let i = 0; i < projectsData.size; i++) {
        cards.innerHTML += 
        `<div class="card">
            <h1>${projectsData.titles[i]}</h1>
            <p>${projectsData.descriptions[i]}</p>
            <a href="${projectsData.projectLinks[i]}" target="_blank" class="see-project-button">See Project</a>
        </div>`
    }
}

const projects = document.querySelector('.projects');
const projectsContent = document.querySelector('.projects-content');
const body = document.getElementById('body');

function openProjectsPanel() {
    body.style.cssText = 'overflow: hidden;';
    projects.style.display = 'flex';
    projectsContent.style.cssText = 'animation: slide-in 0.5s ease-out; animation-fill-mode: forwards;';
    setTimeout(() => body.style.cssText = 'overflow: auto;', 500);
}

function closeProjectsPanel() {
    body.style.cssText = 'overflow: hidden;';
    projectsContent.style.cssText = 'animation: slide-out 0.5s ease-out; animation-fill-mode: forwards;';
    setTimeout(() => {
        projects.style.display = 'none';
        body.style.cssText = 'overflow: auto;';
    }, 500);
}