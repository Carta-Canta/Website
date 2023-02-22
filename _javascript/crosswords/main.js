//Genero la dropdown
const dropdown=document.getElementById("games");
let element="";
for(let i=0;i<cruciverba.length; i++){
    element = "element"+i;
    dropdown.innerHTML+=`<a id=${element} href="#">${cruciverba[i].NomeVisualizzato}</a>`;
}
//Imposto la larghezza minima del contenuto della dropdown in base alla larghezza del bottone
let btn = document.querySelector(".dropdownBtn");
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
document.getElementById("caret-down").addEventListener("click", () =>{
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
    //distruggo l'array delle soluzioni
    solutionArray="";
    document.getElementById("game").style.display="none";
    document.getElementById("definizioni").style.display="none";
    document.getElementById("clearBoth").style.display="none";
    document.getElementById("game").replaceChildren();
    document.getElementById("definizioni").replaceChildren();
    document.getElementById("spinner").style.display="inline-block";
    document.getElementById("loading").style.display="block";
    let j=0;
    const definitionJSONarray = definizioni[0][type.toString()];
    const ruleLength = definitionJSONarray.regole.length;
    setTimeout(()=>{ // attendo 300 ms per iniziare a effettuare la generazione perchè DOM potrebbe non rispondere
        //Scrivo le regole ottenute dall'array JSON
        document.getElementById("definizioni").insertAdjacentHTML("beforeend",`<b>REGOLE:</b><br>`)
        for(let i=0; i<ruleLength; i++){
            document.getElementById("definizioni").insertAdjacentHTML("beforeend",`${i+1}. ${definitionJSONarray.regole[i].text}<br>`);
        }
        
        //Scrivo le definizioni delle parole in orizzontale ottenute dall'array JSON
        let definitionLength = definitionJSONarray.orizzontali.length;
        document.getElementById("definizioni").insertAdjacentHTML("beforeend",`<br><div class="definitionType"><b>ORIZZONTALI:</b></div>`)
        for(let i=0; i<definitionLength; i++){ //orizzontali
            document.getElementById("definizioni").insertAdjacentHTML("beforeend",`${i+1}. ${definitionJSONarray.orizzontali[i].text}<br>`)
        }

        //Scrivo le definizioni delle parole in verticale ottenute dall'array JSON
        definitionLength = definitionJSONarray.verticali.length;
        document.getElementById("definizioni").insertAdjacentHTML("beforeend",`<br><div class="definitionType"><b>VERTICALI:</b></div>`)
        for(let i=0; i<definitionLength; i++){ //orizzontali
            document.getElementById("definizioni").insertAdjacentHTML("beforeend",`${i+1}. ${definitionJSONarray.verticali[i].text}<br>`)
        }

        //Inizio a generare la tabella
        let sol = eval("righe"+type);
        for(let i=0; i<y; i++){
            for(let k=0; k<x; k++){
                let id="x"+k+","+"y"+i;
                //${sol[i][k]}
                if(sol[i][k]==s){ //se il carattere salvato nelle soluzioni è = al carattere di escape aggiungo una casella invisibile
                    document.getElementById("game").innerHTML+=`<nobr><input disabled type="text" id=${id} class="space" value="${s}" size="1" maxlength="1" spellcheck="false">&nbsp;</nobr>`;
                }else{
                    document.getElementById("game").innerHTML+=`<nobr><input type="text" id=${id} value="" size="1" maxlength="1" spellcheck="false">&nbsp;</nobr>`;
                    document.getElementById(id).addEventListener("click", ()=>{
                        document.getElementById(id).style.borderColor="black";
                    });
                }
                j++
            }
            document.getElementById("game").innerHTML+=`<br>`
        }
        //mostro gli aiuti
        const aiutiLength = aiuti[0][type.toString()].length;
        for(let i=0; i<aiutiLength; i++){
            let coordinata = aiuti[0][type.toString()][i];
            let splitted = coordinata.split(",");
            let valX = splitted[0].replace("x","");
            let valY = splitted[1].replace("y","");
            document.getElementById(coordinata).setAttribute("value",sol[valY][valX]); // siccome è memorizzato per riga devo fare [y][x]
        }
        document.getElementById("game").innerHTML+=`<button type="submit" class="checkSolutionbtn" onclick="checkSolution('${type}','${x}','${y}')">Controlla</button>`
        document.getElementById("game").innerHTML+=`<button type="submit" class="showSolutionbtn" id="showSol" onclick="showSolution('${type}','${x}','${y}')">Mostra soluzioni</button>`
        //Mantengo premuto il bottone per far vedere l'animazione
        let btn = document.querySelector(".checkSolutionbtn");
        btn.addEventListener("click",()=>{
            btn.classList.add('btnActive');
            setTimeout(()=>{
                btn.classList.remove('btnActive');
            },1600)
        })
        document.getElementById("clearBoth").style.display="";
        document.getElementById("spinner").style.display="none";
        document.getElementById("loading").style.display="none";
        document.getElementById("game").style.display="block";
        document.getElementById("definizioni").style.display="block";
    },300)
    
    
}
