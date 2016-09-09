define(function(require) {

    var Backbone = require("backbone");    
    var autenticazione = require("auth");
	var pathApi = require("pathApi");
	
    var Cliente = Backbone.Model.extend({

        constructorName: "Cliente",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url = pathApi.urlCostumers+'?display=full&io_format=JSON&filter[email]=';
            url += this.id;
            return url;
        },

        parse: function(response) {

            return response.customers;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return Cliente;
});
