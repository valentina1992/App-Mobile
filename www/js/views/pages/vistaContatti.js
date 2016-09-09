define(function(require) {

    var Backbone = require("backbone");
    var ModelloHome = require("models/ModelloHome");
    var Utils = require("utils");


    var vistaContatti = Utils.Page.extend({

        constructorName: "vistaContatti",

        model: ModelloHome,

        initialize: function() {

            this.template = Utils.templates.contatti;

        },

        id: "vistaContatti",
        className: "vistaContatti",

		render: function() {           
            $(this.el).html(this.template());
            return this; 
        },		
        
    });

    return vistaContatti;

});
