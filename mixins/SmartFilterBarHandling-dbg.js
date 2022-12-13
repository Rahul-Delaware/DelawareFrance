/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.SmartFilterBarHandling = {
		/**
		 * Get filter params from field and add them to array
		 *
		 * @param {String}
		 *            sId Id of field with filter params
		 * @param {String}
		 *            sKeyField key for naming filter elements
		 * @return {Array} aFilterOfOne Array which all filter items for one
		 *         filter param
		 */
		_getFilterParamsForVariant: function(sId, sKeyField) {
			var aFilterOfOne = [];
			var oElement = this.getView().byId(sId);

			if (oElement && oElement instanceof sap.m.MultiInput) {
				var aFilterTokens = oElement.getTokens();
				for (var i = 0; i < aFilterTokens.length; i++) {
					var aCustomData = aFilterTokens[i].getCustomData();
					for (var j = 0; j < aCustomData.length; j++) {
						if (aCustomData[j].getKey() === "row") {
							aFilterOfOne.push({
								type: "row",
								keyField: sKeyField,
								operation: sap.ui.model.FilterOperator.EQ,
								value1: aFilterTokens[i].getKey(),
								tokenKey: aFilterTokens[i].getKey(),
								tokenText: aFilterTokens[i].getText()
							});
						} else if (aCustomData[j].getKey() === "range") {
							var oRangeValue = aCustomData[j].getValue();
							oRangeValue.type = "range";
							oRangeValue.tokenKey = aFilterTokens[i].getKey();
							oRangeValue.tokenText = aFilterTokens[i].getText();
							aFilterOfOne.push(oRangeValue);
						}
					}
				}
				if (oElement.getValue() !== "") {
					aFilterOfOne.push({
						type: "value",
						keyField: sKeyField,
						value1: oElement.getValue()
					});
				}
			} else if (oElement && oElement instanceof sap.m.DateRangeSelection) {
				aFilterOfOne.push({
					type: "date",
					keyField: sKeyField,
					value1: oElement.getDateValue(),
					value2: oElement.getSecondDateValue()
				});
			} else if (oElement && oElement instanceof sap.m.Input) {
				aFilterOfOne.push({
					type: "value",
					keyField: sKeyField,
					value1: oElement.getValue()
				});
			}
			return aFilterOfOne;
		},
		/**
		 * Set filter params for field based on variant data
		 *
		 * @param {String}
		 *            sId Id of field with filter params
		 * @param {Array}
		 *            aFilterOfOne Array which all filter items for one filter
		 *            param
		 */
		_setFilterParamsForVariant: function(sId, aFilterOfOne) {
			var oElement = this.getView().byId(sId);
			if (!aFilterOfOne) {
				return null;
			} else if (oElement && oElement instanceof sap.m.MultiInput) {
				oElement.setTokens([]);
				for (var i = 0; i < aFilterOfOne.length; i++) {
					if (aFilterOfOne[i].tokenKey) {
						var oToken = new sap.m.Token({
							key: aFilterOfOne[i].tokenKey,
							text: aFilterOfOne[i].tokenText
						});
						var sType = aFilterOfOne[i].type;
						delete aFilterOfOne[i].type;
						delete aFilterOfOne[i].tokenKey;
						delete aFilterOfOne[i].tokenText;
						if (sType === "row") {
							oToken.addCustomData(new sap.ui.core.CustomData({
								key: "row",
								value: aFilterOfOne[i]
							}));
						} else if (sType === "range") {
							oToken.addCustomData(new sap.ui.core.CustomData({
								key: "range",
								value: aFilterOfOne[i]
							}));
						}
					}
					else if (aFilterOfOne[i].value1) {
						oElement.setValue(aFilterOfOne[i].value1);
					}
					oElement.addToken(oToken);
				}
			} else if (oElement && oElement instanceof sap.m.DateRangeSelection) {
				if (aFilterOfOne[0].value1) {
					oElement.setDateValue(new Date(aFilterOfOne[0].value1));
				}
				if (aFilterOfOne[0].value2) {
					oElement
						.setSecondDateValue(new Date(aFilterOfOne[0].value2));
				}
			} else if (oElement && oElement instanceof sap.m.Input) {
				oElement.setValue(aFilterOfOne[0].value1);
			}
		},
		/**
		 * Called by value helps for filter bar to prepare parameters for value
		 * help
		 *
		 * @param {string}
		 *            sRequestedFilterName String of the filter which requested
		 *            the function
		 * @param {Array}
		 *            aSelect Array of items which should be selected by OData
		 *            call
		 * @param {Array}
		 *            aOrder Array of order items for select statement
		 * @param {number}
		 *            skip Numbers of items which has to be skipped, empty is
		 *            possible
		 * @param {number}
		 *            top Numbers of items which has to be selected, empty is
		 *            possible
		 * @param {string}
		 *            sFilterBarId String of the filterBar which requested the
		 *            function
		 * @returns {Object} Returns parameters for OData call for value help or
		 *          null if no update is necessary
		 */
		_getODataParameterForFilterBarSearch: function(sRequestedFilterName,
			aSelect, aOrder, skip, top, sFilterBarId) {
			var aFilterItems;
			var sSearch;
			var oFilterItem;
			var sFilterName;
			var aFilterTokens;
			var oFilterToken;
			var oFilterTokenData;
			var sFilterOperator;
			var aFilterOfOne;
			var sSelect;
			var sOrderBy;
			var iSkip;
			var iTop;
			var i, j;
			var mParameters = null;
			var aFilter = [];

			this._vFilterString = "";
			if (sRequestedFilterName) {
				// urlParameters / $select :
				if (!aSelect) {
					aSelect = [];
					sSelect = "";
				} else {
					sSelect = "";
					for (i = 0; i < aSelect.length; i++) {
						sSelect += aSelect[i];
						if (i < (aSelect.length - 1)) {
							sSelect += ",";
						}
					}
				}
				// urlParameters / $orderby :
				if (!aOrder) {
					aOrder = [];
					sOrderBy = "";
				} else {
					sOrderBy = "";
					for (i = 0; i < aOrder.length; i++) {
						sOrderBy += aOrder[i];
						if (i < (aOrder.length - 1)) {
							sOrderBy += ",";
						}
					}
				}
				// urlParameters / $skip :
				if (!skip || isNaN(skip)) {
					iSkip = 0;
				} else {
					iSkip = skip;
				}
				// URL Param $top :
				if (!top || isNaN(top)) {
					iTop = 0;
				} else {
					iTop = top;
				}
				// Get the filter bar and the items
				aFilterItems = this.getView().byId(sFilterBarId)
					.getAllFilterItems();
				// urlParameters / search :
				// aFilterItems[0] is SearchField
				if (aFilterItems.length > 0) {
					if (aFilterItems[0] && aFilterItems[0].getParent && aFilterItems[0].getParent() && aFilterItems[0].getParent()._aBasicAreaSelection && aFilterItems[0].getParent()._aBasicAreaSelection[0] && aFilterItems[0].getParent()._aBasicAreaSelection[0].control && aFilterItems[0].getParent()._aBasicAreaSelection[0].control.getValue) {
						sSearch = aFilterItems[0].getParent()._aBasicAreaSelection[0].control.getValue();
					}
					else if (aFilterItems[0] && this.getView().byId(sFilterBarId).determineControlByFilterItem && this.getView().byId(sFilterBarId).determineControlByFilterItem(aFilterItems[0]) && this.getView().byId(sFilterBarId).determineControlByFilterItem(aFilterItems[0]).getValue) {
						sSearch = this.getView().byId(sFilterBarId).determineControlByFilterItem(aFilterItems[0]).getValue();
					}
					else {
						sSearch = "";
					}
				}
				else {
					sSearch = "";
				}
				// Load all other input tokens, fields must be MultiInputFields
				// Name of an input field has to be the name of the key field
				// from OData service!
				var oItems = this.getView().byId(sFilterBarId).getAllFilterItems();

				for (var i = 0; i < oItems.length; i++) {
					var oControl = this.getView().byId(sFilterBarId).determineControlByFilterItem(oItems[i]);
					if (oControl) {
						oFilterItem = oItems[i];
						sFilterName = oFilterItem.getName();
						if (sFilterName === sRequestedFilterName) {
							continue;
						} // ignore filter for requested field
						aFilterOfOne = [];
						if (oControl instanceof sap.m.MultiInput) {
							aFilterTokens = oControl.getTokens();
							for (j = 0; j < aFilterTokens.length; j++) {
								oFilterToken = aFilterTokens[j];
								oFilterTokenData = oFilterToken.data("range");
								if (oFilterTokenData) {
									sFilterOperator = oFilterTokenData.operation;
									if (oFilterTokenData.exclude) {
										if (sFilterOperator === sap.ui.model.FilterOperator.EQ) {
											sFilterOperator = sap.ui.model.FilterOperator.NE;
										}
									}
									aFilterOfOne.push(new sap.ui.model.Filter(
										oFilterTokenData.keyField, sFilterOperator,
										oFilterTokenData.value1,
										oFilterTokenData.value2));
								} else {
									aFilterOfOne.push(new sap.ui.model.Filter(
										sFilterName,
										sap.ui.model.FilterOperator.EQ,
										oFilterToken.getKey()));
									if (this._vFilterString == "") {
										this._vFilterString = "( ";
									}
									this._vFilterString = this._vFilterString + sFilterName + " eq " + "'" + oFilterToken.getKey() + "'" + " " + "or ";
	
								}
							}
							if (oControl.getValue() !== "") {
								aFilterOfOne.push(new sap.ui.model.Filter(sFilterName,
									sap.ui.model.FilterOperator.EQ, oControl
									.getValue()));
							}
						} else if (oControl instanceof sap.m.DateRangeSelection) {
							var dateFirst = oControl.getDateValue();
							var dateSecond = oControl.getSecondDateValue();
							
							if ((dateFirst && dateSecond) && dateFirst.getTime() !== dateSecond.getTime()) {
								//var dateFirstForFilter = dateFirst.getFullYear() + "-" + ('0'+(dateFirst.getMonth()+1)).slice(-2) + "-" + ('0' + dateFirst.getDate()).slice(-2);
								//var dateSecondForFilter = dateSecond.getFullYear() + "-" + ('0'+(dateSecond.getMonth()+1)).slice(-2) + "-" + ('0' + dateSecond.getDate()).slice(-2);

	                            // convert delivery date into UTC                                                              //^2742125
                                dateFirst = new Date(dateFirst.getTime() - dateFirst.getTimezoneOffset() * 60 * 1000);
                                dateSecond = new Date(dateSecond.getTime() - dateSecond.getTimezoneOffset() * 60 * 1000);      //v2742125
								aFilterOfOne.push(new sap.ui.model.Filter(
									sFilterName,
									sap.ui.model.FilterOperator.BT, dateFirst, dateSecond));
							} else if ((dateFirst && dateSecond) && dateFirst.getTime() === dateSecond.getTime()) {
								//var dateFirstForFilter = dateFirst.getFullYear() + "-" + ('0'+(dateFirst.getMonth()+1)).slice(-2) + "-" + ('0' + dateFirst.getDate()).slice(-2);

	                            // convert delivery date into UTC
                                dateFirst = new Date(dateFirst.getTime() - dateFirst.getTimezoneOffset() * 60 * 1000);	        //v2742125
								aFilterOfOne.push(new sap.ui.model.Filter(
									sFilterName,
									sap.ui.model.FilterOperator.EQ, dateFirst));
							}
							else if (dateFirst) {
								aFilterOfOne.push(new sap.ui.model.Filter(
									sFilterName,
									sap.ui.model.FilterOperator.EQ, oControl
									.getDateValue()));
							}
						} else if (oControl instanceof sap.m.Input) {
							aFilterOfOne.push(new sap.ui.model.Filter(sFilterName,
								sap.ui.model.FilterOperator.EQ, oControl
								.getValue()));
						}
						if (aFilterOfOne.length > 0) {
							aFilter.push(new sap.ui.model.Filter(aFilterOfOne,
								false));
							this._vFilterString = this._vFilterString.slice(0, (parseInt(this._vFilterString.length) - 3));
							this._vFilterString = this._vFilterString + " )" + " and " + "( ";
						}
					}
				}

				if (this._vFilterString != "") {
					this._vFilterString = this._vFilterString.slice(0, (parseInt(this._vFilterString.length) - 7));
				}

				// Prepare parameters for OData call
				mParameters = {};
				mParameters.context = null;
				mParameters.urlParameters = ["search=" + sSearch,
						"$select=" + sSelect, "$orderby=" + sOrderBy,
						"$skip=" + iSkip, "$top=" + iTop];
				mParameters.async = false;

				if (aFilter.length > 0) {
					mParameters.filters = [new sap.ui.model.Filter(aFilter,
						true)];
				}
			}
			return mParameters;
		},

		_attachListenersForFilters: function() {
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Supplier").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"MaterialGroup").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Plant").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingGroup").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Status").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"CostCenter").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"WBSElementExternalID").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"SalesOrder").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"ServicePerformer").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"WorkItem").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingOrganization").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Material").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"DeliveryDate").attachChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"SupplyingPlant").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingDocumentItemText").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingDocumentType").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchaseOrderItemCategory").attachLiveChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"AccountAssignmentCategory").attachLiveChange(
				this._setFilterChanged, this); 
				
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Supplier").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"MaterialGroup").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Plant").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingGroup").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Status").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"CostCenter").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"WBSElementExternalID").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"SalesOrder").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"ServicePerformer").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"WorkItem").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingOrganization").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Material").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"DeliveryDate").attachChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"SupplyingPlant").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingDocumentItemText").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchasingDocumentType").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"PurchaseOrderItemCategory").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"AccountAssignmentCategory").attachTokenChange(
				this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey(
				"Search").attachLiveChange(
				this._setFilterChanged, this);
		},


		_setFilterChanged: function(oEvent) {
			this._filterChanged = true;
		},

		// reset smart filter
		onReset: function(oEvent) {
			this.POFilterChanged = true;
			this.PRFilterChanged = true;
			this.SIFilterChanged = true;
			this.GRFilterChanged = true;
			this.OverviewFilterChanged = true;
			this.POGroupChanged = true;
			this.PRGroupChanged = true;
			this.SIGroupChanged = true;
			this.GRGroupChanged = true;
			this.OverviewGroupChanged = true;
			this._customSearchKey = "";
			this._groupKey = "Supplier";
			this._descendingSort = false;
			var aSelectionSet = oEvent.getParameters()[0].selectionSet;
			for (var i = 0; i < aSelectionSet.length; i++) {
				var oSelectionSet = aSelectionSet[i];

				if (oSelectionSet instanceof sap.m.SearchField) {
					oSelectionSet.setValue("");
				} else if (oSelectionSet instanceof sap.m.MultiInput) {
					oSelectionSet.setTokens([]);
					oSelectionSet.setValue("");
				} else if (oSelectionSet instanceof sap.m.Input) {
					oSelectionSet.setValue("");
				} else if (oSelectionSet instanceof sap.m.DateRangeSelection) {
					oSelectionSet.setDateValue();
					oSelectionSet.setSecondDateValue();
				}
			}
			this._applyGroup(this._getBinding(), this
				._getSortersForGrouping(this._groupKey,
					this._descendingGroup));
			this._applyFilter(this._getBinding());
			this._updateCount();
			this.smartFilterCondition = null;

		},
		
        handleChange: function (oEvent) {
        	this.POFilterChanged = true;
        	this.PRFilterChanged = true;
			this.SIFilterChanged = true;
			this.GRFilterChanged = true;
    	},		
	
		onSearchButtonPressed: function(oEvent) {
			var oBinding = this._getBinding();
			//Introduced to avoid auto load of table in initial loading phase as there was a customer incident regarding high performance impact
			if (this.bInitialLoadingCompleted && oBinding === undefined) {
				this._checkBindingAndInitialize();
				oBinding = this._getBinding();
			}
			if (this._filterChanged == true) {
				this.POFilterChanged = true;
				this.PRFilterChanged = true;
				this.SIFilterChanged = true;
				this.GRFilterChanged = true;
				this._groupKeyOld = "";
				this.OverviewFilterChanged = true;
			}
			if (oBinding) {
				// var overviewBinding =
				// this.oPOItemsTable.getBinding("items");
				// this.iCurNumItems = 0;
				var mParameters = this
					._getODataParameterForFilterBarSearch(
						"filterBar", [], [], 0, 0,
						"ME2STAR_SFB");
	
				var sSearchKey = mParameters.urlParameters[0].replace(
					"search=", "");
				this._customSearchKey = sSearchKey;
				oBinding.sCustomParams = oBinding.oModel
					.createCustomParams({
						custom: {
							search: sSearchKey
						},
							select: this
								._getCustomSelectParameters(this._groupKey)
					});
	
				var aFilter = mParameters.filters;
				if (aFilter && aFilter.length > 0) {
					var oFilter = new sap.ui.model.Filter(aFilter, true);
	
					// oBinding.filter([ oFilter ]);
					this.smartFilterCondition = aFilter;
					this._applyFilter(oBinding, aFilter);
					this._updateCount([oFilter]);
				} else {
					// oBinding.filter(null);
					this.smartFilterCondition = null;
					this._applyFilter(oBinding);
					this._updateCount();
				}
	
				if (aFilter === undefined) {
					this._filterChanged = true;
				}
				else {
					this._filterChanged = false;
				}

			}
			else {
				this._updateCount();
				this.bInitialLoadingCompleted = true;
			}
		},
		_applyFilter: function(oBinding, aFilter) {
			var vFilterChanged = false;
			var vTab = this.getView().byId("v210IconTabBar")
				.getSelectedKey();
			switch (vTab) {
				case "PO":
					vFilterChanged = this.POFilterChanged;
					break;

				case "PR":
					vFilterChanged = this.PRFilterChanged;
					break;

				case "GR":
					vFilterChanged = this.GRFilterChanged;
					break;

				case "SI":
					vFilterChanged = this.SIFilterChanged;
					break;

				case "ALL":
					vFilterChanged = this.OverviewFilterChanged;
					break;
				default:
				    break;

			}

			if (vFilterChanged == true) {

				oBinding.aApplicationFilters = [];

				oBinding.sCustomParams = oBinding.oModel
					.createCustomParams({
						custom: {
							search: this._customSearchKey
						},
						select: this
							._getCustomSelectParameters(this._groupKey)
					});

				if (aFilter == null | aFilter == undefined) {
					aFilter = [];
				}

				if (aFilter.length > 0) {
					var oFilter = new sap.ui.model.Filter(aFilter,
						true);
					oBinding.filter(aFilter, true);
				} else {
					if (this._customSearchKey != "") {
						oBinding.filter();
					} else {
						oBinding.filter(null);
					}
				}
				
				if (this.POFilterChanged) {
					var aItems = this.getView().byId("POTable").getItems();
					for (var i = 0; i < aItems.length; ++i) {
						if (aItems[i].getCells && aItems[i].getCells() && aItems[i].getCells()[0] && aItems[i].getCells()[0].setSelected) {
							aItems[i].getCells()[0].setSelected(false);
						}
					}
					this._validForPostGR();
				}

				switch (vTab) {
					case "PO":
						this.POFilterChanged = false;
						break;

					case "PR":
						this.PRFilterChanged = false;
						break;

					case "GR":
						this.GRFilterChanged = false;
						break;

					case "SI":
						this.SIFilterChanged = false;
						break;

					case "ALL":
						this.OverviewFilterChanged = false;
						break;
					default:
					    break;

				}

				// this._filterChanged = false;

			}

		}
	};
})();