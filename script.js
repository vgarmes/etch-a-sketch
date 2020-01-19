const container = document.getElementById("grid-container");
var paintingMethod = 'default';
var paintColor = 'black';
var opacityMode = false;
const opacityStep = 0.25;
const defaultColor = 'white';

gridCells = generateGrid(16);

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
    cells.forEach((cell) => {
        cell.addEventListener('mouseover',(e)=>paintCell(e));
        cell.addEventListener('click', (e)=>paintCell(e));
        cell.style.backgroundColor = defaultColor;
    });
    return cells;
}

function paintCell(e) {
    if (((e.type == 'mouseover')&(e.shiftKey == true))||(e.type == 'click')) {
        const targetCell = document.getElementById(`${e.target.id}`);
        if (opacityMode) {
            if (Number(targetCell.style.opacity) + opacityStep > 1) {
                targetCell.style.opacity = 1;
            } else {
                targetCell.style.opacity = Number(targetCell.style.opacity) + opacityStep;
            }
        } else if ((Number(targetCell.style.opacity) > 0) && (Number(targetCell.style.opacity) <= 1)) {
            targetCell.style.opacity = null;
        }
        if (paintingMethod == "random") {
            targetCell.style.backgroundColor = getRandomColor();
        } else if (paintingMethod == "erasing") {
            targetCell.style.backgroundColor = 'white';
            targetCell.style.opacity = 'null';
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
    gridCells.forEach((gridCell) => {
        gridCell.style.backgroundColor = defaultColor;
        gridCell.style.opacity = null;
    });
}

const newBtn = document.getElementById('newBtn');
newBtn.addEventListener('click', () => {
    gridCells = generateGrid(prompt("Please enter grid size: "));
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

const opacityBtn = document.getElementById('opacityCheckbox');
opacityBtn.addEventListener('input',() => opacityMode = opacityBtn.checked);

const eraserBth = document.getElementById('eraserBtn');
eraserBtn.addEventListener('click', ()  => {
    paintingMethod = "erasing";
    opacityMode = false;
});
