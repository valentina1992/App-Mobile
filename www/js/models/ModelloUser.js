define(function(require) {

    var Backbone = require("backbone");
    var md5= require("md5");
	var auth=require("auth");
	var pathApi=require("pathApi");

    var ModelloUser = Backbone.Model.extend({

        constructorName: "ModelloUser",

        initialize: function(options) {
            this.email = options.email;
            this.psw= options.psw;           
            this.psw = md5(pathApi.md5Key+ this.psw);
        },

        url: function() {
            var url = pathApi.urlCostumers+'?io_format=JSON&filter[email]='+this.email+'&filter[passwd]='+this.psw;
            
            return url;
        },

      parse: function(response) {
            return response;
        },

        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = auth;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ModelloUser;
});
