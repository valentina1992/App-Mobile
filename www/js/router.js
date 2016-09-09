define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");

    var StructureView = require("views/StructureView");
    var myview = require("views/pages/myview");

	var ModelloUser = require("models/ModelloUser");
	var ModelloHome = require("models/ModelloHome");
	var ModelloCategorie = require("models/ModelloCategorie");

    var viewLogin = require("views/pages/viewLogin");
    var viewRegistrazione = require("views/pages/viewRegistrazione");
	var no_connectionView = require("views/pages/no_connectionView");
	var vistaContatti = require("views/pages/vistaContatti");
    var vistaProfilo = require("views/pages/vistaProfilo");
    var vistaInfo = require("views/pages/vistaInfo");
	var vistaCategorie = require("views/pages/vistaCategorie");
	var vistaCarrello = require("views/pages/vistaCarrello");
	var vistaCheckout = require("views/pages/vistaCheckout");

  var vistaProdotti = require("views/pages/vistaProdotti");

    var AppRouter = Backbone.Router.extend({

        constructorName: "AppRouter",

        routes: {

            "": "showStructure",
            "myview": "myview",
            "login": "login",
			"registrazione": "registrazione",
			"contatti": "contatti",
            "profilo": "profilo",
            "info": "info",
			"categorie": "categorie",
            "carrello": "carrello",
			"checkout":"checkout",
      "prodotti": "prodotti",
        },

        firstView: "myview",

        initialize: function(options) {

            localStorage.setItem('networkState',true);
        },

        myview: function() {

			 if (localStorage.getItem('networkState') !=null)
			{
				if(localStorage.getItem('sessione')!=null)
				{
					var categorie = new ModelloCategorie();

					categorie.fetch({
						success: function(categorie, response, options) {

							localStorage.setItem("categorie", JSON.stringify(categorie));

						},
						error: function(categorie, response, options) {

						}
					});

					var page = new myview({});
					this.changePage(page);
				}
				else
				{
					var model = new ModelloHome();
					var page = new viewLogin({
						model: model
					});
					this.changePage(page);
				}
            }
			else
			{
                var page = new no_connectionView({});
                this.changePage(page);
            }

        },
        registrazione: function() {
            var model = new ModelloHome();
            var page = new viewRegistrazione({
                model: model
            });
            this.changePage(page);
        },
        prodotti: function(){
          var page = new vistaProdotti({

          });
          this.changePage(page);
        },

        login: function() {
            var model = new ModelloHome();
            var page = new viewLogin({
                model: model
            });
            this.changePage(page);
        },

		info: function() {

            var model = new ModelloHome();
            var page = new vistaInfo({
                model: model
            });

            this.changePage(page);

        },

        contatti: function() {
            var model = new ModelloHome();
            var page = new vistaContatti({
                model: model
            });
            this.changePage(page);
        },

		categorie: function() {

            var page = new vistaCategorie({

            });
            this.changePage(page);
        },

		carrello: function() {

			var model = new ModelloHome();
            var page = new vistaCarrello({
                model: model
            });
            this.changePage(page);


        },

		checkout: function() {

			var model = new ModelloHome();
			var page = new vistaCheckout({
				model: model
			});
			this.changePage(page);

        },

        showStructure: function() {
            if (!this.structureView) {
                this.structureView = new StructureView();

                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }

            if (localStorage.getItem("sessione") != null) {
                $("#slide-out").append('<li><a id="vistaCategorie">Categorie</a></li>');
				$("#slide-out").append('<li><a id="profilo">Profilo</a></li>');
				$("#slide-out").append('<li><a id="logout">Logout</a></li>');
				$("#slide-out").append('<li><a id="cart">Carrello</a></li>');
				$("#login").hide();
            }

            this.navigate(this.firstView, {
                trigger: true
            });
        },

    });

    return AppRouter;

});
