/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ValueHelp");
jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ValueHelp = {
		/**
		 * Compares if two arrays are equal
		 * 
		 * @param {Array}
		 *            aOldArray old Array
		 * @param {Array}
		 *            aNewArray new Array
		 * @return {Boolean} true if equal, else false
		 */
		_isArrayEqual : function(aOldArray, aNewArray) {
			if (!aOldArray || !aNewArray) {
				return false;
			}

			if (aOldArray.length !== aNewArray.length) {
				return false;
			}

			for (var i = 0; i < aOldArray.length; i++) {
				// Check if we have nested arrays
				if (aOldArray[i] instanceof Array
						&& aNewArray[i] instanceof Array) {
					// recurse into the nested arrays
					if (!this._isArrayEqual(aOldArray[i], aNewArray[i]))
						return false;
				} else if (aOldArray[i] != aNewArray[i]) {
					// Warning - two different object instances will never be
					// equal: {x:20} != {x:20}
					return false;
				}
			}
			return true;
		},
		/** Compares if two filter arrays are equal
		 * @param {Array} aOldArray old Array
		 * @param {Array} aNewArray new Array
		 * @return {Boolean} true if equal, else false
		 */
		_isFilterArrayEqual : function(aOldArray, aNewArray) {
			if (!aOldArray || !aNewArray) { return false;}
			else if (aOldArray.length !== aNewArray.length) { return false; }
			
			for (var i = 0; i < aOldArray.length; i++) {
				
				if (aOldArray[i].bAnd !== aNewArray[i].bAnd) { return false; }
			
				else if (aOldArray[i].sPath !== aNewArray[i].sPath) { return false; }
				else if (aOldArray[i].sOperator !== aNewArray[i].sOperator) { return false; }
			
				else if (aOldArray[i].oValue1 !== aNewArray[i].oValue1) { return false; }
				else if (aOldArray[i].oValue2 !== aNewArray[i].oValue2) { return false; }
			
				else if (aOldArray[i].aFilters instanceof Array && aNewArray[i].aFilters instanceof Array) {
					if (!this._isFilterArrayEqual(aOldArray[i].aFilters, aNewArray[i].aFilters)) {
						return false;
					}
				}
			}
			return true;
		},
		/**
		 * Generate a value help generic based on input parameters
		 * 
		 * @param {Object}
		 *            oEvent Event which triggers the function (should be a
		 *            handleValueHelp function)
		 * @param {Object}
		 *            oMetadata Metadata for the value help dialog (contains
		 *            information on the behaviour of a value help dialog)
		 * @param {String}
		 *            sEntity Name of the entity of OData service which contains
		 *            the value help data
		 * @param {String}
		 *            sCollection Name of the collection where the value help
		 *            data has to be stored
		 * @param {Array}
		 *            aFields Array of fields which should be shown in value
		 *            help dialog
		 * @param {Array}
		 *            aUrlParams Additional url parameters for OData call
		 * @param {Function}
		 *            fOnClose Optional function which can be triggered on
		 *            finishing value help
		 * @param {Array}
		 *            aFilters Additional filter url parameters for OData call
		 */
		_generateValueHelp : function(oEvent, oMetadata, sEntity, sCollection,
				aFields, aUrlParams, fOnClose, aFilters) {
			if (!aFilters) {
				aFilters = [];
			}
			var _that = this;
			this.aTokens = [];
			var oVHEvent = oEvent;
			var oInputField = oVHEvent.getSource();

			// Check if there is a key to find the model and the description for
			// a value help again
			// In addition prepare dialog to reuse the fields
			var oModelKey = null;
			var oModelDescriptionKey = null;
			var aCols = [];
			var aFilterGroupItems = [];
			for (var i = 0; i < aFields.length; i++) {
				if (aFields[i].filterKey) {
					oModelKey = aFields[i].key;
				}
				if (aFields[i].filterDescriptionKey) {
					oModelDescriptionKey = aFields[i].key;
				}
				aCols.push({
					label : aFields[i].label,
					template : aFields[i].key
				});
				var oControl = new sap.m.Input();
				if (aFields[i].defaultValue) {
					oControl.setValue(aFields[i].defaultValue);
					if (aFields[i].notEditable) {
						oControl.setEditable(false);
					}
				}

				aFilterGroupItems
						.push(new sap.ui.comp.filterbar.FilterGroupItem({
							groupTitle : "",
							groupName : "gn1",
							name : "n" + i,
							label : aFields[i].label,
							control : oControl
						}));
			}

			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog(
					{
						basicSearchText : oInputField.getValue(),
						title : oMetadata.title,
						modal : oMetadata.modal,
						supportMultiselect : oMetadata.supportMultiselect,
						supportRanges : oMetadata.supportRanges,
						supportRangesOnly : oMetadata.supportRangesOnly,
						key : oModelKey,
						descriptionKey : oModelDescriptionKey,

						ok : function(oControlEvent) {
							_that.aTokens = oControlEvent
									.getParameter("tokens");
							for (var i = 0; i < _that.aTokens.length; i++) {
								if (_that.aTokens[i].getText() === "[object Object]") {
									_that.aTokens[i].setText(_that.aTokens[i]
											.getKey());
								}

							}
							if (!oControlEvent.getSource()
									.getSupportMultiselect()) {
								var oToken;
								if (oModelDescriptionKey) {
									oToken = new sap.m.Token({
										key : "{path:'" + oModelKey + "'}",
										text : "{path:'" + oModelDescriptionKey
												+ "'}"
									});
								} else {
									oToken = new sap.m.Token({
										key : "{path:'" + oModelKey + "'}",
										text : "{path:'" + oModelKey + "'}"
									});
								}
								var sKey = _that.aTokens[0].getKey();
								var sText = _that.aTokens[0].getText();
								sText = sText.replace(" (" + sKey + ")", "");
							}

							if (fOnClose) {
								var aItems = oControlEvent.getSource()._oSelectedItems
										.getItems();
								var aReturnData = [];
								for (var i = 0; i < aItems.length; i++) {
									aReturnData
											.push(oControlEvent.getSource()._oSelectedItems
													.getItem(aItems[i]));
								}
								fOnClose(aReturnData, oInputField);
							} else {
								if (oInputField instanceof sap.m.MultiInput) {
									if (oControlEvent.getSource()
											.getSupportMultiselect()) {
										oInputField.setTokens(_that.aTokens);
									} else {
										oInputField.setTokens([ oToken ]);
									}
								} else if (oInputField instanceof sap.m.Input) {
									_that.getView().getModel().setProperty(
											oToken.getBindingPath("key"), sKey,
											oInputField.getBindingContext());

									if (oModelDescriptionKey) {
										_that
												.getView()
												.getModel()
												.setProperty(
														oToken
																.getBindingPath("text"),
														sText,
														oInputField
																.getBindingContext());
										oInputField
												.setValue(elsan.zmmpur.puritems.util.formatter
														.nameIdTuple(sText,
																sKey));
									} else {
										oInputField.setValue(sKey);
									}
								}
							}
							oInputField.fireChangeEvent();
							oValueHelpDialog.close();
						},

						cancel : function(oControlEvent) {
							oValueHelpDialog.close();
						},

						afterClose : function() {
							oValueHelpDialog.destroy();
						}
					});

			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols : aCols
			});
			oValueHelpDialog.setModel(oColModel, "columns");

			oValueHelpDialog.setKey(oModelKey);
			if (oModelDescriptionKey) {
				oValueHelpDialog.setKeys([ oModelKey, oModelDescriptionKey ]);
			}

			if (oMetadata.supportMultiselect) {
				oValueHelpDialog.setRangeKeyFields(aFields);
			}

			if (oInputField instanceof sap.m.MultiInput) {
				this.aTokens = oInputField.getTokens();
			}
			oValueHelpDialog.setTokens(this.aTokens);

			oValueHelpDialog
					.setFilterBar(new sap.ui.comp.filterbar.FilterBar(
							{
								//id : this.createId("F4"+oModelKey+"Dialog"), //Removed on 2016-06-03 as it leads to duplicate id issues
								advancedMode : true,
								filterItems : [ new sap.ui.comp.filterbar.FilterItem(
										{
											label : this.oResourceBundle.getText("SEARCH"),
											name : "s1",
											control : new sap.m.SearchField({
												value : oInputField.getValue(),
												search: function() {
												            oValueHelpDialog.getFilterBar().search();
												        }
											})
										}) ],
								filterGroupItems : aFilterGroupItems,
								search : function(oEvent) {
									var aSelectionSet = oVHEvent
											.getParameters().selectionSet;

                                    var oBinding;
		                                //NEW SAPUI5 version
		                                if (oValueHelpDialog.getTable()) {
		                                    oBinding = oValueHelpDialog.getTable().getBinding("rows");
		                                }
		                                //OLD SAPUI5 version
										else {
										    oBinding = oEvent.getSource().getParent().getParent().theTable.getBinding("rows");
										}
									var aFilterItems = [];
									var bAllFieldsEmpty = true;
									var oFilter = {};
									var aFilter = [];

									for (var i = 0; i < aFields.length; i++) {
										if (aSelectionSet[i + 1].getValue() != "") {
											var oTmpFilter = new sap.ui.model.Filter(
													aFields[i].key,
													sap.ui.model.FilterOperator.Contains,
													aSelectionSet[i + 1]
															.getValue());
											aFilterItems.push(oTmpFilter);
											bAllFieldsEmpty = false;
										}
									}

									if (bAllFieldsEmpty
											&& aSelectionSet[0].getValue() != "") {
										for (var i = 0; i < aFields.length; i++) {
											var oTmpFilter = new sap.ui.model.Filter(
													aFields[i].key,
													sap.ui.model.FilterOperator.Contains,
													aSelectionSet[0].getValue());
											aFilterItems.push(oTmpFilter);
										}

										oFilter = new sap.ui.model.Filter(
												aFilterItems, false);
										aFilter.push(oFilter);
									} else if (!bAllFieldsEmpty) {
										oFilter = new sap.ui.model.Filter(
												aFilterItems, true);
										aFilter.push(oFilter);
									}

									if (oBinding) {
										oBinding.filter(aFilter);
									}
								}
							}));

			if ((!this[oModelKey] || (this[oModelKey] && this[oModelKey]["sEntity"] !== sEntity)) || !this._isArrayEqual(this[oModelKey]["aUrlParams"],aUrlParams) || !this._isFilterArrayEqual(this[oModelKey]["aFilters"],aFilters)) { // read from backend, only if required
				var oDataHelpModel = this.oApplicationFacade.getODataModel();
				var aTmpUrlParams = $.extend(true, [], aUrlParams);
				var aTmpFilters = $.extend(true, [], aFilters);

				oDataHelpModel.read(sEntity, {
					urlParameters : aUrlParams,
					filters : aFilters,
					success : function(oData) {
						var i;
						var oCollection;
						var aCollection = new Array();
						for (i = 0; i < oData.results.length; i++) {
							var oItem = {};
							for (var j = 0; j < aFields.length; j++) {
								var sKey = aFields[j].key;
								oItem[sKey] = oData.results[i][sKey];
							}

							/*
							 * if (oItem[oModelDescriptionKey] &&
							 * oItem[oModelDescriptionKey] === "") {
							 * oItem[oModelDescriptionKey] = oModelKey + " " +
							 * oItem[oModelKey]; }
							 */
							aCollection.push(oItem);
						}
						;
						// build new JSON and put into
						// associative array
						oCollection = new sap.ui.model.json.JSONModel();
						oCollection.setDefaultBindingMode("OneWay");
						oCollection.setProperty(sCollection, aCollection);
						_that[oModelKey] = oCollection;
						_that[oModelKey]["sEntity"] = sEntity;
						_that[oModelKey]["aUrlParams"] = aTmpUrlParams;
						_that[oModelKey]["aFilters"] = aTmpFilters;

						oValueHelpDialog.setModel(_that[oModelKey]);
						if (oValueHelpDialog.getTable()) {
    						oValueHelpDialog.getTable().bindRows(sCollection);
    					}
    					else {
				            oValueHelpDialog.theTable.bindRows(sCollection);
    					}
						oValueHelpDialog.update();
					}
				});
			} else {
				oValueHelpDialog.setModel(this[oModelKey]);
				if (oValueHelpDialog.getTable()) {
    				oValueHelpDialog.getTable().bindRows(sCollection);
    			}
    			else {
				    oValueHelpDialog.theTable.bindRows(sCollection);
    			}
				oValueHelpDialog.update();
			}

			if (oInputField.$().closest(".sapUiSizeCompact").length > 0) { // check
																			// if
																			// the
																			// Token
																			// field
																			// runs
																			// in
																			// Compact
																			// mode
				oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			}

			oValueHelpDialog.open();
			
			this._attachListenersForFilters();

		}
	};
})();