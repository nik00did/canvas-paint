let x, xStart, xEnd, xLeave;
let y, yStart, yEnd, yLeave;
let ctx;
let strokeStyle;
let strokeWidth;
let isDrawning = false;

let page = {

    init: function () {
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

        this.listeners();
    },

    listeners: function () {

        let self = this;

        this.canvasElement.onmousedown = this.onMouseDown;
        this.canvasElement.onmouseup = this.onMouseUp;
        this.canvasElement.onmousemove = this.onMouseMove;
        this.canvasElement.onmouseleave = this.onMouseLeave;

        // this.canvasElement.addEventListener("mousedown", (e) => {
        //     self.mouseDown(this.style.value);
        //     self.validateEvent(e);
        // });
        //
        // this.canvasElement.addEventListener("mouseup", (e) => {
        //     self.mouseUp(this.style.value);
        //     self.validateEvent(e);
        // });
        //
        // this.canvasElement.addEventListener("mousemove", (e) => {
        //     self.mouseMove(this.style.value);
        //     self.validateEvent(e);
        // });
        //
        // this.canvasElement.addEventListener("mouseout", (e) => {
        //     self.mouseLeave(this.style.value);
        //     self.validateEvent(e);
        // });

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
    },

    validateEvent: function (e) {
        if (!e || !e.target || !e.target.value){
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

        endX = xEnd ? xEnd : xLeave;
        endY = yEnd ? yEnd : yLeave;

        // if(isNaN(handledValue)){
        //     console.log('not a number');
        //     return;
        // }

        this.setModelNumberValue(handledValue);
    },

    changeColor: function (newColor) {
        strokeStyle = newColor;
        console.log('change color', newColor);
        console.log('strokeStyle = ', strokeStyle);
    },

    changeWidth: function (newWidth) {
        strokeWidth = parseInt(newWidth);
        console.log('change width', newWidth);
        console.log('strokeWidth = ', strokeWidth, typeof(strokeWidth));
    },

    onMouseDown: function (e) {

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
    },

    onMouseUp: function (e) {
        const {layerX, layerY} = e;
        x = layerX;
        y = layerY;
        isDrawning = false;

        // ctx.lineTo(x, y);
        // ctx.stroke();

        xEnd = x;
        yEnd = y;
        console.log('end coords', x, y);
    },

    onMouseMove: function(e) {
        if (isDrawning) {
            const {layerX, layerY} = e;
            x = layerX;
            y = layerY;

            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
            ctx.stroke();
        }
    },

    onMouseLeave: function(e) {
        console.log('end coords11111', x, y);

        xLeave = x;
        yLeave = y;

        isDrawning = false;
    },

    setModelNumberValue: function (val) {
        if (!val) {
            return;
        }
        model.color = val.color;
        model.width = val.width;
        model.startX = val.startX;
        model.startY = val.startY;
        model.endX = val.endX;
        model.endY = val.endY;
    },

}

window.addEventListener("load",function(){
    page.init();
})