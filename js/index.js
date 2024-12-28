"use strict";

// Saves elements for later modification
const titleElement = document.getElementsByTagName("title")[0];
const navElement = document.getElementsByClassName("navbar")[0];
const contentElement = document.getElementById("content");
const aboutElement = document.getElementById("about");


// List of content files
const contentList = ["projects", "contact", "about"];


/**
 * Loads content on window load
 */
window.addEventListener("load", () => {
    addAboutContent();  
})


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
 * Creates the nav links and sets them up
 */
contentList.forEach(page => {
    const link = document.createElement("a");
    link.href = `#${page}`;
    link.textContent = capitalize(page);
    link.setAttribute("data-page", page);
    link.className = "nav-link block w-99% text-center py-2 hover:bg-gray-700 border rounded-lg hover:animate-pulse m-1"
    link.addEventListener("click", event => {
        event.preventDefault();
        loadContent(page)
        .then(() => {
            if(link.dataset.page === "projects") {
                loadProjects();
            }
        });

        
    });
    navElement.appendChild(link);
});


async function loadProjects() {
    let unfinPro = document.getElementById("unifnished-projects");
    let finPro = document.getElementById("finished-projects");
    
    fetch("./resources/projects.json")
    .then((response) => response.json())
    .then((projects) => {
        const catList = ["in_progress", "complete"];

        for (let category of catList) {
        
            projects[category].forEach((project) => {
                let projectOutline = document.createElement("div");
                projectOutline.classList.add("object", "bg-gray-200", "p-4", "rounded");

                let projectContainer = document.createElement("div");
                projectContainer.classList.add("object", "bg-gray-100", "p-4", "rounded", "flex", "items-start", "gap-4");

                let infoContainer = document.createElement("div");
                infoContainer.classList.add("flex-1", "flex", "flex-col");

                let infoContainerText = document.createElement("div");
                infoContainerText.classList.add("block", "items-center", "justify-between");

                let projectImg = document.createElement("img");
                projectImg.src = `./resources/${project.image}`;
                projectImg.alt = `${project.title} image`;
                projectImg.classList.add("w-20", "h-20", "rounded", "shadow-md");

                let projectTitle = document.createElement("h3");
                projectTitle.innerHTML = project.title;
                projectTitle.classList.add("text-lg", "font-bold", "whitespace-nowrap");

                let projectDesc = document.createElement("p");
                projectDesc.innerHTML = project.description;
                projectDesc.classList.add("text-sm", "text-gray-600");

                let projectLink = document.createElement("a");
                projectLink.href = project.link;
                projectLink.innerHTML = "View on <img src='https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png' alt='GitHub'>";
                projectLink.classList.add("text-gray-800", "font-semibold", "text-sm", "mt-1", "block", "text-center", "hover:text-gray-600", "hover:animate-pulse");
                projectLink.target = "_blank";

                projectContainer.appendChild(projectImg);
                infoContainer.appendChild(projectTitle);
                infoContainer.appendChild(projectLink);
                infoContainerText.appendChild(projectDesc);
                projectContainer.appendChild(infoContainer);
                projectContainer.appendChild(infoContainerText);
                projectOutline.appendChild(projectContainer);
                if (category === "in_progress") {
                    unfinPro.appendChild(projectOutline);
                } else {
                    finPro.appendChild(projectOutline);
                }
            })
        }
    })

}


/**
 * Loads the html content for the About section
 */
async function addAboutContent() {
    try {
        const response = await fetch("content/about_sb.html");
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
    // TODO: merge this and addAboutContent
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