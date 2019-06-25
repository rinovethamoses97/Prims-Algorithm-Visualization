class Node{
    constructor(x_,y_,id_,vertices_){
        this.x=x_;
        this.y=y_;
        this.radius=15;
        this.id=id_;
        this.vertices=vertices_;
        this.cost=Infinity;
        this.inMst=false;
        this.parent=null;
    }
    show(){
        noFill();
        ellipse(this.x,this.y,this.radius*2,this.radius*2);
        stroke(255);
        text(this.id,this.x,this.y);
    }
}