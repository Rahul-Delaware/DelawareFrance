/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.VariantHandling");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.VariantHandling = {
		onBeforeVariantSave: function(e) {
			var s = this.getView().byId("ME2STAR_SFB");
			s.setFilterData({
				_CUSTOM: {
					Search: this._getFilterParamsForVariant("searchField", "Search"),
					Supplier: this._getFilterParamsForVariant("filterBarInputSupplier", "Supplier"),
					PurchasingGroup: this._getFilterParamsForVariant("filterBarInputPurchasingGroup", "PurchasingGroup"),
					Plant: this._getFilterParamsForVariant("filterBarInputPlant", "Plant"),
					MaterialGroup: this._getFilterParamsForVariant("filterBarInputMaterialGroup", "MaterialGroup"),
					Status: this._getFilterParamsForVariant("filterBarInputStatus", "Status"),
					CostCenter: this._getFilterParamsForVariant("filterBarInputCostCenter", "CostCenter"),
					WBSElement: this._getFilterParamsForVariant("filterBarInputWBSElement", "WBSElementExternalID"),
					SalesOrder: this._getFilterParamsForVariant("filterBarInputSalesOrder", "SalesOrder"),
					ServicePerformer: this._getFilterParamsForVariant("filterBarInputServicePerformer", "ServicePerformer"),
					WorkItem: this._getFilterParamsForVariant("filterBarInputServicePerformer", "WorkItem"),
					PurchasingOrganization: this._getFilterParamsForVariant("filterBarInputPurchasingOrganization", "PurchasingOrganization"),
					Material: this._getFilterParamsForVariant("filterBarInputMaterial", "Material"),
					DeliveryDate: this._getFilterParamsForVariant("filterBarInputDeliveryDate", "DeliveryDate"),
					SupplyingPlant: this._getFilterParamsForVariant("filterBarInputSupplyingPlant", "SupplyingPlant"),
					PurchasingDocumentItemText: this._getFilterParamsForVariant("filterBarInputPurchasingDocumentItemText",
						"PurchasingDocumentItemText"),
					PurchasingDocumentType: this._getFilterParamsForVariant("filterBarInputPurchasingDocumentType", "PurchasingDocumentType"),
					PurchaseOrderItemCategory: this._getFilterParamsForVariant("filterBarInputPurchaseOrderItemCategory", "PurchaseOrderItemCategory"),
					AccountAssignmentCategory: this._getFilterParamsForVariant("filterBarInputAccountAssignmentCategory", "AccountAssignmentCategory"),

					Company: this._getFilterParamsForVariant("filterBarInputCompany", "Company"),
					CreationDate: this._getFilterParamsForVariant("filterBarInputCreationDate", "CreationDate"),
					Requi: this._getFilterParamsForVariant("filterBarInputRequi", "Requi"),
					Zzpersonincharge: this._getFilterParamsForVariant("filterBarInputPerIn", "Zzpersonincharge"),
					ElStatus: this._getFilterParamsForVariant("filterBarInputElStatus", "ElStatus"),
					Venpdh: this._getFilterParamsForVariant("filterBarInputVenpdh", "Venpdh")
				}
			});
		},
		onHold: function(e) {
			
			var	_HOLD = {
					Search: this._getFilterParamsForVariant("searchField", "Search"),
					Supplier: this._getFilterParamsForVariant("filterBarInputSupplier", "Supplier"),
					PurchasingGroup: this._getFilterParamsForVariant("filterBarInputPurchasingGroup", "PurchasingGroup"),
					Plant: this._getFilterParamsForVariant("filterBarInputPlant", "Plant"),
					MaterialGroup: this._getFilterParamsForVariant("filterBarInputMaterialGroup", "MaterialGroup"),
					Status: this._getFilterParamsForVariant("filterBarInputStatus", "Status"),
					CostCenter: this._getFilterParamsForVariant("filterBarInputCostCenter", "CostCenter"),
					WBSElement: this._getFilterParamsForVariant("filterBarInputWBSElement", "WBSElementExternalID"),
					SalesOrder: this._getFilterParamsForVariant("filterBarInputSalesOrder", "SalesOrder"),
					ServicePerformer: this._getFilterParamsForVariant("filterBarInputServicePerformer", "ServicePerformer"),
					WorkItem: this._getFilterParamsForVariant("filterBarInputServicePerformer", "WorkItem"),
					PurchasingOrganization: this._getFilterParamsForVariant("filterBarInputPurchasingOrganization", "PurchasingOrganization"),
					Material: this._getFilterParamsForVariant("filterBarInputMaterial", "Material"),
					DeliveryDate: this._getFilterParamsForVariant("filterBarInputDeliveryDate", "DeliveryDate"),
					SupplyingPlant: this._getFilterParamsForVariant("filterBarInputSupplyingPlant", "SupplyingPlant"),
					PurchasingDocumentItemText: this._getFilterParamsForVariant("filterBarInputPurchasingDocumentItemText",
						"PurchasingDocumentItemText"),
					PurchasingDocumentType: this._getFilterParamsForVariant("filterBarInputPurchasingDocumentType", "PurchasingDocumentType"),
					PurchaseOrderItemCategory: this._getFilterParamsForVariant("filterBarInputPurchaseOrderItemCategory", "PurchaseOrderItemCategory"),
					AccountAssignmentCategory: this._getFilterParamsForVariant("filterBarInputAccountAssignmentCategory", "AccountAssignmentCategory"),

					Company: this._getFilterParamsForVariant("filterBarInputCompany", "Company"),
					CreationDate: this._getFilterParamsForVariant("filterBarInputCreationDate", "CreationDate"),
					Requi: this._getFilterParamsForVariant("filterBarInputRequi", "Requi"),
					Zzpersonincharge: this._getFilterParamsForVariant("filterBarInputPerIn", "Zzpersonincharge"),
					ElStatus: this._getFilterParamsForVariant("filterBarInputElStatus", "ElStatus"),
					Venpdh: this._getFilterParamsForVariant("filterBarInputVenpdh", "Venpdh")
				};
				return _HOLD;
		},
		onAfterVariantLoad: function(e) {
			var s = this.getView().byId("ME2STAR_SFB");
			var d = s.getFilterData();
			var v = s.getVariantManagement();
			var c = v.getCurrentVariantId();
			for (var i = 0; i < v.getVariantItems().length; i++) {
				if (v.getVariantItems()[i].getKey() === c) {
					if (v.getVariantItems()[i].getExecuteOnSelection() === true) {
						this.bInitialLoadingCompleted = true;
					}
					break;
				}
			}
			var C = d._CUSTOM;
			if (C) {
				this._setFilterParamsForVariant("searchField", C.Search);
				this._setFilterParamsForVariant("filterBarInputSupplier", C.Supplier);
				this._setFilterParamsForVariant("filterBarInputPurchasingGroup", C.PurchasingGroup);
				this._setFilterParamsForVariant("filterBarInputPlant", C.Plant);
				this._setFilterParamsForVariant("filterBarInputMaterialGroup", C.MaterialGroup);
				this._setFilterParamsForVariant("filterBarInputStatus", C.Status);
				this._setFilterParamsForVariant("filterBarInputCostCenter", C.CostCenter);
				this._setFilterParamsForVariant("filterBarInputWBSElement", C.WBSElementExternalID);
				this._setFilterParamsForVariant("filterBarInputSalesOrder", C.SalesOrder);
				this._setFilterParamsForVariant("filterBarInputServicePerformer", C.ServicePerformer);
				this._setFilterParamsForVariant("filterBarInputWorkItem", C.WorkItem);
				this._setFilterParamsForVariant("filterBarInputPurchasingOrganization", C.PurchasingOrganization);
				this._setFilterParamsForVariant("filterBarInputMaterial", C.Material);
				this._setFilterParamsForVariant("filterBarInputDeliveryDate", C.DeliveryDate);
				this._setFilterParamsForVariant("filterBarInputSupplyingPlant", C.SupplyingPlant);
				this._setFilterParamsForVariant("filterBarInputPurchasingDocumentItemText", C.PurchasingDocumentItemText);
				this._setFilterParamsForVariant("filterBarInputPurchasingDocumentType", C.PurchasingDocumentType);
				this._setFilterParamsForVariant("filterBarInputPurchaseOrderItemCategory", C.PurchaseOrderItemCategory);
				this._setFilterParamsForVariant("filterBarInputAccountAssignmentCategory", C.AccountAssignmentCategory);

				this._setFilterParamsForVariant("filterBarInputCompany", C.Company);
				this._setFilterParamsForVariant("filterBarInputCreationDate", C.CreationDate);
				this._setFilterParamsForVariant("filterBarInputRequi", C.Requi);
				this._setFilterParamsForVariant("filterBarInputPerIn", C.Zzpersonincharge);
				this._setFilterParamsForVariant("filterBarInputElStatus", C.ElStatus);
				this._setFilterParamsForVariant("filterBarInputVenpdh", C.Venpdh);

			}
		},

		onReset: function(e) {
			var C = e;
			if (C) {
				this._setFilterParamsForVariant("searchField", C.Search);
				this._setFilterParamsForVariant("filterBarInputSupplier", C.Supplier);
				this._setFilterParamsForVariant("filterBarInputPurchasingGroup", C.PurchasingGroup);
				this._setFilterParamsForVariant("filterBarInputPlant", C.Plant);
				this._setFilterParamsForVariant("filterBarInputMaterialGroup", C.MaterialGroup);
				this._setFilterParamsForVariant("filterBarInputStatus", C.Status);
				this._setFilterParamsForVariant("filterBarInputCostCenter", C.CostCenter);
				this._setFilterParamsForVariant("filterBarInputWBSElement", C.WBSElementExternalID);
				this._setFilterParamsForVariant("filterBarInputSalesOrder", C.SalesOrder);
				this._setFilterParamsForVariant("filterBarInputServicePerformer", C.ServicePerformer);
				this._setFilterParamsForVariant("filterBarInputWorkItem", C.WorkItem);
				this._setFilterParamsForVariant("filterBarInputPurchasingOrganization", C.PurchasingOrganization);
				this._setFilterParamsForVariant("filterBarInputMaterial", C.Material);
				this._setFilterParamsForVariant("filterBarInputDeliveryDate", C.DeliveryDate);
				this._setFilterParamsForVariant("filterBarInputSupplyingPlant", C.SupplyingPlant);
				this._setFilterParamsForVariant("filterBarInputPurchasingDocumentItemText", C.PurchasingDocumentItemText);
				this._setFilterParamsForVariant("filterBarInputPurchasingDocumentType", C.PurchasingDocumentType);
				this._setFilterParamsForVariant("filterBarInputPurchaseOrderItemCategory", C.PurchaseOrderItemCategory);
				this._setFilterParamsForVariant("filterBarInputAccountAssignmentCategory", C.AccountAssignmentCategory);
				this._setFilterParamsForVariant("filterBarInputCompany", C.Company);
				this._setFilterParamsForVariant("filterBarInputCreationDate", C.CreationDate);
				this._setFilterParamsForVariant("filterBarInputRequi", C.Requi);
				this._setFilterParamsForVariant("filterBarInputPerIn", C.Zzpersonincharge);
				this._setFilterParamsForVariant("filterBarInputElStatus", C.ElStatus);
				this._setFilterParamsForVariant("filterBarInputVenpdh", C.Venpdh);

			}
			
			// e._HOLD =
			// 	   {
			// 		Search: " ",
			// 		Supplier: "",
			// 		PurchasingGroup: "",
			// 		Plant: "",
			// 		MaterialGroup: "",
			// 		Status: "",
			// 		CostCenter: "",
			// 		WBSElement: "",
			// 		SalesOrder: "",
			// 		ServicePerformer: "",
			// 		WorkItem: "",
			// 		PurchasingOrganization: "",
			// 		Material: "",
			// 		DeliveryDate: "",
			// 		SupplyingPlant: "",
			// 		PurchasingDocumentItemText: "",
			// 		PurchasingDocumentType: "",
			// 		PurchaseOrderItemCategory: "",
			// 		AccountAssignmentCategory: "",
			// 		Company: "",
			// 		CreationDate: "",
			// 		Requi: "",
			// 		Zzpersonincharge: "",
			// 		ElStatus: ""
			// 	};
		}
	};
})();