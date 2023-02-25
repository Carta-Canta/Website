"use strict";

var risultatoRicerca = ""; // testo da mostrare in alto (Risultati ricerca: , La ricerca non ha prodotto risultati)
var defaultPage = document.getElementById("articoli").innerHTML;
var resultsLength = 0;
var results = [];
function search(text, query, divID) {
    //Ricarico il div di default
    document.getElementById("articoli").innerHTML = defaultPage;
    var parser = new DOMParser();
    var parsed = parser.parseFromString(text, 'text/html'); //converto il testo grezzo in documento DOM in modo da poter eseguire la ricerca
    var element = "";
    var elementID = "articolo";
    var content = ""; //testo
    $("#articoli").css("display", "none");
    $("#articoli *").css("display", "none");
    //Carico l'array dei risultati
    element = parsed.getElementById(elementID).children;
    var trovato = false;
    var k = 0;
    while (k < element.length && !trovato) {
        content = element[k].innerText;
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push(divID);
            resultsLength++;
            trovato = true;
        }
        k++;
    }
}
function beginSearch() {
    var query = document.getElementById("query").value;
    var cont = 0;
    for (var i = 0; i < query.length; i++) {
        if (query[i] == " ") {
            cont++;
        }
    }
    if (cont == query.length) {
        query = "";
    }
    if (query) {
        document.getElementById("results").innerHTML = "<h4 class=\"title is-4\" id=\"loadShow\">Ricerca in corso...<span class=\"loading\" id=\"spinner\"></span></h4><br>";
        document.getElementById("loadShow").style.display = "";
        setTimeout(function () {
            // attendo 10 ms per fare in modo che venga mostrato lo spinner
            results = [];
            resultsLength = 0;
            var pages = "";
            $.ajax({
                url: "../../lib/SearchTool/getFiles.php",
                type: "GET",
                async: false,
                success: function success(data) {
                    pages = JSON.parse(data);
                }
            });
            for (var _i = 0; _i < pages.length; _i++) {
                pages[_i] = pages[_i].replace("../", "");
                pages[_i] = pages[_i].replace("/html", "");
            }
            pages.forEach(function (file) {
                $.ajax({
                    url: file,
                    type: "GET",
                    async: false,
                    success: function success(data) {
                        var name = file.replace("../articoli/", "");
                        name = name.replace(".html", "");
                        search(data, query, name);
                    }
                });
            });
            for (var _i2 = 0; _i2 < resultsLength; _i2++) {
                var id = results[_i2];
                $("#" + id).css("display", "");
                $("#" + id + " *").css("display", "");
            }
            if (resultsLength != 0) {
                document.getElementById("results").innerHTML = "<h4 class=\"title is-4\">Risultati ricerca:</h4><br>";
            } else {
                document.getElementById("results").innerHTML = "<h4 class=\"title is-4\">La ricerca non ha prodotto risultati</h4><br>";
            }
            $("#articoli").css("display", "");
        }, 10);
    } else {
        window.location.reload();
    }
}

$("#query").on('keyup', function (e) {
    if (e.keyCode === 13) {
        try {
            beginSearch();
        } catch (e) {
            //Aggiungete il testo da mostrare in caso di errore (invece di innerHTML potrebbe essere necessario usare insertAdiacentHTML)
            document.getElementById("results").innerHTML = "<h4 class=\"title is-4\">Si \xE8 verificato un errore durante la ricerca</h4><br>";
            console.log(e);
        }
    };
});