"use strict";

//Genero la lista dei bottoni
var btnList = document.getElementById("games");
var element = "";
for (var i = 0; i < cruciverba.length; i++) {
    element = "element" + i;
    btnList.innerHTML += "<button id=" + element + " href=\"#\" class=\"button\" style=\"margin-right: 10px\">" + cruciverba[i].NomeVisualizzato + "</button>";
}

//Aggiungo gli EventListener ai bottoni

var _loop = function _loop(_i) {
    element = "element" + _i;
    var x = cruciverba[_i].x;
    var y = cruciverba[_i].y;
    var nome = cruciverba[_i].Nome;
    document.getElementById(element).addEventListener("click", function () {
        generate(x, y, nome.toUpperCase());
    });
};

for (var _i = 0; _i < cruciverba.length; _i++) {
    _loop(_i);
}

//Genero la tabella del cruciverba in base ai parametri passati alla funzione
function generate(x, y, type) {
    //distruggo l'array delle soluzioni
    solutionArray = "";
    document.getElementById("game").style.display = "none";
    document.getElementById("definizioni").style.display = "none";
    document.getElementById("clearBoth").style.display = "none";
    document.getElementById("game").replaceChildren();
    document.getElementById("definizioni").replaceChildren();
    document.getElementById("load").style.display = "block";
    var j = 0;
    var definitionJSONarray = definizioni[0][type.toString()];
    var ruleLength = definitionJSONarray.regole.length;
    setTimeout(function () {
        // attendo 300 ms per iniziare a effettuare la generazione perchè DOM potrebbe non rispondere
        //Scrivo le regole ottenute dall'array JSON
        document.getElementById("definizioni").insertAdjacentHTML("beforeend", "<b>REGOLE:</b><br>");
        for (var _i2 = 0; _i2 < ruleLength; _i2++) {
            document.getElementById("definizioni").insertAdjacentHTML("beforeend", _i2 + 1 + ". " + definitionJSONarray.regole[_i2].text + "<br>");
        }

        //Scrivo le definizioni delle parole in orizzontale ottenute dall'array JSON
        var definitionLength = definitionJSONarray.orizzontali.length;
        document.getElementById("definizioni").insertAdjacentHTML("beforeend", "<br><div class=\"definitionType\"><b>ORIZZONTALI:</b></div>");
        for (var _i3 = 0; _i3 < definitionLength; _i3++) {
            //orizzontali
            document.getElementById("definizioni").insertAdjacentHTML("beforeend", _i3 + 1 + ". " + definitionJSONarray.orizzontali[_i3].text + "<br>");
        }

        //Scrivo le definizioni delle parole in verticale ottenute dall'array JSON
        definitionLength = definitionJSONarray.verticali.length;
        document.getElementById("definizioni").insertAdjacentHTML("beforeend", "<br><div class=\"definitionType\"><b>VERTICALI:</b></div>");
        for (var _i4 = 0; _i4 < definitionLength; _i4++) {
            //orizzontali
            document.getElementById("definizioni").insertAdjacentHTML("beforeend", _i4 + 1 + ". " + definitionJSONarray.verticali[_i4].text + "<br>");
        }

        //Inizio a generare la tabella
        var sol = eval("righe" + type);
        for (var _i5 = 0; _i5 < y; _i5++) {
            var _loop2 = function _loop2(k) {
                var id = "x" + k + "," + "y" + _i5;
                //${sol[i][k]}
                if (sol[_i5][k] == s) {
                    //se il carattere salvato nelle soluzioni è = al carattere di escape aggiungo una casella invisibile
                    document.getElementById("game").innerHTML += "<nobr><input disabled type=\"text\" id=" + id + " class=\"space\" value=\"" + s + "\" size=\"1\" maxlength=\"1\" spellcheck=\"false\">&nbsp;</nobr>";
                } else {
                    document.getElementById("game").innerHTML += "<nobr><input type=\"text\" id=" + id + " value=\"\" size=\"1\" maxlength=\"1\" spellcheck=\"false\">&nbsp;</nobr>";
                    document.getElementById(id).addEventListener("click", function () {
                        document.getElementById(id).style.borderColor = "black";
                    });
                }
                j++;
            };

            for (var k = 0; k < x; k++) {
                _loop2(k);
            }
            document.getElementById("game").innerHTML += "<br>";
        }
        //mostro gli aiuti
        var aiutiLength = aiuti[0][type.toString()].length;
        for (var _i6 = 0; _i6 < aiutiLength; _i6++) {
            var coordinata = aiuti[0][type.toString()][_i6];
            var splitted = coordinata.split(",");
            document.getElementById(coordinata).disabled = true;
            var valX = splitted[0].replace("x", "");
            var valY = splitted[1].replace("y", "");
            document.getElementById(coordinata).setAttribute("value", sol[valY][valX]); // siccome è memorizzato per riga devo fare [y][x]
        }
        document.getElementById("game").innerHTML += "<br><button type=\"submit\" class=\"button checkSolutionbtn\" onclick=\"checkSolution('" + type + "','" + x + "','" + y + "')\">Controlla</button>";
        document.getElementById("game").innerHTML += "<button type=\"submit\" class=\"button showSolutionbtn\" style=\"margin-left: 15px;\" id=\"showSol\" onclick=\"showSolution('" + type + "','" + x + "','" + y + "')\">Mostra soluzioni</button>";
        document.getElementById("showSol").style.display = "none";
        //Mantengo premuto il bottone per far vedere l'animazione
        var btn = document.querySelector(".checkSolutionbtn");
        btn.addEventListener("click", function () {
            btn.classList.add('btnActive');
            setTimeout(function () {
                btn.classList.remove('btnActive');
            }, 1600);
        });
        document.getElementById("clearBoth").style.display = "";
        document.getElementById("load").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("definizioni").style.display = "block";
    }, 300);
}