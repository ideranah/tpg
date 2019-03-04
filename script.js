let xhttp = new XMLHttpRequest(); // on crée un nouvel objet
let tpgstopCode;
xhttp.onreadystatechange = function() { // On attache le callback
    // On vérifie que c’est OK
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    // On modifie le DOM ou autre opération     
        let demo = document.getElementById("demo");
        let stops = JSON.parse(this.responseText).stops;
        for(let stop of stops){
            let stopCode = stop.stopCode;
            let stopName = document.createElement("div"); //LET  VS VAR
            stopName.className="stop";
            stopName.innerHTML ='<li class="stopName">'+stop.stopName+'</li>';
            demo.appendChild(stopName);
        
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState== XMLHttpRequest.DONE && this.status == 200){
                    let departures = JSON.parse(this.responseText).departures.slice(0, 8);
                    for (let dep of departures) {
                        let lineNbr = document.createElement("ul");
                        lineNbr.className="lines";
                        if(dep.waitingTime > 0 ){
                            lineNbr.innerHTML = '<li class="waitingTime">'+dep.waitingTime+'</li><li class="lineCode">'+dep.line.lineCode +'</li><li class="destination">'+dep.line.destinationName+'</li>';
                        }else{
                            lineNbr.innerHTML = '<li class="waitingTime"><i class="fas fa-bus"></i></li><li class="lineCode">'+dep.line.lineCode +'</li><li class="destination">'+dep.line.destinationName+'</li>';
                        }
                        
                        stopName.appendChild(lineNbr);
                    }
                }
            }
            xhttp.open("GET","http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode="+stopCode);
            xhttp.send();
        }
    }   
};

function searchDepartures(val){
    document.getElementById("demo").innerHTML="";
    // On indique la métode et la ressource
    xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetStops?stopName="+val+"&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b");
    xhttp.send(); // On lance la requête  
};
