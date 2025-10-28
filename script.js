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
let player_facing = 0;
let scale = 40;

let canvas_grid = document.getElementById("grid")
let canvas_display = document.getElementById("display");

let grid_ctx = canvas_grid.getContext("2d");
let display_ctx = canvas_display.getContext("2d");

let clearcanvas = () => {
    grid_ctx.clearRect(0, 0, 400, 400);
}

let draw_player = () => {
    grid_ctx.fillStyle = 'red'; 
    grid_ctx.fillRect((start_coord[0]*scale + 15), (start_coord[1]*scale + 15), 10, 10);
}

let draw_block = (x, y) => {
    grid_ctx.fillStyle = 'grey'; 
    grid_ctx.fillRect((x*scale)+1, (y*scale)+1, 38, 38);
}

let draw_facing = () => {
    const startx = start_coord[0]*scale + 20
    const starty = start_coord[1]*scale + 20
    const endx = startx +100 * Math.cos(player_facing)
    const endy = starty +100 * Math.sin(player_facing);
    grid_ctx.beginPath();
    grid_ctx.moveTo(startx, starty);
    grid_ctx.lineTo(endx, endy);
    grid_ctx.stroke();

}

let draw_layout = () => {
    for (let x = 0; x < 10; x++){
        for (let y = 0; y < 10; y++){
            if (block_array[y][x] == 1){
                draw_block(x,y);
            }
        }
    }
}

draw_player();
draw_layout();

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            start_coord[1] > 1 ? start_coord[1] -= 1 : start_coord[1] = 1;
            clearcanvas();
            draw_player();
            draw_layout();
            draw_facing();
            break;
        case "ArrowDown":
            start_coord[1] < 8 ? start_coord[1] += 1 : start_coord[1] = 8;
            clearcanvas();
            draw_player();
            draw_layout();
            draw_facing();
            break;
        case "ArrowLeft":
            start_coord[0] > 1 ? start_coord[0] -= 1 : start_coord[0] = 1;
            player_facing == 1.5 * Math.PI ? player_facing = 0 : player_facing += Math.PI/2;
            clearcanvas();
            draw_player();
            draw_layout();
            draw_facing();
            console.log(player_facing)
            break;
        case "ArrowRight":
            start_coord[0] < 8 ? start_coord[0] += 1 : start_coord[0] = 8;
            player_facing == 0 ? player_facing = 1.5 * Math.PI : player_facing -= Math.PI/2;
            clearcanvas();
            draw_player();
            draw_layout();
            draw_facing();
            console.log(player_facing)
            break;
    }
 })