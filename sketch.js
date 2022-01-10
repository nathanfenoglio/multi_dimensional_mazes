//https://nathanfenoglio.github.io/multi_dimensional_mazes/

//global variables
//var cols, rows; //comes from maze_info.js now
//var w = 40; //width of cell
//var w = 80; //width of cell
var w = 160; //width of cell
var grid = []; //all of the cells in the entire 3D maze, size is cols * rows * innieouties
var current; //current cell 
var stack = []; //used for backtracking when a dead end is encountered
//var innieouties = 4; //the 3rd dimension //comes from maze_info.js now
var current_maze_plane = 0; 
var num_cells_in_a_maze_plane; //cols * rows
var sleep_time = 500; //time in milliseconds to wait to show next maze plane after maze is constructed
var start = true; //signifying starting up maze, start up whatev, maybe tutorial about how to play etc. 
var letsgetitstarted;
let start_index = 0;
let goal_index = 105;

function setup() {
	//get all of the maze info from maze_info.js
	console.log("cols: " + cols);
	console.log("rows: " + rows);
	console.log("innieouties: " + innieouties);

	//createCanvas(windowWidth, windowHeight);
	// put setup code here
	createCanvas(800, 800);
	//I guess that width and height are already known as keywords for the canvas sizes
	cols = floor(width / w); 
	rows = floor(height / w);
	num_cells_in_a_maze_plane = cols * rows;

	//set up every cell
	console.log(cell_walls.length);
	//keep all of the cells, even for different maze planes, 
	//in the same 1D grid array and do the math
	//the math:
	//size of 1 maze plane is cols * rows
	//the size of the entire 3D maze is cols * rows * innieouties
	for(let k = 0; k < innieouties; k++){
		for(let j = 0; j < rows; j++){
			for(let i = 0; i < cols; i++){
				let cell = new Cell(i, j, k);
				let cell_num = index(i, j, k);
				//set all cell walls info
				for(let a = 0; a < cell_walls[cell_num].length; a++){
					if(cell_walls[cell_num][a] == 1){
						cell.walls.push(true);
					}
					else{
						cell.walls.push(false);
					}

				} 
				
				grid.push(cell);
			}
		}
	}

	//specify start cell COULD BE ANY CELL
	//NEED TO DETERMINE START AND FINISH CELLS OF MAZE
	//current_cell = grid[0];
	//current_index = 0;
	current_cell = grid[start_index];
	current_index = start_index;
	current_maze_plane = 0;

	//start = false; //just for debugging to not run through showing all the maze planes at the beginning
	//draw each maze plane for player to see
	letsgetitstarted = setInterval(show_one_maze_plane, 5000);	
}

function draw() {
	// put drawing code here
	if(!start){
		//console.log("that was all of the maze planes, start playing now");
		background(51);
		//show the current maze plane
		for(let i = (current_maze_plane * num_cells_in_a_maze_plane); i < ((current_maze_plane + 1) * num_cells_in_a_maze_plane); i++){
			grid[i].show();
		}

		//instead of highlighting should put a dot in the middle or something so can still see color of cell and walls...
		//taken care of in show() function (checks if cell is current, then marks with a circle)
	}
	//just killing it for now...
	//noLoop()	
}

var global_maze_plane_counter = 0;
function show_one_maze_plane(maze_plane_num){
	console.log("global_maze_plane_counter: " + global_maze_plane_counter);
	if(global_maze_plane_counter < innieouties){
		background(51);
		for(let i = (global_maze_plane_counter * num_cells_in_a_maze_plane); i < ((global_maze_plane_counter + 1) * num_cells_in_a_maze_plane); i++){
			grid[i].show();
		}
		global_maze_plane_counter++;
	}
	else{
		start = false;
		clearInterval(letsgetitstarted);
	}
}

//KEYBOARD CONTROLS
//arrows to move
//need way to specify whether or not you want to go out or in on cells that are available to go out or in or both on
//because you can also sometimes just pass by and not go out or in

//COULD/SHOULD
//also should add ability for player to rotate perspective if you set up that functionality
//so would need a key assigned for those 4 rotations
//up, down, left, right

function next_is_not_right_boundary(the_current_index){
	let next_index = the_current_index + 1;
	if(Math.floor(next_index / cols) === Math.floor(the_current_index / cols)){
		return true;
	}

	return false;
}

