/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.TypeAheadSuggestion");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.TypeAheadSuggestion = {
		_isArrayEqual: function(o, n) {
			if (!o || !n) {
				return false;
			}
			if (o.length !== n.length) {
				return false;
			}
			for (var i = 0; i < o.length; i++) {
				if (o[i] instanceof Array && n[i] instanceof Array) {
					if (!this._isArrayEqual(o[i], n[i])) return false;
				} else if (o[i] != n[i]) {
					return false;
				}
			}
			return true;
		},
		_suggestValues: function(e, u, d, o, E, f) {
			var p = this._getFilterParams(e, u, E, f);
			if (this[p["oCollectionModel"]] && this._isArrayEqual([p["oCollectionModel"]]["aUrlParams"], p["aUrlParams"])) {
				this.handleFilterInBinding(e, p, d, o);
			} else {
				this._getModel(p, e, d, o);
			}
		},
		_suggestValuesN: function(e, u, d, o, E, f) {
			var p = this._getFilterParamsN(e, u, E, f);
			if (this[p["oCollectionModel"]] && this._isArrayEqual([p["oCollectionModel"]]["aUrlParams"], p["aUrlParams"])) {
				this.handleFilterInBinding(e, p, d, o);
			} else {
				this._getModelN(p, e, d, o);
			}
		},
		_getFilterParams: function(e, i, E, f) {
			var s = e.getSource().getBindingInfo("suggestionRows");
			if (s !== null) {
				if (!E || E === "") {
					E = s.path;
				}
				if (!f) {
					f = [];
				}
				var b = null;
				var B = null;
				if (s.template.getCells().length === 2) {
					b = s.template.getCells()[0].getBindingPath("text");
					B = s.template.getCells()[1].getBindingPath("text");
				} else if (s.template.getCells().length === 1) {
					b = s.template.getCells()[0].getBindingPath("text");
				} else if (s.template.getCells().length > 2){
					b = s.template.getCells()[0].getBindingPath("text");
					B = s.template.getCells()[1].getBindingPath("text");
				}
				if (!i) {
					i = [];
				}
				return {
					aUrlParams: i,
					oFilter: {
						sKey: b,
						sText: B
					},
					oCollectionModel: s.model,
					sCollectionPath: s.path,
					sEntityName: E,
					aFiltersInCall: f
				};
			}
			return null;
		},
		_getFilterParamsN: function(e, i, E, f) {
			var s = e.getSource().getBindingInfo("suggestionRows");
			if (s !== null) {
				if (!E || E === "") {
					E = s.path;
				}
				if (!f) {
					f = [];
				}
				var b = null;
				var B = null;
				var B1 = null;
				var B2 = null;
				var B3 = null;
				var B4 = null;
				var B5 = null;
				var B6 = null;
				if (s.template.getCells().length === 2) {
					b = s.template.getCells()[0].getBindingPath("text");
					B = s.template.getCells()[1].getBindingPath("text");
				} else if (s.template.getCells().length === 1) {
					b = s.template.getCells()[0].getBindingPath("text");
				} else if (s.template.getCells().length > 2){
					b = s.template.getCells()[0].getBindingPath("text");
					B = s.template.getCells()[1].getBindingPath("text");
					B1 = s.template.getCells()[2].getBindingPath("text");
					B2 = s.template.getCells()[3].getBindingPath("text");
					B3 = s.template.getCells()[4].getBindingPath("text");
					B4 = s.template.getCells()[5].getBindingPath("text");
					B5 = s.template.getCells()[6].getBindingPath("text");
					B6 = s.template.getCells()[7].getBindingPath("text");
				}
				if (!i) {
					i = [];
				}
				return {
					aUrlParams: i,
					oFilter: {
						sKey  : b,
						sText : B,
						sText1: B1,
						sText2: B2,
						sText3: B3,
						sText4: B4,
						sText5: B5,
						sText6: B6
					},
					oCollectionModel: s.model,
					sCollectionPath: s.path,
					sEntityName: E,
					aFiltersInCall: f
				};
			}
			return null;
		},
		_getModel: function(f, e, d, o) {
			if (!this[f["oCollectionModel"]] || !this._isArrayEqual([f["oCollectionModel"]]["aUrlParams"], (f["aUrlParams"]))) {
				var _ = $.extend(true, {}, e);
				var a = this;
				var D = this.oApplicationFacade.getODataModel();
				D.read(f["sEntityName"], {
					urlParameters: f["aUrlParams"],
					filters: f["aFiltersInCall"],
					success: function(b) {
						var i;
						var c;
						var C = new Array();
						for (i = 0; i < b.results.length; i++) {
							var I = {};
							I[f["oFilter"]["sKey"]] = b.results[i][f["oFilter"]["sKey"]];
							if (f["oFilter"]["sText"] && f["oFilter"]["sText"] !== null) {
								I[f["oFilter"]["sText"]] = b.results[i][f["oFilter"]["sText"]];
							}
							C.push(I);
						};
						c = new sap.ui.model.json.JSONModel();
						c.setDefaultBindingMode("OneWay");
						c.setProperty(f["sCollectionPath"], C);
						a[f["oCollectionModel"]] = c;
						a[f["oCollectionModel"]]["aUrlParams"] = f["aUrlParams"];
						a.handleFilterInBinding(_, f, d, o);
					}
				});
			}
			return this[f["oCollectionModel"]];
		},
		_getModelN: function(f, e, d, o) {
			if (!this[f["oCollectionModel"]] || !this._isArrayEqual([f["oCollectionModel"]]["aUrlParams"], (f["aUrlParams"]))) {
				var _ = $.extend(true, {}, e);
				var a = this;
				var D = this.oApplicationFacade.getODataModel();
				D.read(f["sEntityName"], {
					urlParameters: f["aUrlParams"],
					filters: f["aFiltersInCall"],
					success: function(b) {
						//var i;
						var c;
						var C = new Array();
						// for (i = 0; i < b.results.length; i++) {
						let i = 0;
						let m2 = b.results.length;
						while(i < m2) {
							var I = {};
							I[f["oFilter"]["sKey"]] = b.results[i][f["oFilter"]["sKey"]];
							if (f["oFilter"]["sText"] && f["oFilter"]["sText"] !== null) {
								I[f["oFilter"]["sText"]] = b.results[i][f["oFilter"]["sText"]];
							}
							if (f["oFilter"]["sText1"] && f["oFilter"]["sText1"] !== null) {
								I[f["oFilter"]["sText1"]] = b.results[i][f["oFilter"]["sText1"]];
							}
							if (f["oFilter"]["sText2"] && f["oFilter"]["sText2"] !== null) {
								I[f["oFilter"]["sText2"]] = b.results[i][f["oFilter"]["sText2"]];
							}
							if (f["oFilter"]["sText3"] && f["oFilter"]["sText3"] !== null) {
								I[f["oFilter"]["sText3"]] = b.results[i][f["oFilter"]["sText3"]];
							}
							if (f["oFilter"]["sText4"] && f["oFilter"]["sText4"] !== null) {
								I[f["oFilter"]["sText4"]] = b.results[i][f["oFilter"]["sText4"]];
							}
							if (f["oFilter"]["sText5"] && f["oFilter"]["sText5"] !== null) {
								I[f["oFilter"]["sText5"]] = b.results[i][f["oFilter"]["sText5"]];
							}
							if (f["oFilter"]["sText6"] && f["oFilter"]["sText6"] !== null) {
								I[f["oFilter"]["sText6"]] = b.results[i][f["oFilter"]["sText6"]];
							}
							C.push(I);
							i++;
						};
						c = new sap.ui.model.json.JSONModel();
						c.setDefaultBindingMode("OneWay");
						c.setProperty(f["sCollectionPath"], C);
						//c.setSizeLimit(1000);
						a[f["oCollectionModel"]] = c;
						a[f["oCollectionModel"]]["aUrlParams"] = f["aUrlParams"];
						a.handleFilterInBindingN(_, f, d, o, C);
					}
				});
			}
			return this[f["oCollectionModel"]];
		},
		handleFilterInBinding: function(e, f, d, o) {
			e.getSource().setModel(this[f["oCollectionModel"]], f["oCollectionModel"]);
			var v = "";
			if (e.getId() === "change") {
				v = e.getSource().getValue();
			} else {
				v = e.getParameter("suggestValue");
			}
			v = v.toUpperCase();
			var F = [];
			if (v) {
				F.push(new sap.ui.model.Filter(f["oFilter"]["sKey"], sap.ui.model.FilterOperator.Contains, v));
				if (f["oFilter"]["sText"] && f["oFilter"]["sText"] !== null) {
					F.push(new sap.ui.model.Filter(f["oFilter"]["sText"], sap.ui.model.FilterOperator.Contains, v));
				}
			}
			e.getSource().getBinding("suggestionRows").filter(!v ? [] : [new sap.ui.model.Filter(F, false)]);
			e.getSource().setFilterFunction(function() {
				return true;
			});
			e.getSource().setShowTableSuggestionValueHelp(true);
			if (d) {
				this._handleAutoComplete(e, f, o);
			}
		},
		handleFilterInBindingN: function(e, f, d, o, C) {
			e.getSource().setModel(this[f["oCollectionModel"]], f["oCollectionModel"]);
			var v = "";
			if (e.getId() === "change") {
				v = e.getSource().getValue();
			} else {
				v = e.getParameter("suggestValue");
			}
			v = v.toUpperCase();
			var F = [];
			if (v) {
				F.push(new sap.ui.model.Filter(f["oFilter"]["sKey"], sap.ui.model.FilterOperator.Contains, v));
				if (f["oFilter"]["sText"] && f["oFilter"]["sText"] !== null) {
					F.push(new sap.ui.model.Filter(f["oFilter"]["sText"], sap.ui.model.FilterOperator.Contains, v));
				}
			}
			e.getSource().getBinding("suggestionRows").filter(!v ? [] : [new sap.ui.model.Filter(F, false)]);
			e.getSource().setFilterFunction(function() {
				return true;
			});
			e.getSource().setShowTableSuggestionValueHelp(true);
			if (d) {
				this._handleAutoCompleteN(e, f, o, C);
			}
		},
		_handleAutoComplete: function(e, p, o) {
			if (!p.oCollectionModel) {
				return;
			}
			var s = e.getSource();
			var v = "";
			if (e.getParameter("suggestValue")) {
				return;
			} else if (e.getParameter("newValue")) {
				v = e.getParameter("newValue");
			} else {
				v = s.getValue();
			}
			v = v.toUpperCase();
			var k = "";
			var t = "";
			var m = false;
			if (v.length > 0) {
				var S = s.getSuggestionRows();
				if (S.length == 1) {
					k = S[0].getCells()[0].getText();
					if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
						t = S[0].getCells()[1].getText();
					}
					m = true;
				} else if (S.length > 1) {
					for (var i = 0; i < S.length; i++) {
						k = S[i].getCells()[0].getText();
						if (v === k) {
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								t = S[i].getCells()[1].getText();
							}
							m = true;
							break;
						}
					}
					if (!m) {
						s.setValueState("Warning");
						s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
					}
				} else if (S.length == 0) {
					s.setValueState("Error");
					s.setValueStateText(this.oResourceBundle.getText("NEVER_VALID_VALUE"));
				}
				if (m) {
					if (o) {
						var I = {};
						I[p.oFilter["sKey"]] = k;
						if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
							I[p.oFilter["sText"]] = t;
						}
						o([I], s);
					} else {
						if (s instanceof sap.m.MultiInput) {
							var T;
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								t = t + " (" + k + ")";
								T = new sap.m.Token({
									key: k,
									text: t
								});
							} else {
								T = new sap.m.Token({
									key: k,
									text: k
								});
							}
							T.addCustomData(new sap.ui.core.CustomData({
								key: "row",
								value: {
									keyField: p.oFilter["sKey"],
									operation: sap.ui.model.FilterOperator.EQ,
									value1: T.getKey()
								}
							}));
							s.addToken(T);
							s.setValue("");
						} else if (s instanceof sap.m.Input) {
							this.getView().getModel().setProperty(p.oFilter["sKey"], k, s.getBindingContext());
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								this.getView().getModel().setProperty(p.oFilter["sText"], t, s.getBindingContext());
								s.setValue(elsan.zmmpur.puritems.util.Formatter.nameIdTuple(t, k));
							} else {
								s.setValue(k);
							}
						}
					}
					s.setValueState("None");
					s.setValueStateText("");
				}
				if (this.handleFieldChange) {
					this.handleFieldChange(e);
				}
			} else if (s instanceof sap.m.MultiInput) {
				if (v.length == 0 && s.getTokens().length == 1) {
					s.setValueState("None");
					s.setValueStateText("");
				} else if (v.length == 0 && s.getTokens().length == 0) {
					s.setValueState("Warning");
					s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
				}
			} else {
				if (v.length == 0) {
					s.setValueState("Warning");
					s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
				}
			}
		},
		
		_handleAutoCompleteN: function(e, p, o, C){
			if (!p.oCollectionModel) {
				return;
			}
			var s = e.getSource();
			var v = "";
			if (e.getParameter("suggestValue")) {
				return;
			} else if (e.getParameter("newValue")) {
				v = e.getParameter("newValue");
			} else {
				v = s.getValue();
			}
			v = v.toUpperCase();
			var k = "";
			var t = "";
			var m = false;
			if (v.length > 0) {
				//var S = C;//s.getSuggestionRows();
				var S = C;
				if (S.length == 1) {
					k = S[0].Supplier; //getCells()[0].getText();
					if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
						t = S[0].SupplierName;//getCells()[1].getText();
					}
					m = true;
				} else if (S.length > 1) {
					// for (var i = 0; i < S.length; i++) {
					// 	k = S[i].Supplier;//getCells()[0].getText();
					// 	if (v === k) {
					// 		if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
					// 			t = S[i].SupplierName;//getCells()[1].getText();
					// 		}
					// 		m = true;
					// 		break;
					// 	}
					// }
					// S.forEach(function(sup) {
					//     k = sup.Supplier;
					// 	if (v === k) {
					// 		if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
					// 			t = sup.SupplierName;//S[i].SupplierName;//getCells()[1].getText();
					// 		}
					// 		m = true;
					// 		//break;
					// 	}
					// });
					let i = 0;
					let si = S.length;
					while(i < si){
						k = S[i].Supplier;//getCells()[0].getText();
						if (v === k) {
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								t = S[i].SupplierName;//getCells()[1].getText();
							}
							m = true;
							break;
						}
						i++;
					}
					if (!m) {
						s.setValueState("Warning");
						s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
					}
				} else if (S.length == 0) {
					s.setValueState("Error");
					s.setValueStateText(this.oResourceBundle.getText("NEVER_VALID_VALUE"));
				}
				if (m) {
					if (o) {
						var I = {};
						I[p.oFilter["sKey"]] = k;
						if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
							I[p.oFilter["sText"]] = t;
						}
						o([I], s);
					} else {
						if (s instanceof sap.m.MultiInput) {
							var T;
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								t = t + " (" + k + ")";
								T = new sap.m.Token({
									key: k,
									text: t
								});
							} else {
								T = new sap.m.Token({
									key: k,
									text: k
								});
							}
							T.addCustomData(new sap.ui.core.CustomData({
								key: "row",
								value: {
									keyField: p.oFilter["sKey"],
									operation: sap.ui.model.FilterOperator.EQ,
									value1: T.getKey()
								}
							}));
							s.addToken(T);
							s.setValue("");
						} else if (s instanceof sap.m.Input) {
							this.getView().getModel().setProperty(p.oFilter["sKey"], k, s.getBindingContext());
							if (p.oFilter["sText"] && p.oFilter["sText"] !== null) {
								this.getView().getModel().setProperty(p.oFilter["sText"], t, s.getBindingContext());
								s.setValue(elsan.zmmpur.puritems.util.Formatter.nameIdTuple(t, k));
							} else {
								s.setValue(k);
							}
						}
					}
					s.setValueState("None");
					s.setValueStateText("");
				}
				if (this.handleFieldChange) {
					this.handleFieldChange(e);
				}
			} else if (s instanceof sap.m.MultiInput) {
				if (v.length == 0 && s.getTokens().length == 1) {
					s.setValueState("None");
					s.setValueStateText("");
				} else if (v.length == 0 && s.getTokens().length == 0) {
					s.setValueState("Warning");
					s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
				}
			} else {
				if (v.length == 0) {
					s.setValueState("Warning");
					s.setValueStateText(this.oResourceBundle.getText("NOT_VALID_VALUE"));
				}
			}
		},
		_processSuggestion: function(e, f, p, o) {
			var s = e.getSource();
			if (!e.getParameter("newValue") && !e.getParameter("value")) {
				s.setValueState("None");
				s.setValueStateText("");
				if (this.handleFieldChange) {
					this.handleFieldChange(e);
				}
				return;
			}
			if (!f) {
				return;
			}
			f(e, this);
			this._handleAutoComplete(e, p, o);
		}
	};
})();