define(function(require) {

    var Backbone = require("backbone");
    var ModelloUser = require("models/ModelloUser");
    var Utils = require("utils");
    var StructureView = require("views/StructureView");
	var myview = require("views/pages/myview");

    var no_connectionView = Utils.Page.extend({

        constructorName: "no_connectionView",

        model: ModelloUser,

        initialize: function() {

            this.template = Utils.templates.no_connection;

        },

        id: "no_connectionView",
        className: "no_connectionView",

        events: {
            "click #ricarica": 'ricarica',
			"click #continua": 'continua'
        },

        render: function() {

            $(this.el).html(this.template());
            return this;
        },

        ricarica: function(e) {

            this.structureView = new StructureView();

            (this.structureView.render().el);
            this.structureView.trigger("inTheDOM");
        },
		continua: function(e){
			
            if (localStorage.getItem("sessione") != null) 
			{
                Backbone.history.navigate("myview", {
                    trigger: true
                });
            } 
			else 
			{
                
               $('#no_loggato').openModal({
                  opacity: 0,
                  complete: function() { $('.lean-overlay').remove() }
                });
            }
		}


    });

    return no_connectionView;

});
