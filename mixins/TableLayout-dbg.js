/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TableLayout");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.TableLayout = {
		_applyGroup: function(oBinding, aSorter) {
			var bChanged = false;
			var vTab = this.getView().byId("v210IconTabBar")
				.getSelectedKey();
			switch (vTab) {
				case "PO":
					bChanged = this.POGroupChanged | this.POSortChanged;
					break;

				case "PR":
					bChanged = this.PRGroupChanged | this.PRSortChanged;
					break;

				case "GR":
					bChanged = this.GRGroupChanged | this.GRSortChanged;
					break;

				case "SI":
					bChanged = this.SIGroupChanged | this.SISortChanged;
					break;

				case "ALL":
					bChanged = this.OverviewGroupChanged;
					break;
			    default:
			        break;

			}

			if (bChanged == true) {
				oBinding.sCustomParams = oBinding.oModel
					.createCustomParams({
						custom: {
							search: this._customSearchKey
						},
						select: this
							._getCustomSelectParameters(this._groupKey)
					});
				if (aSorter == null | aSorter == undefined) {
					aSorter = [];
				}


				oBinding.sort(aSorter);
				oBinding.refresh();

				for (var i = 0; i < this.GroupItems.length; i++) {
					if (this.GroupItems[i] === this._groupKey) {
						this.getView().byId(this.GroupItems[i])
							.setVisible(true);
						this.getView().byId(
							this.GroupItems[i] + "_col")
							.setVisible(true);
					} else {
						this.getView().byId(this.GroupItems[i])
							.setVisible(false);
						this.getView().byId(
							this.GroupItems[i] + "_col")
							.setVisible(false);
					}
				}

				switch (vTab) {
					case "PO":
						this.POGroupChanged = false;
						this.POSortChanged = false;
						break;

					case "PR":
						this.PRGroupChanged = false;
						this.PRSortChanged = false;
						break;

					case "GR":
						this.GRGroupChanged = false;
						this.GRSortChanged = false;
						break;

					case "SI":
						this.SIGroupChanged = false;
						this.SISortChanged = false;
						break;

					case "ALL":
						this.OverviewGroupChanged = false;
						break;
					default:
						break;
				}

			}

		},
		_updateCount: function(aFilter) {
		
			this.getView().byId("overviewTab").setCount(0);
			this.getView().byId("POTab").setCount(0);
			this.getView().byId("PRTab").setCount(0);
			this.getView().byId("GRTab").setCount(0);
			this.getView().byId("SITab").setCount(0);
			this.overallCount = 0;
			
			if (aFilter === null | aFilter === undefined) {
				aFilter = [];
			}
			if (aFilter.length > 0) {
				var oFilter = new sap.ui.model.Filter(aFilter, true);
				aFilter = [];
				aFilter.push(oFilter);
			}
			var sSearchString = encodeURIComponent(this._customSearchKey);
			var vUrlParams = "search=" + sSearchString;
			var aODataFilter = (aFilter.length > 0) ? aFilter : [];
			var oModel = this.getView().getModel();
			
			if (sSearchString && sSearchString.length > 0) {
				vUrlParams += "&" + "$select=Cnt,PurchasingDocumentCategory";
				oModel.read("/M2SOview", {
						urlParameters: vUrlParams,
						async: true,
						filters: aFilter,
						success: this._IconCountHandler.bind(this),
						error: this._failureHandler.bind(this)
					});
			}
			else {
				oModel.read("/PDocItem/$count", {
							urlParameters: vUrlParams,
							batchGroupId: 1,
							async: false,
							filters: aODataFilter,
							success: this._IconCountHandler.bind(this,"POTab"),
							error: this._failureHandler.bind(this)
						});
				oModel.read("/PGrItem/$count", {
							urlParameters: vUrlParams,
							batchGroupId: 1,						
							async: false,
							filters: aODataFilter,
							success: this._IconCountHandler.bind(this,"GRTab"),
							error: this._failureHandler.bind(this)
						});
				oModel.read("/PReqItem/$count", {
							urlParameters: vUrlParams,
							batchGroupId: 1,						
							async: false,
							filters: aODataFilter,
							success: this._IconCountHandler.bind(this,"PRTab"),
							error: this._failureHandler.bind(this)
						});
				oModel.read("/SupInvItem/$count", {
							urlParameters: vUrlParams,
							batchGroupId: 1,						
							async: false,
							filters: aODataFilter,
							success: this._IconCountHandler.bind(this,"SITab"),
							error: this._failureHandler.bind(this)
						});
			}
		},
		_getCustomSelectParameters: function(GroupKey) {

			var vSelectParams = "";
			var vCountParams = "Cnt,CntF,CntB,CntG,CntS";
			var vGroupParams;

			switch (GroupKey) {
				case "MaterialGroup":
					vGroupParams = GroupKey + ",MaterialGroupName," + vCountParams;
					break;

				case "Supplier":
					vGroupParams = GroupKey + ",SupplierName," + vCountParams;
					break;

				case "PurchasingGroup":
					vGroupParams = GroupKey + ",PurchasingGroupName," + vCountParams;
					break;
				case "None":
					vGroupParams = "PurchasingDocumentCategory," + vCountParams;
					break;
				default:
				    break;

			}

			switch (this.getView().byId("v210IconTabBar")
				.getSelectedKey()) {
				case "PO":
					vSelectParams = this.POSelectParams;
					break;

				case "PR":
					vSelectParams = this.PRSelectParams;
					break;

				case "GR":
					vSelectParams = this.GRSelectParams;
					break;

				case "SI":
					vSelectParams = this.SISelectParams;
					break;

				case "ALL":
					vSelectParams = vGroupParams;
					break;
				default:
				    break;
			}

			return vSelectParams;

		},

		callSortDialog: function(oEvent) {
			var _that = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle
					.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("MATERIAL_GROUP"),
						key: "MaterialGroup",
						selected: ("MaterialGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SUPPLIERS"),
						key: "Supplier",
						selected: ("Supplier" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("PURCHASING_GROUP"),
						key: "PurchasingGroup",
						selected: ("PurchasingGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("DOCUMENT"),
						key: "PurchasingDocument",
						selected: ("PurchasingDocument" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("STATUS"),
						key: "Status",
						selected: ("Status" == this._sortKey)
					}),
					new sap.m.ViewSettingsItem({
						text: "Relevance",
						key: "WeightedRelevance",
						selected: (this._sortKey === "WeightedRelevance")
					})
				],
				confirm: function(evt) {
					var params = evt.getParameters();
					var DescendingSort = "";
					var SortPath = params.sortItem.getKey();
					_that._sortGroup = "Sort";
					if (!params.sortDescending)
						DescendingSort = false;
					else
						DescendingSort = true;
					_that.SortKey = SortPath + '';
					_that.ApplyGrouping(SortPath,
						DescendingSort);
					_that.DescendingSort = DescendingSort;
				}
			});

			this._lineItemViewDialog.open();

		},
		
		callSortDialog_GR: function(oEvent) {
			var _that = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle
					.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("MATERIAL_GROUP"),
						key: "MaterialGroup",
						selected: ("MaterialGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SUPPLIERS"),
						key: "Supplier",
						selected: ("Supplier" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("PURCHASING_GROUP"),
						key: "PurchasingGroup",
						selected: ("PurchasingGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("DOCUMENT"),
						key: "PurchasingDocument",
						selected: ("PurchasingDocument" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("STATUS"),
						key: "Status",
						selected: ("Status" == this._sortKey)
					})
				],
				confirm: function(evt) {
					var params = evt.getParameters();
					var DescendingSort = "";
					var SortPath = params.sortItem.getKey();
					_that._sortGroup = "Sort";
					if (!params.sortDescending)
						DescendingSort = false;
					else
						DescendingSort = true;
					_that.SortKey = SortPath + '';
					_that.ApplyGrouping(SortPath,
						DescendingSort);
					_that.DescendingSort = DescendingSort;
				}
			});

			this._lineItemViewDialog.open();

		},
		
		// Call Sort for Accounting Doc
		callSortDialog_wbs: function(oEvent) {
			var _that = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle
					.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("MATERIAL_GROUP"),
						key: "MaterialGroup",
						selected: ("MaterialGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SUPPLIERS"),
						key: "Supplier",
						selected: ("Supplier" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("PURCHASING_GROUP"),
						key: "PurchasingGroup",
						selected: ("PurchasingGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("DOCUMENT"),
						key: "PurchasingDocument",
						selected: ("PurchasingDocument" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("STATUS"),
						key: "Status",
						selected: ("Status" == this._sortKey)
					}),
													new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("WBS_ELEMENT"),
						key: "WorkPackageFullName",
						selected: ("WorkPackageFullName" == this._sortKey)
					}),
															new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("COST_CENTER"),
						key: "CostCenter",
						selected: ("CostCenter" == this._sortKey)
					}),
																	new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SALES_ORDER"),
						key: "SalesOrder",
						selected: ("SalesOrder" == this._sortKey)
					}),
					new sap.m.ViewSettingsItem({
						text: "Relevance",
						key: "WeightedRelevance",
						selected: ( this._sortKey === "WeightedRelevance")
					})
				],
				confirm: function(evt) {
					var params = evt.getParameters();
					var DescendingSort = "";
					var SortPath = params.sortItem.getKey();
					_that._sortGroup = "Sort";
					if (!params.sortDescending)
						DescendingSort = false;
					else
						DescendingSort = true;
					_that.SortKey = SortPath + '';
					_that.ApplyGrouping(SortPath,
						DescendingSort);
					_that.DescendingSort = DescendingSort;
				}
			});

			this._lineItemViewDialog.open();

		},
		
		callSortDialog_SI: function(oEvent) {
			var _that = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle
					.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("MATERIAL_GROUP"),
						key: "MaterialGroup",
						selected: ("MaterialGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SUPPLIERS"),
						key: "Supplier",
						selected: ("Supplier" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("PURCHASING_GROUP"),
						key: "PurchasingGroup",
						selected: ("PurchasingGroup" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("DOCUMENT"),
						key: "PurchasingDocument",
						selected: ("PurchasingDocument" == this._sortKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("STATUS"),
						key: "Status",
						selected: ("Status" == this._sortKey)
					}),
													new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("WBS_ELEMENT"),
						key: "WorkPackageFullName",
						selected: ("WorkPackageFullName" == this._sortKey)
					}),
															new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("COST_CENTER"),
						key: "CostCenter",
						selected: ("CostCenter" == this._sortKey)
					}),
																	new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SALES_ORDER"),
						key: "SalesOrder",
						selected: ("SalesOrder" == this._sortKey)
					})
				],
				confirm: function(evt) {
					var params = evt.getParameters();
					var DescendingSort = "";
					var SortPath = params.sortItem.getKey();
					_that._sortGroup = "Sort";
					if (!params.sortDescending)
						DescendingSort = false;
					else
						DescendingSort = true;
					_that.SortKey = SortPath + '';
					_that.ApplyGrouping(SortPath,
						DescendingSort);
					_that.DescendingSort = DescendingSort;
				}
			});

			this._lineItemViewDialog.open();

		},
		
		callGroupDialog: function(oEvent) {
			var _that = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle
					.getText("GROUP_TOOLTIP"),
				sortDescending: this._descendingGroup,
				sortItems: [
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("MATERIAL_GROUP"),
						key: "MaterialGroup",
						selected: ("MaterialGroup" == this._groupKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("SUPPLIERS"),
						key: "Supplier",
						selected: ("Supplier" == this._groupKey)
					}),
											new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("PURCHASING_GROUP"),
						key: "PurchasingGroup",
						selected: ("PurchasingGroup" == this._groupKey)
					}),
							new sap.m.ViewSettingsItem({
						text: this.oResourceBundle
							.getText("NONE"),
						key: "None",
						selected: ("None" == this._groupKey)
					})],
				confirm: function(evt) {
					var params = evt.getParameters();
					var DescendingSort = "";
					var GroupPath = params.sortItem
						.getKey();
					_that._sortGroup = "Group";
					if (!params.sortDescending)
						DescendingSort = false;
					else
						DescendingSort = true;
					_that.GroupKey = GroupPath + '';
					_that.ApplyGrouping(GroupPath,
						DescendingSort);
					_that.DescendingSort = DescendingSort;
				}
			});

			this._lineItemViewDialog.open();
		},

		_getSortersForGrouping: function(GroupKey, DescendingSort) {

            var vSorterProperty3 = "",
			    vSorterProperty1 = "",
				vSorterProperty2 = "";
				if (this._groupKey === "")
				{
				this._groupKey = "Supplier";
				}
				
			var vGroupKeyText = this._groupKey + "Name";
			var oSorter;
			var bGroupTextAllowed = true;
			var aSorter = [];
			
			vSorterProperty3 = this._sortKey;
			
			switch (this.getView().byId("v210IconTabBar")
				.getSelectedKey()) {
				case "PO":
					vSorterProperty1 = "PurchasingDocument";
					vSorterProperty2 = "PurchasingDocumentItem";
					break;

				case "PR":
					vSorterProperty1 = "PurchaseRequisition";
					vSorterProperty2 = "PurchaseRequisitionItem";
					break;

				case "GR":
					vSorterProperty1 = "PurchasingDocument";
					vSorterProperty2 = "PurchasingDocumentItem";
					break;

				case "SI":
					vSorterProperty1 = "PurchasingDocument";
					vSorterProperty2 = "PurchasingDocumentItem";
					break;
				case "ALL":
					bGroupTextAllowed = false;
					vSorterProperty3 = ""; 
					break;
			    default:
			        break;
			}
            
			if (this._sortGroup == "Sort") {
				bGroupTextAllowed = false;
				}
		    var fGroupKey = false;
			if (GroupKey !== 'None')
				var fGroupKey = function(oContext) {
							return oContext
								.getProperty(vGroupKeyText);
						};
			if (bGroupTextAllowed == true) {
				if (GroupKey !== 'None'){
					oSorter = new sap.ui.model.Sorter(GroupKey,
						this._descendingGroup, fGroupKey);
						aSorter.push(oSorter);
				}	
			} else {
				if (this._groupKey !== 'None'){
					oSorter = new sap.ui.model.Sorter(this._groupKey,
						this._descendingGroup,  fGroupKey);
						aSorter.push(oSorter);
				}	
			}

            if (vSorterProperty3 != "") {
				oSorter = new sap.ui.model.Sorter(vSorterProperty3,
					DescendingSort, fGroupKey);
				aSorter.push(oSorter);
			}
                
			if (vSorterProperty1 != "") {
				oSorter = new sap.ui.model.Sorter(vSorterProperty1,
					DescendingSort, fGroupKey);
				aSorter.push(oSorter);
			}

			if (vSorterProperty2 != "") {
				oSorter = new sap.ui.model.Sorter(vSorterProperty2,
					DescendingSort, fGroupKey);
				aSorter.push(oSorter);
			}

			return aSorter;

		},

		ApplyGrouping: function(Key, DescendingSort) {

			if (this._sortGroup == "Group") {
				if (Key != this._groupKey | DescendingSort != this._descendingGroup) {
					this.POGroupChanged = true;
					this.PRGroupChanged = true;
					this.GRGroupChanged = true;
					this.SIGroupChanged = true;
					this.OverviewGroupChanged = true;
				}

				this._groupKey = Key;
				this._descendingGroup = DescendingSort;
			} else {
				if (Key != this._sortKey | DescendingSort != this._descendingSort) {
					this.POSortChanged = true;
					this.PRSortChanged = true;
					this.GRSortChanged = true;
					this.SISortChanged = true;
				}

				this._sortKey = Key;
				this._descendingSort = DescendingSort;
			}

			this._applyGroup(this._getBinding(), this
				._getSortersForGrouping(Key, DescendingSort));
			this._applyFilter(this._getBinding(),
				this.smartFilterCondition);

		}
	};
})();