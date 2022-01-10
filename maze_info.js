let cols = 5;
let rows = 5;
let innieouties = 5;

let cell_walls = [
	[1,1,0,1,1,1],
	[1,0,0,1,1,1],
	[1,0,1,0,1,1],
	[1,0,1,0,1,0],
	[1,1,1,0,1,1],
	[0,1,1,1,1,0],
	[0,1,0,1,1,1],
	[1,0,1,1,1,0],
	[1,0,1,0,1,1],
	[1,1,1,0,1,0],
	[1,0,0,1,1,1],
	[0,1,1,0,1,1],
	[1,0,0,1,1,1],
	[1,0,1,0,1,1],
	[1,1,0,0,1,1],
	[0,1,0,1,1,1],
	[1,0,1,1,1,0],
	[0,1,1,0,1,1],
	[1,1,0,1,1,0],
	[0,1,1,1,1,0],
	[0,0,1,1,1,1],
	[1,0,1,0,1,1],
	[1,1,1,0,1,0],
	[0,0,1,1,1,1],
	[1,1,1,0,1,0],
	[1,0,1,1,1,0],
	[1,0,1,0,1,1],
	[1,1,1,0,1,0],
	[1,0,1,1,0,0],
	[1,1,1,0,1,0],
	[1,0,1,1,0,1],
	[1,0,1,0,1,1],
	[1,1,1,0,0,1],
	[1,0,1,1,1,0],
	[1,1,1,0,0,1],
	[1,0,0,1,1,0],
	[1,0,1,0,1,1],
	[1,1,0,0,1,1],
	[1,0,1,1,1,0],
	[1,1,0,0,1,1],
	[0,1,0,1,1,1],
	[1,1,0,1,0,1],
	[0,0,1,1,1,0],
	[1,1,1,0,0,1],
	[0,1,1,1,0,1],
	[0,1,1,1,1,1],
	[0,1,1,1,1,0],
	[1,1,1,1,0,0],
	[1,0,1,1,1,0],
	[1,1,1,0,0,1],
	[1,1,0,1,0,1],
	[1,1,1,1,1,0],
	[1,1,1,1,0,0],
	[1,1,1,1,0,1],
	[1,1,1,1,0,0],
	[0,0,1,1,1,1],
	[1,1,1,0,1,0],
	[1,1,0,1,1,0],
	[1,1,1,1,0,0],
	[1,1,0,1,1,1],
	[1,0,1,1,0,1],
	[1,1,1,0,1,0],
	[0,1,1,1,1,0],
	[1,0,1,1,0,1],
	[0,1,0,0,1,1],
	[1,1,0,1,1,0],
	[1,0,1,1,1,0],
	[1,1,1,0,0,1],
	[1,0,1,1,1,0],
	[0,1,1,0,1,1],
	[0,0,1,1,1,1],
	[1,1,1,0,0,1],
	[1,1,1,1,0,0],
	[1,0,1,1,0,1],
	[1,1,1,0,1,0],
	[1,0,1,1,1,0],
	[1,1,1,0,0,1],
	[1,1,0,1,0,1],
	[1,0,1,1,1,0],
	[1,1,1,0,0,0],
	[1,1,0,1,1,0],
	[1,1,1,1,0,0],
	[0,1,1,1,0,1],
	[1,1,1,1,0,0],
	[1,1,0,1,1,0],
	[0,1,0,1,1,1],
	[1,1,1,1,0,1],
	[1,0,1,1,0,1],
	[1,0,1,0,1,1],
	[0,1,1,0,1,1],
	[0,1,1,1,0,1],
	[1,1,0,1,0,0],
	[1,0,0,1,1,1],
	[1,1,1,0,0,1],
	[1,1,1,1,1,0],
	[1,0,1,1,1,1],
	[0,1,1,0,1,1],
	[0,1,1,1,0,1],
	[1,0,1,1,1,0],
	[1,1,1,0,0,1],
	[1,1,0,1,0,1],
	[1,0,0,1,1,1],
	[1,0,1,0,1,1],
	[1,1,1,0,0,1],
	[1,1,1,1,0,1],
	[0,1,0,1,0,1],
	[0,1,1,1,0,1],
	[1,1,0,1,1,1],
	[1,1,0,1,0,1],
	[1,1,0,1,0,1],
	[0,1,0,1,1,1],
	[1,0,0,1,1,1],
	[0,1,0,0,1,1],
	[0,0,1,1,1,1],
	[0,1,1,0,1,1],
	[0,1,0,1,1,1],
	[0,1,1,1,0,1],
	[0,1,0,1,1,1],
	[1,0,1,1,1,1],
	[1,1,0,0,0,1],
	[0,0,1,1,1,1],
	[1,0,1,0,1,1],
	[0,1,1,0,1,1],
	[1,0,1,1,0,1],
	[0,1,1,0,1,1],
]