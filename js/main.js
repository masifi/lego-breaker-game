/**
 * Developer: Imad Hadi Hasan
 * Twitter: @imadmasifi
 * Date: 2015-06-01
 */
let WIDTH=10,
    HEIGHT=10,
    colors,
    nodes, 
    score_cont,
    temp_score_cont,
    score,
    temp_score,
    glassbreak,
    blockhover,
    removeLoop,
    sound,
    histogram;
function load() {
    colors=["f44336","9C27B0","03A9F4","4CAF50","FF9800"];
    let col=document.getElementsByClassName('col');
    let blocks, color , id;
    histogram=[0,0,0,0,0];
    for (let i = 0; i < WIDTH; i++) {
        blocks="";
        id="";
        for (let j = 0; j < HEIGHT; j++) {
            id = (i+1)+"-"+(j+1);
            color = colors[ (Math.floor(Math.random() * colors.length) + j ) % colors.length ] ;
            blocks+="<div style='background:#"+color+"' name='"+color+"' id='"+id+"' onclick='destroy(this.id,\""+color+"\")' class='blocks'>"+"</div>";
            histogram[colors.indexOf(color)]++;
        }
        col[i].innerHTML=blocks;	
    }
    updateHistogram();
    score=0;
    temp_score=0;
    score_cont = document.getElementById("score");
    temp_score_cont = document.getElementById("temp_score_cont");
    glassbreak = document.getElementById("glassbreak");
    blockhover = document.getElementById("blockhover");
    sound = document.getElementById("sound");
    score_cont.innerHTML=score;
    nodes=[];
}

//let index=0;
function remove() {
    if (nodes.length >1) {
        if(sound.value == 1) glassbreak.play();
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].remove();
            //glassbreak.playbackRate=2;
            //index++;
        }
        // TODO: removing elements with animation.
        //if(index== nodes.length){	
            //clearInterval(removeLoop);
            //glassbreak.pause();
            //glassbreak.currentTime=0;
            index=0;
            score+=temp_score;
            score_cont.innerHTML=score;
            temp_score_cont.style.display="none";
            nodes=[];
            let rows,cols,isEmpty=0;
                cols=document.getElementById("game_board").getElementsByClassName("col");
                histogram=[0,0,0,0,0];
            for (let i = 0; i < cols.length ; i++) {
                rows=cols[i].getElementsByClassName("blocks");
                if (rows.length == 0)
                    isEmpty++;
                for (let j = 0; j < rows.length; j++) {
                    rows[j].id= ( (i-isEmpty)+1)+"-"+(j+1);
                    let color=rows[j].getAttribute("name");
                    histogram[colors.indexOf(color)]++;				
                }	
            }
            updateHistogram();
        //}
    }
}
let hileight=function(x, y, color) {
    let xpp,xmm,ypp,ymm,notFound=false;
    xpp = (x+1) > 10 ? 10 : x+1;
    xmm = (x-1) < 1 ? 1 : x-1;
    ypp = (y+1) > 10 ? 10 : y+1;
    ymm = (y-1) < 1 ? 1 : y-1;

    let bt = document.getElementById( (x)+"-"+(ypp) );
    let bb = document.getElementById( (x)+"-"+(ymm) );
    let bl = document.getElementById( (xmm)+"-"+(y) );
    let br = document.getElementById( (xpp)+"-"+(y) );

    if( (bt != undefined) && (bt.getAttribute("name") == color) && (ypp != y) && (nodes.indexOf(bt)<0) ){
        nodes.push(bt);
        notFound=true;
        hileight(x, ypp, color);
    }
    if( (bb != undefined) && (bb.getAttribute("name") == color) && (ymm != y) && (nodes.indexOf(bb)<0) ){
        nodes.push(bb);
        notFound=true;
        hileight(x, ymm, color);
    }
    if( (bl != undefined) && (bl.getAttribute("name") == color) && (xmm != x) && (nodes.indexOf(bl)<0) ){
        nodes.push(bl);
        notFound=true;
        hileight(xmm, y, color);
    }
    if( (br != undefined) && (br.getAttribute("name") == color) && (xpp != x) && (nodes.indexOf(br)<0) ){
        nodes.push(br);
        notFound=true;
        hileight(xpp, y, color);
    }
}

function destroy(id, color) {
    let x,y, xpp,xmm,ypp,ymm;
    let dim=id.split("-");
    x=Math.trunc(dim[0]);
    y=Math.trunc(dim[1]);
    let b=document.getElementById(id);
    nodes.push(b);
    if (b.style.opacity == "0.6"){ 
        remove();
    } else { 
        temp_score=0;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.opacity="1";
        }
        nodes=[];
        temp_score_cont.style.display="none";
        hileight(x,y,color);

        if (nodes.length > 1) {
            if(sound.value == 1) blockhover.play();
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].style.opacity="0.6";
                temp_score+=(5 * nodes.length);
            }
            temp_score_cont.style.display="inline-block";
            temp_score_cont.innerHTML=nodes.length+" Blocks "+temp_score +" Points";
        }
    }
}

function updateHistogram() {
    let bars=document.getElementById("histogram").getElementsByClassName("bars");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.background= "#"+colors[i];
        bars[i].style.height=histogram[i]* 5 +"px";
        bars[i].innerHTML=histogram[i];
        bars[i].style.verticalAlign="bottom";
    }

}

function mute() {
    if (sound.value == 1 ) {
        sound.value =0;
        sound.innerHTML="Muted";
    } else {
        sound.value =1;
        sound.innerHTML="Sound";
    }
}

// start game
load();