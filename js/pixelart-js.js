var myPixelDraw = {
	colorPicked: 0,
	cellColor: "white",
	celdasdefault: 30,
	coloring: false,
	fns: {

		grabimage: function(numero){

		},

		calcSize:function(cantceldas){

			if(cantceldas===undefined){
				cantceldas=myPixelDraw.celdasdefault;
			}

			var totalceldas = cantceldas*cantceldas;

			myPixelDraw.Mycontenedor.empty();

			for (var i = 0; i < totalceldas; i++) {
				myPixelDraw.Mycontenedor.append("<div class='celda' draggable></div>")

			};

			var tamañocelda =  myPixelDraw.Mycontenedor.width()/cantceldas;

			$(".celda").width(tamañocelda);
			$(".celda").height(tamañocelda);
			
		},

		detectMouse:function(){
			$(document).mouseup(
				function(){
					myPixelDraw.coloring=false;
				});
		},

		resize:function(){
			$("#enter").submit(
				function(){
					var x = $("#tamanogrilla").val();
					if(x!=0){
						if (x<=50 && x>=1) {
							myPixelDraw.fns.calcSize(x);
						}
						else {
							alert("Por favor ingrese un tamaño menor a 50 pixeles.")
							$("#tamanogrilla").val("");
						}
					}
					else {
						$('#tamanogrilla').val('');
					}
				});
		},


		colorPalette:function(){
			$(".colores .forma").each(function(i, e){
				var color = $(e).attr("id");
				$(e).css({"background-color": color});
			});
		},

		pickcolor:function(){
			$(".colores div").click(function(){
				myPixelDraw.colorPicked=$(this).attr("id");
				$(".colores div").removeClass("seleccionado")
				$(this).addClass("seleccionado");
			});
		},

		colorlt:function(){
			$(document).on("mousedown",".celda",function(evento){
				evento.preventDefault();
				myPixelDraw.coloring=true;

				if(evento.button===0){
					$(this).css("background-color",myPixelDraw.colorPicked);

				}
				if(evento.button===2){
					$(this).css("background-color",myPixelDraw.cellColor);
				}

			});
		},

		colorOnDrag:function(){
			$(document).mousemove(function(evento){
				var seleccionElemento= $(evento.target);
				if(seleccionElemento.hasClass("celda") && myPixelDraw.coloring){
					if(evento.button===0){
						$(seleccionElemento).css("background-color",myPixelDraw.colorPicked);

					}
					if(evento.button===2){
						$(seleccionElemento).css("background-color",myPixelDraw.cellColor);
					}
				}
			});
		},
		reset:function(){
			$(".borraimagen").click(function(){
				$(".celda").css("background-color",myPixelDraw.cellColor);
			});
		},
		toggleBorders:function(){
			var x = true;
			$(".onoffgrilla").click(function(){
				$(".celda").toggleClass("sin-borde");
				$("#grilla-cambia").toggleClass("ion-ios-grid-view-outline");
			})
		},
		disableRightClick:function(){
			myPixelDraw.Mycontenedor.on("contextmenu",function(){
				return false;
			});
		},
	

		grabImage: function() {
				$('#hola').on("click",function(e) {		
					console.log("hola");	
					$(".titulo-abajo").show();
					var grilla = document.getElementById('grilla');
	                html2canvas(grilla, {
	                    onrendered: function(canvas) {
	          				$("canvas").remove();
	                        document.body.appendChild(canvas);
	                    }
	                });
	           	});
	        },


	},
	init:function(contenedor){
		this.Mycontenedor=contenedor;

		var arraydefunciones = Object.keys(myPixelDraw.fns);

		for (var i = 0; i < arraydefunciones.length; i++) {
			myPixelDraw.fns[arraydefunciones[i]]();
		}
	}	
	
};

$(document).ready(function(){
	$(".titulo-abajo").hide();
	myPixelDraw.init($(".grilla"));

});