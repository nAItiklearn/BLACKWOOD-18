let lines = document.querySelectorAll(".boot-line");

let num=0;

function showLine(){
    if(num<lines.length){
        lines[num].style.visibility="visible";
        num++;
        if(num==lines.length){
            setTimeout(showCorruption, 2000)
        }
        else{
            setTimeout(showLine, 500)
        }
    }
    
}

function showCorruption(){
    let area= document.getElementById("corruption");
    area.innerHTML="<p>CLOCK SOURCE: UNKNOWN</p>";
    setTimeout(function(){
        area.innerHTML+="<p>ATTEMPTING CLOCK RECOVERY...</P>";
    },1000);
}

showLine();

const terminal=document.getElementById("terminal-interface");
const input=document.getElementById("command-input");
const output =document.getElementById("terminal-output");
