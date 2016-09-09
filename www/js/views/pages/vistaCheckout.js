define(function(require) {

    var Backbone = require("backbone");
    var auth=require("auth");
	var pathApi=require("pathApi");
    var Utils = require("utils");

    var checkoutView = Utils.Page.extend({

        constructorName: "vistaCheckout",

        initialize: function() {
            this.template = Utils.templates.checkout;
        },

        id: "vistaCheckout",
        className: "vistaCheckout",

        events: {
            "click #ordina": "ordina",
            "click #continua": "continua",
        },

        render: function() {

            $(this.el).html(this.template());
            return this;
        },


        ordina: function(e) {

          var Carrello = JSON.parse(localStorage["carrello"]);
          Carrello = [];
          localStorage["carrello"] = JSON.stringify(Carrello);

          e.preventDefault();
          $('#successOrdine').openModal({
            opacity: 0,
            complete: function() { $('.lean-overlay').remove() }
          });


        },


    });

    return checkoutView;

});
