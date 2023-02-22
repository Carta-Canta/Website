//Genero la dropdown
const dropdown=document.getElementById("games");
let element="";
for(let i=0;i<cruciverba.length; i++){
    element = "element"+i;
    dropdown.innerHTML+=`<a id=${element} href="#">${cruciverba[i].Nome}</a>`;
}
//Imposto la larghezza minima del contenuto della dropdown in base alla larghezza del bottone
let btn = document.querySelector("button#dropdownBtn.button");
let widthBtn = btn.clientWidth +"px";
dropdown.style.minWidth = widthBtn;

//Aggiungo gli EventListener alla dropdown
for(let i=0;i<cruciverba.length; i++){
    element = "element"+i;
    let x = cruciverba[i].x;
    let y = cruciverba[i].y;
    let nome = cruciverba[i].Nome;
    document.getElementById(element).addEventListener("click", () => {
        generate(x, y, nome.toUpperCase());
    });
}

//Funzione per mostrare il contenuto della dropdown
function showGames(){
    document.getElementById("games").style.display="block";
}

//faccio in modo che quando si clicca l'immagine nel bottone mostri i giochi
document.getElementById("dropdownBtn").addEventListener("click", () =>{     //bisogna fixare qui che ti mostri le difficolta' anche premento il bottone e non solo l'immagine, ho provbato a mettere l'id del bottone ma sono disabile e non va
    showGames();
});

//Nascondo i contenuti della dropdown se clicco nello schermo
window.addEventListener("click", (event)=>{
    if ((!event.target.matches('.dropdownBtn')) && (!event.target.matches('.caret-down'))) {
        document.getElementById("games").style.display="none";
    }
})

//Genero la tabella del cruciverba in base ai parametri passati alla funzione
function generate(x,y, type){
    document.getElementById("game").style.display="none";
    document.getElementById("definizioni").style.display="none";
    document.getElementById("game").replaceChildren();
    document.getElementById("definizioni").replaceChildren();

    let j=0;
    const definitionJSONarray = definizioni[0][type.toString()];
    let definitionLength = definitionJSONarray.orizzontali.length;
    document.getElementById("definizioni").insertAdjacentHTML("beforeend",`<div class="definitionType"><b>ORIZZONTALI:</b></div>`)
    for(let i=0; i<definitionLength; i++){ //orizzontali
        document.getElementById("definizioni").insertAdjacentHTML("beforeend",`${i+1}. ${definitionJSONarray.orizzontali[i].text}<br>`)
    }
    definitionLength = definitionJSONarray.verticali.length;
    document.getElementById("definizioni").insertAdjacentHTML("beforeend",`<div class="definitionType"><b>VERTICALI:</b></div>`)
    for(let i=0; i<definitionLength; i++){ //orizzontali
        document.getElementById("definizioni").insertAdjacentHTML("beforeend",`${i+1}. ${definitionJSONarray.verticali[i].text}<br>`)
    }
    let sol = eval("righe"+type);
    for(let i=0; i<y; i++){
        for(let k=0; k<x; k++){
            let id="x"+k+","+"y"+i;
            if(sol[i][k]===s){
                document.getElementById("game").innerHTML+=`<nobr><input disabled type="text" id=${id} class="space" value="${s}" size="1" maxlength="1" spellcheck="false">&nbsp;</nobr>`;
            }else{
                document.getElementById("game").innerHTML+=`<nobr><input type="text" id=${id} value="${sol[i][k]}" size="1" maxlength="1" spellcheck="false">&nbsp;</nobr>`;
                document.getElementById(id).addEventListener("click", ()=>{
                    document.getElementById(id).style.borderColor="black";
                });
            }
            j++
        }
        document.getElementById("game").innerHTML+=`<br>`
    }
    document.getElementById("game").innerHTML+=`<button type="submit" class="checkSolutionbtn" onclick="checkSolution('${type}','${x}','${y}')">Controlla</button>`
    //Mantengo premuto il bottone per far vedere l'animazione
    let btn = document.querySelector(".checkSolutionbtn");
    btn.addEventListener("click",()=>{
        btn.classList.add('btnActive');
        setTimeout(()=>{
            btn.classList.remove('btnActive');
        },1600)
    })

    document.getElementById("game").style.display="block";
    document.getElementById("definizioni").style.display="block";

}
