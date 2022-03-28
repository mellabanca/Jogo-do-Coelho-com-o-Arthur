class Chave{
    constructor(corpo1,corpo2){
        var ultimo=corpo1.body.bodies.length-2;
        this.chave = Constraint.create({
        bodyA:corpo1.body.bodies[ultimo],
        pointA:{x:0,y:0},
        bodyB:corpo2,
        pointB:{x:0,y:0},
        length:-10,
        stiffness:0.01
        }

            

        )
        World.add(engine.world,this.chave)
    }
}