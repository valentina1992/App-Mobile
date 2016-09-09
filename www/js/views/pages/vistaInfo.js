define(function(require) {

    var Backbone = require("backbone");
    var ModelloHome = require("models/ModelloHome");
    var Utils = require("utils");
	
	var infoView = Utils.Page.extend({

        constructorName: "infoView",

        model: ModelloHome,

        initialize: function() {

            this.template = Utils.templates.info;

        },

        id: "infoView",
        className: "infoView",

		render: function() {           
            $(this.el).html(this.template());
            return this; 
        },	
        
    });

    return infoView;    

});
