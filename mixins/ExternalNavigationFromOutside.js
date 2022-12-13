/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside");
(function () {
	"use strict";
	elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside = {
		_handleExternalNavigation: function () {
			var _ = this;

			function w() {
				if (_.bLoadingExternalSupplier || _.bLoadingExternalPurchasingGroup || _.bLoadingExternalMaterialGroup || _.bLoadingExternalPlant ||
					_.bLoadingExternalStatus || _.bLoadingExternalCostCenter || _.bLoadingExternalSalesOrder) {
					setTimeout(w, 10);
				} else {
					//_.onSearchButtonPressed();
				}
			}

			function k(s, m) {
				_.getView().byId("v210IconTabBar").fireEvent("select", {
					key: s,
					selectedKey: s
				});
				w();
			}

			var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			var sHash = oHashChanger.getHash();
			var regExp = /(?:sap-iapp-state=)([^&=]+)/;
			if (regExp.exec(sHash) !== null && this.Cross !== regExp.exec(sHash)[1]) {
				var sAppStateKey = regExp.exec(sHash)[1];

				var oContainer = sap.ushell.Container.getService("CrossApplicationNavigation");
				var oComponent = this.getOwnerComponent();
				oContainer.getAppState(oComponent, sAppStateKey).done(function (oSavedAppState) {
					// Getting the filter criteria/ saved value
					var l = new sap.ui.model.json.JSONModel();
					l.setData(oSavedAppState.getData());
					_.oApplicationFacade.setApplicationModel("NavModel", l);
					var m = _.oApplicationFacade.getApplicationModel("NavModel");
					var f;
					if (m !== null & m !== undefined) {

						_._filterChanged = m.getProperty("/NavigationData/FilterChanged");
						if (_._filterChanged === "true") {
							_._filterChanged = true;
						}
						f = m.getProperty("/NavigationData/FilterData");
						// for (var i = 0; i < f.length; i++) {
						// 	_.getView().byId("ME2STAR_SFB").insertFilterItem(f[i], i);
						// }
						f = _.getView().byId("ME2STAR_SFB").getAllFilterItems();
						if (f[0] && f[0].getParent && f[0].getParent() && f[0].getParent()._aBasicAreaSelection && f[0].getParent()._aBasicAreaSelection[
								0] &&
							f[0].getParent()._aBasicAreaSelection[0].control && f[0].getParent()._aBasicAreaSelection[0].control.getValue) {
							f[0].getParent()._aBasicAreaSelection[0].control.setValue(m.getProperty("/NavigationData/Search"));
						} else if (f[0] && _.getView().byId("ME2STAR_SFB").determineControlByFilterItem && _.getView().byId("ME2STAR_SFB").determineControlByFilterItem(
								f[0]) && _.getView().byId("ME2STAR_SFB").determineControlByFilterItem(f[0]).getValue) {
							_.getView().byId("ME2STAR_SFB").determineControlByFilterItem(f[0]).setValue(m.getProperty("/NavigationData/Search"));
						}
						_.bInitialLoadingCompleted = true;
						_.onReset(oSavedAppState.getData().NavigationData.FilterData);
						_.oApplicationFacade.setApplicationModel(null, "NavModel");
						_._tabKey = m.getProperty("/NavigationData/TabKey");
						// _.getView().byId("v210IconTabBar").fireEvent("select", {
						// 	key: _._tabKey,
						// 	selectedKey: _._tabKey
						// });
						setTimeout(k(_._tabKey), 2000);
						//var lm =  setInterval(k(_._tabKey,_.getView().byId("ME2STAR_SFB")), 10);

						// _.getView().byId("ME2STAR_SFB").onAfterRendering(function() { k(_._tabKey); });
					}

				});
			}

			var c = sap.ui.core.Component.getOwnerIdFor(this.getView());
			this._oComponentData = sap.ui.component(c).getComponentData();
			if (this._oComponentData && this._oComponentData.startupParameters) {
				if (this._oComponentData.startupParameters.Tab && this._oComponentData.startupParameters.Tab.length > 0) {
					this._extTabKey = this._oComponentData.startupParameters.Tab[0];
				}
				if (this._oComponentData.startupParameters.Supplier) {
					this.bLoadingExternalSupplier = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Supplier.length; i++) {
						F.push(new sap.ui.model.Filter("Supplier", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.Supplier[i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/PDocItem", {
						urlParameters: ["$select=Supplier,SupplierName", "$orderby=Supplier"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["Supplier"];
								I["tokenText"] = D.results[i]["SupplierName"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputSupplier", C);
							_.bLoadingExternalSupplier = false;
							delete this.bLoadingExternalSupplier;
						}
					});
				}
				if (this._oComponentData.startupParameters.PurchasingGroup) {
					this.bLoadingExternalPurchasingGroup = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.PurchasingGroup.length; i++) {
						F.push(new sap.ui.model.Filter("PurchasingGroup", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.PurchasingGroup[
							i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=PurchasingGroup,PurchasingGroupName", "$orderby=PurchasingGroup"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["PurchasingGroup"];
								I["tokenText"] = D.results[i]["PurchasingGroupName"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputPurchasingGroup", C);
							_.bLoadingExternalPurchasingGroup = false;
							delete this.bLoadingExternalPurchasingGroup;
						}
					});
				}
				if (this._oComponentData.startupParameters.MaterialGroup) {
					this.bLoadingExternalMaterialGroup = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.MaterialGroup.length; i++) {
						F.push(new sap.ui.model.Filter("MaterialGroup", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.MaterialGroup[
							i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=MaterialGroup,MaterialGroupName", "$orderby=MaterialGroup"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["MaterialGroup"];
								I["tokenText"] = D.results[i]["MaterialGroupName"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputMaterialGroup", C);
							_.bLoadingExternalMaterialGroup = false;
							delete this.bLoadingExternalMaterialGroup;
						}
					});
				}
				if (this._oComponentData.startupParameters.Plant) {
					this.bLoadingExternalPlant = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Plant.length; i++) {
						F.push(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.Plant[i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=Plant,PlantName", "$orderby=Plant"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["Plant"];
								I["tokenText"] = D.results[i]["PlantName"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputPlant", C);
							_.bLoadingExternalPlant = false;
							delete this.bLoadingExternalPlant;
						}
					});
				}
				if (this._oComponentData.startupParameters.Status) {
					this.bLoadingExternalStatus = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Status.length; i++) {
						F.push(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.Status[i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=Status,StatusDescription", "$orderby=Status"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["Status"];
								I["tokenText"] = D.results[i]["StatusDescription"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputStatus", C);
							_.bLoadingExternalStatus = false;
							delete this.bLoadingExternalStatus;
						}
					});
				}
				if (this._oComponentData.startupParameters.CostCenter) {
					this.bLoadingExternalCostCenter = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.CostCenter.length; i++) {
						F.push(new sap.ui.model.Filter("CostCenter", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.CostCenter[i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=CostCenter", "$orderby=CostCenter"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["CostCenter"];
								I["tokenText"] = D.results[i]["CostCenter"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputCostCenter", C);
							_.bLoadingExternalCostCenter = false;
							delete this.bLoadingExternalCostCenter;
						}
					});
				}
				if (this._oComponentData.startupParameters.SalesOrder) {
					this.bLoadingExternalSalesOrder = true;
					var F = [];
					for (var i = 0; i < this._oComponentData.startupParameters.SalesOrder.length; i++) {
						F.push(new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.EQ, this._oComponentData.startupParameters.SalesOrder[i]));
					}
					var a = [];
					a.push(new sap.ui.model.Filter(F, false));
					var d = this.oApplicationFacade.getODataModel();
					d.read("/M2SOview", {
						urlParameters: ["$select=SalesOrder", "$orderby=SalesOrder"],
						filters: a,
						success: function (D) {
							var C = [];
							for (var i = 0; i < D.results.length; i++) {
								var I = {};
								I["tokenKey"] = D.results[i]["SalesOrder"];
								I["tokenText"] = D.results[i]["SalesOrder"];
								I["type"] = "row";
								C.push(I);
							}
							_._setFilterParamsForVariant("filterBarInputSalesOrder", C);
							_.bLoadingExternalSalesOrder = false;
							delete this.bLoadingExternalSalesOrder;
						}
					});
				}
			}

			if (regExp.exec(sHash) !== null && this.Cross === regExp.exec(sHash)[1]) {
				return;
			} else {
				if (regExp.exec(sHash) === null || regExp.exec(sHash) === undefined) {
					w();
				}

			}

			// w();
		}
	};
})();