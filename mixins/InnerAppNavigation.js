/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.InnerAppNavigation");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.InnerAppNavigation = {
		tabSelected: function(e) {
			var t = e ? e.getParameters("selectedKey").key : this._tabKey;
			this._tabKey = t;
			if (this.getView().byId("v210IconTabBar").getSelectedKey() != t) {
				this.getView().byId("v210IconTabBar").setSelectedKey(t);
			}
			this._checkBindingAndInitialize(t);
			if (this._sortGroup == "Group") {
				this._applyGroup(this._getBinding(t), this._getSortersForGrouping(this._groupKey, this._descendingGroup));
				this._sortKey = "";
			} else {
				this._applyGroup(this._getBinding(t), this._getSortersForGrouping(this._sortKey, this._descendingSort));
				if (t != "ALL") {
					this._groupKey = "";
				}
			}
			this._applyFilter(this._getBinding(t), this.smartFilterCondition);
		},
		_getBinding: function(t) {
			var T = null;
			if (t == null | t == undefined) {
				t = this.getView().byId("v210IconTabBar").getSelectedKey();
			}
			switch (t) {
				case "PO":
					T = "POTable";
					
			        this.getPage().getFooter().getContentRight()[0].setIcon("sap-icon://email");//
			        this.getPage().getFooter().getContentRight()[1].setIcon("sap-icon://print");//
			        
					this.getPage().getFooter().getContentRight()[0].setVisible(true);
					// this.getPage().getFooter().getContentRight()[0].setEnabled(true);
					this.getPage().getFooter().getContentRight()[0].setType(sap.m.ButtonType.Emphasized);
					this.getPage().getFooter().getContentRight()[1].setType(sap.m.ButtonType.Emphasized);
					this.getPage().getFooter().getContentRight()[2].setType(sap.m.ButtonType.Emphasized);
					this.getPage().getFooter().getContentRight()[1].setVisible(true);
					this.getPage().getFooter().getContentRight()[2].setVisible(true);
					this._validForPostGR();
					break;
				case "PR":
					T = "PRTable";
					this.getPage().getFooter().getContentRight()[0].setVisible(false);
					this.getPage().getFooter().getContentRight()[1].setVisible(false);
					this.getPage().getFooter().getContentRight()[2].setVisible(false);
					break;
				case "GR":
					T = "GRTable";
					this.getPage().getFooter().getContentRight()[0].setVisible(false);
					this.getPage().getFooter().getContentRight()[1].setVisible(false);
					this.getPage().getFooter().getContentRight()[2].setVisible(false);
					break;
				case "SI":
					T = "SITable";
					this.getPage().getFooter().getContentRight()[0].setVisible(false);
					this.getPage().getFooter().getContentRight()[1].setVisible(false);
					this.getPage().getFooter().getContentRight()[2].setVisible(false);
					break;
				case "ALL":
				case "":
					T = "overviewTable";
					this.getPage().getFooter().getContentRight()[0].setVisible(false);
					this.getPage().getFooter().getContentRight()[1].setVisible(false);
					this.getPage().getFooter().getContentRight()[2].setVisible(false);
					break;
				default:
					break;
			}
			return (this.getView().byId(T).getBinding("items"));
		},
		handleNavigation: function(e) {
			var c = e.getSource();
			var g = this.GroupItems.indexOf(this._groupKey);
			var i = c.getParent();
			var a = i.indexOfCell(c);
			var t;
			var f;
			if (g !== -1) {
				t = i.getCells()[g].getTitle();
				f = [];
				f[0] = new sap.ui.model.Filter(this._groupKey, "EQ", t);
			}
			if (this._groupKeyOld != this._groupKey) {
				if (this.smartFilterCondition == null | this.smartFilterCondition == undefined) {
					this.smartFilterCondition = [];
				}
				if (f && f.length > 0) {
					var n = [];
					n.push(new sap.ui.model.Filter(f, true));
					if (this.smartFilterCondition.length > 0) {
						n.push(new sap.ui.model.Filter(this.smartFilterCondition, true));
					}
					this.smartFilterCondition = [new sap.ui.model.Filter(n, true)];
				}
				this.POFilterChanged = true;
				this.PRFilterChanged = true;
				this.SIFilterChanged = true;
				this.GRFilterChanged = true;
				this.OverviewFilterChanged = true;
				this._groupKeyOld = this._groupKey;
				this._updateCount(this.smartFilterCondition);
				if (t) {
					this._setFilterValuesOnNavigation(t);
				}
			}
			this.oIconTabBar.fireEvent("select", {
				key: this.cellIndexToTabKeyMap[a],
				selectedKey: this.cellIndexToTabKeyMap[a]
			});
		},
		_setFilterValuesOnNavigation: function(f) {
			if (f != null & f != undefined) {
				var c = this.getView().byId("ME2STAR_SFB").determineControlByName(this._groupKey);
				var T = new sap.m.Token({
					key: f,
					text: f
				});
				var a = c.getTokens();
				c.removeAllTokens();
				c.setValue("");
				if (a.every(function(t) {
						return t.getKey() !== T.getKey();
					})) {
					a.push(T);
				}
				c.setTokens(a);
			}
		},
		_getJSONDataForNavigation: function() {
			var f = this.getView().byId("ME2STAR_SFB").getAllFilterItems();
			var s;
			if (f[0] && f[0].getParent && f[0].getParent() && f[0].getParent()._aBasicAreaSelection && f[0].getParent()._aBasicAreaSelection[0] &&
				f[0].getParent()._aBasicAreaSelection[0].control && f[0].getParent()._aBasicAreaSelection[0].control.getValue) {
				s = f[0].getParent()._aBasicAreaSelection[0].control.getValue();
			} else if (f[0] && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(
					f[0]) && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(f[0]).getValue) {
				s = this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(f[0]).getValue();
			} else {
				s = "";
			}
			var j = this._wrapData((this._wrapData("NavigationData", '"') + ":" + this._wrapData((this._wrapData("TabKey", '"') + ":" + this._wrapData(
					this._tabKey, '"') + ',' + this._wrapData("FilterChanged", '"') + ":" + this._wrapData(this._filterChanged, '"') + ',' + this._wrapData(
					"FilterData", '"') + ":" + this._wrapData("", '"') + ',' + this._wrapData("Search", '"') + ":" + this._wrapData(s, '"')), "{")),
				"{");
			return j;
		},
		_wrapData: function(d, s) {
			var e = "";
			switch (s) {
				case "{":
					e = "}";
					break;
				case "[":
					e = "]";
					break;
				case "(":
					e = ")";
					break;
				default:
					e = s;
					break;
			}
			return s + d + e;
		}
	};
})();