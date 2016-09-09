define(function(require) {

    var Backbone = require("backbone");    
    var Utils = require("utils");
    var ModelloHome = require("models/ModelloHome");
	var auth=require("auth");
	var pathApi=require("pathApi");

    var viewRegistrazione = Utils.Page.extend({

        constructorName: "viewRegistrazione",

        model: ModelloHome,

        initialize: function() {

            this.template = Utils.templates.registrazione;

        },

        id: "viewRegistrazione",
        className: "viewRegistrazione",

        events: {
            "click #registrati": "registrati"
        },

        render: function() {
            $(this.el).html(this.template());
            return this; 
        },

        registrati: function(e) {

            el: $("#form-registrazione");

            var self = this;
            
            var email = $(this.el).find("#email").val(),
                psw = $(this.el).find("#password").val(),
                nome = $(this.el).find("#nome").val(),
                cognome = $(this.el).find("#cognome").val();

            var synopsis = '<?xml version="1.0" encoding="UTF-8"?> <prestashop xmlns:xlink="http://www.w3.org/1999/xlink"> <customer> <id_default_group></id_default_group> <id_lang format="isUnsignedId"></id_lang> <newsletter_date_add></newsletter_date_add> <ip_registration_newsletter></ip_registration_newsletter> <last_passwd_gen readOnly="true"></last_passwd_gen> <secure_key format="isMd5" readOnly="true"></secure_key> <deleted format="isBool"></deleted> <passwd required="true" maxSize="32" format="isPasswd">';
            synopsis += psw + '</passwd> <lastname required="true" maxSize="32" format="isName">';
            synopsis += cognome + '</lastname> <firstname required="true" maxSize="32" format="isName">';
            synopsis += nome + '</firstname> <email required="true" maxSize="128" format="isEmail">';
            synopsis += email + '</email> <id_gender format="isUnsignedId"></id_gender> <birthday format="isBirthDate"></birthday> <newsletter format="isBool"></newsletter> <optin format="isBool"></optin> <website format="isUrl"></website> <company format="isGenericName"></company> <siret format="isSiret"></siret> <ape format="isApe"></ape> <outstanding_allow_amount format="isFloat"></outstanding_allow_amount> <show_public_prices format="isBool"></show_public_prices> <id_risk format="isUnsignedInt"></id_risk> <max_payment_days format="isUnsignedInt"></max_payment_days> <active format="isBool"></active> <note maxSize="65000" format="isCleanHtml"></note> <is_guest format="isBool"></is_guest> <id_shop format="isUnsignedId"></id_shop> <id_shop_group format="isUnsignedId"></id_shop_group> <date_add format="isDate"></date_add> <date_upd format="isDate"></date_upd> <associations> <groups nodeType="groups" api="groups"> <groups> <id></id> </groups> </groups> </associations> </customer> </prestashop>';
            
            var chiamataAjax = function() {
                $.ajax({
                    url: pathApi.urlCostumers+'?id=1&schema=synopsis',
                    async: true,
                    data: synopsis,
                    type: "POST",
                    beforeSend: auth,

                    success: function(result) {
						
						e.preventDefault();
						$('#success_registrazione').openModal({
						  opacity: 0,
						  complete: function() { $('.lean-overlay').remove() }
						});

                        Backbone.history.navigate("login", {
							trigger: true
						});

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        e.preventDefault();
						$('#error_connection').openModal();
                    }
                })
            };
            chiamataAjax();
        }
    });

    return viewRegistrazione;

});
