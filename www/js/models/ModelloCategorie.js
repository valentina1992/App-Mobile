define(function(require) {

    var Backbone = require("backbone");
    var auth=require("auth");
	var pathApi=require("pathApi");

    var ModelloCategorie = Backbone.Model.extend({

       constructorName: "ModelloCategorie",

       initialize: function() {

       },

       url: pathApi.urlCategories+'?io_format=JSON&display=full',

       parse: function(data) {
        return data.categories;
    },

    sync: function(method, collection, options) {
        options = options || {};
        options.beforeSend = auth;
        return Backbone.Model.prototype.sync.apply(this, arguments);
    }
});

    return ModelloCategorie;
});
