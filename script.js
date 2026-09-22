let lines = document.querySelectorAll(".boot-line");

let num=0;

function showLine(){
    if(num<lines.length){
        lines[num].style.visibility="visible";
        num++;
        setTimeout(showLine, 300)
    }
}
showLine()