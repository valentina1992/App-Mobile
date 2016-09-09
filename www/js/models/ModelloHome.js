define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");
	var pathApi=require("pathApi");
	var auth=require("auth");   

    var ModelloHome = Backbone.Model.extend({

        constructorName: "ModelloHome",

        initialize: function(options) {
            
        },

        url: function() {
            var url = pathApi.urlProducts+'?io_format=JSON&display=full';            
            return url;
        },

        parse: function(response) {

            return response.products;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = auth;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ModelloHome;
});
