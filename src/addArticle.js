import {parseArticle} from "./article-parser"

async function addSpecialArticle(leftArticleUrl, rightArticleUrl) {
    var leftArticle = await parseArticle(leftArticleUrl)
    var rightArticle = await parseArticle(rightArticleUrl) 

    //before adding the article, clear the page from jumbotron etc (they get hidden) to show only the reader
    const elementsToDelete = document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection")
    elementsToDelete.forEach(node => {
        node.classList.add("hidden");
    }) 

    document.querySelector(".reader").className = document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g, '')

    //clear the reader from previous text
    document.querySelector(".reader").innerHTML = ""

    // change class to reader to avoid problems since we will create other readers
    var reader = document.querySelector(".reader")
    reader.classList.add("grid-container")
    reader.classList.remove("reader")

    //create 2 containers for the documents
    var rightReader = document.createElement("section");
    var leftReader = document.createElement("section");
    rightReader.className = "reader right";
    leftReader.className = "reader left";
    var location = document.querySelector("section.grid-container");
    location.insertAdjacentElement("afterbegin", rightReader);
    location.insertAdjacentElement("afterbegin", leftReader);

    const leftContainer = document.querySelector("section.reader.left")
    const leftNodes = Array.from(leftArticle.body.childNodes)
    leftNodes.forEach(node => {
        leftContainer.appendChild(node)
    })
    const rightContainer = document.querySelector("section.reader.right")
    const rightNodes = Array.from(rightArticle.body.childNodes)
    rightNodes.forEach(node => {
        rightContainer.appendChild(node)
    })

}

//add articles to dom
async function addArticle(articleUrl){
    var article = await parseArticle(articleUrl)
    
    //before adding the article, clear the page from jumbotron etc (they get hidden) to show only the reader
    const elementsToDelete = document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection")
    elementsToDelete.forEach(node => {
        node.classList.add("hidden");
    }) 

    document.querySelector(".reader").className = document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g, '')

    var gridReader = document.querySelector("section.grid-container")
    if (document.body.contains(gridReader)) {
        gridReader.classList.add("reader")
        gridReader.classList.remove("grid-container")
        const gridNodes = Array.from(gridReader.childNodes)
        gridNodes.forEach(node => {
        gridReader.removeChild(node)
    })

    } 
    document.querySelector(".reader").innerHTML = ""

    //actually insert the new document
    const container = document.querySelector(".reader")
    const nodes = Array.from(article.body.childNodes)
    nodes.forEach(node => {
        container.appendChild(node)
    })
    
}

export {addSpecialArticle}
export {addArticle}