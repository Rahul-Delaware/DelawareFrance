/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.ValueHelp");
jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.ValueHelp = {
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
		_isFilterArrayEqual: function(o, n) {
			if (!o || !n) {
				return false;
			} else if (o.length !== n.length) {
				return false;
			}
			for (var i = 0; i < o.length; i++) {
				if (o[i].bAnd !== n[i].bAnd) {
					return false;
				} else if (o[i].sPath !== n[i].sPath) {
					return false;
				} else if (o[i].sOperator !== n[i].sOperator) {
					return false;
				} else if (o[i].oValue1 !== n[i].oValue1) {
					return false;
				} else if (o[i].oValue2 !== n[i].oValue2) {
					return false;
				} else if (o[i].aFilters instanceof Array && n[i].aFilters instanceof Array) {
					if (!this._isFilterArrayEqual(o[i].aFilters, n[i].aFilters)) {
						return false;
					}
				}
			}
			return true;
		},
		_generateValueHelp: function(e, m, E, c, f, u, o, F) {
			if (!F) {
				F = [];
			}
			var _ = this;
			this.aTokens = [];
			var v = e;
			var I = v.getSource();
			var M = null;
			var a = null;
			var C = [];
			var b = [];
			for (var i = 0; i < f.length; i++) {
				if (f[i].filterKey) {
					M = f[i].key;
				}
				if (f[i].filterDescriptionKey) {
					a = f[i].key;
				}
				C.push({
					label: f[i].label,
					template: f[i].key
				});
				var d = new sap.m.Input();
				if (f[i].defaultValue) {
					d.setValue(f[i].defaultValue);
					if (f[i].notEditable) {
						d.setEditable(false);
					}
				}
				b.push(new sap.ui.comp.filterbar.FilterGroupItem({
					groupTitle: "",
					groupName: "gn1",
					name: "n" + i,
					label: f[i].label,
					control: d
				}));
			}
			var V = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				basicSearchText: I.getValue(),
				title: m.title,
				modal: m.modal,
				supportMultiselect: m.supportMultiselect,
				supportRanges: m.supportRanges,
				supportRangesOnly: m.supportRangesOnly,
				key: M,
				descriptionKey: a,
				ok: function(h) {
					_.aTokens = h.getParameter("tokens");
					for (var i = 0; i < _.aTokens.length; i++) {
						if (_.aTokens[i].getText() === "[object Object]") {
							_.aTokens[i].setText(_.aTokens[i].getKey());
						}
					}
					if (!h.getSource().getSupportMultiselect()) {
						var j;
						if (a) {
							j = new sap.m.Token({
								key: "{path:'" + M + "'}",
								text: "{path:'" + a + "'}"
							});
						} else {
							j = new sap.m.Token({
								key: "{path:'" + M + "'}",
								text: "{path:'" + M + "'}"
							});
						}
						var k = _.aTokens[0].getKey();
						var s = _.aTokens[0].getText();
						s = s.replace(" (" + k + ")", "");
					}
					if (o) {
						var l = h.getSource()._oSelectedItems.getItems();
						var r = [];
						for (var i = 0; i < l.length; i++) {
							r.push(h.getSource()._oSelectedItems.getItem(l[i]));
						}
						o(r, I);
					} else {
						if (I instanceof sap.m.MultiInput) {
							if (h.getSource().getSupportMultiselect()) {
								I.setTokens(_.aTokens);
							} else {
								I.setTokens([j]);
							}
						} else if (I instanceof sap.m.Input) {
							_.getView().getModel().setProperty(j.getBindingPath("key"), k, I.getBindingContext());
							if (a) {
								_.getView().getModel().setProperty(j.getBindingPath("text"), s, I.getBindingContext());
								I.setValue(elsan.zmmpur.puritems.util.formatter.nameIdTuple(s, k));
							} else {
								I.setValue(k);
							}
						}
					}
					I.fireChangeEvent();
					V.close();
				},
				cancel: function(h) {
					V.close();
				},
				afterClose: function() {
					V.destroy();
				}
			});
			var g = new sap.ui.model.json.JSONModel();
			g.setData({
				cols: C
			});
			V.setModel(g, "columns");
			V.setKey(M);
			if (a) {
				V.setKeys([M, a]);
			}
			if (m.supportMultiselect) {
				V.setRangeKeyFields(f);
			}
			if (I instanceof sap.m.MultiInput) {
				this.aTokens = I.getTokens();
			}
			V.setTokens(this.aTokens);
			V.setFilterBar(new sap.ui.comp.filterbar.FilterBar({
				advancedMode: true,
				filterItems: [new sap.ui.comp.filterbar.FilterItem({
					label: this.oResourceBundle.getText("SEARCH"),
					name: "s1",
					control: new sap.m.SearchField({
						value: I.getValue(),
						search: function() {
							V.getFilterBar().search();
						}
					})
				})],
				filterGroupItems: b,
				search: function(e) {
					// var s = v.getParameters().selectionSet;
					var s = e.getParameters().selectionSet;
					var B;
					if (V.getTable()) {
						B = V.getTable().getBinding("rows");
					} else {
						B = e.getSource().getParent().getParent().theTable.getBinding("rows");
					}
					var h = [];
					var A = true;
					var j = {};
					var k = [];
					for (var i = 0; i < f.length; i++) {
						if (s[i + 1].getValue() != "") {
							var l = new sap.ui.model.Filter(f[i].key, sap.ui.model.FilterOperator.Contains, s[i + 1].getValue());
							h.push(l);
							A = false;
						}
					}
					if (A && s[0].getValue() != "") {
						for (var i = 0; i < f.length; i++) {
							var l = new sap.ui.model.Filter(f[i].key, sap.ui.model.FilterOperator.Contains, s[0].getValue());
							h.push(l);
						}
						j = new sap.ui.model.Filter(h, false);
						k.push(j);
					} else if (!A) {
						j = new sap.ui.model.Filter(h, true);
						k.push(j);
					}
					if (B) {
						B.filter(k);
					}
				}
			}));
			if ((!this[M] || (this[M] && this[M]["sEntity"] !== E)) || !this._isArrayEqual(this[M]["aUrlParams"], u) || !this._isFilterArrayEqual(
					this[M]["aFilters"], F)) {
				var D = this.oApplicationFacade.getODataModel();
				var t = $.extend(true, [], u);
				var T = $.extend(true, [], F);
				D.read(E, {
					urlParameters: u,
					filters: F,
					success: function(h) {
						var i;
						var k;
						var l = new Array();
						for (i = 0; i < h.results.length; i++) {
							var n = {};
							for (var j = 0; j < f.length; j++) {
								var K = f[j].key;
								n[K] = h.results[i][K];
							}
							l.push(n);
						};
						k = new sap.ui.model.json.JSONModel();
						k.setDefaultBindingMode("OneWay");
						k.setProperty(c, l);
						_[M] = k;
						_[M]["sEntity"] = E;
						_[M]["aUrlParams"] = t;
						_[M]["aFilters"] = T;
						V.setModel(_[M]);
						if (V.getTable()) {
							V.getTable().bindRows(c);
						} else {
							V.theTable.bindRows(c);
						}
						V.update();
					}
				});
			} else {
				V.setModel(this[M]);
				if (V.getTable()) {
					V.getTable().bindRows(c);
				} else {
					V.theTable.bindRows(c);
				}
				V.update();
			}
			if (I.$().closest(".sapUiSizeCompact").length > 0) {
				V.addStyleClass("sapUiSizeCompact");
			}
			V.open();
			this._attachListenersForFilters();
		}
	};
})();