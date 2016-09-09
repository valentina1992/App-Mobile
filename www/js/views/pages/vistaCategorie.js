define(function(require) {

    var Backbone = require("backbone");
    var ModelloCategorie = require("models/ModelloCategorie");
    var Utils = require("utils");
	var ArrayImg=require("arrayImgPath");

    var vistaCategorie = Utils.Page.extend({

        constructorName: "vistaCategorie",

        model: ModelloCategorie,

        initialize: function() {

            this.template = Utils.templates.categorie;

        },

        id: "vistaCategorie",
        className: "vistaCategorie",

        events: {
            "click #categorie": "categorie",
            "click #listaprod": "listaprod",
        },

        render: function() {

			var categorieArray = new Array();

            var tmpArray = JSON.parse(localStorage.getItem("categorie"));

			var immagini=JSON.parse(ArrayImg);

            for (var i = 0; i < 18; i++) {
                var categoria = {
                    id: tmpArray[i].id,
                    img: immagini[i],
                    nome: tmpArray[i].name,
                    meta_title: tmpArray[i].meta_title
                }
                categorieArray.push(categoria);
            }

            categorieArray.splice(0, 2);
            categorieArray.splice(15, 2);

            $(this.el).html(this.template(categorieArray));
            return this;

        },

        listaprod: function(e) {

            e.preventDefault();

            var datocategoria = $(e.currentTarget).attr("data-cat");

            localStorage.setItem("datocategoria", datocategoria);

            Backbone.history.navigate("prodotti", {
                trigger: true
            });
        },

        // categorie: function(e) {

            // e.preventDefault();

            // var datocategoria = $(e.currentTarget).attr("data-cat");

            // localStorage.setItem("datocategoria", datocategoria);

            // Backbone.history.navigate("ListProductByCategory", {
                // trigger: true
            // });
        // },

    });

    return vistaCategorie;

});
