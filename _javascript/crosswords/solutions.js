let giusto = true;
let solutionArray="";
//Carico l'array delle soluzioni
function buildArray(type, maxX, maxY){
    type=type.toUpperCase();
    solutionArray = {[type]:[{}]};
    let id="";
    let i=0;
    let nomeArray=eval("righe"+type);
    let contenutoCella="";
    for(let yC=0; yC<maxY; yC++){
        contenutoCella = nomeArray[yC];
        contenutoCella=contenutoCella.split("");
        for(let xC=0; xC<maxX; xC++){
            id="x"+xC+",y"+yC;
            //array[nomeCruciverba][indice]=[{[coordinate]:"contenutoCella"}]
            solutionArray[type][i]=[{[id]:contenutoCella[xC]}];
            i++;
        }
    }
}

//Controllo le soluzioni inserite
function checkSolution(type, maxX, maxY){
    if(solutionArray.length==0){
        buildArray(type,maxX,maxY);
    }
    let id = "";
    let toCheck = "";
    let toCheckvalue = "";
    let i = 0;
    let result = "";
    type=type.toUpperCase();
    for(let k=0; k<maxY; k++){
        for(let j=0; j<maxX; j++){
            id="x"+j+",y"+k;
            //solutionArray[nomeCruciverba][indice a cui leggere][0][id]
            result = solutionArray[type][i][0][id];
            toCheck= document.getElementById(`${id}`);
            toCheckvalue = document.getElementById(`${id}`).value;
            toCheckvalue = toCheckvalue.toUpperCase();
            if(toCheckvalue!=result){
                toCheck.style.borderColor = "red";
                giusto=false;
            }else{
                if(toCheckvalue!=s){
                    toCheck.style.borderColor = "#2FFF8D"; // verde chiaro
                }
                
            }
            i++;
        }
    }
    if(giusto){
        setTimeout(()=>{
            alert("Il cruciverba è giusto");
        },100);
        
    }else{
        document.getElementById("showSol").style.display="inline-block";
    }
}

//Mostra le soluzioni
function showSolution(type, maxX, maxY){
    let i = 0;
    if(solutionArray.length==0){
        buildArray(type,maxX,maxY);
    }
    for(let k=0; k<maxY; k++){
        for(let j=0; j<maxX; j++){
            id="x"+j+",y"+k;
            //solutionArray[nomeCruciverba][indice a cui leggere][0][id]
            result = solutionArray[type][i][0][id];
            toShow= document.getElementById(`${id}`);
            if(result!=s){
                toShow.setAttribute("value",result);
                toShow.style.borderColor = "#2FFF8D"; // verde chiaro
            }
            i++;
        }
    }

}
