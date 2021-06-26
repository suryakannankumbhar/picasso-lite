let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight * 0.6;
let context = canvas.getContext('2d');
let canvasBackground = 'white';
context.fillStyle = canvasBackground;
context.fillRect(0, 0, canvas.width, canvas.height);
let draw_color = 'black';
let stroke_width = '2';
let is_drawing = false;
let restoreArray = [];
let index = -1;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', stop, false);

canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function change_color(element) {
    draw_color = element.style.backgroundColor;
}

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
    );
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(
            event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop
        );
        context.strokeStyle = draw_color;
        context.lineWidth = stroke_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}

function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();

    if (event.type != 'mouseout') {
        restoreArray.push(
            context.getImageData(0, 0, canvas.width, canvas.height)
        );
        index += 1;
    }
}

function clearCanvas() {
    context.fillStyle = canvasBackground;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log('working');

    restoreArray = [];
    index = -1;
}

function undoLast() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index -= 1;
        restoreArray.pop();
        context.putImageData(restoreArray[index], 0, 0);
    }
}
