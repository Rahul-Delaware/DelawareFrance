/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside");
jQuery.sap.declare("sap/ui/core/Fragment");
jQuery.sap.declare("sap/m/MessageBox");

(function () {
	"use strict";
	var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
	elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside = {
		_processIntentNavigationAllowed: function (t, a, oStateToSave) {

			var _ = this;
			var c = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");

			var oAppState = c.createEmptyAppState(this.getOwnerComponent());
			oAppState.setData(oStateToSave.getData()); // object of values needed to be restored
			oAppState.save();

			this.Cross = oAppState.getKey();

			var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			var sOldHash = oHashChanger.getHash().split("?sap-iapp-state=")[0];
			var sNewHash = sOldHash + "?" + "sap-iapp-state=" + oAppState.getKey();
			oHashChanger.replaceHash(sNewHash);

			sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported([t]).done(function (d) {
				if (d[t].supported) {
					c.toExternal({
						target: {
							shellHash: t
						},
						params: {},
						appStateKey: oAppState.getKey()
					});
				} else if (a) {
					sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported([a]).done(function (D) {
						if (D[a].supported) {
							c.toExternal({
								target: {
									shellHash: a
								}
							});
						} else {
							_._showNavigationNotAllowedError();
						}
					});
				} else {
					_._showNavigationNotAllowedError();
				}
			});
		},
		_showNavigationNotAllowedError: function () {
			var c = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.show(this.oResourceBundle.getText("MESSAGE_NO_NAVIGATION_POSSIBLE"), {
				icon: sap.m.MessageBox.Icon.ERROR,
				title: this.oResourceBundle.getText("MESSAGE_SEVERITY_ERROR"),
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (a) {},
				styleClass: c ? "sapUiSizeCompact" : ""
			});
		},
		handleSelectPO: function (e) {
			var a;
			var k = this.onHold();
			var m = new sap.ui.model.json.JSONModel();
			m.setJSON(this._getJSONDataForNavigation());
			m.setProperty("/NavigationData/FilterData", k);
			this.oApplicationFacade.setApplicationModel("NavModel", m);

			if (this.byId("POTable").getSelectedItem() != null | this.byId("POTable").getSelectedItem() != undefined) {
				var s = this.byId("POTable").getSelectedItem().getBindingContext().getObject();
				// var t = "PurchaseOrder-manage?PurchaseOrder=" + s.PurchasingDocument;
				var t = "ZPurchaseOrder-manage?PurchaseOrder=" + s.PurchasingDocument;
				this._processIntentNavigationAllowed(t, a, m);
			}
		},
		handleSelectGR: function (e) {
			var a;
			var k = this.onHold();
			var m = new sap.ui.model.json.JSONModel();
			m.setJSON(this._getJSONDataForNavigation());
			m.setProperty("/NavigationData/FilterData", k);
			this.oApplicationFacade.setApplicationModel("NavModel", m);

			var s = this.byId("GRTable").getSelectedItem().getBindingContext().getObject();
			var t = "MaterialMovement-displayFactSheet?MaterialDocumentYear=" + s.MaterialDocumentYear + "&MaterialDocument=" + s.PurchasingDocument +
				"";
			this._processIntentNavigationAllowed(t, a, m);
		},
		CreatePO: function (e) {
			var m = new sap.ui.model.json.JSONModel();
			m.setJSON(this._getJSONDataForNavigation());
			m.setProperty("/NavigationData/FilterData", this.getView().byId("ME2STAR_SFB").getFilterItems());
			this.oApplicationFacade.setApplicationModel(m, "NavModel");
			var t = "PurchaseOrder-create";
			var a = "PurchaseOrder-manage";
			this._processIntentNavigationAllowed(t, a, m);
		},
		handleSelectSI: function (e) {
			var a;
			var k = this.onHold();
			var m = new sap.ui.model.json.JSONModel();
			m.setJSON(this._getJSONDataForNavigation());
			m.setProperty("/NavigationData/FilterData", k);
			this.oApplicationFacade.setApplicationModel("NavModel", m);

			var s = this.byId("SITable").getSelectedItem().getBindingContext().getObject();
			var t = "SupplierInvoice-display?FiscalYear=" + s.InvoiceReferenceFiscalYear + "&SupplierInvoice=" + s.PurchasingDocument + "&State=" +
				"02";
			this._processIntentNavigationAllowed(t, a, m);
		},
		handleSelectPR: function (e) {
			var _that = this;

			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Key = 'X';
			oModel.create("/PR_CHECK", oEntry, {
				method: "POST",
				success: function (oData) {

					var a;
					var k = _that.onHold();
					var m = new sap.ui.model.json.JSONModel();
					m.setJSON(_that._getJSONDataForNavigation());
					m.setProperty("/NavigationData/FilterData", k);
					_that.oApplicationFacade.setApplicationModel("NavModel", m);
					var s = _that.byId("PRTable").getSelectedItem().getBindingContext().getObject();
					// if (sap.ushell.Container.getService("UserInfo").getUser().getId() !== s.CreatedByUser){
					// 	return;
					// }
					// var t = "PurchaseRequisition-displayFactSheet?PurchaseRequisition=" + s.PurchaseRequisition + "&PurchaseRequisitionItem=" + s.PurchaseRequisitionItem;
					var t = "zprorequisition-manage&//ZC_PurchaseReqnHeader(PurchaseRequisition='" + s.PurchaseRequisition +
						"',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)";
					_that._processIntentNavigationAllowed(t, a, m);

				},
				error: function (e) {
					_that._PurchaseEmailPopup.setBusy(false);
					sap.m.MessageBox.error(e.responseText, {
						title: _that._i18nModel.getResourceBundle().getText("Error"),
						contentWidth: "100px",
						styleClass: sResponsivePaddingClasses
					});
				}
			});

		},
		PostGR: function () {
			var a;
			var k = this.onHold();
			var m = new sap.ui.model.json.JSONModel();
			m.setJSON(this._getJSONDataForNavigation());
			m.setProperty("/NavigationData/FilterData", k);
			this.oApplicationFacade.setApplicationModel("NavModel", m);

			if (this._oPGRValidPO._POTyp !== "ZFO") {
				var t = "PurchaseOrder-createGR?PurchaseOrder=" + this._oPGRValidPO._vPONumber;
			} else {
				var t = "Material-postGoodsMovementInWebGUI?PurchaseOrder=" + this._oPGRValidPO._vPONumber + "&PurchaseOrderItem=" + this._oPGRValidPO
					._vPONumberItem;
			}
			this._processIntentNavigationAllowed(t, a, m);
		},

		Sendemail: function () {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oApprv = oResourceBundle.getText("APPRV");
			if (this._oPGRValidPO._POTyp === "ZNA" || this._oPGRValidPO._POTyp === "ZNB" || this._oPGRValidPO._POTyp === "ZNO" ||
			   this._oPGRValidPO._POTyp === "ZIP"){
				
			 if (this._oPGRValidPO._POStat !== "02" && this._oPGRValidPO._POStat !== "05") {
				var sText = oResourceBundle.getText("PODRAFT");
				sap.m.MessageBox.error(sText, {
					title: oResourceBundle.getText("Error"),
					contentWidth: "100px",
					styleClass: sResponsivePaddingClasses
				});
				return;
			 }
			} else if (this._oPGRValidPO._PO === "" || this._oPGRValidPO._PO === undefined || this._oPGRValidPO._POStat !== "05") {
				var sText = oResourceBundle.getText("PODRAFT");
				sap.m.MessageBox.error(sText, {
					title: oResourceBundle.getText("Error"),
					contentWidth: "100px",
					styleClass: sResponsivePaddingClasses
				});
				return;
			}
			const pLoadingPopup = new Promise((ok) => {
				if (this._PurchaseEmailPopup === undefined) {
					sap.ui.core.Fragment.load({
						name: "elsan.zmmpur.puritems.fragments.PurchaseEmailPopup",
						controller: this
					}).then((oFragment) => {
						this._PurchaseEmailPopup = oFragment;
						// this._i18nModel = ;
						this._PurchaseEmailPopup.setModel(this.getView().getModel("i18n"), "i18n");
						this._PurchaseEmailPopup.setModel(this.getView().getModel());
						this._PurchaseEmailPopup.setModel(new sap.ui.model.json.JSONModel({
							Title: "",
							PO: "",
							From: "",
							FrmT: "",
							To: "",
							ToT: "",
							Obj: "",
							ObjT: "",
							Txt: "",
							TxtT: "",
							CcT: "",
							Cc: "",
							Datum: "",
							DatumT: "",
							Uzeit: "",
							UzeitT: "",
							IDT: "",
							ID: "",
						}), "Email");
						ok();
					});
				} else {
					ok();
				}
			});

			pLoadingPopup.then(() => {
				const oEmailPopup = this._PurchaseEmailPopup.getModel("Email");
				const oEmailPopupData = oEmailPopup.getData();
				var _i18nModel = this.getView().getModel("i18n").getResourceBundle();
				oEmailPopupData.Title = _i18nModel.getText("EmailTitle", [this._oPGRValidPO._PO]);
				oEmailPopupData.FrmT = _i18nModel.getText("FrmT");
				oEmailPopupData.ToT = _i18nModel.getText("ToT");
				oEmailPopupData.ObjT = _i18nModel.getText("ObjT");
				oEmailPopupData.TxtT = _i18nModel.getText("TxtT");
				oEmailPopupData.CcT = _i18nModel.getText("CcT");
				oEmailPopupData.DatumT = _i18nModel.getText("DatumT");
				oEmailPopupData.UzeitT = _i18nModel.getText("UzeitT");
				oEmailPopupData.UzeitT = _i18nModel.getText("UzeitT");
				oEmailPopupData.IDT = _i18nModel.getText("IDT");

				this.getView().setBusy(true);
				var sPath = "/EmailSet('" + this._oPGRValidPO._PO + "')";
				this.getView().getModel().read(sPath, {
					success: jQuery.proxy(this._fnShowEmailDetail, this),
					error: jQuery.proxy(this._fnerrorlog, this)
				});
			});
		},

		POprint: function () {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oApprv = oResourceBundle.getText("APPRV");
		   if (this._oPGRValidPO._POTyp === "ZNA" || this._oPGRValidPO._POTyp === "ZNB" || this._oPGRValidPO._POTyp === "ZNO" ||
			   this._oPGRValidPO._POTyp === "ZIP"){
			 if (this._oPGRValidPO._POStat !== "02" && this._oPGRValidPO._POStat !== "05") {
				var sText = oResourceBundle.getText("PODRAFT");
				sap.m.MessageBox.error(sText, {
					title: oResourceBundle.getText("Error"),
					contentWidth: "100px",
					styleClass: sResponsivePaddingClasses
				});
				return;
			 }
			} else if (this._oPGRValidPO._PO === "" || this._oPGRValidPO._PO === undefined || this._oPGRValidPO._POStat !== "05") {
				var sText = oResourceBundle.getText("PODRAFT");
				sap.m.MessageBox.error(sText, {
					title: oResourceBundle.getText("Error"),
					contentWidth: "100px",
					styleClass: sResponsivePaddingClasses
				});
				return;
			}
			const pLoadingPopup = new Promise((ok) => {
				if (this._PurchasePrintPdfPopup === undefined) {
					sap.ui.core.Fragment.load({
						name: "elsan.zmmpur.puritems.fragments.PurchasePrintPdfPopup",
						controller: this
					}).then((oFragment) => {
						this._PurchasePrintPdfPopup = oFragment;
						this._PurchasePrintPdfPopup.setModel(this.getView().getModel("i18n"), "i18n");
						this._PurchasePrintPdfPopup.setModel(this.getView().getModel());
						this._PurchasePrintPdfPopup.setModel(new sap.ui.model.json.JSONModel({
							Title: "",
							PdfUri: ""
						}), "PrintPdfPopup");
						ok();
					});
				} else ok();
			});
			pLoadingPopup.then(() => {
				const oPrintPdfPopup = this._PurchasePrintPdfPopup.getModel("PrintPdfPopup");
				const oPrintPdfPopupData = oPrintPdfPopup.getData();
				var _i18nModel = this.getView().getModel("i18n").getResourceBundle();
				oPrintPdfPopupData.Title = _i18nModel.getText("PrintPDFTitle", [this._oPGRValidPO._PO]);
				oPrintPdfPopupData.PdfUri = `/sap/opu/odata/sap/ZZME2STAR_ODATA_SRV/Print_po_pdfSet('${this._oPGRValidPO._PO}')/$value`;
				oPrintPdfPopup.refresh(true);
				this._PurchasePrintPdfPopup.open();
			});
		},
		_onClosePurchasePrintPdfPopup: function () {
			this._PurchasePrintPdfPopup.close();
		},

		_fnerrorlog: function (response) {
			this.getView().setBusy(false);
			sap.m.MessageBox.error(response.responseText, {
				title: this._i18nModel.getResourceBundle().getText("Error"),
				contentWidth: "100px",
				styleClass: sResponsivePaddingClasses
			});
		},

		_fnShowEmailDetail: function (oData) {
			const oEmailPopup = this._PurchaseEmailPopup.getModel("Email");
			const oEmailPopupData = oEmailPopup.getData();
			oEmailPopupData.PO = oData.PO;
			oEmailPopupData.From = oData.From;
			oEmailPopupData.To = oData.To;
			oEmailPopupData.Obj = oData.Obj;
			oEmailPopupData.Txt = oData.Txt;
			oEmailPopupData.Cc = oData.Cc;
			oEmailPopupData.Datum = oData.Datum;
			oEmailPopupData.Uzeit = oData.Uzeit;
			oEmailPopupData.ID = oData.ID;
			oEmailPopup.refresh(true);
			this.getView().setBusy(false);
			this._PurchaseEmailPopup.open();
		},

		_onCancelPurchaseEmailPopup: function () {
			this._PurchaseEmailPopup.close();
		},

		_onSendPurchaseEmailPopup: function () {
			var _that = this;
			const oEmailPopup = this._PurchaseEmailPopup.getModel("Email");
			const oEmailPopupData = oEmailPopup.getData();
			var oModel = this.getView().getModel();
			var oEntry = {};

			if (oEmailPopupData.From === "" || oEmailPopupData.To === "" || oEmailPopupData.Obj === "") {
				sap.m.MessageBox.error(this._i18nModel.getResourceBundle().getText("Mandatory"), {
					title: this._i18nModel.getResourceBundle().getText("Error"),
					contentWidth: "100px",
					styleClass: sResponsivePaddingClasses
				});
				return;
			}
			oEntry.PO = oEmailPopupData.PO;
			oEntry.From = oEmailPopupData.From;
			oEntry.To = oEmailPopupData.To;
			oEntry.Obj = oEmailPopupData.Obj;
			oEntry.Txt = oEmailPopupData.Txt;
			oEntry.Cc = oEmailPopupData.Cc;

			this._PurchaseEmailPopup.setBusy(true);
			oModel.create("/EmailSet", oEntry, {
				method: "POST",
				success: function (oData) {
					_that._PurchaseEmailPopup.setBusy(false);
					if (oData.PO !== undefined && oData.PO !== "") {
						// const sTableID = `${_that.getView().getId()}--responsiveTable`;
						// const sPath = _that.getView().byId(sTableID).getSelectedItem().getBindingContext().getPath();
						// var sData = _that.getView().getModel().getData(sPath);
						// sData.Email_Status = "X";
						_that._PurchaseEmailPopup.close();
						var msg = _that._i18nModel.getResourceBundle().getText("SucessMSG");
						sap.m.MessageToast.show(msg);
					} else {
						sap.m.MessageBox.error(_that._i18nModel.getResourceBundle().getText("ErrorMSG"), {
							title: _that._i18nModel.getResourceBundle().getText("Error"),
							contentWidth: "100px",
							styleClass: sResponsivePaddingClasses
						});
					}
				},
				error: function (e) {
					_that._PurchaseEmailPopup.setBusy(false);
					sap.m.MessageBox.error(e.responseText, {
						title: _that._i18nModel.getResourceBundle().getText("Error"),
						contentWidth: "100px",
						styleClass: sResponsivePaddingClasses
					});
				}
			});

		},
		_onAccountAssignementDetailPressed: function (oEvent) {
			var oOpenBy = oEvent.getSource();
			var sLineObject = oEvent.getSource().getBindingContext().getObject();
			var sLineModelPath = oEvent.getSource().getBindingContext().getPath();

			var pLoadingPopup = new Promise((ok) => {
				if (this._ItemAccAssignDetail === undefined) {
					sap.ui.core.Fragment.load({
						name: "elsan.zmmpur.puritems.fragments.ItemAccAssignDetail",
						controller: this
					}).then((oFragment) => {
						this._ItemAccAssignDetail = oFragment;
						this._ItemAccAssignDetail.setModel(this.getView().getModel("i18n"), "i18n");
						this._ItemAccAssignDetail.setModel(this.getView().getModel());
						this._ItemAccAssignDetail.setModel(new sap.ui.model.json.JSONModel({
							item: "",
							AccountAssignmentCategory: ""
						}), "popupModel");
						ok();
					});
				} else {
					ok();
				}
			});
			pLoadingPopup.then(() => {
				var oPopupModel = this._ItemAccAssignDetail.getModel("popupModel");
				var oPopup = this._ItemAccAssignDetail.getModel("i18n");
				var _i18nModel = this.getView().getModel("i18n").getResourceBundle();

				var oPopupModelData = oPopupModel.getData();
				oPopupModelData.item = oOpenBy.getParent().getBindingContext().getObject().PurchaseRequisitionItem;
				oPopupModelData.AccountAssignmentCategory = sLineObject.AccountAssignmentCategory;
				oPopupModelData.DefaultPlant = "MTG";
				var Title = _i18nModel.getText("AccAssignmentPopupTitle", [oPopupModelData.item]);
				oPopupModel.refresh(true);
				var p = new sap.ui.model.Filter("PurchaseRequisition", sap.ui.model.FilterOperator.EQ, sLineObject.PurchaseRequisition);
				var f = [];
				f.push(p);
				p = new sap.ui.model.Filter("PurchaseRequisitionItem", sap.ui.model.FilterOperator.EQ, oPopupModelData.item);
				f.push(p);
				p = new sap.ui.model.Filter("Identifier", sap.ui.model.FilterOperator.EQ, 'PR');
				f.push(p);
				var oTable = this._ItemAccAssignDetail.getAggregation("content")[0];
				oTable.setHeaderText(Title);
				oTable.setModel(this.oApplicationFacade.getODataModel());

				//column list item creation
				var oTemplate = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
						text: "{GLAccount}"
					}), new sap.m.Text({
						text: "{CostCenter}"
					}), new sap.m.Text({
						text: "{CostCenterName}"
					}), new sap.m.Text({
						text: "{MasterFixedAsset}"
					}), new sap.m.Text({
						text: "{FixedAsset}"
					}), new sap.m.Text({
						text: "{OrderID}"
					}), new sap.m.Text({
						text: "{OrderName}"
					}), new sap.m.Text({
						text: "{Quantity}"
					}), new sap.m.Text({
						text: "{MultipleAcctAssgmtDistrPercent}"
					}), ]
				});
				oTable.bindItems({
					path: "/ZC_PurchaseReqnAcctAssgmtSet",
					template: oTemplate,
					filters: f
				});
				this._ItemAccAssignDetail.openBy(oOpenBy);
			});
		},
		_onAccountAssignementDetailPressedPO: function (oEvent) {
			var oOpenBy = oEvent.getSource();
			var sLineObject = oEvent.getSource().getBindingContext().getObject();
			var sLineModelPath = oEvent.getSource().getBindingContext().getPath();

			var pLoadingPopup = new Promise((ok) => {
				if (this._ItemAccAssignDetail === undefined) {
					sap.ui.core.Fragment.load({
						name: "elsan.zmmpur.puritems.fragments.ItemAccAssignDetail",
						controller: this
					}).then((oFragment) => {
						this._ItemAccAssignDetail = oFragment;
						this._ItemAccAssignDetail.setModel(this.getView().getModel("i18n"), "i18n");
						this._ItemAccAssignDetail.setModel(this.getView().getModel());
						this._ItemAccAssignDetail.setModel(new sap.ui.model.json.JSONModel({
							item: "",
							AccountAssignmentCategory: ""
						}), "popupModel");
						ok();
					});
				} else {
					ok();
				}
			});
			pLoadingPopup.then(() => {
				var oPopupModel = this._ItemAccAssignDetail.getModel("popupModel");
				var oPopup = this._ItemAccAssignDetail.getModel("i18n");
				var _i18nModel = this.getView().getModel("i18n").getResourceBundle();

				var oPopupModelData = oPopupModel.getData();
				oPopupModelData.item = sLineObject.PurchasingDocumentItem;
				oPopupModelData.AccountAssignmentCategory = sLineObject.AccountAssignmentCategory;
				oPopupModelData.DefaultPlant = "MTG";
				var Title = _i18nModel.getText("AccAssignmentPopupTitle", [oPopupModelData.item]);
				oPopupModel.refresh(true);
				var p = new sap.ui.model.Filter("PurchaseRequisition", sap.ui.model.FilterOperator.EQ, sLineObject.PurchasingDocument);
				var f = [];
				f.push(p);
				p = new sap.ui.model.Filter("PurchaseRequisitionItem", sap.ui.model.FilterOperator.EQ, oPopupModelData.item);
				f.push(p);
				p = new sap.ui.model.Filter("Identifier", sap.ui.model.FilterOperator.EQ, 'PO');
				f.push(p);
				var oTable = this._ItemAccAssignDetail.getAggregation("content")[0];
				oTable.setHeaderText(Title);
				oTable.setModel(this.oApplicationFacade.getODataModel());

				//column list item creation
				var oTemplate = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
						text: "{GLAccount}"
					}), new sap.m.Text({
						text: "{CostCenter}"
					}), new sap.m.Text({
						text: "{CostCenterName}"
					}), new sap.m.Text({
						text: "{MasterFixedAsset}"
					}), new sap.m.Text({
						text: "{FixedAsset}"
					}), new sap.m.Text({
						text: "{OrderID}"
					}), new sap.m.Text({
						text: "{OrderName}"
					}), new sap.m.Text({
						text: "{Quantity}"
					}), new sap.m.Text({
						text: "{MultipleAcctAssgmtDistrPercent}"
					}), ]
				});
				oTable.bindItems({
					path: "/ZC_PurchaseReqnAcctAssgmtSet",
					template: oTemplate,
					filters: f
				});
				this._ItemAccAssignDetail.openBy(oOpenBy);
			});
		},

		_onCloseAccAssignDetail: function () {
			this._ItemAccAssignDetail.close();
			this._ItemAccAssignDetail.destroy();
			delete this._ItemAccAssignDetail;
		}
	};
})();