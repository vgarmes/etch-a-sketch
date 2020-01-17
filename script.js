const container = document.getElementById("grid-container");
gridCells = generateGrid(16);
var paintingMethod = 'default';
var paintColor = 'black';

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
    
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => cell.addEventListener('mouseover',(e)=>paintCell(e)));
    return cells;
}

function paintCell(e) {
    console.log(e.target);
    if (e.shiftKey == true) {
        const targetCell = document.getElementById(`${e.target.id}`);
        if (paintingMethod == "random") {
            targetCell.style.backgroundColor = getRandomColor();
        } else {
            targetCell.style.backgroundColor = paintColor;
        } 
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearGrid() {
    console.log('grid cleared');
    gridCells.forEach((gridCell) => {
        gridCell.style.backgroundColor = 'white';
    });
}

const newBtn = document.getElementById('newBtn');
newBtn.addEventListener('click', () => {
    generateGrid(prompt("Please enter grid size: "));
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    clearGrid();
});

const pickerBtn = document.getElementById('colorPicker');
pickerBtn.addEventListener('input',() => paintColor = pickerBtn.value);
pickerBtn.addEventListener('click', () => paintingMethod = "default");

const randomBtn = document.getElementById('randomBtn');
randomBtn.addEventListener('click',() => {
    paintingMethod = "random";
});




