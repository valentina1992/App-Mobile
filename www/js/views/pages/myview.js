define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
	var pathApi=require("pathApi");
	var ModelloHome=require("models/ModelloHome");
	var ModelloProdotti=require("models/ModelloProdotti");
	var ModelloProdottiSale=require("models/ModelloProdottiSale");

    var myview = Utils.Page.extend({
        constructorName: "myview",
        model: ModelloHome,

        initialize: function() {
            this.template = Utils.templates.myview;
        },

        id: "myview",
        className: "myview",

        events: {
            "click #imgslide": "prodotto",
            "click #bottone-ca": "carrello",
            "click #cartleft-btn": "checkout",
        },

        render: function() {

            var that = this;
            var products = new ModelloProdottiSale();


            products.fetch({
                success: function() {
					var arraytmp = [];
					arraytmp[0]=(products.attributes);


					for (var i = 0; i < 5; i++) {

						var idproduct = ((arraytmp[0][i])).id;
						var objectTmp = (arraytmp[0][i]);
						idimg = (objectTmp.associations.images[0]).id;

						var imgSrc = pathApi.imageProducts + idproduct + '/' + idimg + '/?ws_key='+pathApi.wsKey;


						((arraytmp[0][i])).img = imgSrc;
						((arraytmp[0][i])).price = parseFloat(((arraytmp[0][i])).price).toFixed(2);
					}

					$(that.el).html(that.template(arraytmp));

					that.startnav();

					return that;

                    }

            });

        },


        carrello: function(e) {

            var namePrice = $(e.currentTarget).closest('#card-border').find('p').text();
            namePrice = namePrice.replace(/\s+/g, '');
            namePrice = namePrice.split("€");
            /* -- -- */

            var idprod = $(e.currentTarget).closest('#card-border').attr('data-prod');
            name = namePrice[0],
                img = $(e.currentTarget).closest('#card-border').attr('imgSrc');
            price = namePrice[1];
            quantity = 1;

            var prod = new ModelloProdotti({
                name: name,
                id: idprod,
                img: img,
                price: parseFloat(price).toFixed(2),
                quantity: quantity,
                total: price * quantity
            });

			if(localStorage.getItem("carrello") !=null)
			{
				 var carrello = JSON.parse(localStorage["carrello"]);
				carrello.push(prod);
				localStorage["carrello"] = JSON.stringify(carrello);
			}
			else
			{
				var arraytemp=[];
				arraytemp.push(prod);
				localStorage.setItem("carrello", JSON.stringify(arraytemp));
			}



            // if (Backbone.history.fragment === 'basket') {
                // Backbone.history.stop();
                // Backbone.history.start()
            // }

            // Backbone.history.navigate("basket", {
                // trigger: true
            // });

			e.preventDefault();
			$('#success_addcart').openModal({
			  opacity: 0,
			  complete: function() { $('.lean-overlay').remove() }
			});
        },

        // prodotto: function(e) {
            // e.preventDefault();

            // var datoprod = $(e.currentTarget).attr("data-prod");

            // localStorage.setItem("datoprod", datoprod);

            // Backbone.history.navigate("prodotto", {
                // trigger: true
            // });
        // },


        startnav: function(e) {

            $("#back-button").click(function(e) {
                e.preventDefault();
                $("#menu-button").show();
            });


            $("#svuota").click(function(e) {
                e.preventDefault();
                $('#modal1').closeModal();
            });
        },


    });

    return myview;

});
