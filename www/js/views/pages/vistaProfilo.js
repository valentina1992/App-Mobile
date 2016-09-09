define(function(require) {

    var Backbone = require("backbone");
    var Cliente = require("models/Cliente");
    var Utils = require("utils");
	var auth=require("auth");

    var vistaProfilo = Utils.Page.extend({

        constructorName: "vistaProfilo",


        model: Cliente,

        initialize: function() {
            this.template = Utils.templates.profilo;
        },

        id: "vistaProfilo",
        className: "vistaProfilo",

        events: {
            "tap #home": "home",
            "tap #dettaglio": "detail"
        },

        render: function() {

            var email_utente = localStorage.getItem("sessione");
            var utente = new Cliente({
                id: email_utente
            });
            console.log(utente);
            var that = this;
            utente.fetch({
                success: function() {                    

                    var chiamataAjax = function() {
                        $.ajax({
                            url: 'http://192.168.56.101/loveitaly/api/orders/?io_format=JSON&display=full&filter[id_customer]='+ localStorage.getItem("idsess"),
                            async: true,
                            type: "GET",
                            dataType: 'json',
                            beforeSend: auth,

                            success: function(result) {
                                utente.ordini= result.orders;
                                console.log(utente.toJSON());
                                $(that.el).html(that.template(utente));
                                return that;
                              },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log('Errore chiamata ajax!' +
                                    '\nReponseText: ' + XMLHttpRequest.responseText +
                                    '\nStatus: ' + textStatus +
                                    '\nError: ' + errorThrown);
                            }
                        })
                    }
                    chiamataAjax();

                },
                error: function() {}
            })

        }


    });

    return vistaProfilo;

});
