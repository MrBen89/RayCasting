let block_array = [1,1,1,1,1,1,1,1,1,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,1,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,0,0,0,0,0,0,0,0,1,
               1,1,1,1,1,1,1,1,1,1];

let start_coord = [5,5];

let canvas_grid = document.getElementById("grid")
let canvas_display = document.getElementById("display");

let grid_ctx = canvas_grid.getContext("2d");
let display_ctx = canvas_display.getContext("2d");

grid_ctx.beginPath();
grid_ctx.arc(start_coord[0]*10, start_coord[1]*10, 10, 0, 2 * Math.PI);
grid_ctx.stroke();

let clearcanvas = () => {
    grid_ctx.clearRect(0, 0, 400, 400);
}

let draw_player = () => {
    grid_ctx.beginPath();
    grid_ctx.arc(start_coord[0]*10, start_coord[1]*10, 10, 0, 2 * Math.PI);
    grid_ctx.stroke();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            start_coord[1] > 0 ? start_coord[1] -= 1 : start_coord[1] = 0;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            break;
        case "ArrowDown":
            start_coord[1] < 10 ? start_coord[1] += 1 : start_coord[1] = 10;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            break;
        case "ArrowLeft":
            start_coord[0] > 0 ? start_coord[0] -= 1 : start_coord[0] = 0;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            break;
        case "ArrowRight":
            start_coord[0] < 10 ? start_coord[0] += 1 : start_coord[0] = 10;
            console.log(start_coord)
            clearcanvas();
            draw_player();
            break;
    }
 })