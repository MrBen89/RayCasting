let blockArray =  [[1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,1,0,1],
                    [1,0,0,0,0,0,0,1,0,1],
                    [1,0,0,0,1,1,1,1,0,1],
                    [1,0,0,0,1,0,0,0,0,1],
                    [1,0,0,0,1,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1]];

let playerCoords = [5,5];
let playerFacing = 0;
let scale = 40;
let steps = 180;
const FIELDOFVIEW = 120;
const DISPLAYWIDTH = 180;
const DISPLAYHEIGHT = 144;


let canvasGrid = document.getElementById("grid")
let canvasDisplay = document.getElementById("display");

let gridCtx = canvasGrid.getContext("2d");
let displayCtx = canvasDisplay.getContext("2d");

let checkCollison = (xCoord, yCoord) => {
    return (blockArray[yCoord][xCoord] == 1 ? true : false)
}


let toRadians = (degrees) => {
    return degrees * Math.PI/180;
} 

let clearcanvas = () => {
    gridCtx.clearRect(0, 0, 400, 400);
    displayCtx.clearRect(0, 0, DISPLAYWIDTH, DISPLAYHEIGHT);
}

let drawPlayer = () => {
    gridCtx.fillStyle = 'red'; 
    gridCtx.fillRect((playerCoords[0]*scale + 15), (playerCoords[1]*scale + 15), 10, 10);
}

let drawBlock = (x, y) => {
    gridCtx.fillStyle = 'grey'; 
    gridCtx.fillRect((x*scale)+1, (y*scale)+1, 38, 38);
}

let drawFacing = () => {
    const startx = playerCoords[0]*scale + 20;
    const starty = playerCoords[1]*scale + 20;
    const endx = startx +20 * Math.cos(playerFacing);
    const endy = starty +20 * Math.sin(playerFacing);
    gridCtx.beginPath();
    gridCtx.moveTo(startx, starty);
    gridCtx.lineTo(endx, endy);
    gridCtx.stroke();

}

let drawLayout = () => {
    for (let x = 0; x < 10; x++){
        for (let y = 0; y < 10; y++){
            if (blockArray[y][x] == 1){
                drawBlock(x,y);
            }
        }
    }
}


//cast (and draw) a single ray at the given angle
let drawRay = (angle, adjust) => {
    sinFacing = Math.sin(angle);
    cosFacing = Math.cos(angle);
    let depth = 0.01;
    let rayX = 0, rayY = 0;
    while (depth < 100) {
        rayX = playerCoords[0] + cosFacing * depth
        rayY = playerCoords[1] + sinFacing * depth
        if (blockArray[Math.round(rayY)][Math.round(rayX)] == 1) {
            gridCtx.strokeStyle = 'green'; 
            gridCtx.beginPath();
            gridCtx.moveTo(playerCoords[0]*scale + 0.5*scale, playerCoords[1]*scale + 0.5*scale);
            gridCtx.lineTo(rayX*scale + 0.5*scale, rayY*scale + 0.5*scale);
            gridCtx.stroke();
            renderLine(angle, depth, adjust);
            break;
        }
        depth += 0.01;
    }
}

let drawRays = () => {
    for (let count = 0; count < steps; count ++) {
        let range = FIELDOFVIEW / steps
        let adjust = -0.5 * FIELDOFVIEW + count * range
        let rayAngle = toRadians(adjust) + playerFacing;
        if (rayAngle > 2 * Math.PI) {
            rayAngle -= 2 * Math.PI
        } else if (rayAngle < 0) {
            rayAngle += 2 * Math.PI
        }
        drawRay(rayAngle, count);
    }
}

let renderLine = (angle, distance, x) => {
    let correctedDepth = distance * Math.cos(angle - playerFacing);
    if (correctedDepth <= 0) correctedDepth = 0.0001;
    let wallHeightConst = DISPLAYHEIGHT * 1.0;
    let renderHeight = wallHeightConst / correctedDepth;
    let shade = Math.max(0, 255 - correctedDepth * 20); 
    displayCtx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
    displayCtx.beginPath();
    displayCtx.moveTo(x, 0.5* DISPLAYHEIGHT - 0.5 * renderHeight);
    displayCtx.lineTo(x, 0.5* DISPLAYHEIGHT + 0.5 * renderHeight);
    displayCtx.stroke();
}


drawPlayer();
drawFacing();
drawLayout();
drawRays();

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            switch (playerFacing) {
                case 0:
                    if (!checkCollison((playerCoords[0] + 1), playerCoords[1])) playerCoords[0] += 1;
                    break;
                case Math.PI*1.5:
                    if (!checkCollison((playerCoords[0]), playerCoords[1] -1)) playerCoords[1] -= 1;
                    break;
                case Math.PI:
                    if (!checkCollison((playerCoords[0] - 1), playerCoords[1])) playerCoords[0] -= 1;
                    break;
                case Math.PI/2:
                    if (!checkCollison((playerCoords[0]), playerCoords[1] +1)) playerCoords[1] += 1;
                    break;
            }
            clearcanvas();
            drawPlayer();
            drawLayout();
            drawFacing();
            drawRays();
            break;
        case "ArrowDown":
             switch (playerFacing) {
                case 0:
                    if (!checkCollison((playerCoords[0] - 1), playerCoords[1])) playerCoords[0] -= 1;   
                    break;
                case Math.PI*1.5:
                    if (!checkCollison((playerCoords[0]), playerCoords[1] +1)) playerCoords[1] += 1;
                    break;
                case Math.PI:
                    if (!checkCollison((playerCoords[0] + 1), playerCoords[1])) playerCoords[0] += 1;
                    break;
                case Math.PI/2:
                    if (!checkCollison((playerCoords[0]), playerCoords[1] -1)) playerCoords[1] -= 1;
                    break;
            }
            clearcanvas();
            drawPlayer();
            drawLayout();
            drawFacing();
            drawRays();
            break;
        case "ArrowLeft":
            playerFacing == 0 ? playerFacing = 1.5 * Math.PI : playerFacing -= Math.PI/2;
            clearcanvas();
            drawPlayer();
            drawLayout();
            drawFacing();
            drawRays();
            break;
        case "ArrowRight":
            playerFacing == 1.5 * Math.PI ? playerFacing = 0 : playerFacing += Math.PI/2;
            clearcanvas();
            drawPlayer();
            drawLayout();
            drawFacing();
            drawRays();
            break;
    }
 })