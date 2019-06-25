var nodes=[];
var adj=[
    [0,4,0,0,0,0,0,8,0],
    [4,0,8,0,0,0,0,11,0],
    [0,8,0,7,0,4,0,0,2],
    [0,0,7,0,9,14,0,0,0],
    [0,0,0,9,0,10,0,0,0],
    [0,0,4,14,10,0,2,0,0],
    [0,0,0,0,0,2,0,1,6],
    [8,11,0,0,0,0,1,0,7],
    [0,0,2,0,0,0,6,7,0]
];
var mst=[];
var mstStarted=false;
function setup(){
    createCanvas(500,500);
    background(0);
}
function draw(){
    background(0);
    if(mstStarted){
        frameRate(1);
        var currentNode=get_mst();
        for(var i in nodes){
            if(currentNode && nodes[i].id==currentNode.id){
                stroke(0,0,255);
                nodes[i].show();
            }
            else{
                stroke(255);
                nodes[i].show();
            }
            if(nodes[i].parent!=null){
                stroke(255,0,0);
                line(nodes[i].x,nodes[i].y,nodes[i].parent.x,nodes[i].parent.y);
                stroke(255);
                text(nodes[i].vertices[nodes[i].parent.id],(nodes[i].x+nodes[i].parent.x)/2,(nodes[i].y+nodes[i].parent.y)/2)
            }
        }
    }
    else{
        stroke(255);
        noFill();
        rect(10,10,50,20);        
        text("MST",10+10,10+15);
        for(var i in nodes){
            nodes[i].show();
            if(nodes.length==adj.length){
                for(var j=nodes[i].id+1;j<nodes[i].vertices.length;j++){
                    if(nodes[i].vertices[j]!=0){
                        stroke(255,0,0);
                        noFill();
                        line(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y);
                        stroke(255);
                        text(nodes[i].vertices[j],(nodes[i].x+nodes[j].x)/2,(nodes[i].y+nodes[j].y)/2)
                    }
                }
            }
        }
    }
}
function get_min(){
    var minValue=Infinity;
    var minNode;
    for(var i in nodes){
        if(!nodes[i].inMst && nodes[i].cost<minValue){
            minValue=nodes[i].cost;
            minNode=nodes[i];
        }
    }
    return minNode;
}
function get_mst(){
    nodes[0].cost=0;
    if(mst.length!=nodes.length){
        var minNode=get_min();
        console.log(minNode);
        mst.push(minNode);
        minNode.inMst=true;
        for(var i=0;i<minNode.vertices.length;i++){
            if(minNode.vertices[i]!=0){
                if(nodes[i].cost>minNode.vertices[i] && !nodes[i].inMst){
                    nodes[i].cost=minNode.vertices[i];
                    nodes[i].parent=minNode;
                }
            }
        }
        return minNode;
    }
    else{
        console.log("Done");
        noLoop();
        return false;
    }
}
function keyPressed(){
    if(nodes.length<adj.length && keyCode==32){
        nodes.push(new Node(mouseX,mouseY,nodes.length,adj[nodes.length]));
    }
}
function mousePressed(){
    if(mouseX>=10 && mouseX<=60 && mouseY>=10 && mouseY<=30){
        mstStarted=true;
    }
}