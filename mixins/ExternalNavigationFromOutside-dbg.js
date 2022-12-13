/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside = {
		_handleExternalNavigation: function() {
			var _that = this;

			function wait() {
				if (_that.bLoadingExternalSupplier || _that.bLoadingExternalPurchasingGroup || _that.bLoadingExternalMaterialGroup || _that.bLoadingExternalPlant ||
					_that.bLoadingExternalStatus || _that.bLoadingExternalCostCenter || _that.bLoadingExternalSalesOrder) {
					setTimeout(wait, 10);
				} else {
					_that.onSearchButtonPressed();
				}
			}

			var oModel = _that.oApplicationFacade
				.getApplicationModel("NavModel");
			var aFilterItems;

			if (oModel !== null & oModel !== undefined) {
				_that._tabKey = oModel.getProperty("/NavigationData/TabKey");

				_that.getView().byId("v210IconTabBar").fireEvent(
					"select", {
						key: _that._tabKey,
						selectedKey: _that._tabKey
					});

				_that._filterChanged = oModel.getProperty("/NavigationData/FilterChanged");

				aFilterItems = oModel.getProperty("/NavigationData/FilterData");

				for (var i = 0; i < aFilterItems.length; i++) {
					_that.getView().byId("ME2STAR_SFB").insertFilterItem(aFilterItems[i], i);
				}

				aFilterItems = _that.getView().byId("ME2STAR_SFB").getFilterItems();
				
				if (aFilterItems[0] && aFilterItems[0].getParent && aFilterItems[0].getParent() && aFilterItems[0].getParent()._aBasicAreaSelection && aFilterItems[0].getParent()._aBasicAreaSelection[0] && aFilterItems[0].getParent()._aBasicAreaSelection[0].control && aFilterItems[0].getParent()._aBasicAreaSelection[0].control.getValue) {
					aFilterItems[0].getParent()._aBasicAreaSelection[0].control.setValue(oModel.getProperty("/NavigationData/Search"));
				}
				else if (aFilterItems[0] && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]) && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]).getValue) {
					this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]).setValue(oModel.getProperty("/NavigationData/Search"));
				}

				_that.oApplicationFacade.setApplicationModel(null, "NavModel");
			}

			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			this._oComponentData = sap.ui.component(sComponentId).getComponentData();

			if (this._oComponentData && this._oComponentData.startupParameters) {
				if (this._oComponentData.startupParameters.Tab && this._oComponentData.startupParameters.Tab.length > 0) {
					this._extTabKey = this._oComponentData.startupParameters.Tab[0];
				}
				if (this._oComponentData.startupParameters.Supplier) {
					this.bLoadingExternalSupplier = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Supplier.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"Supplier", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.Supplier[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/PDocItem", {
						urlParameters: ["$select=Supplier,SupplierName", "$orderby=Supplier"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["Supplier"];
								oItem["tokenText"] = oData.results[i]["SupplierName"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputSupplier", aCollection);
							_that.bLoadingExternalSupplier = false;
							delete this.bLoadingExternalSupplier;
						}
					});
				}
				if (this._oComponentData.startupParameters.PurchasingGroup) {
					this.bLoadingExternalPurchasingGroup = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.PurchasingGroup.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"PurchasingGroup", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.PurchasingGroup[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=PurchasingGroup,PurchasingGroupName", "$orderby=PurchasingGroup"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["PurchasingGroup"];
								oItem["tokenText"] = oData.results[i]["PurchasingGroupName"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputPurchasingGroup", aCollection);
							_that.bLoadingExternalPurchasingGroup = false;
							delete this.bLoadingExternalPurchasingGroup;
						}
					});
				}
				if (this._oComponentData.startupParameters.MaterialGroup) {
					this.bLoadingExternalMaterialGroup = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.MaterialGroup.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"MaterialGroup", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.MaterialGroup[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=MaterialGroup,MaterialGroupName", "$orderby=MaterialGroup"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["MaterialGroup"];
								oItem["tokenText"] = oData.results[i]["MaterialGroupName"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputMaterialGroup", aCollection);
							_that.bLoadingExternalMaterialGroup = false;
							delete this.bLoadingExternalMaterialGroup;
						}
					});
				}
				if (this._oComponentData.startupParameters.Plant) {
					this.bLoadingExternalPlant = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Plant.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"Plant", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.Plant[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=Plant,PlantName", "$orderby=Plant"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["Plant"];
								oItem["tokenText"] = oData.results[i]["PlantName"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputPlant", aCollection);
							_that.bLoadingExternalPlant = false;
							delete this.bLoadingExternalPlant;
						}
					});
				}
				if (this._oComponentData.startupParameters.Status) {
					this.bLoadingExternalStatus = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.Status.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"Status", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.Status[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=Status,StatusDescription", "$orderby=Status"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["Status"];
								oItem["tokenText"] = oData.results[i]["StatusDescription"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputStatus", aCollection);
							_that.bLoadingExternalStatus = false;
							delete this.bLoadingExternalStatus;
						}
					});
				}
				if (this._oComponentData.startupParameters.CostCenter) {
					this.bLoadingExternalCostCenter = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.CostCenter.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"CostCenter", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.CostCenter[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=CostCenter", "$orderby=CostCenter"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["CostCenter"];
								oItem["tokenText"] = oData.results[i]["CostCenter"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputCostCenter", aCollection);
							_that.bLoadingExternalCostCenter = false;
							delete this.bLoadingExternalCostCenter;
						}
					});
				}
				if (this._oComponentData.startupParameters.SalesOrder) {
					this.bLoadingExternalSalesOrder = true;
					var aFilter = [];
					for (var i = 0; i < this._oComponentData.startupParameters.SalesOrder.length; i++) {
						aFilter.push(new sap.ui.model.Filter(
							"SalesOrder", sap.ui.model.FilterOperator.EQ,
							this._oComponentData.startupParameters.SalesOrder[i]));
					}
					var aFinalFilter = [];
					aFinalFilter.push(new sap.ui.model.Filter(aFilter, false));

					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel.read("/M2SOview", {
						urlParameters: ["$select=SalesOrder", "$orderby=SalesOrder"],
						filters: aFinalFilter,
						success: function(oData) {
							var aCollection = [];
							for (var i = 0; i < oData.results.length; i++) {
								var oItem = {};
								oItem["tokenKey"] = oData.results[i]["SalesOrder"];
								oItem["tokenText"] = oData.results[i]["SalesOrder"];
								oItem["type"] = "row";

								aCollection.push(oItem);
							}
							_that._setFilterParamsForVariant("filterBarInputSalesOrder", aCollection);
							_that.bLoadingExternalSalesOrder = false;
							delete this.bLoadingExternalSalesOrder;
						}
					});
				}
			}
			wait();
		}
	};
})();