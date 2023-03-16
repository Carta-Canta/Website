"use strict";

var text = "";
$.ajax({
    url: "../html/articoli/index.html",
    type: "GET",
    async: false,
    success: function success(data) {
        text = data;
    }
});
var parser = new DOMParser();
var parsed = parser.parseFromString(text, 'text/html'); //converto il testo grezzo in documento DOM in modo da poter eseguire la ricerca
var element = parsed.getElementById("articoli").children;
var allDate = [];
for (var i = 0; i < element.length; i++) {
    var article = parser.parseFromString(element[i].innerHTML, 'text/html');
    var date = article.getElementById("date").innerHTML;
    date = date.split(" ");
    switch (date[1].toLowerCase()) {
        case "gennaio":
            {
                date[1] = "01";
                break;
            }
        case "febbraio":
            {
                date[1] = "02";
                break;
            }
        case "marzo":
            {
                date[1] = "03";
                break;
            }
        case "aprile":
            {
                date[1] = "04";
                break;
            }
        case "maggio":
            {
                date[1] = "05";
                break;
            }
        case "giugno":
            {
                date[1] = "06";
                break;
            }
        case "luglio":
            {
                date[1] = "07";
                break;
            }
        case "agosto":
            {
                date[1] = "08";
                break;
            }
        case "settembre":
            {
                date[1] = "09";
                break;
            }
        case "ottobre":
            {
                date[1] = "10";
                break;
            }
        case "novembre":
            {
                date[1] = "11";
                break;
            }
        case "dicembre":
            {
                date[1] = "12";
                break;
            }
    }
    var articleDate = new Date(date[1] + " " + date[0] + " " + date[2]);
    articleDate = articleDate.getTime();
    allDate.push(articleDate);
}
var max = void 0;
var pos = 0;
var recents = [];
for (var k = 0; k < 3; k++) {
    max = allDate[0];
    for (var _i = 0; _i < allDate.length; _i++) {
        if (allDate[_i] > max) {
            max = allDate[_i];
            pos = _i;
        }
    }
    recents[k] = pos;
    allDate[pos] = -200;
}
for (var _i2 = 0; _i2 < recents.length; _i2++) {
    var _pos = recents[_i2];
    var toShow = parser.parseFromString(element[_pos].innerHTML, 'text/html');
    var hrefs = toShow.getElementsByClassName("readArt");
    for (var _k = 0; _k < hrefs.length; _k++) {
        var newHref = hrefs[_k].getAttribute("href");
        newHref = "html/articoli/" + newHref;
        hrefs[_k].setAttribute("href", newHref);
    }
    toShow = toShow.children[0].children[1].children[0].innerHTML; // ottengo l'innerHTML del tag article
    document.getElementById("articleDiv").insertAdjacentHTML("afterbegin", toShow);
}