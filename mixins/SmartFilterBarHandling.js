/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.SmartFilterBarHandling");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.SmartFilterBarHandling = {
		_getFilterParamsForVariant: function(I, k) {
			var f = [];
			var e = this.getView().byId(I);
			if (e && e instanceof sap.m.MultiInput) {
				var F = e.getTokens();
				for (var i = 0; i < F.length; i++) {
					var c = F[i].getCustomData();
					for (var j = 0; j < c.length; j++) {
						if (c[j].getKey() === "row") {
							f.push({
								type: "row",
								keyField: k,
								operation: sap.ui.model.FilterOperator.EQ,
								value1: F[i].getKey(),
								tokenKey: F[i].getKey(),
								tokenText: F[i].getText()
							});
						} else if (c[j].getKey() === "range") {
							var r = c[j].getValue();
							r.type = "range";
							r.tokenKey = F[i].getKey();
							r.tokenText = F[i].getText();
							f.push(r);
						}
					}
				}
				if (e.getValue() !== "") {
					f.push({
						type: "value",
						keyField: k,
						value1: e.getValue()
					});
				}
			} else if (e && e instanceof sap.m.DateRangeSelection) {
				f.push({
					type: "date",
					keyField: k,
					value1: e.getDateValue(),
					value2: e.getSecondDateValue()
				});
			} else if (e && e instanceof sap.m.Input) {
				f.push({
					type: "value",
					keyField: k,
					value1: e.getValue()
				});
			}
			return f;
		},
		_setFilterParamsForVariant: function(I, f) {
			var e = this.getView().byId(I);
			if (!f) {
				return null;
			} else if (e && e instanceof sap.m.MultiInput) {
				e.setTokens([]);
				for (var i = 0; i < f.length; i++) {
					if (f[i].tokenKey) {
						var t = new sap.m.Token({
							key: f[i].tokenKey,
							text: f[i].tokenText
						});
						var T = f[i].type;
						delete f[i].type;
						delete f[i].tokenKey;
						delete f[i].tokenText;
						if (T === "row") {
							t.addCustomData(new sap.ui.core.CustomData({
								key: "row",
								value: f[i]
							}));
						} else if (T === "range") {
							t.addCustomData(new sap.ui.core.CustomData({
								key: "range",
								value: f[i]
							}));
						}
					} else if (f[i].value1) {
						e.setValue(f[i].value1);
					}
					e.addToken(t);
				}
			} else if (e && e instanceof sap.m.DateRangeSelection) {
				if (f[0].value1) {
					e.setDateValue(new Date(f[0].value1));
				}
				if (f[0].value2) {
					e.setSecondDateValue(new Date(f[0].value2));
				}
			} else if (e && e instanceof sap.m.Input) {
				e.setValue(f[0].value1);
			}
		},
		_getODataParameterForFilterBarSearch: function(r, s, o, a, t, f) {
			var F;
			var S;
			var b;
			var c;
			var d;
			var e;
			var g;
			var h;
			var k;
			var l;
			var O;
			var m;
			var T;
			var i, j;
			var p = null;
			var n = [];
			this._vFilterString = "";
			if (r) {
				if (!s) {
					s = [];
					l = "";
				} else {
					l = "";
					for (i = 0; i < s.length; i++) {
						l += s[i];
						if (i < (s.length - 1)) {
							l += ",";
						}
					}
				}
				if (!o) {
					o = [];
					O = "";
				} else {
					O = "";
					for (i = 0; i < o.length; i++) {
						O += o[i];
						if (i < (o.length - 1)) {
							O += ",";
						}
					}
				}
				if (!a || isNaN(a)) {
					m = 0;
				} else {
					m = a;
				}
				if (!t || isNaN(t)) {
					T = 0;
				} else {
					T = t;
				}
				F = this.getView().byId(f).getAllFilterItems();
				if (F.length > 0) {
					if (F[0] && F[0].getParent && F[0].getParent() && F[0].getParent()._aBasicAreaSelection && F[0].getParent()._aBasicAreaSelection[0] &&
						F[0].getParent()._aBasicAreaSelection[0].control && F[0].getParent()._aBasicAreaSelection[0].control.getValue) {
						S = F[0].getParent()._aBasicAreaSelection[0].control.getValue();
					} else if (F[0] && this.getView().byId(f).determineControlByFilterItem && this.getView().byId(f).determineControlByFilterItem(F[0]) &&
						this.getView().byId(f).determineControlByFilterItem(F[0]).getValue) {
						S = this.getView().byId(f).determineControlByFilterItem(F[0]).getValue();
					} else {
						S = "";
					}
				} else {
					S = "";
				}
				var I = this.getView().byId(f).getAllFilterItems();
				for (var i = 0; i < I.length; i++) {
					var C = this.getView().byId(f).determineControlByFilterItem(I[i]);
					if (C) {
						b = I[i];
						c = b.getName();
						if (c === r) {
							continue;
						}
						k = [];
						if (C instanceof sap.m.MultiInput) {
							d = C.getTokens();
							for (j = 0; j < d.length; j++) {
								e = d[j];
								g = e.data("range");
								if (g) {
									h = g.operation;
									if (g.exclude) {
										if (h === sap.ui.model.FilterOperator.EQ) {
											h = sap.ui.model.FilterOperator.NE;
										}
									}
									k.push(new sap.ui.model.Filter(g.keyField, h, g.value1, g.value2));
								} else {
									k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.EQ, e.getKey()));
									if (this._vFilterString == "") {
										this._vFilterString = "( ";
									}
									this._vFilterString = this._vFilterString + c + " eq " + "'" + e.getKey() + "'" + " " + "or ";
								}
							}
							if (C.getValue() !== "") {
								k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.EQ, C.getValue()));
							}
						} else if (C instanceof sap.m.DateRangeSelection) {
							var q = C.getDateValue();
							var u = C.getSecondDateValue();
							if( q && (u === null || u === undefined ))
							{
								u = q;
								u.setHours(23,59,59,59);
							}
							if ((q && u) && q.getDate() === u.getDate() && u.getMonth() === q.getMonth() && u.getFullYear() === q.getFullYear()){
								q = new Date(q + 'Z');
							    u = new Date(u + 'Z');
								k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.BT, q, u));
							} else  if ((q && u) && q.getTime() !== u.getTime()) {
								// q = new Date(q.getTime() - q.getTimezoneOffset() * 60 * 1000);
								// u = new Date(u.getTime() - u.getTimezoneOffset() * 60 * 1000);
								q = new Date(q + 'Z');
						     	u = new Date(u + 'Z');
								k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.BT, q, u));
							} else if ((q && u) && q.getTime() === u.getTime()) {
							    q = new Date(q + 'Z');
								// q = new Date(q.getTime() - q.getTimezoneOffset() * 60 * 1000);
								k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.EQ, q));
							} else if (q) {
								k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.EQ, C.getDateValue()));
							}
						} else if (C instanceof sap.m.Input) {
							k.push(new sap.ui.model.Filter(c, sap.ui.model.FilterOperator.EQ, C.getValue()));
						}
						if (k.length > 0) {
							n.push(new sap.ui.model.Filter(k, false));
							this._vFilterString = this._vFilterString.slice(0, (parseInt(this._vFilterString.length) - 3));
							this._vFilterString = this._vFilterString + " )" + " and " + "( ";
						}
					}
				}
				if (this._vFilterString != "") {
					this._vFilterString = this._vFilterString.slice(0, (parseInt(this._vFilterString.length) - 7));
				}
				p = {};
				p.context = null;
				p.urlParameters = ["search=" + S, "$select=" + l, "$orderby=" + O, "$skip=" + m, "$top=" + T];
				p.async = false;
				if (n.length > 0) {
					p.filters = [new sap.ui.model.Filter(n, true)];
				}
			}
			return p;
		},
		_attachListenersForFilters: function() {
			this.getView().byId("ME2STAR_SFB").getControlByKey("Supplier").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("MaterialGroup").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Plant").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingGroup").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Status").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("CostCenter").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("WBSElementExternalID").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("SalesOrder").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("ServicePerformer").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("WorkItem").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingOrganization").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Material").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("DeliveryDate").attachChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("SupplyingPlant").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingDocumentItemText").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingDocumentType").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchaseOrderItemCategory").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("AccountAssignmentCategory").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Supplier").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("MaterialGroup").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Plant").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingGroup").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Status").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("CostCenter").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("WBSElementExternalID").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("SalesOrder").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("ServicePerformer").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("WorkItem").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingOrganization").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Material").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("DeliveryDate").attachChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("SupplyingPlant").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingDocumentItemText").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchasingDocumentType").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("PurchaseOrderItemCategory").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("AccountAssignmentCategory").attachTokenChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Search").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Company").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("CreationDate").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("ElStatus").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Zzpersonincharge").attachLiveChange(this._setFilterChanged, this);
			this.getView().byId("ME2STAR_SFB").getControlByKey("Requi").attachLiveChange(this._setFilterChanged, this);
			
		},
		_setFilterChanged: function(e) {
			this._filterChanged = true;
		},
		onReset: function(e) {
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
			var s = e.getParameters()[0].selectionSet;
			for (var i = 0; i < s.length; i++) {
				var S = s[i];
				if (S instanceof sap.m.SearchField) {
					S.setValue("");
				} else if (S instanceof sap.m.MultiInput) {
					S.setTokens([]);
					S.setValue("");
				} else if (S instanceof sap.m.Input) {
					S.setValue("");
				} else if (S instanceof sap.m.DateRangeSelection) {
					S.setDateValue();
					S.setSecondDateValue();
				}
			}
			this._applyGroup(this._getBinding(), this._getSortersForGrouping(this._groupKey, this._descendingGroup));
			this._applyFilter(this._getBinding());
			this._updateCount();
			this.smartFilterCondition = null;
		},
		handleChange: function(e) {
			this.POFilterChanged = true;
			this.PRFilterChanged = true;
			this.SIFilterChanged = true;
			this.GRFilterChanged = true;
		},
		onSearchButtonPressed: function(e) {
			var b = this._getBinding();
			if (this.bInitialLoadingCompleted && b === undefined) {
				this._checkBindingAndInitialize();
				b = this._getBinding();
			}
			if (this._filterChanged == true) {
				this.POFilterChanged = true;
				this.PRFilterChanged = true;
				this.SIFilterChanged = true;
				this.GRFilterChanged = true;
				this._groupKeyOld = "";
				this.OverviewFilterChanged = true;
			}
			if (b) {
				var p = this._getODataParameterForFilterBarSearch("filterBar", [], [], 0, 0, "ME2STAR_SFB");
				var s = p.urlParameters[0].replace("search=", "");

				if(this._PODisp === true){
				  	s =	this._customSearchKey;	
				}else{
				   this._customSearchKey = s;
				}
				b.sCustomParams = b.oModel.createCustomParams({
					custom: {
						search: s
					},
					select: this._getCustomSelectParameters(this._groupKey)
				});
				var f = p.filters;
				if (f && f.length > 0) {
					var F = new sap.ui.model.Filter(f, true);
					this.smartFilterCondition = f;
					this._applyFilter(b, f);
					this._updateCount([F]);
				} else {
					this.smartFilterCondition = null;
					this._applyFilter(b);
					this._updateCount();
				}
				if (f === undefined) {
					this._filterChanged = true;
				} else {
					this._filterChanged = false;
				}
			} else {
				var p1 = this._getODataParameterForFilterBarSearch("filterBar", [], [], 0, 0, "ME2STAR_SFB");
				var s1 = p1.urlParameters[0].replace("search=", "");
				if(this._PODisp === true){
				  	s1 =	this._customSearchKey;	
				}else{
				   this._customSearchKey = s1;
				}
				var f1 = p1.filters;
				if (f1 && f1.length > 0) {
				var F1 = new sap.ui.model.Filter(f1, true);
				this._updateCount([F1]);
				this.bInitialLoadingCompleted = true;
			    }else{
				this._updateCount();
				this.bInitialLoadingCompleted = true;
			    }
			}
		},
		_applyFilter: function(b, f) {
			var F = false;
			var t = this.getView().byId("v210IconTabBar").getSelectedKey();
			switch (t) {
				case "PO":
					F = this.POFilterChanged;
					break;
				case "PR":
					F = this.PRFilterChanged;
					break;
				case "GR":
					F = this.GRFilterChanged;
					break;
				case "SI":
					F = this.SIFilterChanged;
					break;
				case "ALL":
					F = this.OverviewFilterChanged;
					break;
				default:
					break;
			}
			if (F == true || (b && f)) {
				b.aApplicationFilters = [];
				b.sCustomParams = b.oModel.createCustomParams({
					custom: {
						search: this._customSearchKey
					},
					select: this._getCustomSelectParameters(this._groupKey)
				});
				if (f == null | f == undefined) {
					f = [];
				}
				if (f.length > 0) {
					var o = new sap.ui.model.Filter(f, true);
					b.filter(f, true);
				} else {
					if (this._customSearchKey != "") {
						b.filter();
					} else {
						b.filter(null);
					}
				}
				if (this.POFilterChanged) {
					var I = this.getView().byId("POTable").getItems();
					for (var i = 0; i < I.length; ++i) {
						if (I[i].getCells && I[i].getCells() && I[i].getCells()[0] && I[i].getCells()[0].setSelected) {
							I[i].getCells()[0].setSelected(false);
						}
					}
					this._validForPostGR();
				}
				switch (t) {
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
			}
		}
	};
})();