function next_is_not_left_boundary(the_current_index){
	let next_index = the_current_index - 1;
	if(Math.floor(next_index / cols) === Math.floor(the_current_index / cols)){
		return true;
	}

	return false;
}

function next_is_not_up_boundary(the_current_index){
	let next_index = the_current_index - cols;
	if(next_index >= current_maze_plane * num_cells_in_a_maze_plane){
		return true;
	}

	return false;
}

function next_is_not_down_boundary(the_current_index){
	let next_index = the_current_index + cols;
	if(next_index < (current_maze_plane + 1) * num_cells_in_a_maze_plane){
		return true;
	}

	return false;
}

function next_is_not_out_boundary(the_current_index){
	let next_index = the_current_index - num_cells_in_a_maze_plane;
	if(next_index > 0){
		return true;
	}

	return false;
}

function next_is_not_in_boundary(the_current_index){
	let next_index = the_current_index + num_cells_in_a_maze_plane;
	if(next_index < num_cells_in_a_maze_plane * innieouties){
		return true;
	}

	return false;
}

//for p5 the name of the function must be keyPressed to word
function keyPressed() {
	if(start){ //don't pay attention to key if start routine is still running
		return;
	}
	//NEED TO CHECK ALL SORTS OF THINGS...
	if(keyCode === UP_ARROW){
		console.log("up arrow");
		//check that not out of bounds and not a wall above
		if(next_is_not_up_boundary(current_index) && !current_cell.walls[0]){
			current_index = current_index - cols;
			current_cell = grid[current_index];	
		}
		else{
			console.log("nope");
		}
	}
	if(keyCode === LEFT_ARROW) {
	  	console.log("left arrow");
		//check if next_index would be on same row and not a wall to the left
		if(next_is_not_left_boundary(current_index) && !current_cell.walls[3]){
			current_index = current_index - 1;
			current_cell = grid[current_index];	
		}
		else{
			console.log("nope");
		}
	} 
	if(keyCode === RIGHT_ARROW) {
	  	console.log("right arrow");
		//check if next_index would be on same row and not a wall to the right
		if(next_is_not_right_boundary(current_index) && !current_cell.walls[1]){
			current_index = current_index + 1;
			current_cell = grid[current_index];
		}
		else{
			console.log("nope");
		}
	}
	if(keyCode === DOWN_ARROW) {
		console.log("down arrow");
		//check that not out of bounds and not a wall below
		if(next_is_not_down_boundary(current_index) && !current_cell.walls[2]){
			current_index = current_index + cols;
			current_cell = grid[current_index];	
		}
		else{
			console.log("nope");
		}
	}

	//how about enter for in and shift for out
	if(keyCode === SHIFT){
		console.log("shift so out");
		//check that not out of bounds and not a wall one maze plane out
		if(next_is_not_out_boundary(current_index) && !current_cell.walls[4]){
			current_index = current_index - num_cells_in_a_maze_plane;
			current_cell = grid[current_index];
			current_maze_plane--; //change maze plane to be drawn
		}
		else{
			console.log("nope");
		}
	}
	if(keyCode === ENTER){
		console.log("enter so in");
		//check if not out of bounds and not a wall one maze plane in
		if(next_is_not_in_boundary(current_index) && !current_cell.walls[5]){
			current_index = current_index + num_cells_in_a_maze_plane;
			current_cell = grid[current_index];
			current_maze_plane++; //change maze plane to be drawn
		}
		else{
			console.log("nope");
		}
	}

}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function index(i, j, k){
	//just printing
	//console.log("i: " + i + " j: " + j + " k: " + k);
	//check for out of bounds and return -1 if so to signify not valid
	if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1 || k < 0 || k > innieouties - 1){
		return -1;
	}
	return i + (j * cols) + (k * num_cells_in_a_maze_plane);
	//return i + (j * cols); //2D version
}

