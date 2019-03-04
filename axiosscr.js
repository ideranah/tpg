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
                console.log(response);
            stopName = document.createElement("ul"); //LET  VS VAR
            stopName.className="stop";
            stopName.innerHTML ='<li class="stopName">'+response.data.stop.stopName+'</li>';
            app.appendChild(stopName);
               let departures = response.data.departures.slice(0, 8);

               for (let dep of departures) {
                   let lineNbr = document.createElement("li");
                   lineNbr.className = "line";
                   if(dep.waitingTime > 0 ){
                       lineNbr.innerHTML = '<span class="waitingTime">'+dep.waitingTime+'\'</span><span class="lineCode">'+dep.line.lineCode +'</span><span class="destination">'+dep.line.destinationName+'</span>';
                   }else{
                       lineNbr.innerHTML = '<span class="waitingTime"><i class="fas fa-bus"></i></span><span class="lineCode">'+dep.line.lineCode +'</span><span class="destination">'+dep.line.destinationName+'</span>';
                   }
                   stopName.appendChild(lineNbr); 
               }
           }
         
        })
}