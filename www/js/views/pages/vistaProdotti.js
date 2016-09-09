define(function(require) {

    var Backbone = require("backbone");
    var ModelloProdotti = require("models/ModelloProdotti");
    var Utils = require("utils");

    var pathApi = require("pathApi");


    var vistaProdotti = Utils.Page.extend({

        constructorName: "vistaProdotti",

        model: ModelloProdotti,

        initialize: function(variabile) {


            this.template = Utils.templates.prodotti;


        },

        id: "vistaProdotti",
        className: "vistaProdotti",

        events: {
            "tap #home": "home",
            "click #prodotto": "prodotto"
        },

        render: function() {

            var arraytmp = localStorage.getItem("datocategoria");
            var modelloProdotti = new ModelloProdotti({
                id: arraytmp
            });

            var that = this;
            modelloProdotti.fetch({
                success: function() {
                    var arraytmp= modelloProdotti.toJSON();

                    for (var i = 0; i < (Object.keys(arraytmp).length)-1; i++) {

                        var idprod = ((modelloProdotti.toJSON())[i]).id;
                        var idtemp= modelloProdotti.toJSON()[i];
                        idimg = (idtemp.associations.images[0]).id;
                        idprod = idprod;
                        var img2 = pathApi.imageProducts + idprod + '/' + idimg + pathApi.wsKey;
                        ((modelloProdotti.toJSON())[i]).img= img2;
                        ((modelloProdotti.toJSON())[i]).price= parseFloat(((modelloProdotti.toJSON())[i]).price).toFixed(2);
                    }


                    $(that.el).html(that.template((modelloProdotti.toJSON())));
                    return that;
                }
            });
        },
        prodotto: function(e) {

            e.preventDefault();

            var datoprod = $(e.currentTarget).attr("data-prod");

            localStorage.setItem("datoprod", datoprod);

            Backbone.history.navigate("prodotto", {
                trigger: true
            });
        }



    });

    return vistaProdotti;

});
