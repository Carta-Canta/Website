window.onload = hide();

// Nascondo i div del risultato della ricerca
function hide(){
    const array = JSON.stringify(data);
    const obj = JSON.parse(array);
    for(var i=0; i<obj.length; i++){
        document.getElementById(obj[i].show).style.display="none";
    }
}

// Effettuo la ricerca
function search(){
    hide();
    var nomeArticolo=document.getElementById("nomeArticolo").value.toLowerCase();
    var dataInizio=document.getElementById("dataInizio").value;
    var dataInizioToMs="";
    var dataFine=document.getElementById("dataFine").value;
    var dataFineToMs="";
    // Converto la data di inizio in millisecondi
    if(dataInizio){
        var splitted=dataInizio.split('-');
        dataInizio= new Date(splitted[0], splitted[1]-1, splitted[2]);
        dataInizioToMs = dataInizio.getTime();
    }
    // Converto la data di fine in millisecondi
    if (dataFine){
        var splitted=dataFine.split('-');
        dataFine= new Date(splitted[0], splitted[1]-1, splitted[2]);
        dataFineToMs = dataFine.getTime();
    }
    
    var searched = []; //Array del risultato della ricerca
    var k = 0; //Contatore risultati di ricerca
    const array = JSON.stringify(data);
    const obj = JSON.parse(array);

    //Controllo se l'array json contiene il dato desiderato
    for(var i=0; i<obj.length; i++){
        var splitted = obj[i].Data.split('-');
        var dataJSON= new Date(splitted[0], splitted[1]-1, splitted[2]);
        var dataJSONToMs = dataJSON.getTime();
        if(nomeArticolo && !dataInizio && !dataFine){
            if((obj[i].Nome).includes(nomeArticolo)){
                searched.push(obj[i].show);
                k++;
            }
        } else if (!nomeArticolo){
            if(dataInizio && !dataFine){
                if(dataInizioToMs<=dataJSONToMs){
                    searched.push(obj[i].show);
                    k++;
                }
            } else if (!dataInizio && dataFine) {
                if((dataFineToMs>=dataJSONToMs)){
                    searched.push(obj[i].show);
                    k++;
                }
            } else if (dataInizio && dataFine){
                if((dataInizioToMs<=dataFineToMs) && (dataInizioToMs<=dataJSONToMs) && dataFineToMs>=dataJSONToMs){
                    searched.push(obj[i].show);
                    k++;
                }
            }
        } else if (nomeArticolo){
            if((obj[i].Nome).includes(nomeArticolo)){
                if(dataInizio && !dataFine){
                    if(dataInizioToMs<=dataJSONToMs){
                        searched.push(obj[i].show);
                        k++;
                    }
                } else if (!dataInizio && dataFine) {
                    if((dataFineToMs>=dataJSONToMs)){
                        searched.push(obj[i].show);
                        k++;
                    }
                } else if (dataInizio && dataFine){
                    if((dataInizioToMs<=dataFineToMs) && (dataInizioToMs<=dataJSONToMs) && dataFineToMs>=dataJSONToMs){
                        searched.push(obj[i].show);
                        k++;
                    }
                }
            }
        }
    };
    
    //Mostro i div contenenti il risultato e mostro la scritta con la quantità di risultati trovati
    if(k!=0){
        if(k==1){
            document.getElementById("nRisultati").innerHTML = "La ricerca ha prodotto " + k + " risultato";
        }else{
            document.getElementById("nRisultati").innerHTML = "La ricerca ha prodotto " + k + " risultati";
        }
        
        document.getElementById("nRisultati").style.display = "";
        for(var i=0; i<k; i++){
            document.getElementById(searched[i]).style.display="block";
        } 
    }else{
        document.getElementById("nRisultati").innerHTML = "La ricerca non ha prodotto risultati";
        document.getElementById("nRisultati").style.display = "";
    }
}