function Cell(i, j, k){
	this.i = i;
	this.j = j;
	this.k = k;
	//top, right, bottom, left, out, inn
	//this.walls = [true, true, true, true, true, true];
	this.walls = [];
	this.visited = false;

	//I'M NOT SURE THAT YOU NEED checkNeighbors FOR THIS APPLICATION
	this.checkNeighbors = function(){
		//neighbors are located at:
		//top: (i, j-1, k)
		//right: (i+1, j, k)
		//bottom: (i, j+1, k)
		//left: (i-1, j, k)
		//out: (i, j, k - 1)
		//in: (i, j, k + 1)
		let neighbors = [];
		//since returning -1 if out of bounds from index function
		//if any of the indexes below are -1 for grid
		//the value of whichever variable will be undefined and then can check for it
		let top = grid[index(i, j - 1, k)];
		let right = grid[index(i + 1, j, k)];
		let bottom = grid[index(i, j + 1, k)];
		let left = grid[index(i - 1, j, k)];
		let out = grid[index(i, j, k - 1)];
		let inn = grid[index(i, j, k + 1)];


		//checking if variable is not undefined (out of bounds) and not visited, 
		//then push as a possible option for the next cell to visit
		if(top && !top.visited){
			neighbors.push(top);
		}
		if(right && !right.visited){
			neighbors.push(right);
		}
		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if(left && !left.visited){
			neighbors.push(left);
		}
		if(out && !out.visited){
			neighbors.push(out);
		}
		if(inn && !inn.visited){
			neighbors.push(inn);
		}

		//just printing
		//console.log("neighbors length: " + neighbors.length);
		//for(var t = 0; t < neighbors.length; t++){
		//	console.log(neighbors[t]);
		//}

		if(neighbors.length > 0){
			//chooses random available neighboring cells
			//perhaps interesting patterns could be found by modifying this to not be random
			//but some other complicated, but non random sequence 
			let r = floor(random(0, neighbors.length));
			return neighbors[r];
		}
		else{
			return undefined;
		}
	}

	this.highlight = function(red, green, blue){
		//drawing 2D maze plane, just need to know that, not drawing a z (k) value so don't need to know about that here
		let x = this.i * w;
		let y = this.j * w;
		noStroke();
		fill(red, green, blue);
		rect(x, y, w, w);
	}

	this.mark_as_current_cell = function(){
		let x = this.i * w;
		let y = this.y * w;
		noStroke();
		fill(0, 0, 0);
		rect(x, y, w, w);
		//circle(x, y, 20);
	}

	this.show = function(){
		//x left/right y up/down
		let x = this.i * w;
		let y = this.j * w;
		//stroke(255);
		stroke(0);
		strokeWeight(7);
		//fill(255);
		if(this.walls[0]){
			line(x, y, x + w, y); //top wall
		}
		if(this.walls[1]){
			line(x + w, y, x + w, y + w); //right wall
		}
		if(this.walls[2]){
			line(x, y + w, x + w, y + w); //bottom wall
		}
		if(this.walls[3]){
			line(x, y, x, y + w); //left wall
		}
		//change color out or inn if there is no wall to signify no wall with color instead of line
		if(!this.walls[4] && this.walls[5]){ 
			//color the cell differently than others in the maze plane to signify ability to go OUT to adjacent maze plane
			this.highlight(0, 255, 0); //out color
			//fill(0, 255, 255);
		}
		else if(!this.walls[5] && this.walls[4]){ 
			//color the cell differently than others in the maze plane to signify ability to go IN to adjacent maze plane
			this.highlight(153, 51, 255); //inn color
			//fill(255, 0, 255);
		}
		//3rd distinct color for if both out and inn
		else if(!this.walls[4] && !this.walls[5]){
			//color the cell differently than others in the maze plane to signify ability to go IN/OUT to adjacent maze plane
			this.highlight(255, 128, 0); //out and inn color
		}

		//color visited cells, shows the paths not out/in just left right up down
		//no note paying attention to visited since already have the whole maze as input
		//if(this.visited && this.walls[4] && this.walls[5]){
		if(this.walls[4] && this.walls[5]){
			noStroke();
			fill('magenta'); 
			rect(x, y, w, w);	
		}

		//draw circle on top of current cell to show current position
		if(index(this.i, this.j, this.k) == current_index){
			fill(0, 0, 0, 150); //the 4th arg is alpha signifying transparency, less is more transparent
			circle(x + w / 2, y + w / 2, w / 2);	
		}

		if(index(this.i, this.j, this.k) == goal_index){
			//fill(255, 255, 255, 150); //the 4th arg is alpha signifying transparency, less is more transparent
			//circle(x + w / 2, y + w / 2, w / 2);
			stroke("green");
			line(x, y, x + w, y + w);	
			line(x + w, y, x, y + w);	
		}

	}
}