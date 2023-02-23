let risultatoRicerca=""; // testo da mostrare in alto (Risultati ricerca: , La ricerca non ha prodotto risultati)
let defaultPage=document.getElementById("articoli").innerHTML;
let resultsLength=0;
function search(text, query, divID){
    //Ricarico il div di default
    document.getElementById("articoli").innerHTML=defaultPage;
    let results=[];
    let parser = new DOMParser();
    let parsed = parser.parseFromString(text, 'text/html'); //converto il testo grezzo in documento DOM in modo da poter eseguire la ricerca
    let element = "";
    let elementID = "articolo";
    let content = ""; //testo
    $("#articoli").css("display","none");
    $("#articoli *").css("display","none");
    //Carico l'array dei risultati
    element = parsed.getElementById(elementID).children;
    for (var k = 0; k < element.length; k++) {
        content = element[k].innerText;
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push(elementID);
            resultsLength++;
        }
    }
    for(let i=0; i<results.length; i++){
        document.getElementById(divID).style.display="";
        $("#" + divID + " *").css("display","");
    }
}
function beginSearch(){
    resultsLength = 0;
    let pages="";
    let query = document.getElementById("query").value;
    if(query){
        $.ajax({
            url: "../../lib/SearchTool/getFiles.php",
            type: "GET",
            async: false,
            success: function(data){
                pages = JSON.parse(data);
            }
        });
        for(let i=0; i<pages.length; i++){
            pages[i] = pages[i].replace("../","");
            pages[i] = pages[i].replace("/html","");
        }
        pages.forEach(file => {
            $.ajax({
                url: file,
                type: "GET",
                async: false,
                success: function(data){
                    let name = file.replace("../articoli/","");
                    name = name.replace(".html","");
                    search(data, query, name);
                }
            })
        });
        /*Codice per mostrare un messaggio sul risultato della ricerca (invece di innerHTML potrebbe essere necessario usare insertAdiacentHTML*/
        /*if(resultsLength!=0){
            document.getElementById(il_div_che_volete).innerHTML="<h1>Risultati ricerca:</h1><br>";
        }else{
            document.getElementById(il_div_che_volete).innerHTML="<h1>La ricerca non ha prodotto risultati</h1><br>";
        }*/
        $("#articoli").css("display","");
    }   
}

$("#query").on('keyup', (e) => {
    if (e.keyCode === 13) {
        try{
            beginSearch();
        }catch(e){
            //Aggiungete il testo da mostrare in caso di errore (invece di innerHTML potrebbe essere necessario usare insertAdiacentHTML)
            //document.getElementById(il_div_che_volete).innerHTML="";
            console.log(e);
        }   
    };
});