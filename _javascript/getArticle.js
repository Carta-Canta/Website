let text = "";
$.ajax({
    url: "../html/articoli/index.html",
    type: "GET",
    async: false,
    success: function(data){
        text=data;
    }
});
let parser = new DOMParser();
let parsed = parser.parseFromString(text, 'text/html'); //converto il testo grezzo in documento DOM in modo da poter eseguire la ricerca
let element = parsed.getElementById("articoli").children;
let allDate=[];
for(let i=0; i<element.length; i++){
    let article = parser.parseFromString(element[i].innerHTML, 'text/html');
    let date = article.getElementById("date").innerHTML;
    date=date.split(" ");
    switch(date[1].toLowerCase()){
        case "gennaio":{
            date[1]="01";
            break;
        }
        case "febbraio":{
            date[1]="02";
            break;
        }
        case "marzo":{
            date[1]="03";
            break;
        }
        case "aprile":{
            date[1]="04";
            break;
        }
        case "maggio":{
            date[1]="05";
            break;
        }
        case "giugno":{
            date[1]="06";
            break;
        }
        case "luglio":{
            date[1]="07";
            break;
        }
        case "agosto":{
            date[1]="08";
            break;
        }
        case "settembre":{
            date[1]="09";
            break;
        }
        case "ottobre":{
            date[1]="10";
            break;
        }
        case "novembre":{
            date[1]="11";
            break;
        }
        case "dicembre":{
            date[1]="12";
            break;
        }
    }
    let articleDate = new Date(`${date[1]} ${date[0]} ${date[2]}`)
    articleDate=articleDate.getTime()
    allDate.push(articleDate);
}
let max;
let pos=0;
let recents=[];
for(let k=0; k<3; k++){
    max=allDate[0];
    for(let i=0; i<allDate.length; i++){
        if(allDate[i]>max){
            max=allDate[i];
            pos = i;
        }
    }
    recents[k]=pos;
    allDate[pos]=-200;
}
for(let i=0; i<recents.length; i++){
    let pos = recents[i];
    let toShow = parser.parseFromString(element[pos].innerHTML, 'text/html');
    let hrefs=toShow.getElementsByClassName("readArt");
    for(let k=0; k<hrefs.length; k++){
        let newHref = hrefs[k].getAttribute("href");
        newHref = "html/articoli/"  + newHref;
        hrefs[k].setAttribute("href",newHref);
    }
    toShow = toShow.children[0].children[1].children[0].innerHTML; // ottengo l'innerHTML del tag article
    document.getElementById("articleDiv").insertAdjacentHTML("afterbegin", toShow)
}