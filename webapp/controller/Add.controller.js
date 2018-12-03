sap.ui.define([
	"opensap/manageproducts/ManageProducts/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(BaseController, History, MessageToast) {
	"use strict";

	return BaseController.extend("opensap.manageproducts.ManageProducts.controller.Add", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function() {

			// Register to the add route matched
			this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onRouteMatched: function() {

			//here goes your logic which will be executed when the "add" route is hit
			//will be done within the next unit
		
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded: function () {

			// create default properties
			var oProperties = {
				ProductID: "HT-" + parseInt(Math.random() * 1000000),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "PHP",
				MeasureUnit: "EA"
			};

			// create new entry in the model
			this._oContext = this.getModel().createEntry("/Product", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},

		_onCreateSuccess: function (oProduct) {

			// navigate to the new product's object view
			var sId = oProduct.ProductID;
			this.getRouter().navTo("object", {
				objectId : sId
			}, true);
	
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText("newObjectCreated", [oProduct.ProductName]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});
		},

		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function() {
			this.onNavBack();
		},

		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function() {
			this.getModel().submitChanges();
		},

		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {

			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}

	});
});
