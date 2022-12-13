/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.Validation");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.Validation = {
		_validForPostGR: function(oEvent) {
			
			var aItems = this.getView().byId("POTable").getItems();
			var vPONumber = null;
			this._oPGRValidPO = {
				_vPONumber: "",
				_bValid: true,
				_bBackendValidation: true,
				_bSingleSelection: true,
				_bSelectionDone: true
			};
			
			for (var i = 0; i < aItems.length; ++i) {
				try {
					if (aItems[i].getCells()[0].getSelected() === true) {
						if (this._oPGRValidPO._vPONumber !== "") {
							vPONumber = this._getPONumber(aItems[i].getCells()[1].getText());
							if (this._oPGRValidPO._vPONumber !== vPONumber) {
								this._oPGRValidPO._bSingleSelection = false;
								this._oPGRValidPO._bValid = false;
								break;
							} 
						} else if (aItems[i].getBindingContext().getObject().PostGr === false) {
							this._oPGRValidPO._bBackendValidation = false;
							this._oPGRValidPO._bValid = false;
							break;
						}
						if (this._oPGRValidPO._bValid === true) {
							this._oPGRValidPO._vPONumber = this._getPONumber(aItems[i].getCells()[1].getText());
						}
					}
				} catch (e) {
					//TRY-CATCH necessary because aItems[i].getCells() is not available for every item
				}
			}
			
			
			
			if (this._oPGRValidPO._vPONumber === "") {
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setEnabled(false);
				this.getPage().getFooter().getContentRight()[0].setEnabled(true);
			} else {
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[1].setEnabled(true);
				this.getPage().getFooter().getContentRight()[0].setEnabled(false);
			}
			if (this._oPGRValidPO._bSingleSelection === false) {
				sap.m.MessageToast.show(this.oResourceBundle.getText("SEL_PO"), {
					at: "center center"
				});
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setEnabled(false);
				this.getPage().getFooter().getContentRight()[0].setEnabled(false);
			} else if (this._oPGRValidPO._bBackendValidation === false) {
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setEnabled(false);
				this.getPage().getFooter().getContentRight()[0].setEnabled(false);
			}

		},

		_failureHandler: function(oData, response) {
			sap.m.MessageToast.show(oData.message, {
				at: "center center"
			});
			//this.aBusyDialog[0].close();
			//this.aBusyDialog.shift();
		}
	};
})();