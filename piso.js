class Piso {
    constructor(posX, posY, lar, alt){
        var config = {
            isStatic: true
        }

        this.body = Bodies.rectangle(posX, posY, lar, alt, config);
        World.add(world, this.body);
        this.largura = lar;
        this.altura = alt;
    }

    exibir(){
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        rect(pos.x, pos.y, this.largura, this.altura);
        pop();
    }
}