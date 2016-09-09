define(function(require) {

    var Backbone = require("backbone");
    var ModelloUser = require("models/ModelloUser");
    var Utils = require("utils");    

    var viewLogin = Utils.Page.extend({

        constructorName: "viewLogin",

        model: ModelloUser,

        initialize: function() {
            this.template = Utils.templates.login;
        },

        id: "viewLogin",
        className: "viewLogin",

        events: {
            "click #login": "login",
            "click #registrazione": "registrazione"
        },

        render: function() {           
            $(this.el).html(this.template());
            return this; 
        },

        registrazione: function(event) {

            Backbone.history.navigate("registrazione", {
                trigger: true
            });
        },

        login: function(e) {

            el: $("#login-form");

            var self = this;

            var email = $(this.el).find("#email").val();
			var psw = $(this.el).find("#password").val();
			
			if(email!=null && psw!=null)
			{
				 var utente = new ModelloUser({
					email: email,
					psw: psw
				});

            utente.fetch({

                success: function() {                   
					
                    localStorage.setItem("sessione", email);

					$("#slide-out").append('<li><a id="vistaCategorie">Categorie</a></li>');
					$("#slide-out").append('<li><a id="profilo">Profilo</a></li>');
					$("#slide-out").append('<li><a id="logout">Logout</a></li>');
					$("#slide-out").append('<li><a id="cart">Carello</a></li>');
					
					$("#login").hide();	                    
					
                    Backbone.history.navigate("myview", {
							trigger: true
					});                   

				},
                error: function() {
					e.preventDefault();
					$('#error_connection').openModal();
				}

				})
			}
		}

    });

    return viewLogin;

});
