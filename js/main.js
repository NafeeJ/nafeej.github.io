const projectsData = {
    "size": 6,
    "titles": [
        "BatteryEstimate",
        "InputPrefs",
        "Fumo Bounce",
        "Holo Bounce",
        "Bushido in Samurai Films",
        "Personal Website"
    ],
    "descriptions": [
        "Brings back the estimated battery time remaining to the menu bar for MacOS",
        "Quickly change function row and scrolling defaults on MacOS",
        "<em>Bounce Fumos</em>. Simple physics sandbox game built with Unity.",
        "<em>Bounce Holos</em>. Simple physics sandbox game built with Unity.",
        "Analyzes the role of bushidō in samurai films.",
        "This website"
    ],
    "projectLinks": [
        "https://github.com/NafeeJ/BatteryEstimate/#batteryestimate",
        "https://github.com/NafeeJ/InputPrefs/#inputprefs",
        "https://nafeej.github.io/Fumo-Bounce/",
        "https://bounce-games.github.io/Holo-Bounce/",
        "https://nafeej.github.io/Bushido-in-Samurai-Films/",
        "https://nafeej.github.io"
    ],
    "repoLinks": [
        "https://github.com/NafeeJ/BatteryEstimate/",
        "https://github.com/NafeeJ/InputPrefs/",
        "https://github.com/NafeeJ/Fumo-Bounce",
        "https://github.com/Bounce-Games/Holo-Bounce",
        "https://github.com/NafeeJ/Bushido-in-Samurai-Films",
        "https://github.com/NafeeJ/nafeej.github.io"
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

    //Typing text init

    const textElement = document.querySelector('.type-text');
    const delay = textElement.getAttribute('data-delay');
    const words = JSON.parse(textElement.getAttribute('data-words'));

    new TypeWriter(textElement, words, delay);

    //Projects panel init

    const projects = document.getElementById('projects-panel');
    const projectsContent = document.getElementById('projects-panel-content');

    projectsButton = document.getElementById('projects-button');
    projectsButton.addEventListener('click', () => openProjectsPanel(projects, projectsContent));

    projectsPanelOverlay = document.getElementById('projects-panel-overlay');
    projectsPanelOverlay.addEventListener('click', () => closeProjectsPanel(projects, projectsContent));

    projectsPanelCloseButton = document.getElementById('projects-panel-close-button');
    projectsPanelCloseButton.addEventListener('click', () => closeProjectsPanel(projects, projectsContent));

    const cards = document.querySelector('.cards');
    for (let i = 0; i < projectsData.size; i++) {
        cards.innerHTML += 
        `<div class="card">
            <h1>${projectsData.titles[i]}</h1>
            <p>${projectsData.descriptions[i]}</p>
            <a href="${projectsData.projectLinks[i]}" target="_blank" class="see-project-button">See Project</a>
            <a href="${projectsData.repoLinks[i]}" target="_blank" class="see-repo-button">See Repo</a>
        </div>`
    }
}

function openProjectsPanel(panel, panelContent) {
    const body = document.getElementById('body');

    body.style.cssText = 'overflow: hidden;';
    panel.style.display = 'flex';
    panelContent.style.cssText = 'animation: slide-in 0.5s ease-out; animation-fill-mode: forwards;';
    setTimeout(() => body.style.cssText = 'overflow: auto;', 500);
}

function closeProjectsPanel(panel, panelContent) {
    const body = document.getElementById('body');

    body.style.cssText = 'overflow: hidden;';
    panelContent.style.cssText = 'animation: slide-out 0.5s ease-out; animation-fill-mode: forwards;';
    setTimeout(() => {
        panel.style.display = 'none';
        body.style.cssText = 'overflow: auto;';
    }, 500);
}