/**
 * App para la predicción marítima.
 *
 */
 
 
 /**
 * Variables globales.
 *
 */
 
//Variable global que almacena el número de días de los que se disponen predicción meteorológica
var num_days = 0;
//Variables globales para almacenar las coordenadas geográficas de la zona seleccionada.
var lat = 37.95;
var lng = -0.67;
//Variable global para almacenar el nombre de la zona seleccionada
var zone = "Torrevieja";


/** 
 * Método que se ejecuta cuando el usuario selecciona una zona marítima de entre las tres sujeridas.
 * @param no params
 * @return no return data
 */
function selectedArea(){
	
	//Obtenemos las nuevas coordenadas
	var coords = $('input[name=areaCode]:checked').val();
	var coordssplited = coords.split(",");
	lat = coordssplited[0];
	lng = coordssplited[1];
	//Limpiamos la anterior tabla
	$("#hour-tbody").empty()
	//Obtenemos la nueva predicción
	getMarineForecast();
	
	//Cerramos el popup
	const modalEl = document.getElementById('myModal');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();

}

/** 
 * Método que inicializa y configura el selector de fechas.
 * @param número de días más desde la fecha actual
 * @return no return data
 */
 function formatDateSelection(num_days){
	 //Establecer el valor de la fecha de hoy
	var fulldate = new Date();
	fulldate.setDate(fulldate.getDate() + num_days);
	fulldate = getFormatedDate(fulldate);
	$('#date').append($('<option>', {value:fulldate, text:fulldate}));	
}

/** 
 * Método que gestiona el evento onChange del selector de fechas.
 * @param no params
 * @return no return data
 */
function onChangeDateSelection(){
	var date = $('#date').find(":selected").text();
	//Ocultamos todas las filas del tbody de la tabla
	$("#hour-tbody").find("tr").hide();
	//Mostramos solo aquellas 'tr' cuya clase coincide con el día de hoy
	$('tr[class="'+ date +'"]').each(function() {
		$(this).show();
	}); 
}
 

 
/**
* Método que formatea la fecha recibida por parámetro a dd/mm/aaaa
* @param date fecha que se desea formatear a dd/mm/aaaa
* @return string con la fecha formateada a dd/mm/aaaa
*/
 function getFormatedDate(date){
	//var date = new Date();
	var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
	var monthIndex = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	var year = date.getFullYear();
	var fulldate = day + '/' + monthIndex + '/' + year;
	
	return(fulldate);
 }
 

 
/**
* Método que obtiene la hora en formato hh:mm de una fecha
* @param date fecha de la que se desea extraer la hora
* @return string con la hora en formato hh:mm
*/
 function getHourFromDate(date) {
	
	var hour = date.getHours();
	var minutes = date.getMinutes();
	
	if(hour >= 0 && hour <= 9)
		hour = "0" + hour;
	if(minutes >= 0 && minutes <= 9)
		minutes = "0" + minutes;
	
	var time = hour + ":" + minutes;
	
	return(time);
}

/**
* Método para elegir una imagen según los grados (dirección) del viento 
* recibidos por parámetro.
* @param degrees Grados de la dirección del viento
* @return ruta de la imagen correspondiente a la dirección del viento
*/
function convertDegreesToImg(degrees){

	if (degrees >= 23 && degrees < 68){
		return("img/ne.png");
	}
	else if (degrees >= 68 && degrees < 129){
		return("img/e.png");
	}
	else if (degrees >= 129 && degrees < 158){
		return("img/se.png");
	}
	else if (degrees >= 158 && degrees < 203){
		return("img/s.png");
	}
	else if (degrees >= 203 && degrees < 248){
		return("img/sw.png");
	}
	else if (degrees >= 248 && degrees < 293){
		return("img/w.png");
	}
	else if (degrees >= 293 && degrees < 338){
		return("img/nw.png");
	}
	else {
		return("img/n.png");
	}
}

/**
* Método para convertir los grados del viento a tipo de viento
* @param degrees Grados de la dirección del viento
* @return string con el nombre del viento correspondiente a la dirección recibida
*/
function convertDegreesToTextDirecction(degrees){

	if (degrees >= 23 && degrees < 68){
		return("Gregal");
	}
	else if (degrees >= 68 && degrees < 129){
		return("Levante");
	}
	else if (degrees >= 129 && degrees < 158){
		return("Siroco");
	}
	else if (degrees >= 158 && degrees < 203){
		return("Mediodía");
	}
	else if (degrees >= 203 && degrees < 248){
		return("Lebeche");
	}
	else if (degrees >= 248 && degrees < 293){
		return("Poniente");
	}
	else if (degrees >= 293 && degrees < 338){
		return("Maestral");
	}
	else {
		return("Tramont.");
	}
}

