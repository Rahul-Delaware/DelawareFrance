/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.InnerAppNavigation");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.InnerAppNavigation = {
		tabSelected: function(oEvt) {
			// this.oRouter.navTo("purchasingDocument", {
			// tabKey : oEvt.getParameters("selectedKey").key
			// });
			var tab = oEvt ? oEvt.getParameters("selectedKey").key : this._tabKey;
			this._tabKey = tab;
			if (this.getView().byId("v210IconTabBar")
				.getSelectedKey() != tab) {
				this.getView().byId("v210IconTabBar")
					.setSelectedKey(tab);
			}

			this._checkBindingAndInitialize(tab);

			if (this._sortGroup == "Group") {
				this._applyGroup(this._getBinding(tab), this
					._getSortersForGrouping(this._groupKey,
						this._descendingGroup));
				this._sortKey = "";

			} else {
				this._applyGroup(this._getBinding(tab), this
					._getSortersForGrouping(this._sortKey,
						this._descendingSort));
				if (tab != "ALL") {
					this._groupKey = "";
				}
			}
			this._applyFilter(this._getBinding(tab),
				this.smartFilterCondition);

		},
		_getBinding: function(vTabId) {
			var vTableName = null;

			if (vTabId == null | vTabId == undefined) {
				vTabId = this.getView().byId("v210IconTabBar")
					.getSelectedKey();
			}

			switch (vTabId) {
				case "PO":
					vTableName = "POTable";
					// this.getView().byId("ft_PO").setVisible(true);
					// this.getView().byId("ft_PostGR").setVisible(true);
					this.getPage().getFooter().getContentRight()[0]
						.setVisible(true);
					this.getPage().getFooter().getContentRight()[0]
						.setEnabled(true);
					this.getPage().getFooter().getContentRight()[0]
						.setType(sap.m.ButtonType.Emphasized);
					this.getPage().getFooter().getContentRight()[1]
						.setVisible(true);
					this._validForPostGR();
					break;

				case "PR":
					vTableName = "PRTable";
					// this.getView().byId("ft_PO").setVisible(false);
					// this.getView().byId("ft_PostGR").setVisible(false);
					this.getPage().getFooter().getContentRight()[0]
						.setVisible(false);
					this.getPage().getFooter().getContentRight()[1]
						.setVisible(false);

					break;

				case "GR":
					vTableName = "GRTable";
					// this.getView().byId("ft_PO").setVisible(false);
					// this.getView().byId("ft_PostGR").setVisible(false);
					this.getPage().getFooter().getContentRight()[0]
						.setVisible(false);
					this.getPage().getFooter().getContentRight()[1]
						.setVisible(false);

					break;

				case "SI":
					vTableName = "SITable";
					// this.getView().byId("ft_PO").setVisible(false);
					// this.getView().byId("ft_PostGR").setVisible(false);
					this.getPage().getFooter().getContentRight()[0]
						.setVisible(false);
					this.getPage().getFooter().getContentRight()[1]
						.setVisible(false);

					break;

				case "ALL":
				case "":
					vTableName = "overviewTable";
					// this.getView().byId("ft_PO").setVisible(false);
					// this.getView().byId("ft_PostGR").setVisible(false);
					this.getPage().getFooter().getContentRight()[0]
						.setVisible(false);
					this.getPage().getFooter().getContentRight()[1]
						.setVisible(false);

					break;
				default:
				    break;

			}

			return (this.getView().byId(vTableName)
				.getBinding("items"));
		},
		handleNavigation: function(oEvent) {
			var cell = oEvent.getSource(); // oSource;
			var gIndex = this.GroupItems.indexOf(this._groupKey);
			var item = cell.getParent();
			var indexOfColumn = item.indexOfCell(cell);
			var title;
			var aFilter;
			if (gIndex !== -1) {
				title = item.getCells()[gIndex].getTitle();

				aFilter = [];
				aFilter[0] = new sap.ui.model.Filter(this._groupKey,
					"EQ", title);
			}
			if (this._groupKeyOld != this._groupKey) {
				if (this.smartFilterCondition == null | this.smartFilterCondition == undefined) {
					this.smartFilterCondition = [];
				}
				if (aFilter && aFilter.length > 0) {
					var aNewFilter = [];
					aNewFilter.push(new sap.ui.model.Filter(aFilter, true));
					if (this.smartFilterCondition.length > 0){
						aNewFilter.push(new sap.ui.model.Filter(this.smartFilterCondition, true));
					}
					this.smartFilterCondition = [new sap.ui.model.Filter(aNewFilter,
							true)];
				}

				this.POFilterChanged = true;
				this.PRFilterChanged = true;
				this.SIFilterChanged = true;
				this.GRFilterChanged = true;
				this.OverviewFilterChanged = true;
				this._groupKeyOld = this._groupKey;
				this._updateCount(this.smartFilterCondition);
				if (title) {
					this._setFilterValuesOnNavigation(title);
				}
			}
			this.oIconTabBar
				.fireEvent(
					"select", {
						key: this.cellIndexToTabKeyMap[indexOfColumn],
						selectedKey: this.cellIndexToTabKeyMap[indexOfColumn]
					});
		},

		// Set filter value
		_setFilterValuesOnNavigation: function(vFilterValue) {
			if (vFilterValue != null & vFilterValue != undefined) {
				var oContr = this.getView().byId("ME2STAR_SFB").determineControlByName(this._groupKey);
				var oToken = new sap.m.Token({
					key: vFilterValue,
					text: vFilterValue
				});
				var aToken = oContr.getTokens();
				oContr.removeAllTokens();
				oContr.setValue("");
				if (aToken.every(function(t){return t.getKey() !== oToken.getKey();})) {
					aToken.push(oToken);
				}
				oContr.setTokens(aToken);
			}
		},
		_getJSONDataForNavigation: function() {

			var aFilterItems = this.getView().byId("ME2STAR_SFB")
				.getFilterItems();
				
			var vSearch;
			if (aFilterItems[0] && aFilterItems[0].getParent && aFilterItems[0].getParent() && aFilterItems[0].getParent()._aBasicAreaSelection && aFilterItems[0].getParent()._aBasicAreaSelection[0] && aFilterItems[0].getParent()._aBasicAreaSelection[0].control && aFilterItems[0].getParent()._aBasicAreaSelection[0].control.getValue) {
				vSearch = aFilterItems[0].getParent()._aBasicAreaSelection[0].control.getValue();
			}
			else if (aFilterItems[0] && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]) && this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]).getValue) {
				vSearch = this.getView().byId("ME2STAR_SFB").determineControlByFilterItem(aFilterItems[0]).getValue();
			}
			else {
				vSearch = "";
			}

			var oJSONData = this._wrapData((this._wrapData(
				"NavigationData", '"') + ":" + this._wrapData((this._wrapData(
					"TabKey", '"') + ":" + this._wrapData(this._tabKey, '"') + ',' + this._wrapData("FilterChanged", '"') + ":" + this._wrapData(this
					._filterChanged, '"') + ',' + this._wrapData("FilterData", '"') + ":" + this._wrapData("", '"') + ',' + this._wrapData("Search",
					'"') + ":" + this
				._wrapData(vSearch, '"')), "{")), "{");

			return oJSONData;
		},

		_wrapData: function(vData, vStartTag) {

			var vEndTag = "";
			switch (vStartTag) {

				case "{":
					vEndTag = "}";
					break;

				case "[":
					vEndTag = "]";
					break;

				case "(":
					vEndTag = ")";
					break;

				default:
					vEndTag = vStartTag;
					break;

			}

			return vStartTag + vData + vEndTag;
		}
	};
})();