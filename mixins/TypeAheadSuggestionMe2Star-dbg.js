/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");

(function() {
	  "use strict";
	  elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star = {
	        suggestValuesForSupplier : function(oEvent) {
				//var mParameters = this._getODataParameterForFilterBarSearch("Supplier", ["Supplier,SupplierName,Cnt"], ["Supplier"], 0, 0, "filterBarForPOItem");
	        	var mParameters = this._getODataParameterForFilterBarSearch("Supplier", ["Supplier,SupplierName"], ["Supplier"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeSupplier : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForSupplier(oEvent);}, {sKey:"Supplier",sText:"SupplierName"});
			},
			suggestValuesForPurchasingGroup : function(oEvent) {
			   // var mParameters = this._getODataParameterForFilterBarSearch("PurchasingGroup", ["PurchasingGroup,PurchasingGroupName,Cnt"], ["PurchasingGroup"], 0, 0, "ME2STAR_SFB");
				var mParameters = this._getODataParameterForFilterBarSearch("PurchasingGroup", ["PurchasingGroup,PurchasingGroupName"], ["PurchasingGroup"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePurchasingGroup : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPurchasingGroup(oEvent);}, {sKey:"PurchasingGroup",sText:"PurchasingGroupName"});
			},
			suggestValuesForPlant : function(oEvent) {
				//var mParameters = this._getODataParameterForFilterBarSearch("Plant", ["Plant,PlantName,Cnt"], ["Plant"], 0, 0, "ME2STAR_SFB");
				var mParameters = this._getODataParameterForFilterBarSearch("Plant", ["Plant,PlantName"], ["Plant"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePlant : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPlant(oEvent);}, {sKey:"Plant",sText:"PlantName"});
			},
			suggestValuesForMaterialGroup : function(oEvent) {
			    //var mParameters = this._getODataParameterForFilterBarSearch("MaterialGroup", ["MaterialGroup,MaterialGroupName,Cnt"], ["MaterialGroup"], 0, 0, "ME2STAR_SFB");
				var mParameters = this._getODataParameterForFilterBarSearch("MaterialGroup", ["MaterialGroup,MaterialGroupName"], ["MaterialGroup"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeMaterialGroup : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForMaterialGroup(oEvent);}, {sKey:"MaterialGroup",sText:"MaterialGroupName"});
			},
			
			suggestValuesForStatus : function(oEvent) {
			   	var mParameters = this._getODataParameterForFilterBarSearch("Status", ["Status,StatusDescription"], ["Status"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeStatus : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForStatus(oEvent);}, {sKey:"Status",sText:"StatusDescription"});
			},
			
			suggestValuesForCostCenter : function(oEvent) {
		    	var mParameters = this._getODataParameterForFilterBarSearch("CostCenter", ["CostCenter,ControllingArea"], ["CostCenter,ControllingArea"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeCostCenter : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForCostCenter(oEvent);}, {sKey:"CostCenter",sText:"ControllingArea"});
			},
			suggestValuesForWBSElement : function(oEvent) {
		    	var mParameters = this._getODataParameterForFilterBarSearch("WBSElementExternalID", ["WBSElementFullName","WBSElementExternalID"], ["WBSElementExternalID"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeWBSElement : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForWBSElement(oEvent);}, {sKey:"WBSElementExternalID",sText:"WBSElementFullName"});
			},
			suggestValuesForSalesOrder : function(oEvent) {
		    	var mParameters = this._getODataParameterForFilterBarSearch("SalesOrder", ["SalesOrder"], ["SalesOrder"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeSalesOrder : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForSalesOrder(oEvent);}, {sKey:"SalesOrder",sText:"SalesOrder"});
			},
			suggestValuesForServicePerformer : function(oEvent) {
	        	var mParameters = this._getODataParameterForFilterBarSearch("ServicePerformer", ["ServicePerformer,ServicePerformerName"], ["ServicePerformer"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeServicePerformer : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForServicePerformer(oEvent);}, {sKey:"ServicePerformer",sText:"ServicePerformerName"});
			},
			suggestValuesForWorkItem : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("WorkItem", ["WorkItem,WorkItemName"], ["WorkItem"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeWorkItem : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForWorkItem(oEvent);}, {sKey:"WorkItem",sText:"WorkItemName"});
			},
			suggestValuesForPurchasingOrganization : function(oEvent) {
	        	var mParameters = this._getODataParameterForFilterBarSearch("PurchasingOrganization", ["PurchasingOrganization,PurchasingOrganizationName"], ["PurchasingOrganization"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePurchasingOrganization : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPurchasingOrganization(oEvent);}, {sKey:"PurchasingOrganization",sText:"PurchasingOrganizationName"});
			},
			suggestValuesForMaterial : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("Material", ["Material,MaterialName"], ["Material"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeMaterial : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForMaterial(oEvent);}, {sKey:"Material",sText:"MaterialName"});
			},
			suggestValuesForSupplyingPlant : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("SupplyingPlant", ["SupplyingPlant,SupplyingPlantName"], ["SupplyingPlant"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeSupplyingPlant : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForSupplyingPlant(oEvent);}, {sKey:"SupplyingPlant",sText:"SupplyingPlantName"});
			},
			suggestValuesForPurchasingDocumentItemText : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("PurchasingDocumentItemText", ["PurchasingDocumentItemText"], ["PurchasingDocumentItemText"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePurchasingDocumentItemText : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPurchasingDocumentItemText(oEvent);}, {sKey:"PurchasingDocumentItemText",sText:"PurchasingDocumentItemText"});
			},
			suggestValuesForPurchasingDocumentType : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("PurchasingDocumentType", ["PurchasingDocumentType,PurgDocumentTypeDescription"], ["PurchasingDocumentType"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePurchasingDocumentType : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPurchasingDocumentType(oEvent);}, {sKey:"PurchasingDocumentType",sText:"PurgDocumentTypeDescription"});
			},
			suggestValuesForPurchaseOrderItemCategory : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("PurchaseOrderItemCategory", ["PurchaseOrderItemCategory,PurgDocExternalItemCategory"], ["PurchaseOrderItemCategory"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangePurchaseOrderItemCategory : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForPurchaseOrderItemCategory(oEvent);}, {sKey:"PurchaseOrderItemCategory",sText:"PurgDocExternalItemCategory"});
			},
			suggestValuesForAccountAssignmentCategory : function(oEvent) {
				var mParameters = this._getODataParameterForFilterBarSearch("AccountAssignmentCategory", ["AccountAssignmentCategory,AcctAssignmentCategoryName"], ["AccountAssignmentCategory"], 0, 0, "ME2STAR_SFB");
				this._suggestValues(oEvent, [mParameters.urlParameters[1],mParameters.urlParameters[2]], true, null, "/M2SOview", mParameters.filters);
			},
			handleChangeAccountAssignmentCategory : function (oEvent) {
				this._processSuggestion(oEvent, function(oEvent, _that) {_that.suggestValuesForAccountAssignmentCategory(oEvent);}, {sKey:"AccountAssignmentCategory",sText:"AcctAssignmentCategoryName"});
			}
	};
})();