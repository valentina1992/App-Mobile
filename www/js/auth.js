define(function(require) {
	
    var autenticazione = function(xhr) {
        var apiKey = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; 
        var token = 'Basic '.concat(apiKey);
        xhr.setRequestHeader('Authorization', token);
    }

	return autenticazione;
});
