define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
	

    var vistaCarrello = Utils.Page.extend({

        constructorName: "vistaCarrello",


        initialize: function() {
            this.template = Utils.templates.carrello;
        },

        id: "vistaCarrello",
        className: "vistaCarrello",

        events: {
            "click #svuota": "svuota",
            "click #cartleft-btn": "checkout"
        },

        render: function() {
			$(this.el).html(this.template(JSON.parse(localStorage["carrello"])));
            return this;
            // var that = this.template(JSON.parse(localStorage["carrello"]));
            // return that;

        },

        checkout: function(e) {

            
            if (localStorage.getItem("sessione")!= null) {
                Backbone.history.navigate("checkout", {
                    trigger: true
                });
            } else {
                Backbone.history.navigate("login", {
                    trigger: true
                });
            }
        },


        svuota: function(e) {

            var Carrello = JSON.parse(localStorage["carrello"]);
            Carrello = [];
            localStorage["carrello"] = JSON.stringify(Carrello);
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
    });

    return vistaCarrello;

});
