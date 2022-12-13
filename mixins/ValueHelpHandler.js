/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ValueHelpHandler");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ValueHelpHandler = {
		// handleValueHelpSupplier: function(e) {
		// 	var m = {
		// 		title: this.oResourceBundle.getText("SUPPLIER"),
		// 		modal: true,
		// 		supportMultiselect: true,
		// 		supportRanges: true,
		// 		supportRangesOnly: false
		// 	};
		// 	var f = [];
		// 	f.push({
		// 		key: "Supplier",
		// 		label: this.oResourceBundle.getText("SUPPLIER"),
		// 		filterKey: true
		// 	});
		// 	f.push({
		// 		key: "SupplierName",
		// 		label: this.oResourceBundle.getText("SUPPLIER_NAME"),
		// 		filterDescriptionKey: true
		// 	});
		// 	f.push({
		// 		key: "SupplierAddressCountryName",
		// 		label: this.oResourceBundle.getText("COUNTRY")
		// 	});
		// 	f.push({
		// 		key: "SupplierAddressCity",
		// 		label: this.oResourceBundle.getText("CITY")
		// 	});
		// 	var E = "/M2SOview";
		// 	var c = "/VHSupplier";
		// 	var u = ["$select=Supplier,SupplierName,SupplierAddressCountryName,SupplierAddressCity", "$orderby=Supplier"];
		// 	var F = this._getODataParameterForFilterBarSearch("Supplier", [], [], 0, 0, "ME2STAR_SFB");
		// 	u.push(F.urlParameters[0]);
		// 	this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		// },
		handleValueHelpSupplier: function(e) {
			var m = {
				title: this.oResourceBundle.getText("SUPPLIERF"),
				modal: false,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Supplier",
				label: this.oResourceBundle.getText("SUPPLIERN"),
				filterKey: true
			});
			f.push({
				key: "SupplierName",
				label: this.oResourceBundle.getText("SUPPLIER_NAMEN"),
				filterDescriptionKey: true
			});
			// f.push({
			// 	key: "CompanyCode",
			// 	label: this.oResourceBundle.getText("COMPN")
			// });
			// f.push({
			// 	key: "Plant",
			// 	label: this.oResourceBundle.getText("PLANTN")
			// });
			f.push({
				key: "Country",
				label: this.oResourceBundle.getText("COUNTRYN")
			});
			f.push({
				key: "CityName",
				label: this.oResourceBundle.getText("CITYN")
			});
			f.push({
				key: "PostalCode",
				label: this.oResourceBundle.getText("POSCODE")
			});
			f.push({
				key: "Region",
				label: this.oResourceBundle.getText("REGION")
			});
			
			var E = "/VHMMSupplier";
			var c = "/VHMMSupplier";
			var u = ["$select=Supplier,SupplierName,Country,CityName,PostalCode,Region", "$orderby=Supplier"];
			var F = this._getODataParameterForFilterBarSearch("Supplier", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, null);
		},
		handleValueHelpMaterialGroup: function(e) {
			var m = {
				title: this.oResourceBundle.getText("MATERIAL_GROUP"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "MaterialGroup",
				label: this.oResourceBundle.getText("MATERIAL_GROUP"),
				filterKey: true
			});
			f.push({
				key: "MaterialGroupName",
				label: this.oResourceBundle.getText("MATERIAL_GROUP_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHMatGroup";
			var u = ["$select=MaterialGroup,MaterialGroupName", "$orderby=MaterialGroup"];
			var F = this._getODataParameterForFilterBarSearch("MaterialGroup", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpCompany:function(e) {
			var m = {
				title: this.oResourceBundle.getText("COMPANY"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Company",
				label: this.oResourceBundle.getText("COMPANY"),
				filterKey: true
			});
			f.push({
				key: "CompanyCodeName",
				label: this.oResourceBundle.getText("COMPANY_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHCompany";
			var u = ["$select=Company,CompanyCodeName", "$orderby=Company"];
			var F = this._getODataParameterForFilterBarSearch("Company", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpElStatus:function(e) {
			var m = {
				title: this.oResourceBundle.getText("STATUS"),
				modal: false,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "ElStatus",
				label: this.oResourceBundle.getText("STATUS"),
				filterKey: true
			});
			f.push({
				key: "StatusDescription",
				label: this.oResourceBundle.getText("DOCUMENT_STATUS_DES"),
				filterDescriptionKey: true
			});
			var E = "/VHElStatus";
			var c = "/VHElStatus";
			var u = ["$select=ElStatus,StatusDescription", "$orderby=ElStatus"];
			var F = this._getODataParameterForFilterBarSearch("ElStatus", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, null);
		},
		handleValueHelpVenpdh:function(e) {
			var m = {
				title: this.oResourceBundle.getText("VENPDH"),
				modal: false,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Venpdh",
				label: this.oResourceBundle.getText("VENPDH"),
				filterKey: true
			});
			var E = "/M2SOview";
			var c = "/VHVenpdh";
			var u = ["$select=Venpdh", "$orderby=Venpdh"];
			var F = this._getODataParameterForFilterBarSearch("Venpdh", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, null);
		},
		handleValueHelpRequi:function(e) {
			var m = {
				title: this.oResourceBundle.getText("REQU"),
				modal: false,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Requi",
				label: this.oResourceBundle.getText("REQU"),
				filterKey: true
			});
			f.push({
				key: "RequiName",
				label: this.oResourceBundle.getText("REQUI_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHRequi";
			var u = ["$select=Requi,RequiName", "$orderby=Requi"];
			var F = this._getODataParameterForFilterBarSearch("Requi", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpInch:function(e) {
			var m = {
				title: this.oResourceBundle.getText("PERIN"),
				modal: false,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Zzpersonincharge",
				label: this.oResourceBundle.getText("PERIN"),
				filterKey: true
			});
			f.push({
				key: "InchName",
				label: this.oResourceBundle.getText("REQUI_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHInch";
			var u = ["$select=Zzpersonincharge,InchName", "$orderby=Zzpersonincharge"];
			var F = this._getODataParameterForFilterBarSearch("Zzpersonincharge", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, null);
		},
		handleValueHelpPlant: function(e) {
			var m = {
				title: this.oResourceBundle.getText("PLANTS"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Plant",
				label: this.oResourceBundle.getText("PLANTS"),
				filterKey: true
			});
			f.push({
				key: "PlantName",
				label: this.oResourceBundle.getText("PLANT_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHPlant";
			var u = ["$select=Plant,PlantName", "$orderby=Plant"];
			var F = this._getODataParameterForFilterBarSearch("Plant", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpPurchasingGroup: function(e) {
			var m = {
				title: this.oResourceBundle.getText("PURCHASING_GROUP"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "PurchasingGroup",
				label: this.oResourceBundle.getText("PURCHASING_GROUP"),
				filterKey: true
			});
			f.push({
				key: "PurchasingGroupName",
				label: this.oResourceBundle.getText("PURCHASING_GROUP_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHPurGroup";
			var u = ["$select=PurchasingGroup,PurchasingGroupName", "$orderby=PurchasingGroup"];
			var F = this._getODataParameterForFilterBarSearch("PurchasingGroup", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpStatus: function(e) {
			var m = {
				title: this.oResourceBundle.getText("STATUS"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Status",
				label: this.oResourceBundle.getText("STATUS_KEY"),
				filterKey: true
			});
			f.push({
				key: "StatusDescription",
				label: this.oResourceBundle.getText("DOCUMENT_STATUS_DES"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHStatus";
			var u = ["$select=Status,StatusDescription", "$orderby=Status"];
			var F = this._getODataParameterForFilterBarSearch("Status", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpCostCenter: function(e) {
			var m = {
				title: this.oResourceBundle.getText("COST_CENTER"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "CostCenter",
				label: this.oResourceBundle.getText("COST_CENTER"),
				filterKey: true
			});
			f.push({
				key: "CostCenterName",
				label: this.oResourceBundle.getText("COST_CENTER_NAME"),
				filterDescriptionKey: true
			});
			f.push({
				key: "ControllingArea",
				label: this.oResourceBundle.getText("CONTROLLING_AREA")
			});
			var E = "/M2SOview";
			var c = "/VHCostCenter";
			var u = ["$select=CostCenter,CostCenterName,ControllingArea", "$orderby=CostCenter"];
			var F = this._getODataParameterForFilterBarSearch("CostCenter", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpSalesOrder: function(e) {
			var m = {
				title: this.oResourceBundle.getText("SALES_ORDER"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "SalesOrder",
				label: this.oResourceBundle.getText("SALES_ORDER"),
				filterKey: true
			});
			var E = "/M2SOview";
			var c = "/VHSalesOrder";
			var u = ["$select=SalesOrder", "$orderby=SalesOrder"];
			var F = this._getODataParameterForFilterBarSearch("SalesOrder", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpWBSElement: function(e) {
			var m = {
				title: this.oResourceBundle.getText("WORK_PACKAGE"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "WBSElementExternalID",
				label: this.oResourceBundle.getText("WORK_PACKAGE_ID"),
				filterKey: true
			});
			f.push({
				key: "WorkPackageFullName",
				label: this.oResourceBundle.getText("WORK_PACKAGE"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHWBSElement";
			var u = ["$select=WBSElementExternalID,WorkPackageFullName", "$orderby=WBSElementExternalID"];
			var F = this._getODataParameterForFilterBarSearch("WBSElementExternalID", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpServicePerformer: function(e) {
			var m = {
				title: this.oResourceBundle.getText("SERVICE_PERFORMER"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "ServicePerformer",
				label: this.oResourceBundle.getText("SERVICE_PERFORMER"),
				filterKey: true
			});
			f.push({
				key: "ServicePerformerName",
				label: this.oResourceBundle.getText("SERVICE_PERFORMER_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHServicePerformer";
			var u = ["$select=ServicePerformer,ServicePerformerName", "$orderby=ServicePerformer"];
			var F = this._getODataParameterForFilterBarSearch("ServicePerformer", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpWorkItem: function(e) {
			var m = {
				title: this.oResourceBundle.getText("WORK_ITEM"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "WorkItem",
				label: this.oResourceBundle.getText("WORK_ITEM"),
				filterKey: true
			});
			f.push({
				key: "WorkItem",
				label: this.oResourceBundle.getText("WORK_ITEM_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHWorkItem";
			var u = ["$select=WorkItem,WorkItemName", "$orderby=WorkItem"];
			var F = this._getODataParameterForFilterBarSearch("WorkItem", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpPurchasingOrganization: function(e) {
			var m = {
				title: this.oResourceBundle.getText("PURCHASING_ORGANIZATION"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "PurchasingOrganization",
				label: this.oResourceBundle.getText("PURCHASING_ORGANIZATION"),
				filterKey: true
			});
			f.push({
				key: "PurchasingOrganizationName",
				label: this.oResourceBundle.getText("PURCHASING_ORGANIZATION_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHPurchasingOrganization";
			var u = ["$select=PurchasingOrganization,PurchasingOrganizationName", "$orderby=PurchasingOrganization"];
			var F = this._getODataParameterForFilterBarSearch("PurchasingOrganization", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpMaterial: function(e) {
			var m = {
				title: this.oResourceBundle.getText("MATERIAL"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "Material",
				label: this.oResourceBundle.getText("MATERIAL"),
				filterKey: true
			});
			f.push({
				key: "MaterialName",
				label: this.oResourceBundle.getText("MATERIAL_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHMaterial";
			var u = ["$select=Material,MaterialName", "$orderby=Material"];
			var F = this._getODataParameterForFilterBarSearch("Material", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpSupplyingPlant: function(e) {
			var m = {
				title: this.oResourceBundle.getText("SUPPLYING_PLANT"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "SupplyingPlant",
				label: this.oResourceBundle.getText("SUPPLYING_PLANT"),
				filterKey: true
			});
			f.push({
				key: "SupplyingPlantName",
				label: this.oResourceBundle.getText("SUPPLYING_PLANT_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHSupplyingPlant";
			var u = ["$select=SupplyingPlant,SupplyingPlantName", "$orderby=SupplyingPlant"];
			var F = this._getODataParameterForFilterBarSearch("SupplyingPlant", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpPurchasingDocumentItemText: function(e) {
			var m = {
				title: this.oResourceBundle.getText("SHORT_TEXT"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "PurchasingDocumentItemText",
				label: this.oResourceBundle.getText("SHORT_TEXT"),
				filterKey: true
			});
			var E = "/M2SOview";
			var c = "/VHPurchasingDocumentItemText";
			var u = ["$select=PurchasingDocumentItemText", "$orderby=PurchasingDocumentItemText"];
			var F = this._getODataParameterForFilterBarSearch("PurchasingDocumentItemText", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpPurchasingDocumentType: function(e) {
			var m = {
				title: this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE"),
				modal: true,
				supportMultiselect: true,
				supportRanges: false,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "PurchasingDocumentType",
				label: this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE_G"),
				filterKey: true
			});
			// f.push({
			// 	key: "PurgDocumentTypeDescription",
			// 	label: this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE_NAME"),
			// 	filterDescriptionKey: true
			// });
			// 	var E = "/M2SOview";
			// var c = "/VHPurchasingDocumentType";
			// var u = ["$select=PurchasingDocumentType,PurgDocumentTypeDescription", "$orderby=PurchasingDocumentType"];
			var E = "/VHDocTyp";
			var c = "/VHDocTyp";
			var u = ["$select=PurchasingDocumentType", "$orderby=PurchasingDocumentType"];
			var F = this._getODataParameterForFilterBarSearch("PurchasingDocumentType", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, null);
		},
		handleValueHelpPurchaseOrderItemCategory: function(e) {
			var m = {
				title: this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "PurchaseOrderItemCategory",
				label: this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY"),
				filterKey: true
			});
			f.push({
				key: "PurgDocItemCategoryName",
				label: this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHPurchaseOrderItemCategory";
			var u = ["$select=PurchaseOrderItemCategory,PurgDocItemCategoryName", "$orderby=PurchaseOrderItemCategory"];
			var F = this._getODataParameterForFilterBarSearch("PurchaseOrderItemCategory", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		},
		handleValueHelpAccountAssignmentCategory: function(e) {
			var m = {
				title: this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY"),
				modal: true,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false
			};
			var f = [];
			f.push({
				key: "AccountAssignmentCategory",
				label: this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY"),
				filterKey: true
			});
			f.push({
				key: "AcctAssignmentCategoryName",
				label: this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY_NAME"),
				filterDescriptionKey: true
			});
			var E = "/M2SOview";
			var c = "/VHAccountAssignmentCategory";
			var u = ["$select=AccountAssignmentCategory,AcctAssignmentCategoryName", "$orderby=AccountAssignmentCategory"];
			var F = this._getODataParameterForFilterBarSearch("AccountAssignmentCategory", [], [], 0, 0, "ME2STAR_SFB");
			u.push(F.urlParameters[0]);
			this._generateValueHelp(e, m, E, c, f, u, null, F.filters);
		}
	};
})();