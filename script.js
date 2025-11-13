let block_array = [[1,1,1,1,1,1,1,1,1,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,1,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,1],
               [1,1,1,1,1,1,1,1,1,1]];

let playerCoords = [5,5];
let playerFacing = 0;
let scale = 40;
const FIELDOFVIEW = 60;


let canvasGrid = document.getElementById("grid")
let canvasDisplay = document.getElementById("display");

let gridCtx = canvasGrid.getContext("2d");
let displayCtx = canvasDisplay.getContext("2d");

let toRadians = (degrees) => {
    return degrees * Math.PI/180;
} 

let clearcanvas = () => {
    gridCtx.clearRect(0, 0, 400, 400);
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
            if (block_array[y][x] == 1){
                drawBlock(x,y);
            }
        }
    }
}


//cast (and draw) a single ray at the given angle
let drawRay = (angle) => {
    sinFacing = Math.sin(angle);
    cosFacing = Math.cos(angle);
    let depth = 1;
    let rayX, rayY = 0;
    while (depth < 100) {
        rayX = playerCoords[0] + cosFacing * depth
        rayY = playerCoords[1] + sinFacing * depth
        if (block_array[Math.round(rayY)][Math.round(rayX)] == 1) {
            console.log(depth)
            gridCtx.strokeStyle = 'green'; 
            gridCtx.beginPath();
            gridCtx.moveTo(playerCoords[0]*scale + 0.5*scale, playerCoords[1]*scale + 0.5*scale);
            gridCtx.lineTo(rayX*scale + 0.5*scale, rayY*scale + 0.5*scale);
            gridCtx.stroke();
            depth = 100;
        }
        depth ++;
    }
}

let drawRays = () => {
    for (let adjust = - 0.5* FIELDOFVIEW; adjust <= 0.5 * FIELDOFVIEW; adjust ++) {
        let rayAngle = toRadians(adjust) + playerFacing;
        console.log(rayAngle)
        if (rayAngle > 6.28318) {
            rayAngle -= 6.28318
        } else if (rayAngle < 0) {
            rayAngle += 6.28318
        }
        drawRay(rayAngle);
    }
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
                    playerCoords[0] < 8 ? playerCoords[0] += 1 : playerCoords[0] = 8;
                    break;
                case Math.PI*1.5:
                    playerCoords[1] > 1 ? playerCoords[1] -= 1 : playerCoords[1] = 1;
                    break;
                case Math.PI:
                    playerCoords[0] > 1 ? playerCoords[0] -= 1 : playerCoords[0] = 1;
                    break;
                case Math.PI/2:
                    playerCoords[1] < 8 ? playerCoords[1] += 1 : playerCoords[1] = 8;
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
                    playerCoords[0] > 1 ? playerCoords[0] -= 1 : playerCoords[0] = 1;   
                    break;
                case Math.PI*1.5:
                    playerCoords[1] < 8 ? playerCoords[1] += 1 : playerCoords[1] = 8;
                    break;
                case Math.PI:
                    playerCoords[0] < 8 ? playerCoords[0] += 1 : playerCoords[0] = 8;
                    break;
                case Math.PI/2:
                    playerCoords[1] > 1 ? playerCoords[1] -= 1 : playerCoords[1] = 1;
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