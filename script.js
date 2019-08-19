let x, xStart = 0, xEnd = 0, xLeave = 0;
let y, yStart = 0, yEnd = 0, yLeave = 0;
let ctx;
let strokeStyle;
let strokeWidth;
let isDrawning = false;

function init () {

    this.canvasElement = document.getElementById('canvas');

    if (!this.canvasElement) {
        console.log('Ошибка! Canvas элемент не найден!');
        return;
    }

    ctx = this.canvasElement.getContext('2d'); //получаем контекст для рисования в 2д

    if (!ctx) {
        console.log('Ошибка: canvas.getContext не существует!');
        return;
    }

    this.btn = document.querySelector('.btn');
    this.width = document.getElementById('width');
    this.style = document.getElementById('color');

    strokeStyle = this.style.value;
    strokeWidth = this.width.value;

    this.listeners ();

}

function listeners () {

    this.canvasElement.onmousemove = this.mouseMove;

    let self = this;

    this.canvasElement.addEventListener("mousedown", (e) => {
        self.mouseDown(e);
    self.validateEvent(e);
});

    this.canvasElement.addEventListener("mouseup", (e) => {
        self.mouseUp(e);
    self.validateEvent(e);
});

    this.canvasElement.addEventListener("mouseout", (e) => {
        self.mouseLeave(e);
    self.validateEvent(e);
});

    this.style.addEventListener("change", (e) => {
        self.changeColor(this.style.value);
    self.validateEvent(e);
});

    this.width.addEventListener("change", (e) => {
        self.changeWidth(this.width.value);
    self.validateEvent(e);
});

    this.btn.addEventListener('click', () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    console.log('btn click');
});
}

function validateEvent(e) {
    if (!e || !e.target || !e.target.valueOf()) {
        console.log('error');
        return;
    }


    const handledValue = {
        startX: xStart,
        startY: yStart,
        endX: xEnd,
        endY: yEnd,
        width: strokeWidth,
        color: strokeStyle,
    };

    if(xLeave !== -1 && isDrawning === false) {
        handledValue.endX =  xLeave;
    } else {
        handledValue.endX =  xEnd;
    }
    if(yLeave !== -1 && isDrawning === false) {
        handledValue.endY =  yLeave;
    } else {
        handledValue.endY =  yEnd;
    }

    this.setModelNumberValue(handledValue);
};

function changeColor (newColor) {
    strokeStyle = newColor;
    console.log('change color', newColor);
    console.log('strokeStyle = ', strokeStyle);
}

function changeWidth (newWidth) {
    strokeWidth = parseInt(newWidth);
    console.log('change width', newWidth);
    console.log('strokeWidth = ', strokeWidth, typeof(strokeWidth));
};

function mouseDown (e) {

    const {layerX, layerY} = e;
    x = layerX;
    y = layerY;

    xStart = x;
    yStart = y;
    console.log('start coords', x, y);

    isDrawning = true;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(x, y);

    return {x:x, y:y};
}

function mouseUp(e) {
    const {layerX, layerY} = e;
    x = layerX;
    y = layerY;
    isDrawning = false;

    xEnd = x;
    yEnd = y;
    console.log('end coords', x, y);
};

function mouseMove(e) {
    if (isDrawning) {
        const {layerX, layerY} = e;
        x = layerX;
        y = layerY;

        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
        ctx.stroke();
    } else {
        x = -1;
        y = -1;
    }
}

function mouseLeave(e) {
    console.log('end coords11111', x, y);

    xLeave = x;
    yLeave = y;

    isDrawning = false;
}

function setModelNumberValue(val) {
    if (!val) {
        return;
    }
    model.color = val.color;
    model.width = val.width;
    model.startX = val.startX;
    model.startY = val.startY;
    model.endX = val.endX;
    model.endY = val.endY;

    return model;
}

init();
