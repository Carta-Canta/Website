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

function reset(maxX, maxY) {
    var id = "";
    var i = 0;
    for (var k = 0; k < maxY; k++) {
        for (var j = 0; j < maxX; j++) {
            id = "x" + j + ",y" + k;
            var isDisabled = document.getElementById(id).disabled;
            if (!isDisabled) {
                document.getElementById(id).setAttribute("value", "");
                document.getElementById(id).style.borderWidth = "1px";
                document.getElementById(id).style.borderStyle = "solid";
                document.getElementById(id).style.borderColor = "hsl(0deg, 0%, 29%)";
            }
            i++;
        }
    }
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
    window.location.href = "#load";
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
        document.getElementById("game").innerHTML += "<br><button type=\"submit\" class=\"button checkSolutionbtn is-hidden-mobile\" onclick=\"checkSolution('" + type + "','" + x + "','" + y + "')\">Controlla</button>";
        document.getElementById("game").innerHTML += "<button type=\"submit\" class=\"button resetBtn is-hidden-mobile\" style=\"margin-left: 15px;\" onclick=\"reset('" + x + "','" + y + "')\">Reset</button>";
        document.getElementById("game").innerHTML += "<button type=\"submit\" class=\"button showSolutionbtn is-hidden-mobile\" style=\"margin-left: 15px;\" id=\"showSol\" onclick=\"showSolution('" + type + "','" + x + "','" + y + "')\">Mostra soluzioni</button>";
        //qui sotto metto i cloni dei tre pulsanti sopra, ma metto quelli che saranno visibili sono da mobile
        document.getElementById("game").innerHTML += "<br><button type=\"submit\" class=\"button checkSolutionbtn is-small is-hidden-tablet\" onclick=\"checkSolution('" + type + "','" + x + "','" + y + "')\">Controlla</button>";
        document.getElementById("game").innerHTML += "<button type=\"submit\" class=\"button resetBtn is-small is-hidden-tablet\" style=\"margin-left: 15px;\" onclick=\"reset('" + x + "','" + y + "')\">Reset</button>";
        document.getElementById("game").innerHTML += "<button type=\"submit\" class=\"button showSolutionbtn is-small is-hidden-tablet\" style=\"margin-left: 15px;\" id=\"showSolMobile\" onclick=\"showSolution('" + type + "','" + x + "','" + y + "')\">Mostra soluzioni</button>";
        //@MatteoBax questo qui sopra e' il pulsante mostra soluz. di cui ti ho parlato che non dovrebbe apprarire se non hai almeno 1 volta checkkato le soluz
        document.getElementById("showSol").style.display = "none";
        document.getElementById("showSolMobile").style.display = "none";

        document.getElementById("clearBoth").style.display = "";
        document.getElementById("load").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("definizioni").style.display = "block";
        window.location.href = '#play';
    }, 300);
}