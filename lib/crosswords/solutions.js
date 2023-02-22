"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var giusto = true;
var solutionArray = "";
//Carico l'array delle soluzioni
function buildArray(type, maxX, maxY) {
    type = type.toUpperCase();
    solutionArray = _defineProperty({}, type, [{}]);
    var id = "";
    var i = 0;
    var nomeArray = eval("righe" + type);
    var contenutoCella = "";
    for (var yC = 0; yC < maxY; yC++) {
        contenutoCella = nomeArray[yC];
        contenutoCella = contenutoCella.split("");
        for (var xC = 0; xC < maxX; xC++) {
            id = "x" + xC + ",y" + yC;
            //array[nomeCruciverba][indice]=[{[coordinate]:"contenutoCella"}]
            solutionArray[type][i] = [_defineProperty({}, id, contenutoCella[xC])];
            i++;
        }
    }
}

//Controllo le soluzioni inserite
function checkSolution(type, maxX, maxY) {
    if (solutionArray.length == 0) {
        buildArray(type, maxX, maxY);
    }
    var id = "";
    var toCheck = "";
    var toCheckvalue = "";
    var i = 0;
    var result = "";
    type = type.toUpperCase();
    for (var k = 0; k < maxY; k++) {
        for (var j = 0; j < maxX; j++) {
            id = "x" + j + ",y" + k;
            //solutionArray[nomeCruciverba][indice a cui leggere][0][id]
            result = solutionArray[type][i][0][id];
            toCheck = document.getElementById("" + id);
            toCheckvalue = document.getElementById("" + id).value;
            toCheckvalue = toCheckvalue.toUpperCase();
            if (toCheckvalue != result) {
                toCheck.style.borderColor = "red";
                giusto = false;
            } else {
                if (toCheckvalue != s) {
                    toCheck.style.borderColor = "#2FFF8D"; // verde chiaro
                }
            }
            i++;
        }
    }
    if (giusto) {
        setTimeout(function () {
            alert("Il cruciverba è giusto");
        }, 100);
    } else {
        document.getElementById("showSol").style.display = "inline-block";
    }
}

//Mostra le soluzioni
function showSolution(type, maxX, maxY) {
    var i = 0;
    if (solutionArray.length == 0) {
        buildArray(type, maxX, maxY);
    }
    for (var k = 0; k < maxY; k++) {
        for (var j = 0; j < maxX; j++) {
            id = "x" + j + ",y" + k;
            //solutionArray[nomeCruciverba][indice a cui leggere][0][id]
            result = solutionArray[type][i][0][id];
            toShow = document.getElementById("" + id);
            if (result != s) {
                toShow.setAttribute("value", result);
                toShow.style.borderColor = "#2FFF8D"; // verde chiaro
            }
            i++;
        }
    }
}