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

let start_coord = [5,5];

let canvas_grid = document.getElementById("grid")
let canvas_display = document.getElementById("display");

let grid_ctx = canvas_grid.getContext("2d");
let display_ctx = canvas_display.getContext("2d");

let clearcanvas = () => {
    grid_ctx.clearRect(0, 0, 400, 400);
}

let draw_player = () => {
    grid_ctx.fillStyle = 'red'; // Set the fill color
    grid_ctx.fillRect((start_coord[0]*40 + 15), (start_coord[1]*40 + 15), 10, 10);
}

draw_player();

let draw_block = (x, y) => {
    grid_ctx.fillStyle = 'grey'; // Set the fill color
    grid_ctx.fillRect((x*40)+1, (y*40)+1, 38, 38);
    console.log(x)
}

let draw_layout = () => {
    for (let x = 0; x < 10; x++){
        for (let y = 0; y < 10; y++){
            if (block_array[y][x] == 1){
                draw_block(x,y);
            }
            
            // console.log(x)
        }
    }
}

draw_layout();

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            start_coord[1] > 1 ? start_coord[1] -= 1 : start_coord[1] = 1;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            draw_layout();
            break;
        case "ArrowDown":
            start_coord[1] < 8 ? start_coord[1] += 1 : start_coord[1] = 8;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            draw_layout();
            break;
        case "ArrowLeft":
            start_coord[0] > 1 ? start_coord[0] -= 1 : start_coord[0] = 1;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            draw_layout();
            break;
        case "ArrowRight":
            start_coord[0] < 8 ? start_coord[0] += 1 : start_coord[0] = 8;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            draw_layout();
            break;
    }
 })