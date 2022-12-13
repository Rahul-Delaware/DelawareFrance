/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TypeAheadSuggestion");

(function() {
	  "use strict";
	  elsan.zmmpur.puritems.mixins.TypeAheadSuggestion = {
	        /** Compares if two arrays are equal
	         * @param {Array} aOldArray old Array
			 * @param {Array} aNewArray new Array
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
                    if (aOldArray[i] instanceof Array && aNewArray[i] instanceof Array) {
                        // recurse into the nested arrays
                        if (!this._isArrayEqual(aOldArray[i],aNewArray[i]))
                            return false;       
                    }           
                    else if (aOldArray[i] != aNewArray[i]) { 
                        // Warning - two different object instances will never be equal: {x:20} != {x:20}
                        return false;   
                    }           
                }
                return true;
            },
			/**
			 * While user is entering characters in input field, the user gets suggestions for his input based on the context of the filter
			 * @param {Object} oEvent Event which is calling the function
			 * @param {Array} aUrlParams URL parameters to filter the suggestion like for value help
             * @param {Boolean} bDoAutoComplete If set to true auto complete will be triggered
             * @param {Function} fOnClose Optional function which can be triggered on finishing auto complete
             * @param {String} sEntity Optional name of entity for OData call
             * @param {Array} aFilters Optional filter elemets for OData call
			 */
			_suggestValues : function (oEvent, aUrlParams, bDoAutoComplete, fOnClose, sEntity, aFilters) {
				var oParams = this._getFilterParams(oEvent, aUrlParams, sEntity, aFilters);
				if (this[oParams["oCollectionModel"]] && this._isArrayEqual([oParams["oCollectionModel"]]["aUrlParams"],oParams["aUrlParams"])) {
    				this.handleFilterInBinding(oEvent, oParams, bDoAutoComplete, fOnClose);
				}
				else {
				    this._getModel(oParams, oEvent, bDoAutoComplete, fOnClose);
				}
			},

			/**
			 * Gets parameters for type ahead by binding (e.g. based on xml)
			 * @param {Object} oEvent Event which is calling the function
			 * @param {Array} aInputUrlParams Array with URL parameters
			 * @param {String} sEntity Optional name of entity for OData call
			 * @param {Array} aFilters Optional filter elemets for OData call
			 * @returns {Object} Object which contains the params for a filter field
			 */
			_getFilterParams : function (oEvent, aInputUrlParams, sEntity, aFilters) {
				var oSuggestionRows = oEvent.getSource().getBindingInfo("suggestionRows");
				if (oSuggestionRows !== null) {
					if (!sEntity || sEntity === "") {
						sEntity = oSuggestionRows.path;
					}
					if (!aFilters) {
						aFilters = [];
					}

					var sBindingKey = null;
					var sBindingText = null;

					if (oSuggestionRows.template.getCells().length === 2) {
						sBindingKey = oSuggestionRows.template.getCells()[0].getBindingPath("text");
						sBindingText = oSuggestionRows.template.getCells()[1].getBindingPath("text");
					}
					else if (oSuggestionRows.template.getCells().length === 1) {
						sBindingKey = oSuggestionRows.template.getCells()[0].getBindingPath("text");
					}

					if (!aInputUrlParams) {
						aInputUrlParams = [];
					}

					return {
						aUrlParams : aInputUrlParams,
						oFilter : {
							sKey : sBindingKey,
							sText : sBindingText
						},
						oCollectionModel : oSuggestionRows.model,
						sCollectionPath : oSuggestionRows.path,
						sEntityName : sEntity,
						aFiltersInCall : aFilters
					};
				}
				return null;
			},

			/**
			 * Gets the model for suggestion values, will trigger OData only if not already done or if url params has changed
			 * @param {Object} oFilterParams Params for OData request
			 * @param {Object} oFilterParams Parameter with information for model returned by _getFilterParams
             * @param {Boolean} bDoAutoComplete If set to true auto complete will be triggered
             * @param {Function} fOnClose Optional function which can be triggered on finishing auto complete
			 * @returns {Object} Model including the suggestion values
			 */
			_getModel : function (oFilterParams, oEvent, bDoAutoComplete, fOnClose) {
				if (!this[oFilterParams["oCollectionModel"]] || !this._isArrayEqual([oFilterParams["oCollectionModel"]]["aUrlParams"],(oFilterParams["aUrlParams"]))) {
					var _oEvent = $.extend(true,{},oEvent);
					var _that = this;
					var oDataHelpModel = this.oApplicationFacade.getODataModel();

					oDataHelpModel
							.read(
									oFilterParams["sEntityName"],
									{
									    urlParameters: oFilterParams["aUrlParams"],
									    filters: oFilterParams["aFiltersInCall"],
									    success: function(oData) {
    										var i;
    										var oCollection;
    										var aCollection = new Array();
    										for (i = 0; i < oData.results.length; i++) {
    											var oItem = {};
    											oItem[oFilterParams["oFilter"]["sKey"]] = oData.results[i][oFilterParams["oFilter"]["sKey"]];
    											if (oFilterParams["oFilter"]["sText"] && oFilterParams["oFilter"]["sText"] !== null) {
    											    oItem[oFilterParams["oFilter"]["sText"]] = oData.results[i][oFilterParams["oFilter"]["sText"]];
        											/*if (oItem[oFilterParams["oFilter"]["sText"]] == "") {
        												oItem[oFilterParams["oFilter"]["sText"]] = oFilterParams["oFilter"]["sKey"] + " "
        														+ oItem[oFilterParams["oFilter"]["sKey"]];
        											}*/
    											}
    											aCollection
    													.push(oItem);
    										}
    										;
    										// build new JSON and put into
    										// associative array
    										oCollection = new sap.ui.model.json.JSONModel();
    										oCollection.setDefaultBindingMode("OneWay");
    										oCollection.setProperty(
    														oFilterParams["sCollectionPath"],
    														aCollection);
    										_that[oFilterParams["oCollectionModel"]] = oCollection;
    										_that[oFilterParams["oCollectionModel"]]["aUrlParams"] = oFilterParams["aUrlParams"];
    										_that.handleFilterInBinding(_oEvent,oFilterParams,bDoAutoComplete,fOnClose);
    									}
									}
							);
				}
				return this[oFilterParams["oCollectionModel"]];
			},

            /**
             * Calls to filter the suggestion
             * @param {Object} oEvent Event which triggers call
             * @param {Object} oFilterParams Parameter with information for model returned by _getFilterParams
             * @param {Boolean} bDoAutoComplete If set to true auto complete will be triggered
             * @param {Function} fOnClose Optional function which can be triggered on finishing auto complete
             */
            handleFilterInBinding : function(oEvent, oFilterParams, bDoAutoComplete, fOnClose) {
                oEvent.getSource().setModel(this[oFilterParams["oCollectionModel"]], oFilterParams["oCollectionModel"]);
                var sValue="";
				if (oEvent.getId()==="change") {
					sValue = oEvent.getSource().getValue();
				}  else {
					sValue = oEvent.getParameter("suggestValue");
				}
                sValue = sValue.toUpperCase();
				var aFilterItems = [];

    			if (sValue) {
    				aFilterItems.push(new sap.ui.model.Filter(oFilterParams["oFilter"]["sKey"], sap.ui.model.FilterOperator.Contains, sValue));
    				if (oFilterParams["oFilter"]["sText"] && oFilterParams["oFilter"]["sText"] !== null) {
    				    aFilterItems.push(new sap.ui.model.Filter(oFilterParams["oFilter"]["sText"], sap.ui.model.FilterOperator.Contains, sValue));
    				}
    			}

                oEvent.getSource().getBinding("suggestionRows").filter(!sValue ? [] : [new sap.ui.model.Filter(aFilterItems,false)]);
                oEvent.getSource().setFilterFunction(function() { return true;});
    			oEvent.getSource().setShowTableSuggestionValueHelp(true);
    			if (bDoAutoComplete) {
                    this._handleAutoComplete(oEvent,oFilterParams,fOnClose);
    			}
            },

            /**
             * Calls to auto complete value
             * @param {Object} oEvent Event which triggers call
             * @param {Object} oParams Parameter with information for model returned by _getFilterParams
             * @param {Function} fOnClose Optional function which can be triggered on finishing auto complete
             */
            _handleAutoComplete : function(oEvent,oParams,fOnClose) {
                if (!oParams.oCollectionModel) {
                    return;
                }
                var oSrc = oEvent.getSource();
            	var sValue = "";
            	if (oEvent.getParameter("suggestValue")){
            	    return;
            	}
            	else if (oEvent.getParameter("newValue")) {
            	    sValue=oEvent.getParameter("newValue");
            	}
            	else {
            	    sValue=oSrc.getValue();
            	}
            	sValue = sValue.toUpperCase();
				var sKey = "";
				var sText = "";
				var bMatch = false;
				if (sValue.length > 0) {
					var aSuggestionRows = oSrc.getSuggestionRows();
					if (aSuggestionRows.length == 1) {
						sKey = aSuggestionRows[0].getCells()[0].getText();
						if (oParams.oFilter["sText"] && oParams.oFilter["sText"] !== null) {
						    sText = aSuggestionRows[0].getCells()[1].getText();
						}
						bMatch = true;
					}
					else if (aSuggestionRows.length > 1) {
						for ( var i = 0; i < aSuggestionRows.length; i++) {
							sKey = aSuggestionRows[i].getCells()[0].getText();
							if (sValue === sKey) {
							    if (oParams.oFilter["sText"] && oParams.oFilter["sText"] !== null) {
								    sText = aSuggestionRows[i].getCells()[1].getText();
							    }
								bMatch = true;
								break;
							}
						}
						if (!bMatch) {
							oSrc.setValueState("Warning");
							oSrc.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
						}
					}
					else if (aSuggestionRows.length == 0){
						oSrc.setValueState("Error");
						oSrc.setValueStateText(this.oResourceBundle.getText("NEVER_VALID_VALUE"));
					}
					if (bMatch) {
					    if (fOnClose) {
							var oItem = {};
							oItem[oParams.oFilter["sKey"]] = sKey;
							if (oParams.oFilter["sText"] && oParams.oFilter["sText"] !== null) {
							    oItem[oParams.oFilter["sText"]] = sText;
							}
							fOnClose([oItem], oSrc);
						}
						else {
						    if (oSrc instanceof sap.m.MultiInput) {
    						    var oToken;
    						    if (oParams.oFilter["sText"] && oParams.oFilter["sText"] !== null) {
    						        sText = sText + " (" + sKey + ")";
    							    oToken = new sap.m.Token({key:sKey, text:sText});
    						    }
    						    else {
    						        oToken = new sap.m.Token({key:sKey, text:sKey});
    						    }
    						    oToken.addCustomData(new sap.ui.core.CustomData({
    			                    key:"row",
    			                    value:{
    			                        keyField:oParams.oFilter["sKey"],
    								    operation:sap.ui.model.FilterOperator.EQ,
    								    value1:oToken.getKey()
    			                    }
    			                }));
    							oSrc.addToken(oToken);
    							oSrc.setValue("");
    						}
    						else if (oSrc instanceof sap.m.Input) {
    						    this.getView().getModel().setProperty(oParams.oFilter["sKey"], sKey, oSrc.getBindingContext());

    						    if (oParams.oFilter["sText"] && oParams.oFilter["sText"] !== null) {
    						        this.getView().getModel().setProperty(oParams.oFilter["sText"], sText, oSrc.getBindingContext());
    							    oSrc.setValue(elsan.zmmpur.puritems.util.Formatter.nameIdTuple(sText,sKey));
    						    }
    						    else {
    						        oSrc.setValue(sKey);
    						    }
    						}
                        }
						oSrc.setValueState("None");
						oSrc.setValueStateText("");
					}
					if (this.handleFieldChange) {
						this.handleFieldChange(oEvent);
					}
				}
				else if (oSrc instanceof sap.m.MultiInput)
				{
					if (sValue.length == 0 && oSrc.getTokens().length == 1) {
						oSrc.setValueState("None");
						oSrc.setValueStateText("");
					}
					else if (sValue.length == 0 && oSrc.getTokens().length == 0) {
						oSrc.setValueState("Warning");
						oSrc.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
					}
				}
				else {
					if (sValue.length == 0) {
						oSrc.setValueState("Warning");
						oSrc.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
					}
				}
            },

			/**
			 * Take suggestion to set value
			 * @param {Object] oEvent Event which triggers the function
			 * @param {Function} fFunction Function which should be processed to get the suggestion
			 * @param {Object} oParams Params which including key and text for a value
			 * @param {Function} fOnClose Function which should be processed on match (auto complete)
			 */
			_processSuggestion : function(oEvent, fFunction, oParams, fOnClose) {
				var oSrc = oEvent.getSource();
			    if (!oEvent.getParameter("newValue") && !oEvent.getParameter("value")){
			        oSrc.setValueState("None");
			        oSrc.setValueStateText("");
			        if (this.handleFieldChange) {
			            this.handleFieldChange(oEvent);
			        }
			        return;
			    }

				if (!fFunction) {
					return;
				}
				fFunction(oEvent, this);

			    this._handleAutoComplete(oEvent,oParams, fOnClose);
			}			
	};
})();