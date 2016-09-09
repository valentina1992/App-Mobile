define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var handlebars = require("handlebars");


    var StructureView = Backbone.View.extend({

        constructorName: "StructureView",

        id: "main",

        events: {
            "click #nav1": "myView",
            "click #home": "myView",
            "click #auth": "auth",
            "click #contatti": "contatti",
            "click #profilo": "profilo",
            "click #info": "info",
            "click #login": "login",
            "click #logout": "logout",
			"click #cart": "carrello",
			"click #vistaCategorie": "categorie",
      "click #continua": "continua",	
        },

        initialize: function(options) {
            this.template = Utils.templates.structure;
        },

        render: function() {

               this.el.innerHTML = this.template({});

               this.contentElement = this.$el.find('#content')[0];
               return this;

           },

           continua: function(e){
             Backbone.history.navigate("myview", {
                 trigger: true
             });
           },

        login: function(event) {

            if (localStorage.getItem("sessione") == null)
			{
                Backbone.history.navigate("login", {
                    trigger: true
                });
            }
			else
			{
                Backbone.history.navigate("myview", {
                    trigger: true
                });
            }

        },

        logout: function(event) {

            localStorage.removeItem("sessione");

            $("#vistaCategorie").remove();
			$("#profilo").remove();
			$("#logout").remove();
			$("#cart").remove();
			$("#login").show();

            Backbone.history.navigate("login", {
                trigger: true
            });

        },

        info: function(event) {

            Backbone.history.navigate("info", {
                trigger: true
            });
        },

        profilo: function(event) {

            Backbone.history.navigate("profilo", {
                trigger: true
            });
        },

        contatti: function(event) {

            Backbone.history.navigate("contatti", {
                trigger: true
            });
        },
		carrello: function(event) {

            Backbone.history.navigate("carrello", {
                trigger: true
            });
        },

        myView: function(event) {

            Backbone.history.navigate("myview", {
                trigger: true
            });
        },

		categorie: function(event) {

            Backbone.history.navigate("categorie", {
                trigger: true
            });
        },


    });

    return StructureView;

});
