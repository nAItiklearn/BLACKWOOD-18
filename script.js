let lines = document.querySelectorAll(".boot-line");
let track= new Audio("assets/spooky.wav");

track.loop=true;
let scareSound=new Audio("assets/laugh.mp3")

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
        area.innerHTML+="<p>ATTEMPTING CLOCK RECOVERY...</p>";
    },1000);
    setTimeout(function(){
        area.innerHTML+="<p>RECOVERY FAILED..</p>";
    },2000);
    setTimeout(function(){
        area.innerHTML+="<p>FALLBACK TERMINAL LOADED. </p>";
    },3000);
    setTimeout(function(){
        terminal.style.display="block";
        input.focus();

    },4000);
}

showLine();

const terminal=document.getElementById("terminal-interface");
const input=document.getElementById("command-input");
const output =document.getElementById("terminal-output");


input.addEventListener("keydown",
    function(event){

        if(event.key=="Enter"){
            let command = input.value.trim();
            if(command!=""){
                processCommand(command)
            }
            input.value="";
        }
    }


)
function processCommand(command){
    let cmd =command.toLowerCase();
    output.innerHTML+=`<div class="command-block"><p>BLACKWOOD</p>${command}</p></div>`;
   
    if(cmd==="help"){   //will list all the commands avaiable
        const commands =[
            {name:"help",       desc:"list all commands"},
            {name:"about",      desc:"about BLACKWOOD"},
            {name:"clear",      desc:"clear terminal"},
            {name:"disturb",     desc:"dont" },
            {name:"audio",      desc:"just audio"},
            {name:"manifesto",   desc:"read last entry"}

        ];
        let htmlOutput = "<p>---------</p><p>AVAILABLE COMMANDS</p><p>-------</p>"
        commands.forEach(c => {    //automatic formatting
            const padding = "&nbsp;".repeat(12-c.name.length);
            htmlOutput+= `<p>${c.name}${padding}${c.desc}</p>`;

        });
        output.innerHTML+=htmlOutput;
    }
    else if(cmd==="about"){
        output.innerHTML+=`
        <p>BLACKWOOD OS v2.18/M1</p>
        <p>BLACKWOOD SYSTEMS</p>
        <p>TERMINAL INTERFACE</p>
        <p>STATUS:UNKNOWN</p>
        `;
    }
    else if(cmd==="clear"){
        output.innerHTML ="";
        track.pause();
        track.currentTime =0;  //so that it starts from beginning
    }
    else if (cmd === "audio") {

    track.play()
        .then(function() {

            output.innerHTML +=
                "<p>AUDIO PLAYING...</p>";

        })

        .catch(function(error) {

            output.innerHTML +=
                "<p>AUDIO ERROR: " + error.name + "</p>";

            console.error("Audio error:", error);

        });

}
    else if(cmd==="disturb"){  //will display jumpscare
        let overlay=document.getElementById("jumpscare");
        scareSound.play()
        overlay.style.display="flex" //none->flex
        setTimeout(()=>{
            overlay.style.display="none";
            scareSound.pause();
            scareSound.currentTime=0;
        },3500);

    }
    else if(cmd ==="manifesto"){  //prints a creepy text with glitch
        output.style.backgroundColor= "#2b0000";
        output.style.transform="skewX(-10deg)scaleY(1.05)";
        output.style.filter="hue-rotate(90deg) blur(0.5px)";

        output.innerHTML+=`
            <p class="glitch-text" style="color:#ff3333;font-weight:bold;"> >> OPENING FILE: /home/blackwood/journal_backup.log >> CORRUPTION DETECTED: 42% of sectors unreadable. Attempting recovery...</p>
            <p>"[10.31.2004 - 02:14 AM] 
               It isn't a file permission error. I locked the root directory,
               but something is writing to the kernel logs while I'm away from the keyboard. The lines keep repeating:"</p>
            `;
            setTimeout(()=>{
                output.innerHTML+="<p>0x00F3: HE CAN SEE THE CURSOR</p>";
            },900);
            setTimeout(()=>{
                output.innerHTML+="<p>0x00F4: HE CAN SEE THE CURSOR</p>";
            },1800);
            setTimeout(()=>{
                output.style.backgroundColor="";
                output.style.transform="";
                output.style.filter="";
            },2500);
        }
    else {
        output.innerHTML+="<p>   UNKNOWN COMMAND   "+  command  +"</p>"

    }
}