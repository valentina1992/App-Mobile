define(function(require) {

  var Backbone = require("backbone");    
	var auth=require("auth");
	var pathApi=require("pathApi");


    var ModelloProdotti = Backbone.Model.extend({

        constructorName: "ModelloProdotti",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url=pathApi.urlProducts;
            url += this.id;
            url += '?io_format=JSON';
            return url;
        },

        parse: function(response) {

            return response.product;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = auth;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ModelloProdotti;
});
