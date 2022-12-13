/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.VariantHandling");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.VariantHandling = {
		// Variant management
		onBeforeVariantSave: function(oEvent) {
			var oSmartFilterBar = this.getView()
				.byId("ME2STAR_SFB");
			oSmartFilterBar
				.setFilterData({
					_CUSTOM: {
						Search: this
							._getFilterParamsForVariant(
								"searchField", "Search"),
						Supplier: this
							._getFilterParamsForVariant(
								"filterBarInputSupplier",
								"Supplier"),
						PurchasingGroup: this
							._getFilterParamsForVariant(
								"filterBarInputPurchasingGroup",
								"PurchasingGroup"),
						Plant: this
							._getFilterParamsForVariant(
								"filterBarInputPlant",
								"Plant"),
						MaterialGroup: this
							._getFilterParamsForVariant(
								"filterBarInputMaterialGroup",
								"MaterialGroup"),
						Status: this
							._getFilterParamsForVariant(
								"filterBarInputStatus",
								"Status"),
						CostCenter: this
							._getFilterParamsForVariant(
								"filterBarInputCostCenter",
								"CostCenter"),
						WBSElement: this
							._getFilterParamsForVariant(
								"filterBarInputWBSElement",
								"WBSElementExternalID"),
						SalesOrder: this
							._getFilterParamsForVariant(
								"filterBarInputSalesOrder",
								"SalesOrder"),
						ServicePerformer: this
							._getFilterParamsForVariant(
								"filterBarInputServicePerformer",
								"ServicePerformer"),
						WorkItem: this
							._getFilterParamsForVariant(
								"filterBarInputServicePerformer",
								"WorkItem"),
						PurchasingOrganization: this
							._getFilterParamsForVariant(
								"filterBarInputPurchasingOrganization",
								"PurchasingOrganization"),
						Material: this
							._getFilterParamsForVariant(
								"filterBarInputMaterial",
								"Material"),
						DeliveryDate: this
							._getFilterParamsForVariant(
								"filterBarInputDeliveryDate",
								"DeliveryDate"),
						SupplyingPlant: this
							._getFilterParamsForVariant(
								"filterBarInputSupplyingPlant",
								"SupplyingPlant"),
						PurchasingDocumentItemText: this
							._getFilterParamsForVariant(
								"filterBarInputPurchasingDocumentItemText",
								"PurchasingDocumentItemText"),
						PurchasingDocumentType: this
							._getFilterParamsForVariant(
								"filterBarInputPurchasingDocumentType",
								"PurchasingDocumentType"),
						PurchaseOrderItemCategory: this
							._getFilterParamsForVariant(
								"filterBarInputPurchaseOrderItemCategory",
								"PurchaseOrderItemCategory"),
						AccountAssignmentCategory: this
							._getFilterParamsForVariant(
								"filterBarInputAccountAssignmentCategory",
								"AccountAssignmentCategory")
					}
				});
		},
		onAfterVariantLoad: function(oEvent) {
			var oSmartFilterBar = this.getView()
				.byId("ME2STAR_SFB");
			var oData = oSmartFilterBar.getFilterData();
			//Introduced to avoid auto load of table in initial loading phase as there was a customer incident regarding high performance impact
			//If customer is having a variant which schould execute loading on selection, we need to consider this (only needed if execute = true and on default = true)
			var oVariantManagement = oSmartFilterBar.getVariantManagement();
			var sCurrentVariantId = oVariantManagement.getCurrentVariantId();
			for (var i = 0; i < oVariantManagement.getVariantItems().length; i++) {
				if (oVariantManagement.getVariantItems()[i].getKey() === sCurrentVariantId) {
					if (oVariantManagement.getVariantItems()[i].getExecuteOnSelection() === true) {
						this.bInitialLoadingCompleted = true;
					}
					break;
				}
			}

			var oCustomFieldData = oData._CUSTOM;

            if (oCustomFieldData) {
    			this._setFilterParamsForVariant("searchField",
    				oCustomFieldData.Search);
    			this._setFilterParamsForVariant(
    				"filterBarInputSupplier",
    				oCustomFieldData.Supplier);
    			this._setFilterParamsForVariant(
    				"filterBarInputPurchasingGroup",
    				oCustomFieldData.PurchasingGroup);
    			this._setFilterParamsForVariant("filterBarInputPlant",
    				oCustomFieldData.Plant);
    			this._setFilterParamsForVariant(
    				"filterBarInputMaterialGroup",
    				oCustomFieldData.MaterialGroup);
    			this._setFilterParamsForVariant("filterBarInputStatus",
    				oCustomFieldData.Status);
    			this._setFilterParamsForVariant(
    				"filterBarInputCostCenter",
    				oCustomFieldData.CostCenter);
    			this._setFilterParamsForVariant(
    				"filterBarInputWBSElement",
    				oCustomFieldData.WBSElementExternalID);
    			this._setFilterParamsForVariant(
    				"filterBarInputSalesOrder",
    				oCustomFieldData.SalesOrder);
    			this._setFilterParamsForVariant(
    				"filterBarInputServicePerformer",
    				oCustomFieldData.ServicePerformer);
    			this._setFilterParamsForVariant(
    				"filterBarInputWorkItem",
    				oCustomFieldData.WorkItem);
    			this._setFilterParamsForVariant(
    				"filterBarInputPurchasingOrganization",
    				oCustomFieldData.PurchasingOrganization);
    			this._setFilterParamsForVariant(
    				"filterBarInputMaterial",
    				oCustomFieldData.Material);
    			this._setFilterParamsForVariant(
    				"filterBarInputDeliveryDate",
    				oCustomFieldData.DeliveryDate);
    			this._setFilterParamsForVariant(
    				"filterBarInputSupplyingPlant",
    				oCustomFieldData.SupplyingPlant);
    			this._setFilterParamsForVariant(
    				"filterBarInputPurchasingDocumentItemText",
    				oCustomFieldData.PurchasingDocumentItemText);
    			this._setFilterParamsForVariant(
    				"filterBarInputPurchasingDocumentType",
    				oCustomFieldData.PurchasingDocumentType);
    			this._setFilterParamsForVariant(
    				"filterBarInputPurchaseOrderItemCategory",
    				oCustomFieldData.PurchaseOrderItemCategory);
    			this._setFilterParamsForVariant(
    				"filterBarInputAccountAssignmentCategory",
    				oCustomFieldData.AccountAssignmentCategory);
            }

		}
	};
})();