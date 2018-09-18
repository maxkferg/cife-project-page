'use strict';

const cpx = require("cpx");

// Copy all the HTML files
let dest = 'dist';
let source = 'src/**/*.html';
cpx.copy(source, dest);

// Copy all the images
dest = 'dist';
source = 'src/images/*.{jpg,png,gif,ico}';
cpx.copy(source, dest);


// Copy all the images
dest = 'dist';
source = 'src/**/images/*.{jpg,png,gif,ico}';
cpx.copy(source, dest);

// Copy all the videos
dest = 'dist';
source = 'src/**/videos/*.{webm,mov}';
cpx.copy(source, dest);

// Copy all the videos
dest = 'dist';
source = 'src/uploads/uploads/**';
cpx.copy(source, dest);
