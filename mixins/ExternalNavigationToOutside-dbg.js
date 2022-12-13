/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside = {
		_processIntentNavigationAllowed : function (target, alternativeTarget) {
			var _that = this;
			var oCrossAppNavigator = sap.ushell && sap.ushell.Container && sap.ushell.Container
				.getService("CrossApplicationNavigation");
			sap.ushell.Container.getService("CrossApplicationNavigation")
				.isIntentSupported([target])
				.done(function(oData) {
					if (oData[target].supported) {
						oCrossAppNavigator
							.toExternal({
								target: {
									shellHash: target
								}
							});
					}
					else if (alternativeTarget) {
						sap.ushell.Container.getService("CrossApplicationNavigation")
						.isIntentSupported([alternativeTarget])
						.done(function(oDataAlternative) {
							if (oDataAlternative[alternativeTarget].supported) {
								oCrossAppNavigator
									.toExternal({
										target: {
											shellHash: alternativeTarget
										}
									});
							}
							else {
								_that._showNavigationNotAllowedError();
							}
						});
					}
					else {
						_that._showNavigationNotAllowedError();
					}
				});
		},
		
		_showNavigationNotAllowedError: function() {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.show(
					this.oResourceBundle.getText("MESSAGE_NO_NAVIGATION_POSSIBLE"), {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: this.oResourceBundle.getText("MESSAGE_SEVERITY_ERROR"),
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function(oAction) {
						},
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
		},

		handleSelectPO: function(evt) {
			//if (this._oPGRValidPO._bSelectionDone == false) {
				if (this.byId("POTable").getSelectedItem() != null | this.byId("POTable").getSelectedItem() != undefined) {
					var selectedLine = this.byId("POTable")
						.getSelectedItem().getBindingContext()
						.getObject();
					var target = "PurchaseOrder-manage?PurchaseOrder=" + selectedLine.PurchasingDocument;
					this._processIntentNavigationAllowed(target);
				}
			/*} else {
				this._oPGRValidPO._bSelectionDone = false;
			}*/
		},

		handleSelectGR: function(evt) {
			var selectedLine = this.byId("GRTable")
				.getSelectedItem().getBindingContext()
				.getObject();
			var target = "MaterialMovement-displayFactSheet?MaterialDocumentYear=" + selectedLine.MaterialDocumentYear + "&MaterialDocument=" + selectedLine.PurchasingDocument + "";
			this._processIntentNavigationAllowed(target);
		},

		CreatePO: function(evt) {

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setJSON(this._getJSONDataForNavigation());
			oModel
				.setProperty("/NavigationData/FilterData", this
					.getView().byId("ME2STAR_SFB")
					.getFilterItems());
			this.oApplicationFacade.setApplicationModel(oModel,
				"NavModel");

			var target = "PurchaseOrder-create";
			var alternativeTarget = "PurchaseOrder-manage";
			this._processIntentNavigationAllowed(target,alternativeTarget);
		},

		handleSelectSI: function(evt) {
			var selectedLine = this.byId("SITable")
				.getSelectedItem().getBindingContext()
				.getObject();

			var target = "SupplierInvoice-display?FiscalYear=" + selectedLine.InvoiceReferenceFiscalYear + "&SupplierInvoice=" + selectedLine.PurchasingDocument + "&State=" + "02";
			this._processIntentNavigationAllowed(target);
		},

		handleSelectPR: function(evt) {
			var selectedLine = this.byId("PRTable")
				.getSelectedItem().getBindingContext()
				.getObject();

			var target = "PurchaseRequisition-displayFactSheet?PurchaseRequisition=" + selectedLine.PurchaseRequisition + "&PurchaseRequisitionItem=" + selectedLine.PurchaseRequisitionItem;
			this._processIntentNavigationAllowed(target);
		},

		PostGR: function() {
			//if (this._oPGRValidPO._bValid == true) {
				var target = "PurchaseOrder-createGR?PurchaseOrder=" + this._oPGRValidPO._vPONumber;
				this._processIntentNavigationAllowed(target);
			//}
		}
	};
})();