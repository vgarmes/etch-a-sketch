var container = document.getElementById("grid-container");
function generateGrid(gridSize) {
    var htmlElements = "";
    let styleString = "";
    for (let i = 0; i < gridSize; i++) {
        styleString += "auto ";
        for (let j = 0; j < gridSize; j++) {
            htmlElements += '<div id = "'+ (gridSize*i+j+1) +'" class="grid-item"></div>';
        }
    }
    container.innerHTML = htmlElements;
    container.style.cssText = "grid-template-columns: " + styleString;
}

function paintCell(e) {
    console.log(e);
    if (e.shiftKey == true) {
        const targetCell = document.getElementById(`${e.target.id}`);
        targetCell.classList.add('painted');

    }

}

generateGrid(50);
const gridCells = document.querySelectorAll('.grid-item');
gridCells.forEach(gridCell => gridCell.addEventListener('mouseover',(e)=>paintCell(e)));
