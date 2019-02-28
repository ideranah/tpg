var xhttp = new XMLHttpRequest(); // on crée un nouvel objet
var tpgstopCode;
  xhttp.onreadystatechange = function() { // On attache le callback
    // On vérifie que c’est OK
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      // On modifie le DOM ou autre opération     
     var tpgstopCode = JSON.parse(this.responseText).stops[0].stopCode;
     
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
        if(this.readyState== XMLHttpRequest.DONE && this.status == 200){
            let demo = document.getElementById("demo");
            let departures = JSON.parse(this.responseText).departures.slice(0, 8);
            for (let dep of departures) {
                var lineNbr = document.createElement("div");
                lineNbr.innerHTML = dep.line.lineCode;
                demo.appendChild(lineNbr);
            }
        }
    }
    xhttp.open("GET","http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode="+tpgstopCode);
    xhttp.send();
    }   
};

function searchDepartures(val){
    document.getElementById("demo").innerHTML="";
    // On indique la métode et la ressource
    xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetStops?stopName="+val+"&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b");
    xhttp.send(); // On lance la requête  
};
