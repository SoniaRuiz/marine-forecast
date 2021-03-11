/**
 * JS para la inclusión de plugins disponibles en Cordova
 *
 */
 
 
 

/** 
 * Método que utiliza los datos retornados por el acelerómetro del dispositivo.
 * @param no params
 * @return no return data
 */
function accelerometer(){
	
	navigator.accelerometer.getCurrentAcceleration(
				function (e) {// En caso de éxito obtener la posición
					var newobject = $( "<p><span><b>Eje X:</b> " + e.x + '<br/>' +
										  '<b>Eje Y:</b> ' + e.y + '<br/>' + 
										  '<b>Eje Z:</b> ' + e.z + '<br/></span></p>' );
					$('#results').append(newobject);
					$('#myModal').modal('show');
					

				},
				function onError(e) {//En caso de error mostrar un mensaje
					var newobject = $( "<p><span><b>Ha ocurrido un error:</b> " + e.message + '<br/>' +
											'<b>Código:</b> ' + e.code + '<br/></span></p>' );
					$('#results').append(newobject);
					$('#myModal').modal('show');
				}
			);
}


/** 
 * Método que utiliza los datos retornados por el sensor de geolocalización del dispositivo.
 * @param no params
 * @return no return data
 */
function geolocation(){
	
	navigator.geolocation.getCurrentPosition(
			function (e) {// En caso de éxito obtener la posición
				
				var newobject = $( "<p><span><b>Latitud:</b> " + e.coords.latitude + '<br/>' +
									  '<b>Longitud:</b> ' + e.coords.longitude + '<br/></span></p>' );
				$('#results').append(newobject);
				$('#myModal').modal('show');

			},
			function onError(e) {//En caso de error mostrar un mensake
		
				var newobject = $( "<p><span><b>Ha ocurrido un error:</b> " + e.message + '<br/>' +
										'<b>Código:</b> ' + e.code + '<br/></span></p>' );
				$('#results').append(newobject);
				$('#myModal').modal('show');
			}
		);
}

/** 
 * Método que toma una fotografía y la muestra en el popup.
 * @param no params
 * @return no return data
 */
function camera(){
	navigator.camera.getPicture(
			function(img){
				var newobject = $( "<img src='data:image/jpeg;base64," + img + "' /></span>" );
				$('#results').append(newobject);
				$('#myModal').modal('show');
			}, 
			function(e){
				var newobject = $( "<p><span><b>Ha ocurrido un error:</b> " + e.message + '<br/>' +
						'<b>Código:</b> ' + e.code + '<br/></span></p>' );
				$('#results').append(newobject);
				$('#myModal').modal('show');
			}, 
			{quality: 70, destinationType: Camera.DestinationType.DATA_URL});

}


/** 
 * Método que obtiene datos generales sobre el dispositivo:
 * - Nombre del modelo del dispositivo.
 * - Nombre del sistema operativo del dispositivo.
 * - Versión del sistema operativo.
 * - Versión de Cordova utilizada en el dispositivo.
 * @param no params
 * @return no return data
 */
function device(){
	var newobject = $( "<span><b>Modelo:</b> " + device.model + '<br/>' +
							'<b>Sistema operativo:</b> ' + device.platform  + '<br/>' + 
							'<b>Versión del sistema operativo:</b> ' + device.version  + '<br/>' + 
							'<b>Sobre Cordova:</b> ' + device.cordova  + '<br/></span>' );
	$('#results').append(newobject);
	$('#myModal').modal('show');
}
