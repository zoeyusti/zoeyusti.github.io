var path = "imgs/";
//Quien diria que se puede abreviar el camino convirtiendolo en variable
arrayImagenes = new Array(12);
var first = true;
var pid;
var total=0;
var intentos=0;	
var score=0;
var MAX_INTENTOS = 20;




function crearImagenes() {
	for (var i=0;i<=11;i++) {
		if(i<=5){
			arrayImagenes[i] = path+i+'.png';
		}else{
			j=i-6;
			arrayImagenes[i] = path+j+'.png';		
		}
		//console.log(arrayImagenes[i]);
	}
	shuffle(arrayImagenes);
}

function shuffle(array) {
	var i=array.length;
	while(i--){
		var j=Math.floor( Math.random() * array.length);
		var tmp=array[i];
		array[i]=array[j];
		array[j]=tmp;
	}
}



document.getElementById('jugar').addEventListener("click", jugar);	



document.extraForm.onclick = function(){
    var DIFFIC = document.extraForm.dificultad.value;
    //console.log(DIFFIC);

    if (DIFFIC=="facil") {
    	MAX_INTENTOS = 18;
    }else if (DIFFIC=="intermedio") {
    	MAX_INTENTOS = 12;
    }else{
    	MAX_INTENTOS = 8;
    }
    //console.log(MAX_INTENTOS);
}


function jugar(){			
	crearImagenes();
	cargarNombre();
	document.getElementById('memotest').style.display = "block";
	document.getElementById('jugar').style.display="none";
	document.getElementById('extra').style.display="none";
	document.getElementById('name');
}

function cargarNombre(){
	var nombres = document.getElementById('name').value;
	document.getElementById('nameJugador').innerHTML = nombres;
}



function imgcheck(imagen){


	$(imagen).toggleClass("rotar");

	id=imagen.id;
	imagen.src = arrayImagenes[id];

	
						
	if(first){	
		  
		prim=imagen;
		first=false;
		pid = prim.id;
		pid.src = arrayImagenes[id];
		imagen.id="si";
	}else{
		//Verifica si son iguales
		if(imagen.id!="si" && arrayImagenes[pid]==arrayImagenes[id]){							
			total++;
			//elimina el onclick si ya fueron encontrados
			imagen.onclick="";
			prim.onclick="";

		}else{
			if(prim.id=="si"){
				prim.id=pid;
				setTimeout(function(){
				changeimages(imagen)}, 700);
				setTimeout(function(){
				changeimages(prim)}, 700);
				intentos++;		
				document.getElementById('instrucciones').innerHTML = "Intentos: " +intentos+ " de " +MAX_INTENTOS;
			}
		}

		
		if (intentos==MAX_INTENTOS/2) {
			setTimeout(function(){alert("Podes seguir jugando, pero quiero que sepas que sos muy malo para esto :(");}, 300);
		}

		if (intentos==MAX_INTENTOS) {
			setTimeout(function(){alert("Uh, disculpá, pero ya me da lástima ver esto. Mejor empezá de vuelta");}, 300);
			setTimeout(function(){location.reload();}, 700);
		}
	
		first=true;
		console.log(total);
		console.log("intentos " + intentos);
		
	
	}
	if (total==6){
			hacerRanking();
			setTimeout(function() {alert("FELICIDADES!! No te ganaste nada, solo el derecho de decir que ganaste");}, 300);
			setTimeout(function(){location.reload();}, 700);
		}
}


var changeimages = function(imagen){
	$(imagen).toggleClass("rotar2");
	imagen.src = path+"back.png";
}		

function hacerRanking(){
	if (typeof (Storage) !== "undefined") {

		var nombres = document.getElementById('name').value;

	    var highscore = {
	        "Jugador": nombres,
	        "Intentos": intentos,
	        };

	    localStorage.setItem('highscore', highscore);

	    document.getElementById("ranking").innerHTML = highscore.Intentos;
	}
}

//ACA VAMOS A INTENTAR LO DEL HIGHSCORE

/*function HighScores() {
	if(typeof(Storage)!=="undefined"){
		var scores = false;
		if(localStorage["high-scores"]){
			high_scores.style.display = "block";
			high_scores.innerHTML = '';
			scores = JSON.parse(localStorage["high-scores"]);
			scores = scores.sort(function(a,b){return parseInt(b)-parseInt(a)});

			for (var i = 0; i < 10; i++){
				var s = scores[i];
				var fragment = document.createElement('li');
				fragment.innerHTML = (typeof(s) != "undefined" ? s : "");
				high_scores.appendChild(fragment);
			}
		}
	} else {
		high_scores.style.display = "none";
	}
}

function updateScore() {
	if(typeof(Storage)!=="undefined"){
		var current = parseInt(score.innerHTML);
		var scores = false;
		if (localStorage["high-scores"]) {

			scores = JSON.parse(localStorage["high-scores"]);
			scores = scores.sort(function(a,b){return parseInt(b)-parseInt(a)});

			for (var i = 0; i < 10; i++){
				var s = parseInt(scores[i]);

				var val = (!isNan(s) ? s : 0);
				if(current > val){
					val = current;
					scores.splice(i, 0, parseInt(current));
					break;
				}
			}

			scores.length = 10;
			localStorage["high-scores"] = JSON.stringify(scores);
		} else{
			var scores = new Array();
			scores[0] = current;
			localStorage["high-scores"] = JSON.stringify(scores);
		}

		HighScores();
	}
}
*/
crearImagenes();
/*
HighScores();

updateScore();*/

