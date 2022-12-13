/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ValueHelpHandler");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ValueHelpHandler = {
		/**
		 * Called when value help for supplier is opened
		 * 
		 * @param {Object}
		 *            oEvent Event which is triggered by opening value help for
		 *            supplier
		 */
		handleValueHelpSupplier : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("SUPPLIER"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "Supplier",
				label : this.oResourceBundle.getText("SUPPLIER"),
				filterKey : true
			});
			aFields.push({
				key : "SupplierName",
				label : this.oResourceBundle.getText("SUPPLIER_NAME"),
				filterDescriptionKey : true
			});
			 aFields.push({
			 key : "SupplierAddressCountryName",
			 label : this.oResourceBundle.getText("COUNTRY")
			 });
			 aFields.push({
			 key : "SupplierAddressCity",
			 label : this.oResourceBundle.getText("CITY")
			 });

			var sEntity = "/M2SOview";
			var sCollection = "/VHSupplier";
			var aUrlParams = [ "$select=Supplier,SupplierName,SupplierAddressCountryName,SupplierAddressCity","$orderby=Supplier" ]; // ,SupplierAddressCountryName,SupplierAddressCity,Cnt","$orderby=Supplier"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"Supplier", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},

		/**
		 * Called when value help for product group is opened
		 * 
		 * @param {Object}
		 *            oEvent Event which is triggered by opening value help for
		 *            product group
		 */
		handleValueHelpMaterialGroup : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("MATERIAL_GROUP"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "MaterialGroup",
				label : this.oResourceBundle.getText("MATERIAL_GROUP"),
				filterKey : true
			});
			aFields.push({
				key : "MaterialGroupName",
				label : this.oResourceBundle.getText("MATERIAL_GROUP_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHMatGroup";
			var aUrlParams = [ "$select=MaterialGroup,MaterialGroupName","$orderby=MaterialGroup" ]; // ,Cnt","$orderby=MaterialGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"MaterialGroup", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},

		/**
		 * Called when value help for plant is opened
		 * 
		 * @param {Object}
		 *            oEvent Event which is triggered by opening value help for
		 *            plant
		 */
		handleValueHelpPlant : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("PLANTS"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "Plant",
				label : this.oResourceBundle.getText("PLANTS"),
				filterKey : true
			});
			aFields.push({
				key : "PlantName",
				label : this.oResourceBundle.getText("PLANT_NAME"),
				filterDescriptionKey : true
			});

			var sEntity = "/M2SOview";
			var sCollection = "/VHPlant";
			var aUrlParams = [ "$select=Plant,PlantName","$orderby=Plant" ]; // ,Cnt","$orderby=Plant"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"Plant", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},

		/**
		 * Called when value help for purchasing group is opened
		 * 
		 * @param {Object}
		 *            oEvent Event which is triggered by opening value help for
		 *            purchasing group
		 */
		handleValueHelpPurchasingGroup : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("PURCHASING_GROUP"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "PurchasingGroup",
				label : this.oResourceBundle.getText("PURCHASING_GROUP"),
				filterKey : true
			});
			aFields.push({
				key : "PurchasingGroupName",
				label : this.oResourceBundle.getText("PURCHASING_GROUP_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHPurGroup";
			var aUrlParams = [ "$select=PurchasingGroup,PurchasingGroupName","$orderby=PurchasingGroup" ]; // ,Cnt","$orderby=PurchasingGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"PurchasingGroup", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpStatus : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("STATUS"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "Status",
				label : this.oResourceBundle.getText("STATUS_KEY"),
				filterKey : true
			});
			aFields.push({
				key : "StatusDescription",
				label : this.oResourceBundle.getText("DOCUMENT_STATUS_DES"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHStatus";
			var aUrlParams = [ "$select=Status,StatusDescription","$orderby=Status" ]; // ,Cnt","$orderby=PurchasingGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"Status", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},

		handleValueHelpCostCenter : function(oEvent) { 
			var oMetadata = {
				title : this.oResourceBundle.getText("COST_CENTER"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "CostCenter",
				label : this.oResourceBundle.getText("COST_CENTER"),
				filterKey : true
			});
			aFields.push({
				key : "CostCenterName",
				label : this.oResourceBundle.getText("COST_CENTER_NAME"),
				filterDescriptionKey : true
			});
			aFields.push({
				key : "ControllingArea",
				label : this.oResourceBundle.getText("CONTROLLING_AREA")
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHCostCenter";
			var aUrlParams = [ "$select=CostCenter,CostCenterName,ControllingArea","$orderby=CostCenter" ]; // ,Cnt","$orderby=MaterialGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"CostCenter", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpSalesOrder : function(oEvent) { 
			var oMetadata = {
				title : this.oResourceBundle.getText("SALES_ORDER"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "SalesOrder",
				label : this.oResourceBundle.getText("SALES_ORDER"),
				filterKey : true
			});

			var sEntity = "/M2SOview";
			var sCollection = "/VHSalesOrder";
			var aUrlParams = [ "$select=SalesOrder","$orderby=SalesOrder" ];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"SalesOrder", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpWBSElement : function(oEvent) { 
			var oMetadata = {
				title : this.oResourceBundle.getText("WORK_PACKAGE"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "WBSElementExternalID",
				label : this.oResourceBundle.getText("WORK_PACKAGE_ID"),
				filterKey : true
			});
			
			aFields.push({
				key : "WorkPackageFullName",
				label : this.oResourceBundle.getText("WORK_PACKAGE"),
				filterDescriptionKey : true
			});

			var sEntity = "/M2SOview";
			var sCollection = "/VHWBSElement";
			var aUrlParams = [ "$select=WBSElementExternalID,WorkPackageFullName","$orderby=WBSElementExternalID" ];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"WBSElementExternalID", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpServicePerformer : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("SERVICE_PERFORMER"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "ServicePerformer",
				label : this.oResourceBundle.getText("SERVICE_PERFORMER"),
				filterKey : true
			});
			aFields.push({
				key : "ServicePerformerName",
				label : this.oResourceBundle.getText("SERVICE_PERFORMER_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHServicePerformer";
			var aUrlParams = [ "$select=ServicePerformer,ServicePerformerName","$orderby=ServicePerformer" ]; // ,Cnt","$orderby=PurchasingGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"ServicePerformer", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpWorkItem : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("WORK_ITEM"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "WorkItem",
				label : this.oResourceBundle.getText("WORK_ITEM"),
				filterKey : true
			});
			aFields.push({
				key : "WorkItem",
				label : this.oResourceBundle.getText("WORK_ITEM_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHWorkItem";
			var aUrlParams = [ "$select=WorkItem,WorkItemName","$orderby=WorkItem" ]; // ,Cnt","$orderby=PurchasingGroup"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"WorkItem", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpPurchasingOrganization : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("PURCHASING_ORGANIZATION"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "PurchasingOrganization",
				label : this.oResourceBundle.getText("PURCHASING_ORGANIZATION"),
				filterKey : true
			});
			aFields.push({
				key : "PurchasingOrganizationName",
				label : this.oResourceBundle.getText("PURCHASING_ORGANIZATION_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHPurchasingOrganization";
			var aUrlParams = [ "$select=PurchasingOrganization,PurchasingOrganizationName","$orderby=PurchasingOrganization" ]; // ,Cnt","$orderby=PurchasingOrganization"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"PurchasingOrganization", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpMaterial : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("MATERIAL"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "Material",
				label : this.oResourceBundle.getText("MATERIAL"),
				filterKey : true
			});
			aFields.push({
				key : "MaterialName",
				label : this.oResourceBundle.getText("MATERIAL_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHMaterial";
			var aUrlParams = [ "$select=Material,MaterialName","$orderby=Material" ]; // ,Cnt","$orderby=Material"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"Material", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpSupplyingPlant : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("SUPPLYING_PLANT"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "SupplyingPlant",
				label : this.oResourceBundle.getText("SUPPLYING_PLANT"),
				filterKey : true
			});
			aFields.push({
				key : "SupplyingPlantName",
				label : this.oResourceBundle.getText("SUPPLYING_PLANT_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHSupplyingPlant";
			var aUrlParams = [ "$select=SupplyingPlant,SupplyingPlantName","$orderby=SupplyingPlant" ]; // ,Cnt","$orderby=SupplyingPlant"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"SupplyingPlant", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpPurchasingDocumentItemText : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("SHORT_TEXT"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "PurchasingDocumentItemText",
				label : this.oResourceBundle.getText("SHORT_TEXT"),
				filterKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHPurchasingDocumentItemText";
			var aUrlParams = [ "$select=PurchasingDocumentItemText","$orderby=PurchasingDocumentItemText" ]; // ,Cnt","$orderby=PurchasingDocumentItemText"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"PurchasingDocumentItemText", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpPurchasingDocumentType : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "PurchasingDocumentType",
				label : this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE"),
				filterKey : true
			});
			aFields.push({
				key : "PurgDocumentTypeDescription",
				label : this.oResourceBundle.getText("PURCHASING_DOCUMENT_TYPE_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHPurchasingDocumentType";
			var aUrlParams = [ "$select=PurchasingDocumentType,PurgDocumentTypeDescription","$orderby=PurchasingDocumentType" ]; // ,Cnt","$orderby=PurchasingDocumentType"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"PurchasingDocumentType", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpPurchaseOrderItemCategory : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "PurchaseOrderItemCategory",
				label : this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY"),
				filterKey : true
			});
			aFields.push({
				key : "PurgDocItemCategoryName",
				label : this.oResourceBundle.getText("PURCHASE_ORDER_ITEM_CATEGORY_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHPurchaseOrderItemCategory";
			var aUrlParams = [ "$select=PurchaseOrderItemCategory,PurgDocItemCategoryName","$orderby=PurchaseOrderItemCategory" ]; // ,Cnt","$orderby=PurchaseOrderItemCategory"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"PurchaseOrderItemCategory", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		},
		handleValueHelpAccountAssignmentCategory : function(oEvent) {
			var oMetadata = {
				title : this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY"),
				modal : true,
				supportMultiselect : true,
				supportRanges : true,
				supportRangesOnly : false
			};
			var aFields = [];

			aFields.push({
				key : "AccountAssignmentCategory",
				label : this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY"),
				filterKey : true
			});
			aFields.push({
				key : "AcctAssignmentCategoryName",
				label : this.oResourceBundle.getText("ACCOUNT_ASSIGNMENT_CATEGORY_NAME"),
				filterDescriptionKey : true
			});
			var sEntity = "/M2SOview";
			var sCollection = "/VHAccountAssignmentCategory";
			var aUrlParams = [ "$select=AccountAssignmentCategory,AcctAssignmentCategoryName","$orderby=AccountAssignmentCategory" ]; // ,Cnt","$orderby=AccountAssignmentCategory"];
			var oFilterParam = this._getODataParameterForFilterBarSearch(
					"AccountAssignmentCategory", [], [], 0, 0, "ME2STAR_SFB");
			aUrlParams.push(oFilterParam.urlParameters[0]);
			this._generateValueHelp(oEvent, oMetadata, sEntity, sCollection,
					aFields, aUrlParams, null, oFilterParam.filters);
		}
	};
})();