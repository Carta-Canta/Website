//NON COMPLETO
let pages;
//Ottengo la lista dei file dal server
$.ajax({
    url: "../../lib/SearchTool/getFiles.php",
    type: "GET",
    async: false,
    success: function(data){
        pages = JSON.parse(data);
    }
});
let parser = new DOMParser();
let parsed;
let element;
pages.forEach(file => {
    console.log(file);
    let stop = false;
    $.ajax({
        url: file,
        type: "GET",
        async: false,
        success: function(data){
            parsed=parser.parseFromString(data, 'text/html'); //converto il testo grezzo in documento DOM
            text = parsed.getElementById("articolo").children;
            let k = 0;
            while(k<text.length && !stop){
                content = text[k].innerText;
                console.log(content);
                k++;
            }
        }
    })
});