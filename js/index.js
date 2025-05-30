"use strict";


// Handles the menu button on mobile
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("sidebarToggle");


const btnSymbols = ["X", "☰"]
let buttonState = 0;

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    sidebar.classList.toggle("translate-x-0");
    buttonState = !buttonState;
    toggle.innerHTML = buttonState ? btnSymbols[0] : btnSymbols[1];
})

toggle.click();


// Saves elements for later modification
const titleElement = document.getElementsByTagName("title")[0];
const navElement = document.getElementsByClassName("navbar")[0];
const contentElement = document.getElementById("content");
const aboutElement = document.getElementById("about");


// List of content files
const contentList = ["projects", "contact", "about"];


window.addEventListener("load", () => {
    addAboutContent();
})


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.getElementsByClassName("nav-link");
    
    for (let link of navLinks) {
        if (link.dataset.page === "projects") {
            link.click();
        }
    }
})


contentList.forEach(page => {
    const link = document.createElement("a");
    link.href = `#${page}`;
    link.textContent = capitalize(page);
    link.setAttribute("data-page", page);
    link.className = "nav-link block w-99% text-center py-2 hover:bg-gray-700 border rounded-lg hover:animate-pulse active:bg-gray-600 mt-2 mb-2"
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
    let unfinPro = document.getElementById("unfinished-projects");
    let finPro = document.getElementById("finished-projects");
    const GHImgCache = new Image();
    GHImgCache.src = "https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png";
    
    fetch("./resources/projects.json")
    .then((response) => response.json())
    .then((projects) => {
        const catList = ["in_progress", "complete"];

        for (let category of catList) {
        
            projects[category].forEach((project) => {

                let mainDiv = document.createElement("div");
                mainDiv.classList.add("flex", "flex-row");

                let textDiv = document.createElement("div");
                textDiv.classList.add("flex", "flex-col", "pl-2");

                let projectImg = document.createElement("img");
                if (project.image !== "") {
                    projectImg.src = `./resources/${project.image}`;
                } else {
                    projectImg.src = `./resources/placeholder.jpg`;
                }
                projectImg.alt = `${project.title} image`;
                projectImg.classList.add("w-20", "h-20", "rounded", "shadow-md");

                let projectTitle = document.createElement("h3");
                projectTitle.innerHTML = project.title;
                projectTitle.classList.add("text-md", "font-bold", "whitespace-nowrap");
                
                let GHImg = document.createElement("img");
                GHImg.src = GHImgCache.src;
                GHImg.alt = "GitHub";
                GHImg.classList.add("w-20");

                let projectBadge = document.createElement("img");
                if (project.badge !== "") {
                    projectBadge.src = project.badge
                    projectBadge.alt = "GitHub Release";
                    projectBadge.classList.add("mt-2", "max-w-min");
                }

                let projectDesc = document.createElement("p");
                projectDesc.innerHTML = project.description;
                projectDesc.classList.add("text-sm", "text-gray-600");


                let projectOutline = document.createElement("div");
                projectOutline.classList.add("object", "bg-gray-300", "p-4", "rounded");

                let projectContainer = document.createElement("div");
                projectContainer.classList.add("object", "bg-gray-100", "p-4", "rounded", "flex", "flex-col", "lg:flex-row", "items-start", "gap-4");

                let infoContainer = document.createElement("div");
                infoContainer.classList.add("flex-1", "flex", "flex-col");

                let infoContainerText = document.createElement("div");
                infoContainerText.classList.add("items-center", "justify-between", "lg:w-3/5");

                
                let projectLink = document.createElement("a");
                projectLink.href = project.link;
                projectLink.innerHTML = "View on ";
                projectLink.classList.add("text-gray-800", "font-semibold", "text-sm", "mt-1", "block", "hover:text-gray-600", "hover:animate-pulse");
                projectLink.target = "_blank";

                projectLink.appendChild(GHImg);

                textDiv.appendChild(projectTitle);
                textDiv.appendChild(projectLink);
                textDiv.appendChild(projectBadge);

                mainDiv.appendChild(projectImg);
                mainDiv.appendChild(textDiv);

                infoContainerText.appendChild(projectDesc);
                projectContainer.appendChild(mainDiv);
                projectContainer.appendChild(infoContainerText);
                projectOutline.appendChild(projectContainer);
                if (category === "in_progress") {
                    unfinPro.appendChild(projectOutline);
                } else {
                    finPro.appendChild(projectOutline);
                }
            })
        }

        if(finPro.scrollHeight > finPro.offsetHeight)
        {
            const scrollMsg = document.getElementById("scroll-msg-finished");
            scrollMsg.classList.add("lg:block");
        }

        if(unfinPro.scrollHeight > unfinPro.offsetHeight)
        {
            const scrollMsg = document.getElementById("scroll-msg-unfinished");
            scrollMsg.classList.add("lg:block");
        }

    })
}


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


function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}