var path = "imgs/";
//Quien diria que se puede abreviar el camino convirtiendolo en variable
arrayImagenes = new Array(12);
var first = true;
var pid;
var total=0;
var intentos=0;	


function crearImagenes() {
	for (var i=0;i<=11;i++) {
		if(i<=5){
			arrayImagenes[i] = path+i+'.png';
		}else{
			j=i-6;
			arrayImagenes[i] = path+j+'.png';		
		}
		console.log(arrayImagenes[i]);
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

		

function jugar(){			
	crearImagenes();
	document.getElementById('memotest').style.display = "block";
	document.getElementById('jugar').style.display="none";
	document.getElementById('name')
}

function cargarNombre(){
	var nombres = document.getElementById('name').value;
	document.getElementById('nameJugador').innerHTML = nombres;
}


function imgcheck(imagen){
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
				setTimeout(function(){changeimages(imagen)}, 700);
				setTimeout(function(){changeimages(prim)}, 700);
				intentos++;							
			}
		}
		if (intentos==10) {
			setTimeout(function(){alert("Podes seguir jugando, pero quiero que sepas que sos muy malo para esto :(");}, 300);
		}

		if (intentos==20) {
			setTimeout(function(){alert("Uh, disculpá, pero ya me da lástima ver esto. Mejor empezá de vuelta");}, 300);
			setTimeout(function(){location.reload();}, 700);
		}
	
		first=true;
		console.log(total);
		console.log("intentos " + intentos);
		
	
	}
	if (total==6){
			setTimeout(function() {alert("FELICIDADES!! No te ganaste nada, solo el derecho de decir que ganaste");}, 300);
			setTimeout(function(){location.reload();}, 700);
		}
}


var changeimages = function(imagen){
	imagen.src = path+"back.png";
}		
