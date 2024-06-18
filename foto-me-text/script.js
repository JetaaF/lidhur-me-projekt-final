let texts = [];
let images = [];
let currentIndex = 0;
let sequentialButtonListener; // Variable to store sequential button listener
let skipButtonListener; // Variable to store skip button listener

// Function to fetch JSON data
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to initialize application
async function init() {
    texts = await fetchData('texts.json');
    images = await fetchData('images.json');

    // Display initial text and background image
    updateContent();

    // Event listener for clicks anywhere on the screen
    document.body.addEventListener('click', handleTextChange);

    // Check for index 2 to show buttons
    checkShowButtons();
}

// Function to update text and background image
function updateContent() {
    document.getElementById('text').textContent = texts.texts[currentIndex];
    document.body.style.backgroundImage = `url(${images.images[currentIndex]})`;
    checkShowButtons();
}

// Function to handle text change
function handleTextChange() {
    currentIndex = (currentIndex + 1) % texts.texts.length;
    updateContent();
}

// Function to handle sequential button click
function handleSequential() {
    currentIndex = (currentIndex + 1) % texts.texts.length;
    updateContent();
}

// Function to handle skip button click
function handleSkip() {
    // Skip texts with index 4 and 5
    if (currentIndex === 4 || currentIndex === 5) {
        currentIndex += 2; // Skip to index 6 after 5
    } else {
        currentIndex = (currentIndex + 1) % texts.texts.length;
    }
    updateContent();
}

// Function to check if buttons should be shown
function checkShowButtons() {
    // Show buttons only when index 2 is displayed
    if (currentIndex === 2) {
        showButtons();
    } else {
        hideButtons();
    }
}

// Function to show buttons
function showButtons() {
    let buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.innerHTML = `
        <button id="btn-s">S (Sequential)</button>
        <button id="btn-g">G (Skip 4 & 5)</button>
    `;

    // Add event listeners to buttons if not already added
    if (!sequentialButtonListener) {
        sequentialButtonListener = () => handleSequential();
        document.getElementById('btn-s').addEventListener('click', sequentialButtonListener);
    }
    if (!skipButtonListener) {
        skipButtonListener = () => handleSkip();
        document.getElementById('btn-g').addEventListener('click', skipButtonListener);
    }
}

// Function to hide buttons
function hideButtons() {
    let buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.innerHTML = '';

    // Remove event listeners from buttons if listeners exist
    if (sequentialButtonListener) {
        document.getElementById('btn-s').removeEventListener('click', sequentialButtonListener);
        sequentialButtonListener = null;
    }
    if (skipButtonListener) {
        document.getElementById('btn-g').removeEventListener('click', skipButtonListener);
        skipButtonListener = null;
    }
}

// Initialize application
init();