/**
* Método para convertir la velocidad del viento a la escala de Beaufort
* @param speed Velocidad del viento en km/h
* @return string con la denominación de la escala de Beaufort
*/
function windSpeedToBeaufortScale(speed){

	if (speed >= 0 && speed < 2){
		return("Calma");
	}
	else if (speed >= 2 && speed < 6){
		return("Ventolina");
	}
	else if (speed >= 6 && speed < 11){
		return("Brisa débil");
	}
	else if (speed >= 11 && speed < 20){
		return("Brisa ligera");
	}
	else if (speed >= 20 && speed < 29){
		return("Brisa fuerte");
	}
	else if (speed >= 29 && speed < 49){
		return("Viento");
	}
	else if (speed >= 49 && speed < 61){
		return("Viento fuerte");
	}
	else if (speed >= 61 && speed < 75){
		return("Temporal");
	}
	else if (speed >= 75 && speed < 89){
		return("Temporal fuerte");
	}
	else if (speed >= 89 && speed < 103){
		return("Temporal muy fuerte");
	}
	else if (speed >= 103 && speed < 117){
		return("Temporal extremo");
	}
	else {
		return("Huracán");
	}
}

/**
* Método para convertir la velocidad del viento a la escala de Beaufort con respecto al aspecto del mar
* @param speed Velocidad del viento en km/h
* @return string con la denominación del aspecto del mar de la escala de Beaufort
*/
function windSpeedToSeaBeaufortScale(speed){

	if (speed >= 0 && speed < 2){
		return("Despejado");
	}
	else if (speed >= 2 && speed < 12){
		return("Pequeñas olas");
	}
	else if (speed >= 12 && speed < 20){
		return("Crestas");
	}
	else if (speed >= 20 && speed < 29){
		return("Borregos");
	}
	else if (speed >= 29 && speed < 38){
		return("Olas medianas");
	}
	else if (speed >= 38 && speed < 50){
		return("Olas grandes");
	}
	else if (speed >= 50 && speed < 62){
		return("Mar gruesa");
	}
	else if (speed >= 62 && speed < 103){
		return("Temporal");
	}
	else {
		return("Huracanado");
	}
}

/**
* Método para almacenar localmente la fecha de la última consulta al servicio web.
* @param no params
* @return no return
*/
function saveLastTimeLocaly(now){
	if (typeof(Storage) !== "undefined") {
		
		//Fecha y hora de la última vez
		var date = getFormatedDate(now);
		var time = getHourFromDate(now);
		
		var lasttime = "Ult. vez " + date + " a las " + time;
		
		// Almacenamos
		localStorage.setItem("lasttime", lasttime);

	} else {
		$("#lastconnection").text("Problemas con el almacenamiento local de datos");
	}
}

/**
* Método para recuperar del almacenamiento local la fecha de la última consulta al servicio web.
* @param no params
* @return no return
*/
function retrieveLastTime()
{
	if (typeof(Storage) !== "undefined") {
		
		//Recuperamos
		var lasttime = localStorage.getItem("lasttime");
		
		// Indicamos la última vez en el footer
		if(lasttime != null)
			$("#lastconnection").text(lasttime);
		else
			$("#lastconnection").text("Problemas en la recuperación del almacenamiento local de datos.");
	} else {
		$("#lastconnection").text("Problemas en la recuperación del almacenamiento local de datos");
	}
}

/**
* Método que se ejecuta al cargarse el documento.
* Realiza una petición AJAX al servicio web 'https://api.stormglass.io/forecast'.
* A continuación, rellena la tarjeta con los datos generales meteorológicos y la tabla con la predicción marítima hora por hora.
* @param non params
* @return non return
*/

