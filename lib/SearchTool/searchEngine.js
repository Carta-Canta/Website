let risultatoRicerca=""; // testo da mostrare in alto (Risultati ricerca: , La ricerca non ha prodotto risultati)
let defaultPage=document.getElementById("articoli").innerHTML;
let resultsLength=0;
let results=[];
function search(text, query, divID){
    //Ricarico il div di default
    document.getElementById("articoli").innerHTML=defaultPage;
    let parser = new DOMParser();
    let parsed = parser.parseFromString(text, 'text/html'); //converto il testo grezzo in documento DOM in modo da poter eseguire la ricerca
    let element = "";
    let elementID = "articolo";
    let content = ""; //testo
    $("#articoli").css("display","none");
    $("#articoli *").css("display","none");
    //Carico l'array dei risultati
    element = parsed.getElementById(elementID).children;
    let trovato = false;
    let k=0;
    while(k<element.length && !trovato){
        content = element[k].innerText;
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push(divID);
            resultsLength++;
            trovato=true;
        }
        k++;
    }
    
}
function beginSearch(){
    document.getElementById("results").innerHTML=`<h1 id="load">Caricamento in corso...<span class="loading" id="spinner"></span></h1>`
    document.getElementById("load").style.display="";
    setTimeout(()=>{
        results=[];
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
            for(let i=0; i<resultsLength; i++){
                let id = results[i];
                $("#" + id).css("display","");
                $("#" + id + " *").css("display","");
            }
            if(resultsLength!=0){
                document.getElementById("results").innerHTML="<h1>Risultati ricerca:</h1><br>";
            }else{
                document.getElementById("results").innerHTML="<h1>La ricerca non ha prodotto risultati</h1><br>";
            }
            $("#articoli").css("display","");
        }else{
            window.location.reload();
        }  
    },7000);
}

$("#query").on('keyup', (e) => {
    if (e.keyCode === 13) {
        try{
            beginSearch();
        }catch(e){
            //Aggiungete il testo da mostrare in caso di errore (invece di innerHTML potrebbe essere necessario usare insertAdiacentHTML)
            document.getElementById("results").innerHTML="<h1>Si è verificato un errore durante la ricerca</h1><br>";
            console.log(e);
        }   
    };
});