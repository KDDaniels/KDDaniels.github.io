"use strict";

// Saves elements for later modification
let titleElement = document.getElementsByTagName("title")[0];
let navElement = document.getElementsByClassName("navbar")[0];
let contentElement = document.getElementById("content");
let aboutElement = document.getElementById("about");


// List of content files
const contentList = ["projects", "contact"];


/**
 * Clicks 'about' on load to load the about page of content
 */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.getElementsByClassName("nav-link");
    
    for (let link of navLinks) {
        if (link.dataset.page === "projects") {
            link.click();
        }
    }
})

/**
 * Loads content on window load
 */
window.addEventListener("load", () => {
    addAboutContent();  
})


/**
 * Creates the nav links and sets them up
 */
contentList.forEach(page => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${page}`;
    link.textContent = capitalize(page);
    link.setAttribute("data-page", page);
    link.className = "nav-link block w-99% text-center py-2 hover:bg-gray-700 border rounded-lg hover:animate-pulse m-1"
    link.addEventListener("click", event => {
        event.preventDefault();
        loadContent(page);
    });
    li.appendChild(link);
    navElement.appendChild(li);
});

/**
 * Loads the html content for the About section
 */
async function addAboutContent() {
    try {
        const response = await fetch('content/about.html');
        if (!response.ok) throw new Error("Failed to load about content");

        const html = await response.text();
        aboutElement.innerHTML = html;
    } catch (error) {
        aboutElementElement.innerHTML = `<h1>Error</h1><p>Error loding content: ${error.message}</p>`
        titleElement.innerHTML = "KDaniels - Error"
    }
}


/**
 * Loads the html content from a separate file
 * @param {string} page filename to load from
 */
async function loadContent(page) {
    try {
        const response = await fetch(`content/${page}.html`);
        if (!response.ok) throw new Error(`Failed to load content/${page}.html`);

        const html = await response.text();
        contentElement.innerHTML = html;
        titleElement.innerHTML = `KDaniels - ${capitalize(page)}`
    } catch (error) {
        contentElement.innerHTML = `<h1>Error</h1><p>Error loding content: ${error.message}</p>`
        titleElement.innerHTML = "KDaniels - Error"
    }
}


/**
 * Capitalizes the string given
 * @param {string} word String to be capitalized
 * @returns Capitalized word
 */
function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}