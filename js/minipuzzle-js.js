
var juego={
		//Primer elemento
		filas: [ [] , [] , [] ],
		//Segundo Elemento
		espaciovacio:{
			filas:2,
			columnas:2
		},
		//Tercer elemento
		iniciar: function(x){
				juego.instalarpieza(x);
				juego.mezclarfichas(90);
				juego.capturarteclas();
		},

		//Cuarto Elemento
		crearpieza:function(imagen,fi,co){

			var pieza= $("<div>");
			var fondo= $("html");
			pieza.addClass("pieza");
			pieza.css({
				top: fi*200,
				left: co*300,
				backgroundImage:"url(imagenes/"+imagen+".png)"
				});
			//fondo.css({
				//backgroundImage:"url(imagenes/imagenentera.jpg)"
			//});
			return{
				filainicial: fi,
				columnainicial: co,
				$pieza: pieza
			};
			
		},

		//Quinto Elemneto
		instalarpieza:function(instalo){

			var contador=0;
			for (var fi=0; fi<=2;fi++) {
				//columna
				for (var co=0;  co<=2; co++) {
					//filas
					if(this.espaciovacio.columnas===co && 
					   this.espaciovacio.filas===fi)	{
					   this.filas[fi][co]=null;
					}
					else {
						var pieza = this.crearpieza(contador,fi,co);
						this.filas[fi][co]= pieza;
						instalo.append(pieza.$pieza);
						contador++;
					}
				}
			}
		},
		 
		

		//Sexto elemento
		moverhaciabajo:function(){

			var filaorigen = this.espaciovacio.filas-1;
			var columnaorigen=this.espaciovacio.columnas;
			this.intercambiarposicionconespaciovacio(filaorigen,columnaorigen);
		},
		//Septimo elemento
		moverhaciaarriba:function(){
			var filaorigen = this.espaciovacio.filas+1;
			var columnaorigen=this.espaciovacio.columnas;
			this.intercambiarposicionconespaciovacio(filaorigen,columnaorigen);
		},
		//OCtavo elemento 
		moverhacialaderecha:function(){
			var filaorigen = this.espaciovacio.filas;
			var columnaorigen=this.espaciovacio.columnas-1;
			this.intercambiarposicionconespaciovacio(filaorigen,columnaorigen);
		},
		//Noveno elemento
		moverhacialaizquierda:function(){
			var filaorigen = this.espaciovacio.filas;
			var columnaorigen=this.espaciovacio.columnas+1;
			this.intercambiarposicionconespaciovacio(filaorigen,columnaorigen);
		},
		//Decimo elemento

		capturarteclas:function(){
			var juego = this;
			$(document).keydown(function(tecla){

				switch(tecla.which)
				{
					case 37:
						juego.moverhacialaizquierda();
					break;

					case 38:
						juego.moverhaciaarriba();
					break;

					case 39:
						juego.moverhacialaderecha();
					break;

					case 40:
						juego.moverhaciabajo();
					break;
					
					default: return;
				};
				tecla.preventDefault();
				juego.chequearsigano();
			});
		},

		moverfilacolumna:function($pieza,fi,co){

			$pieza.css({
				top: fi*200,
				left: co*300,
				});

		},

		guardarespaciovacio:function(fi,co){

			this.espaciovacio.filas=fi;
			this.espaciovacio.columnas=co;
			this.filas[fi][co]=null;

		},

		intercambiarposicionconespaciovacio:function(fi,co){
			
			var ficha = this.filas[fi] && this.filas[fi][co];

			if (ficha !== undefined) {

				this.filas[this.espaciovacio.filas][this.espaciovacio.columnas]=ficha;
				this.moverfilacolumna(ficha.$pieza,this.espaciovacio.filas,this.espaciovacio.columnas);
				this.guardarespaciovacio(fi,co);

			};


		},

		mezclarfichas:function(veces){
			var that=this;
			var tempo=30;
			for (var i=0; i<=veces;i++) {
				
				var numeroazar=Math.floor(Math.random()*4);

				switch (numeroazar){

					case 0: setTimeout(function(){
						that.moverhaciaarriba();
					}, i * tempo);
					break;

					case 1: setTimeout(function(){
						that.moverhacialaderecha();
					}, i * tempo); 
					break;

					case 2: setTimeout(function(){
						that.moverhacialaizquierda();
					}, i * tempo);
					break

					case 3: setTimeout(function(){
						that.moverhaciabajo();
					}, i * tempo);
					break;

				}

				
				
			}

		},

		chequearsigano:function(){

					for (var i=0; i <= 2; i++) {
						for (var x=0; x <= 2; x++) {
							var  posicionactual= juego.filas[i][x];
		        			if(posicionactual && !(posicionactual.filainicial == i && posicionactual.columnainicial == x)){
		         				return false;
					}
				}
			}
			setTimeout(function(){
				return alert("Felicitaciones ganaste, intenta esa vez hacerlo mas rapido");
			},1000)
			
		}
	};

/*var music = function(x,y){
	x=Math.floor((Math.random()*2)+1);
	y=document.getElementById("musica");
	y.play();

};*/


$(document).ready(function(){
	juego.iniciar($("#juego"));
});






































