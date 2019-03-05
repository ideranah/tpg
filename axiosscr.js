axios.get('http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b')


function searchDepartures(val){
    let stopCode;
    let stopName;
    let app = document.getElementById("app");
    app.innerHTML="";
    axios.get('http://api.tpg.ofcompute.rs/GetStops?stopName='+val+'&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b')
        .then(function (response){
            let stops = response.data.stops;
            let nextDepartures = [];
            for(let stop of stops){
                stopCode = stop.stopCode;
                nextDepartures.push(axios.get('http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode='+stopCode));
            }
            return Promise.all(nextDepartures);
        })
        .then(function (responses){
            for(let response of responses){
                
                stopName = document.createElement("table");
                stopName.className="stop";
                stopName.innerHTML ='<thead>'+response.data.stop.stopName+'<tr>th><i class="far fa-clock"></i></th><th><i class="fas fa-list-ol"></i></th><th>Déstination</th></tr></thead>';
                app.appendChild(stopName);
                let departures = response.data.departures.slice(0, 8);
                tbody = document.createElement("tbody");
                stopName.appendChild(tbody);
                for (let dep of departures) {
                    let lineNbr = document.createElement("tr");
                    lineNbr.className = "line";
                    if(dep.waitingTime > 0 ){
                        lineNbr.innerHTML = '<td class="waitingTime">'+dep.waitingTime+'\'</td><tr><td class="lineCode">'+dep.line.lineCode +'</td><tr><td class="destination">'+dep.line.destinationName+'</td>';
                    }else{
                        lineNbr.innerHTML = '<td class="waitingTime"><i class="fas fa-bus"></i></td><tr><td class="lineCode">'+dep.line.lineCode +'</td><tr><td class="destination">'+dep.line.destinationName+'</td>';
                   }
                   tbody.appendChild(lineNbr); 
                }
           }
         
        })
}