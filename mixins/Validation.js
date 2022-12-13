/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.Validation");
jQuery.sap.declare("sap/ui/core/Fragment");
(function () {
	"use strict";
	elsan.zmmpur.puritems.mixins.Validation = {
		_validForPostGR: function (E) {
			var I = this.getView().byId("POTable").getItems();
			var p = null;
			this._oPGRValidPO = {
				_vPONumber: "",
				_bValid: true,
				_bBackendValidation: true,
				_bSingleSelection: true,
				_bSelectionDone: true,
				_POTyp: "",
				_PO: "",
				_POStat: "",
				_vPONumberItem: ""
			};
			for (var i = 0; i < I.length; ++i) {
				try {
					if (I[i].getCells()[0].getSelected() === true) {
						if (this._oPGRValidPO._vPONumber !== "") {
							p = this._getPONumber(I[i].getCells()[1].getText());
							if (this._oPGRValidPO._vPONumber !== p) {
								I[i].getCells()[0].setSelected(false);
								this._oPGRValidPO._bSingleSelection = false;
								// this._oPGRValidPO._bValid = false;
								if (this._oPGRValidPO._bValid === true) {
									this._oPGRValidPO._vPONumber = this._getPONumber(I[i].getCells()[1].getText());
									this._oPGRValidPO._PO = this._getPONumber(I[i].getCells()[1].getText());
									this._oPGRValidPO._POTyp = I[i].getBindingContext().getObject().PurchasingDocumentType;
									this._oPGRValidPO._POStat = I[i].getBindingContext().getObject().Status;
									this._oPGRValidPO._vPONumberItem = I[i].getBindingContext().getObject().PurchasingDocumentItem;
								}
								break;
							}
						} else if (I[i].getBindingContext().getObject().PostGr === false) {
							this._oPGRValidPO._bBackendValidation = false;
							this._oPGRValidPO._bValid = false;
							this._oPGRValidPO._PO = this._getPONumber(I[i].getCells()[4].getText());
							this._oPGRValidPO._vPONumber = this._getPONumber(I[i].getCells()[1].getText());
							this._oPGRValidPO._PO = this._getPONumber(I[i].getCells()[1].getText());
							this._oPGRValidPO._POTyp = I[i].getBindingContext().getObject().PurchasingDocumentType;
							this._oPGRValidPO._POStat = I[i].getBindingContext().getObject().Status;
							this._oPGRValidPO._vPONumberItem = I[i].getBindingContext().getObject().PurchasingDocumentItem;

							break;
						}
						if (this._oPGRValidPO._bValid === true) {
							this._oPGRValidPO._vPONumber = this._getPONumber(I[i].getCells()[1].getText());
							this._oPGRValidPO._PO = this._getPONumber(I[i].getCells()[1].getText());
							this._oPGRValidPO._POTyp = I[i].getBindingContext().getObject().PurchasingDocumentType;
							this._oPGRValidPO._POStat = I[i].getBindingContext().getObject().Status;
							this._oPGRValidPO._vPONumberItem = I[i].getBindingContext().getObject().PurchasingDocumentItem;
						}
					}
				} catch (e) {}
			}
			if (this._oPGRValidPO._vPONumber === "") {
				this.getPage().getFooter().getContentRight()[2].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[0].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setEnabled(false);
				this.getPage().getFooter().getContentRight()[0].setEnabled(false); //
				this.getPage().getFooter().getContentRight()[2].setEnabled(false); //
				// this.getPage().getFooter().getContentRight()[0].setEnabled(true);
			} else {
				this.getPage().getFooter().getContentRight()[2].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[0].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[1].setEnabled(true);
				this.getPage().getFooter().getContentRight()[0].setEnabled(true); //
				this.getPage().getFooter().getContentRight()[2].setEnabled(true); //
				// this.getPage().getFooter().getContentRight()[0].setEnabled(false);
			}
			if (this._oPGRValidPO._bSingleSelection === false) {
				sap.m.MessageToast.show(this.oResourceBundle.getText("SEL_PO"), {
					at: "center center"
				});
				// this.getPage().getFooter().getContentRight()[0].setType(sap.m.ButtonType.Default);
				// this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Default);
				// this.getPage().getFooter().getContentRight()[2].setType(sap.m.ButtonType.Default);
				// this.getPage().getFooter().getContentRight()[1].setEnabled(false);
				// this.getPage().getFooter().getContentRight()[0].setEnabled(false);
				// this.getPage().getFooter().getContentRight()[2].setEnabled(false);
			} else if (this._oPGRValidPO._bBackendValidation === false) {
				this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[0].setType(sap.m.ButtonType.Emphasized);
				this.getPage().getFooter().getContentRight()[2].setType(sap.m.ButtonType.Default);
				this.getPage().getFooter().getContentRight()[1].setEnabled(true);
				this.getPage().getFooter().getContentRight()[0].setEnabled(true);
				this.getPage().getFooter().getContentRight()[2].setEnabled(false);
			}
		},
		_failureHandler: function (d, r) {
			sap.m.MessageToast.show(d.message, {
				at: "center center"
			});
		}
	};
})();