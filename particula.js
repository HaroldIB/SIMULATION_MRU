function Particula  (radio, color){
    this.radio = radio;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
}

Particula.prototype.draw = function(context){
    context.fillStyle = this.color;
    context.beginPath();
    context.globalCompositeOperation = "source-over";
    context.arc(this.x, this.y, this.radio, 0, 2*Math.PI, true);
    context.closePath();
    context.fill();
}   