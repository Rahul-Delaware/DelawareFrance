/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star = {
		// suggestValuesForSupplier: function(e) {
		// 	var p = this._getODataParameterForFilterBarSearch("Supplier", ["Supplier,SupplierName"], ["Supplier"], 0, 0, "ME2STAR_SFB");
		// 	this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		// },
		// handleChangeSupplier: function(e) {
		// 	this._processSuggestion(e, function(e, _) {
		// 		_.suggestValuesForSupplier(e);
		// 	}, {
		// 		sKey: "Supplier",
		// 		sText: "SupplierName"
		// 	});
		// },
		suggestValuesForSupplier: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Supplier", ["Supplier,CompanyCode,SupplierName,Plant,Country,CityName,PostalCode,Region"], ["Supplier"], 0, 0, "ME2STAR_SFB");
			this._suggestValuesN(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/VHMMSupplier", null);
		},
		handleChangeSupplier: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForSupplier(e);
			}, {
				sKey: "Supplier",
				sText: "SupplierName"
			});
		},
		suggestValuesForPurchasingGroup: function(e) {
			var p = this._getODataParameterForFilterBarSearch("PurchasingGroup", ["PurchasingGroup,PurchasingGroupName"], ["PurchasingGroup"], 0,
				0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangePurchasingGroup: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPurchasingGroup(e);
			}, {
				sKey: "PurchasingGroup",
				sText: "PurchasingGroupName"
			});
		},
		suggestValuesForPlant: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Plant", ["Plant,PlantName"], ["Plant"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		suggestValuesForCompany: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Company", ["Company,CompanyCodeName"], ["Company"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		suggestValuesForElStatus: function(e) {
			var p = this._getODataParameterForFilterBarSearch("ElStatus", ["ElStatus,StatusDescription"], ["ElStatus"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/VHElStatus", null);
		},
		suggestValuesForRequi: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Requi", ["Requi,RequiName"], ["Requi"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		suggestValuesForInch: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Zzpersonincharge", ["Zzpersonincharge,InchName"], ["Zzpersonincharge"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", null);
		},
		suggestValuesForVenpdh: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Venpdh", ["Venpdh"], ["Venpdh"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", null);
		},
		handleChangePlant: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPlant(e);
			}, {
				sKey: "Plant",
				sText: "PlantName"
			});
		},
		handleChangeCompany: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForCompany(e);
			}, {
				sKey: "Company",
				sText: "CompanyCodeName"
			});
		},
		handleChangeVenpdh: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForVenpdh(e);
			}, {
				sKey: "Venpdh"
			});
		},
		handleChangeInch: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForInch(e);
			}, {
				sKey: "Zzpersonincharge",
				sText: "InchName"
			});
		},
		handleChangeRequi: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForRequi(e);
			}, {
				sKey: "Requi",
				sText: "RequiName"
			});
		},
		handleChangeElStatus: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForElStatus(e);
			}, {
				sKey: "ElStatus",
				sText: "StatusDescription"
			});
		},
		suggestValuesForMaterialGroup: function(e) {
			var p = this._getODataParameterForFilterBarSearch("MaterialGroup", ["MaterialGroup,MaterialGroupName"], ["MaterialGroup"], 0, 0,
				"ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeMaterialGroup: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForMaterialGroup(e);
			}, {
				sKey: "MaterialGroup",
				sText: "MaterialGroupName"
			});
		},
		suggestValuesForStatus: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Status", ["Status,StatusDescription"], ["Status"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeStatus: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForStatus(e);
			}, {
				sKey: "Status",
				sText: "StatusDescription"
			});
		},
		suggestValuesForCostCenter: function(e) {
			var p = this._getODataParameterForFilterBarSearch("CostCenter", ["CostCenter,ControllingArea"], ["CostCenter,ControllingArea"], 0, 0,
				"ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeCostCenter: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForCostCenter(e);
			}, {
				sKey: "CostCenter",
				sText: "ControllingArea"
			});
		},
		suggestValuesForWBSElement: function(e) {
			var p = this._getODataParameterForFilterBarSearch("WBSElementExternalID", ["WBSElementFullName", "WBSElementExternalID"], [
				"WBSElementExternalID"
			], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeWBSElement: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForWBSElement(e);
			}, {
				sKey: "WBSElementExternalID",
				sText: "WBSElementFullName"
			});
		},
		suggestValuesForSalesOrder: function(e) {
			var p = this._getODataParameterForFilterBarSearch("SalesOrder", ["SalesOrder"], ["SalesOrder"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeSalesOrder: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForSalesOrder(e);
			}, {
				sKey: "SalesOrder",
				sText: "SalesOrder"
			});
		},
		suggestValuesForServicePerformer: function(e) {
			var p = this._getODataParameterForFilterBarSearch("ServicePerformer", ["ServicePerformer,ServicePerformerName"], ["ServicePerformer"],
				0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeServicePerformer: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForServicePerformer(e);
			}, {
				sKey: "ServicePerformer",
				sText: "ServicePerformerName"
			});
		},
		suggestValuesForWorkItem: function(e) {
			var p = this._getODataParameterForFilterBarSearch("WorkItem", ["WorkItem,WorkItemName"], ["WorkItem"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeWorkItem: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForWorkItem(e);
			}, {
				sKey: "WorkItem",
				sText: "WorkItemName"
			});
		},
		suggestValuesForPurchasingOrganization: function(e) {
			var p = this._getODataParameterForFilterBarSearch("PurchasingOrganization", ["PurchasingOrganization,PurchasingOrganizationName"], [
				"PurchasingOrganization"
			], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangePurchasingOrganization: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPurchasingOrganization(e);
			}, {
				sKey: "PurchasingOrganization",
				sText: "PurchasingOrganizationName"
			});
		},
		suggestValuesForMaterial: function(e) {
			var p = this._getODataParameterForFilterBarSearch("Material", ["Material,MaterialName"], ["Material"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeMaterial: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForMaterial(e);
			}, {
				sKey: "Material",
				sText: "MaterialName"
			});
		},
		suggestValuesForSupplyingPlant: function(e) {
			var p = this._getODataParameterForFilterBarSearch("SupplyingPlant", ["SupplyingPlant,SupplyingPlantName"], ["SupplyingPlant"], 0, 0,
				"ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeSupplyingPlant: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForSupplyingPlant(e);
			}, {
				sKey: "SupplyingPlant",
				sText: "SupplyingPlantName"
			});
		},
		suggestValuesForPurchasingDocumentItemText: function(e) {
			var p = this._getODataParameterForFilterBarSearch("PurchasingDocumentItemText", ["PurchasingDocumentItemText"], [
				"PurchasingDocumentItemText"
			], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangePurchasingDocumentItemText: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPurchasingDocumentItemText(e);
			}, {
				sKey: "PurchasingDocumentItemText",
				sText: "PurchasingDocumentItemText"
			});
		},
		suggestValuesForPurchasingDocumentType: function(e) {
			var p = this._getODataParameterForFilterBarSearch("PurchasingDocumentType", ["PurchasingDocumentType"], [
				"PurchasingDocumentType"
			], 0, 0, "ME2STAR_SFB");
			// this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
			this._suggestValues(e, [p.urlParameters[1]], true, null, "/VHDocTyp", null);
		},
		handleChangePurchasingDocumentType: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPurchasingDocumentType(e);
			}, {
				sKey: "PurchasingDocumentType"
			});
		},
		suggestValuesForPurchaseOrderItemCategory: function(e) {
			var p = this._getODataParameterForFilterBarSearch("PurchaseOrderItemCategory", [
				"PurchaseOrderItemCategory,PurgDocExternalItemCategory"
			], ["PurchaseOrderItemCategory"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangePurchaseOrderItemCategory: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForPurchaseOrderItemCategory(e);
			}, {
				sKey: "PurchaseOrderItemCategory",
				sText: "PurgDocExternalItemCategory"
			});
		},
		suggestValuesForAccountAssignmentCategory: function(e) {
			var p = this._getODataParameterForFilterBarSearch("AccountAssignmentCategory", [
				"AccountAssignmentCategory,AcctAssignmentCategoryName"
			], ["AccountAssignmentCategory"], 0, 0, "ME2STAR_SFB");
			this._suggestValues(e, [p.urlParameters[1], p.urlParameters[2]], true, null, "/M2SOview", p.filters);
		},
		handleChangeAccountAssignmentCategory: function(e) {
			this._processSuggestion(e, function(e, _) {
				_.suggestValuesForAccountAssignmentCategory(e);
			}, {
				sKey: "AccountAssignmentCategory",
				sText: "AcctAssignmentCategoryName"
			});
		}
	};
})();