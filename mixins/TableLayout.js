/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TableLayout");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.TableLayout = {
		_applyGroup: function(b, s) {
			var c = false;
			var t = this.getView().byId("v210IconTabBar").getSelectedKey();
			switch (t) {
				case "PO":
					c = this.POGroupChanged | this.POSortChanged;
					break;
				case "PR":
					c = this.PRGroupChanged | this.PRSortChanged;
					break;
				case "GR":
					c = this.GRGroupChanged | this.GRSortChanged;
					break;
				case "SI":
					c = this.SIGroupChanged | this.SISortChanged;
					break;
				case "ALL":
					c = this.OverviewGroupChanged;
					break;
				default:
					break;
			}
			if (c == true) {
				b.sCustomParams = b.oModel.createCustomParams({
					custom: {
						search: this._customSearchKey
					},
					select: this._getCustomSelectParameters(this._groupKey)
				});
				if (s == null | s == undefined) {
					s = [];
				}
				b.sort(s);
				b.refresh();
				for (var i = 0; i < this.GroupItems.length; i++) {
					if (this.GroupItems[i] === this._groupKey) {
						this.getView().byId(this.GroupItems[i]).setVisible(true);
						this.getView().byId(this.GroupItems[i] + "_col").setVisible(true);
					} else {
						this.getView().byId(this.GroupItems[i]).setVisible(false);
						this.getView().byId(this.GroupItems[i] + "_col").setVisible(false);
					}
				}
				switch (t) {
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
		_updateCount: function(f) {
			this.getView().byId("overviewTab").setCount(0);
			this.getView().byId("POTab").setCount(0);
			this.getView().byId("PRTab").setCount(0);
			this.getView().byId("GRTab").setCount(0);
			this.getView().byId("SITab").setCount(0);
			this.overallCount = 0;
			if (f === null | f === undefined) {
				f = [];
			}
			if (f.length > 0) {
				var F = new sap.ui.model.Filter(f, true);
				f = [];
				f.push(F);
			}
			var s = encodeURIComponent(this._customSearchKey);
			var u = "search=" + s;
			var o = (f.length > 0) ? f : [];
			// if(this.bInitialLoadingCompleted === undefined && o.length === 0){
			//   var K = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
			// 	o.push(K);
			// }
			var m = this.getView().getModel();
			if (s && s.length > 0) {
				u += "&" + "$select=Cnt,PurchasingDocumentCategory";
				m.read("/M2SOview", {
					urlParameters: u,
					async: true,
					filters: f,
					success: this._IconCountHandler.bind(this),
					error: this._failureHandler.bind(this)
				});
			} else {
				m.read("/PDocItem/$count", {
					urlParameters: u,
					batchGroupId: 1,
					async: false,
					filters: o,
					success: this._IconCountHandler.bind(this, "POTab"),
					error: this._failureHandler.bind(this)
				});
				m.read("/PGrItem/$count", {
					urlParameters: u,
					batchGroupId: 1,
					async: false,
					filters: o,
					success: this._IconCountHandler.bind(this, "GRTab"),
					error: this._failureHandler.bind(this)
				});
				m.read("/PReqItem/$count", {
					urlParameters: u,
					batchGroupId: 1,
					async: false,
					filters: o,
					success: this._IconCountHandler.bind(this, "PRTab"),
					error: this._failureHandler.bind(this)
				});
				m.read("/SupInvItem/$count", {
					urlParameters: u,
					batchGroupId: 1,
					async: false,
					filters: o,
					success: this._IconCountHandler.bind(this, "SITab"),
					error: this._failureHandler.bind(this)
				});
			}
		},
		_getCustomSelectParameters: function(G) {
			var s = "";
			var c = "Cnt,CntF,CntB,CntG,CntS";
			var g;
			switch (G) {
				case "MaterialGroup":
					g = G + ",MaterialGroupName," + c;
					break;
				case "Supplier":
					g = G + ",SupplierName," + c;
					break;
				case "PurchasingGroup":
					g = G + ",PurchasingGroupName," + c;
					break;
				case "None":
					g = "PurchasingDocumentCategory," + c;
					break;
				default:
					break;
			}
			switch (this.getView().byId("v210IconTabBar").getSelectedKey()) {
				case "PO":
					s = this.POSelectParams;
					break;
				case "PR":
					s = this.PRSelectParams;
					break;
				case "GR":
					s = this.GRSelectParams;
					break;
				case "SI":
					s = this.SISelectParams;
					break;
				case "ALL":
					s = g;
					// s = this.overviewSelectParams;
					break;
				default:
					break;
			}
			return s;
		},
		callSortDialog: function(e) {
			var _ = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("MATERIAL_GROUP"),
					key: "MaterialGroup",
					selected: ("MaterialGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SUPPLIERS"),
					key: "Supplier",
					selected: ("Supplier" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PURCHASING_GROUP"),
					key: "PurchasingGroup",
					selected: ("PurchasingGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("DOCUMENT"),
					key: "PurchasingDocument",
					selected: ("PurchasingDocument" == this._sortKey)
				}),new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PRDATE"),
					key: "RequisitionDate",
					selected: ("RequisitionDate" == this._sortKey)
				}),
				
				new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("STATUS"),
					key: "Status",
					selected: ("Status" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: "Relevance",
					key: "WeightedRelevance",
					selected: (this._sortKey === "WeightedRelevance")
				})],
				confirm: function(a) {
					var p = a.getParameters();
					var D = "";
					var S = p.sortItem.getKey();
					_._sortGroup = "Sort";
					if (!p.sortDescending) D = false;
					else D = true;
					_.SortKey = S + '';
					_.ApplyGrouping(S, D);
					_.DescendingSort = D;
				}
			});
			this._lineItemViewDialog.open();
		},
		callSortDialog_GR: function(e) {
			var _ = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("MATERIAL_GROUP"),
					key: "MaterialGroup",
					selected: ("MaterialGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SUPPLIERS"),
					key: "Supplier",
					selected: ("Supplier" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PURCHASING_GROUP"),
					key: "PurchasingGroup",
					selected: ("PurchasingGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("DOCUMENT"),
					key: "PurchasingDocument",
					selected: ("PurchasingDocument" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("STATUS"),
					key: "Status",
					selected: ("Status" == this._sortKey)
				})],
				confirm: function(a) {
					var p = a.getParameters();
					var D = "";
					var S = p.sortItem.getKey();
					_._sortGroup = "Sort";
					if (!p.sortDescending) D = false;
					else D = true;
					_.SortKey = S + '';
					_.ApplyGrouping(S, D);
					_.DescendingSort = D;
				}
			});
			this._lineItemViewDialog.open();
		},
		callSortDialog_wbs: function(e) {
			var _ = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("MATERIAL_GROUP"),
					key: "MaterialGroup",
					selected: ("MaterialGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SUPPLIERS"),
					key: "Supplier",
					selected: ("Supplier" == this._sortKey)
				}), 
				new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PODATE"),
					key: "CreationDate",
					selected: ("CreationDate" == this._sortKey)
				}),
				new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PURCHASING_GROUP"),
					key: "PurchasingGroup",
					selected: ("PurchasingGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("DOCUMENT"),
					key: "PurchasingDocument",
					selected: ("PurchasingDocument" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("STATUS"),
					key: "Status",
					selected: ("Status" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("WBS_ELEMENT"),
					key: "WorkPackageFullName",
					selected: ("WorkPackageFullName" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("COST_CENTER"),
					key: "CostCenter",
					selected: ("CostCenter" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SALES_ORDER"),
					key: "SalesOrder",
					selected: ("SalesOrder" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: "Relevance",
					key: "WeightedRelevance",
					selected: (this._sortKey === "WeightedRelevance")
				})],
				confirm: function(a) {
					var p = a.getParameters();
					var D = "";
					var S = p.sortItem.getKey();
					_._sortGroup = "Sort";
					if (!p.sortDescending) D = false;
					else D = true;
					_.SortKey = S + '';
					_.ApplyGrouping(S, D);
					_.DescendingSort = D;
				}
			});
			this._lineItemViewDialog.open();
		},
		callSortDialog_SI: function(e) {
			var _ = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle.getText("SORT_TOOLTIP"),
				sortDescending: this._descendingSort,
				sortItems: [new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("MATERIAL_GROUP"),
					key: "MaterialGroup",
					selected: ("MaterialGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SUPPLIERS"),
					key: "Supplier",
					selected: ("Supplier" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PURCHASING_GROUP"),
					key: "PurchasingGroup",
					selected: ("PurchasingGroup" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("DOCUMENT"),
					key: "PurchasingDocument",
					selected: ("PurchasingDocument" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("STATUS"),
					key: "Status",
					selected: ("Status" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("WBS_ELEMENT"),
					key: "WorkPackageFullName",
					selected: ("WorkPackageFullName" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("COST_CENTER"),
					key: "CostCenter",
					selected: ("CostCenter" == this._sortKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SALES_ORDER"),
					key: "SalesOrder",
					selected: ("SalesOrder" == this._sortKey)
				})],
				confirm: function(a) {
					var p = a.getParameters();
					var D = "";
					var S = p.sortItem.getKey();
					_._sortGroup = "Sort";
					if (!p.sortDescending) D = false;
					else D = true;
					_.SortKey = S + '';
					_.ApplyGrouping(S, D);
					_.DescendingSort = D;
				}
			});
			this._lineItemViewDialog.open();
		},
		callGroupDialog: function(e) {
			var _ = this;
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				title: this.oResourceBundle.getText("GROUP_TOOLTIP"),
				sortDescending: this._descendingGroup,
				sortItems: [new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("MATERIAL_GROUP"),
					key: "MaterialGroup",
					selected: ("MaterialGroup" == this._groupKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("SUPPLIERS"),
					key: "Supplier",
					selected: ("Supplier" == this._groupKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("PURCHASING_GROUP"),
					key: "PurchasingGroup",
					selected: ("PurchasingGroup" == this._groupKey)
				}), new sap.m.ViewSettingsItem({
					text: this.oResourceBundle.getText("NONE"),
					key: "None",
					selected: ("None" == this._groupKey)
				})],
				confirm: function(a) {
					var p = a.getParameters();
					var D = "";
					var G = p.sortItem.getKey();
					_._sortGroup = "Group";
					if (!p.sortDescending) D = false;
					else D = true;
					_.GroupKey = G + '';
					_.ApplyGrouping(G, D);
					_.DescendingSort = D;
				}
			});
			this._lineItemViewDialog.open();
		},
		_getSortersForGrouping: function(G, D) {
			var s = "",
				S = "",
				v = "";
			if (this._groupKey === "") {
				this._groupKey = "Supplier";
			}
			var g = this._groupKey + "Name";
			var o;
			var b = true;
			var a = [];
			s = this._sortKey;
			switch (this.getView().byId("v210IconTabBar").getSelectedKey()) {
				case "PO":
					S = "PurchasingDocument";
					v = "PurchasingDocumentItem";
					break;
				case "PR":
					S = "PurchaseRequisition";
					v = "PurchaseRequisitionItem";
					break;
				case "GR":
					S = "PurchasingDocument";
					v = "PurchasingDocumentItem";
					break;
				case "SI":
					S = "PurchasingDocument";
					v = "PurchasingDocumentItem";
					break;
				case "ALL":
					b = false;
					s = "";
					break;
				default:
					break;
			}
			if (this._sortGroup == "Sort") {
				b = false;
			}
			var f = false;
			if (G !== 'None') var f = function(c) {
				return c.getProperty(g);
			};
			if (b == true) {
				if (G !== 'None') {
					o = new sap.ui.model.Sorter(G, this._descendingGroup, f);
					a.push(o);
				}
			} else {
				if (this._groupKey !== 'None') {
					o = new sap.ui.model.Sorter(this._groupKey, this._descendingGroup, f);
					a.push(o);
				}
			}
			if (s != "") {
				o = new sap.ui.model.Sorter(s, D, f);
				a.push(o);
			}
			if (S != "") {
				o = new sap.ui.model.Sorter(S, D, f);
				a.push(o);
			}
			if (v != "") {
				o = new sap.ui.model.Sorter(v, D, f);
				a.push(o);
			}
			return a;
		},
		ApplyGrouping: function(K, D) {
			if (this._sortGroup == "Group") {
				if (K != this._groupKey | D != this._descendingGroup) {
					this.POGroupChanged = true;
					this.PRGroupChanged = true;
					this.GRGroupChanged = true;
					this.SIGroupChanged = true;
					this.OverviewGroupChanged = true;
				}
				this._groupKey = K;
				this._descendingGroup = D;
			} else {
				if (K != this._sortKey | D != this._descendingSort) {
					this.POSortChanged = true;
					this.PRSortChanged = true;
					this.GRSortChanged = true;
					this.SISortChanged = true;
				}
				this._sortKey = K;
				this._descendingSort = D;
			}
			this._applyGroup(this._getBinding(), this._getSortersForGrouping(K, D));
			this._applyFilter(this._getBinding(), this.smartFilterCondition);
		}
	};
})();