function getMarineForecast(){	


	
    const params = 'airTemperature,cloudCover,gust,humidity,precipitation,swellHeight,windDirection,windSpeed';

    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&source=noaa`, {
      headers: {
        'Authorization': ''
      }
    }).then((response) => response.json()).then((r) => {
      
      // console.log(r);
      if (r.hours[0].time) {

        //Declaramos algunas variables
		var state = null, precipitation = null, temperature = null, humidity = null;
				
		// Indicamos información general de cabecera para la hora actual
		var dt = new Date();
		var time = dt.getHours();	
		
		// Madrid, Spain time is 2 hours ahead of UTC.
		var current_hour = r.hours[1+time];
				
        //console.log(current_hour);
        console.log(time);
        console.log(current_hour.precipitation.noaa);
        console.log(current_hour.hasOwnProperty("precipitation"))
        
		if (current_hour.hasOwnProperty("cloudCover")) {
		    var img = null;
			state = (parseInt(current_hour.cloudCover.noaa) >= 50) ? "Nublado": "Despejado";
					
			if(time >= 21 || (time >= 0 && time < 7))
				img = (state == "Nublado") ? "img/cloudynight.png" : "img/sky.jpg";
			else
				img = (state == "Nublado") ? "img/cloudy.jpg" : "img/sunny.jpg";
			$('.weather-card').css("background-image", "url(" + img + ")"); 
			
		} else {
		    state = "Sin datos";
		}
		
		if (current_hour.hasOwnProperty("precipitation")) {
		    precipitation = parseInt(current_hour.precipitation.noaa);
			if (precipitation > 10) {
				$('.weather-card').css("background-image", "url(img/rainny_m.png)");
			} 
		} else {
			    precipitation = "Sin datos";
		}
			
		if (current_hour.hasOwnProperty("airTemperature")) {
		    temperature = parseInt(current_hour.airTemperature.noaa) + " ºC";
		} else {
		    temperature = "Sin datos";
		}
			
		if (current_hour.humidity) {
		    humidity = parseFloat(current_hour.humidity.noaa) + " %";
		} else {
		    humidity = "Sin datos";
		}
				
		//Actualizamos los datos de la tarjeta
		$(".weather-card")
			.find ('.weather-card-state').html (state).end ()
			.find ('.weather-card-location').html (zone).end ()
			.find ('.weather-card-precipitation').html (precipitation).end ()
			.find ('.weather-card-temp').html (temperature).end ()
			.find ('.weather-card-humidity').html (humidity).end ()
		;
				
		////////////////////////////////////////////////////////////////
		// Rellenamos la tabla con la predicción marítima hora por hora
		////////////////////////////////////////////////////////////////
		
		var hide = false;
			
			//Por cada hora de la respuesta recibida desde el servicio web
			$.each(r.hours, function(key,value) {
				
				
				//Declaramos variables
				var tr = null, swell_height = null, gust = null, wind_speed = null, wind_direction = null;
				
				//Obtenemos datos sobre la fecha
				var date = getFormatedDate(new Date(value.time));
				//Obtenemos la hora
				var hour = getHourFromDate(new Date(value.time));
				
				var today = new Date();
		        var today_time = getHourFromDate(today);
		        var today_day = getFormatedDate(today);
		        
		        console.log(date)
				console.log(today_day)
				
				if ((date == today_day && hour >= today_time) || (date != today_day)) {
				if (value.hasOwnProperty("windSpeed")) {
					//Convertimos de m/s a km/h
					wind_speed = (value.windSpeed.noaa) * 3.6;
					wind_speed = parseInt(wind_speed);
					wind_speed = "<p>" + wind_speed + "</p>";
				} else {
					wind_speed = "No disponible";
				}

				if (value.hasOwnProperty("swellHeight")) {
					swell_height = parseFloat(value.swellHeight.noaa).toFixed(2);
					swell_height = "<p>" + swell_height + "m</p>"
				} else {
					swell_height = "No disponible";
				}
				
				if (value.hasOwnProperty("gust")) {
					//Convertimos de m/s a km/h
					gust = (value.gust.noaa) * 3.6;
					gust = parseInt(gust);
				} else {
					gust = "No disponible";
				}
				
				if (value.hasOwnProperty("windDirection")) {
    				var img_path = convertDegreesToImg(value.windDirection.noaa);
    				var wind_dir = convertDegreesToTextDirecction(value.windDirection.noaa);
					var wind_type = convertDegreesToTextDirecction(value.windDirection.noaa);
					wind_speed = (value.windSpeed.noaa) * 3.6;
					wind_speed = parseInt(wind_speed) + " km/h " + wind_dir;
					wind_direction = "<img src='" + img_path + "' class='img-responsive img-thumbnail' style='width:75%;'/>";
				} else {
				    wind_direction = "No disponible";
				}
				
				if (value.hasOwnProperty("precipitation")) {
		            var precipitation = parseInt(value.precipitation.noaa); 
		            if (precipitation > 0) {
		                precipitation = precipitation + " l/m2"
		            }
		        } else {
                    var precipitation = "Sin datos";
		        }
							
				var display = (hide == false) ? "" : "display:none;";
				//Creamos una nueva fila de la tabla
				tr = "<tr itemprop='event' itemscope itemtype='http://schema.org/Event' class='" + date + "' style='" + display + "' >";
				tr = tr + "<td class='col-xs-4' itemprop='startDate'>" + hour + "</td>";
				tr = tr + "<td class='col-xs-4' itemprop='about'>" + precipitation + "</td>";
				tr = tr + "<td class='col-xs-4' itemprop='about'>" + swell_height + "</td>";
				tr = tr + "<td class='col-xs-4' itemprop='about'>" + wind_speed + "</td>";
				tr = tr + "<td class='col-xs-4' itemprop='about'>" + wind_direction + "</td>";
				tr = tr + "</tr>";
					
				
				//Añadimos la fila a la tabla
				$('#hour-tbody').append(tr)
				
				//Flag para saber si hemos llegado al final del día
				if(hour == "23:00"){
					hide = true;					
					if (num_days < 5)
						formatDateSelection(num_days);
					num_days = num_days + 1;
				}
				}

			});
			
			////////////////////////////////////////////////////////////////
			// Guardamos de forma local la fecha de la última petición 
			// al servicio web. Mostramos la fecha.
			////////////////////////////////////////////////////////////////
			saveLastTimeLocaly(new Date());
			retrieveLastTime();
      }
    });
}

$(document).ready (function (e) {

    getMarineForecast();
});
