"use strict";

// Saves elements for later modification
let titleElement = document.getElementsByTagName("title")[0];
let navElement = document.getElementsByClassName("navbar")[0];
let contentElement = document.getElementById("content");

// List of content files
const contentList = ["home", "projects", "about", "contact"];

/**
 * Clicks 'home' on load to load the home page of content
 */
document.addEventListener("DOMContentLoaded", (event) => {
    const navLinks = document.getElementsByClassName("nav-link");
    
    for (let link of navLinks) {
        if (link.dataset.page === "home") {
            link.click();
        }
    }
})

/**
 * Creates the nav links and sets them up
 */
contentList.forEach(page => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = capitalize(page);
    link.setAttribute("data-page", page);
    link.className = "nav-link"
    link.addEventListener("click", event => {
        event.preventDefault();
        loadContent(page);
    });
    navElement.appendChild(link);
});

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