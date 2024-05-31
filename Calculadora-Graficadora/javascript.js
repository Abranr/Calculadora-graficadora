var cadena = "",
	entrada = null,
	resultado = null,
	reporteO = null,
	ancho = parseFloat(400),
	alto = parseFloat(ancho),
	x = parseFloat(ancho / 2),
	y = parseFloat(alto / 2),
	valorT = parseFloat(ancho),
	pixel = 1,
	ok = false,
	parentesisCerrado = true,
	scala = 1,
	translatePos = null,
	canvas = null,
	ctx = null;

function dibujarPlano() {
	ctx.beginPath();
	ctx.font = "bold 18pt Calibri";
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';

	ctx.strokeText("-X", 0, y + 5);
	ctx.strokeText("X", ancho - 15, y + 5);
	ctx.strokeText("Y", x - 7, 15);
	ctx.strokeText("-Y", x - 13, alto - 1);

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'red';

	var v = 20;
	ctx.moveTo(v, y);
	ctx.lineTo(ancho - v, y);

	ctx.moveTo(x, v);
	ctx.lineTo(x, alto - v);

	ctx.stroke();
	ctx.closePath();
}

function limpiarCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	dibujarPlano();
}

function dibujar(funcion) {
	limpiarCanvas();
	ctx.beginPath();
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 1;
	for (var i = 0; i <= valorT; i += pixel) {
		var xx = (i - x) / scala;
		try {
			var yy = math.evaluate(funcion, { x: xx });
		} catch (e) {
			resultado.value = "Error en la función";
			return;
		}
		yy = y - (scala * yy);
		if (i == 0)
			ctx.moveTo(i, yy);
		else
			ctx.lineTo(i, yy);
	}
	ctx.stroke();
	ctx.closePath();
}

window.onload = function () {
	entrada = document.getElementById("in");
	resultado = document.getElementById("res");
	reporteO = document.getElementById("reporte");

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = ancho;
	canvas.height = alto;

	dibujarPlano();

	var botones = document.getElementsByTagName("button");

	for (var i = 0; i < botones.length; i++) {
		if (botones[i].id !== 'igual') {
			botones[i].addEventListener('click', function (e) {
				var valor = this.textContent;
				if (valor === 'X²') {
					entrada.value += '^2';
				} else if (valor === 'sen') {
					entrada.value += 'sin(';
				} else if (valor === 'cos') {
					entrada.value += 'cos(';
				} else if (valor === 'tan') {
					entrada.value += 'tan(';
				} else {
					entrada.value += valor;
				}
			});
		}
	}

	document.getElementById("igual").addEventListener("click", function () {
		cadena = entrada.value;
		try {
			var result = math.evaluate(cadena, { x: 1 });
			resultado.value = result;
			dibujar(cadena);
		} catch (e) {
			resultado.value = "Error";
		}
	});

	document.getElementById("CE").addEventListener("click", function () {
		entrada.value = "";
		resultado.value = "";
		limpiarCanvas();
	});

	document.getElementById("DEL").addEventListener("click", function () {
		entrada.value = entrada.value.slice(0, -1);
	});
};
