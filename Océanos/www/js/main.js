/**
 * Andrid App - Marine Forecast.
 *
 */

 /**
 * Global Variables.
 *
 */

// Global variable to store the total number of days from which there are wheather foreacast data
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

	//We get the new geografic coordinates
	var coords = $('input[name=areaCode]:checked').val();
	var coordssplited = coords.split(",");
	lat = coordssplited[0];
	lng = coordssplited[1];

	//Empty the datatable
	$("#hour-tbody").empty()

	//Get new forecast data
	getMarineForecast();

	$("#date").val($("#date option:first").val());

	//Close the popup
	$('#myModal').modal('hide');
}

/**
 * Inits and configure the dropdown.
 * @param num_days total number of days with forecast data from today
 * @return no return data
 */
 function formatDateSelection(num_days){
	// Adds the new date to the dropdown date selector
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
/*function convertDegreesToTextDirecction(degrees){

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
}*/

/**
* Método para convertir la velocidad del viento a la escala de Beaufort
* @param speed Velocidad del viento en km/h
* @return string con la denominación de la escala de Beaufort
*/
/*function windSpeedToBeaufortScale(speed){

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
}*/

/**
* Método para convertir la velocidad del viento a la escala de Beaufort con respecto al aspecto del mar
* @param speed Velocidad del viento en km/h
* @return string con la denominación del aspecto del mar de la escala de Beaufort
*/
/*function windSpeedToSeaBeaufortScale(speed){

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
}*/

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
$(document).ready (function (e) {
	getMarineForecast();
});
function getMarineForecast(){

    // Petición al AJAX al servicio web 'stormglass'
    $.ajax ({
        url: 'https://api.stormglass.io/forecast',
        dataType: 'json',
        type: 'GET',
		headers: {
		  'Authentication-Token': '' // Api Key obtenida desde stormglass.io
		},
        data: {
           lat: lat, //latitud y longitud de la zona de Torrevieja
           lng: lng
       },
	   //Si la petición se ha ejecutado con éxito
       success: function (r) {

			if(r.hours[0].time){

				//////////////////////////////////////////////////////////////////////
				// Rellenamos la tarjeta principal con datos meteorológicos generales
				//////////////////////////////////////////////////////////////////////

				//Declaramos algunas variables
				var state = null, precipitation = null, temperature = null, humidity = null;

				//Indicamos información general de cabecera para la hora actual
				var dt = new Date();
				var time = dt.getHours();
				var current_hour = r.hours[2+time];

				//Comprobamos el valor de algunos datos
				if(current_hour.cloudCover.length > 0){
					var img = null;
					state = (current_hour.cloudCover[1].value >= 10) ? "Nublado": "Despejado";

					if(time >= 21 || (time >= 0 && time < 7))
						img = (state == "Nublado") ? "img/cloudynight.png" : "img/sky.jpg";
					else
						img = (state == "Nublado") ? "img/cloudy.jpg" : "img/sunny.jpg";

					$('.weather-card').css("background-image", "url(" + img + ")"); 
				}
				else
					state = "Sin datos";

				if(current_hour.precipitation.length > 0){
					precipitation = (current_hour.precipitation[0].value == 'nan') ? 0 : current_hour.precipitation[0].value;
					if(precipitation > 1)
						$('.weather-card').css("background-image", "url(img/rainny_m.png)");
				}
				else
					precipitation = "Sin datos";
				if(current_hour.airTemperature.length > 0)
					temperature = parseInt(current_hour.airTemperature[1].value) + " ºC";
				else
					temperature = "Sin datos";
				if(current_hour.humidity.length > 0)
					humidity = parseFloat(current_hour.humidity[1].value).toFixed(2) + "%";
				else
					humidity = "Sin datos";
				
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
					//var day = (value.time).substring(8,10);
					//var monthIndex = (value.time).substring(5,7);
					//var year = (value.time).substring(0,4);
					var date = getFormatedDate(new Date(value.time));//day + '/' + monthIndex + '/' + year;
					//Obtenemos la hora
					var hour = getHourFromDate(new Date(value.time));
					
					//Comprobamos la disponibilidad de algunos datos
					
					if(value.windSpeed.length > 0){
						//Convertimos de m/s a km/h
						wind_speed = (value.windSpeed[1].value/1000) * 3600;
						wind_speed = parseInt(wind_speed);//.toFixed(2);
						
						//var beaufortScale = windSpeedToBeaufortScale(wind_speed);
						wind_speed = "<p>" + wind_speed + "</p>";//<p>" + beaufortScale + "</p>";
					}
					else{
						wind_speed = "No disponible";
					}

					if(value.waveHeight.length > 0){
						swell_height = parseFloat(value.waveHeight[1].value).toFixed(2);
						//var wind = (value.windSpeed[1].value/1000) * 3600;
						//wind = parseFloat(wind).toFixed(2);

						//var beaufortScale = windSpeedToSeaBeaufortScale(wind);
						swell_height = "<p>" + swell_height + " m</p>"
						//swell_height = "<p>" + beaufortScale + "</p>";
					}
					else{
						swell_height = "No disponible";
					}
					if(value.gust.length > 0){
						//Convertimos de m/s a km/h
						gust = (value.gust[1].value/1000) * 3600;
						//Dejamos solo dos decimales
						gust = parseInt(gust);//.toFixed(2);
					}
					else{
						gust = "No disponible";
					}
					if(value.windDirection.length > 0){
						var img_path = convertDegreesToImg(value.windDirection[1].value);
						//var wind_type = convertDegreesToTextDirecction(value.windDirection[1].value);

						wind_speed = (value.windSpeed[1].value/1000) * 3600;
						wind_speed = parseInt(wind_speed);
						wind_direction = wind_speed + " km/h <img src='" + img_path + "' class='img-responsive' style='width:25%;'/>";
						//wind_direction = wind_direction + "<p>" + wind_type + "</p>";
					}
					else
						wind_direction = "No disponible";
							
					var display = (hide == false) ? "" : "display:none;";
					//Creamos una nueva fila de la tabla		
					
					tr = "<tr itemprop='event' itemscope itemtype='http://schema.org/Event' class='" + date + "' style='" + display + "' >";
					tr = tr + "<td itemprop='startDate'>" + hour + "</td>";
					tr = tr + "<td itemprop='about'>" + swell_height + "</td>";
					tr = tr + "<td itemprop='about'>" + wind_direction + "</td>";
					tr = tr + "</tr>";
					
				
					//Añadimos la fila a la tabla
					$('#hour-tbody').append(tr)
					
					//Flag para saber si hemos llegado al final del día
					if(hour == "23:00"){
						hide = true;
						
						if(num_days < 5)
							formatDateSelection(num_days);
						num_days = num_days + 1;
					}
					

				});
				
				////////////////////////////////////////////////////////////////
				// Guardamos de forma local la fecha de la última petición 
				// al servicio web. Mostramos la fecha.
				////////////////////////////////////////////////////////////////
				saveLastTimeLocaly(new Date());
				
				retrieveLastTime();
				
			}
			////////////////////////////////////////////////////////////////
			// Activamos el DatePicker 
			////////////////////////////////////////////////////////////////
			
			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			//Obtenemos la hora de la última conexión con éxito
			retrieveLastTime();
			//Añadimos un mensaje de error:
			$("#lastconnection").append( "<p>Ha ocurrido un error: " + xhr.status + "</p>" );
		}
    });	
}
