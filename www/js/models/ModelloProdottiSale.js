define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");    
	var auth=require("auth");
	var pathApi=require("pathApi");

    var ModelloProdottiSale = Backbone.Model.extend({

      constructorName: "ModelloProdottiSale",

      initialize: function(options) {

      },

      url: function() {

        var url = pathApi.urlProducts+'?io_format=JSON&sort=';
        url += "on_sale_DESC";
        url += '&display=full&limit=5';
       
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


    return ModelloProdottiSale;
});

