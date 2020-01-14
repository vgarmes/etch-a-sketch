var container = document.getElementById("grid-container");
function generateGrid(gridSize) {
    var htmlElements = "";
    let styleString = "";
    for (let i = 0; i < gridSize; i++) {
        styleString += "auto ";
        for (let j = 0; j < gridSize; j++) {
            htmlElements += '<div class="grid-item">' + (gridSize*i+j+1) + '</div>';
        }
    }
    container.innerHTML = htmlElements;
    container.style.cssText = "grid-template-columns: " + styleString;
}

generateGrid(16);