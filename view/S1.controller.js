/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("elsan.zmmpur.puritems.util.formatter");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
jQuery.sap.require("sap.ui.model.FilterOperator");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.ValueHelp");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.TypeAheadSuggestion");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.SmartFilterBarHandling");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.ValueHelpHandler");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.VariantHandling");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.InitializingOfTabs");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.InnerAppNavigation");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.TableLayout");
jQuery.sap.require("elsan.zmmpur.puritems.mixins.Validation");
jQuery.sap.require("sap.m.TablePersoController");
jQuery.sap.require("elsan.zmmpur.puritems.util.personalizer");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.ui.export.Spreadsheet");
// jQuery.sap.require("elsan.zmmpur.puritems.fragments.PurchaseEmailPopup");
sap.ca.scfld.md.controller.BaseFullscreenController.extend("elsan.zmmpur.puritems.view.S1", {
	onInit: function () {
		if (!jQuery.support.touch) {
			this.getView().addStyleClass("sapUiSizeCompact");
		}
		this._customSearchKey = "";
		this._PODisp = false;
		this.GroupKey = "Supplier";
		this._groupKey = "Supplier";
		this._sortKey = "";
		this.SortKey = "";
		this._groupKeyOld = "";
		this.overviewSelectParams = "SupplierName,Supplier,Cnt,CntF,CntB,CntG,CntS";
		this.POSelectParams =
			"Supplier,SupplierName,PurchasingGroupName,PurchasingGroup,PurchasingOrganization,PurchasingOrganizationName,PurchasingDocumentType,PurchasingDocumentCategory,PurgDocumentTypeDescription,PurchasingDocument,PurchasingDocumentItem,Material,MaterialName,MaterialGroup,MaterialGroupName,PurchaseOrderQuantity,PurchaseOrderQuantityUnit,GoodsReceiptQuantity,Plant,InvoiceReceiptQuantity,PurchaseOrderNetAmount,Currency,InvoiceReceiptValue,GoodsReceiptValue,PurchasingDocumentItemText,Status,StatusDescription,PostGr,WBSElementExternalID,SalesOrder,SalesOrderItem,CostCenter,CostCenterName,ControllingArea,WorkPackageFullName,WBSDescription,WeightedRelevance,ServicePerformer,ServicePerformerName,DeliveryDate,SupplyingPlant,SupplyingPlantName,PurchasingDocumentItemText,PurchasingDocumentType,PurchaseOrderItemCategory,PurchaseOrderItemCategoryName,AccountAssignmentCategory,AccountAssignmentCategoryName,PurchasingDocumentItemText,DocumentCurrency,Company,RequisitionerName,PrNum,PrItm,CreationDate,Zzpersonincharge,EmailStatus,PrintStatus,NastStatus,ZzpersoninchargeName,ElstatusName,PurchaseRequisition,PurchaseRequisitionItem,Requi,Venpdh";
		this.PRSelectParams =
			"Supplier,SupplierName,PurchasingGroupName,PurchasingGroup,PurchasingDocumentType,PurchasingDocument,PurchasingDocumentCategory,PurgDocumentTypeDescription,PurchaseRequisition,PurchaseRequisitionItem,Material,MaterialName,MaterialGroup,MaterialGroupName,OrderedQuantity,OrderedQuantityUnit,RequisitionerUser,Plant,PlantName,Status,StatusDescription,DeliveredQuantity,CreatedByUser,Cnt,WeightedRelevance,DeliveryDate,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory,OpExternalProcessingPrice,Currency,Zzsuppliermaterialnumber,RequisitionDate,FixedVendor,Zzpersonincharge,Zzpo,ZzpersoninchargeName,ElstatusName,Requi,PurchasingOrganization,Fixedvendorname,PurchasingOrganizationName,Venpdh,Company,RequisitionerName";
		this.SISelectParams =
			"PurchasingDocument,InvoiceReferenceFiscalYear,PurchasingDocumentItem,PurchaseOrder,PurchaseOrderItem,Material,Quantity,QuantityUnit,GoodsMovementQuantity,AmountInTranactionCurrency,CompanyCodeCurrency,PurchaseOrderItemQuantity,PurchaseOrderItemNetAmount,PurchaseOrderCurrency,Status,PurchasingGroup,SupplyingPlant,MaterialGroup,Supplier,SupplierName,PurchasingOrganization,PurchasingOrganizationName,MaterialName,MaterialGroupName,InvoiceTypeDescription,Status,Plant,PurchasingDocumentItemText,PurchasingDocumentType,PurchasingGroupName,DocumentDate,CreationDate,PurchaseOrderVendor,EnteredByUser,InvoiceReceiptHeaderText,InvoiceReference1,MfgOrderSequenceBranchOpearat,BankAccount,BankCountryKey,InvoiceReceiptDate,BusinessArea,ErpContractId,AccountingDocumentType,PaymentTerm,PostingDate,PurchasingDocumentCategory,PurchasingDocumentCategory,StatusDescription,WBSElementExternalID,SalesOrder,SalesOrderItem,CostCenter,CostCenterName,ControllingArea,WorkPackageFullName,WBSDescription,DeliveryDate,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory,Venpdh";
		this.GRSelectParams =
			"PurchasingDocument,PurchasingDocumentItem,MaterialDocumentYear,GoodsMovementType,PurchaseOrder,PurchaseOrderItem,PurchaseOrderType,Material,MaterialGroup,PurchaseOrderQty,Quantity,PurgOrderQuantityUnit,DeliveryDate,PostingDate,PurchasingGroup,SupplyingPlant,Supplier,SupplierName,PurchasingOrganization,PurchasingOrganizationName,ServicePerformer,ServicePerformerName,WorkItem,WorkItemName,MaterialName,MaterialGroupName,PurgDocumentTypeDescription,Status,Plant,PlantName,PurchasingDocumentItemText,PurchasingDocumentType,PurchasingGroupName,PurchasingDocumentCategory,StatusDescription,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory,Venpdh";
		this.AppliedFacetKey = [];
		this.tempFacet = {};
		this.navFilter = "";
		this.FacetAppliedid = "";
		this.OverviewBinded = false;
		this.POBinded = false;
		this.PRBinded = false;
		this.DescendingSort = false;
		this._descendingSort = false;
		this.oDataFilter = null;
		this.smartFilterCondition = null;
		this.OverviewFilterChanged = false;
		this._filterChanged = false;
		this.POFilterChanged = false;
		this.PRFilterChanged = false;
		this.SIFilterChanged = false;
		this.GRFilterChanged = false;
		this.OverviewGroupChanged = false;
		this.POGroupChanged = false;
		this.PRGroupChanged = false;
		this.GRGroupChanged = false;
		this.SIGroupChanged = false;
		this.POSortChanged = false;
		this.PRSortChanged = false;
		this.GRSortChanged = false;
		this.SISortChanged = false;
		this.OverviewSearchChanged = false;
		this.POSearchChanged = false;
		this.FacetFilterApplied = false;
		this.statusRegister = false;
		this._sortGroup = "Group";
		this._vFilterString = "";
		this._tabKey = "ALL";
		this._extTabKey = "";
		this.oResourceBundle = this.oApplicationFacade.getResourceBundle();
		this.oFacetFilter = this.byId("v210FacetFilter");
		this.oIconTabBar = this.byId("v210IconTabBar");
		this.navLabel = this.byId("navLabel");
		this._oPGRValidPO = {
			_vPONumber: "",
			_bValid: false,
			_bBackendValidation: false,
			_bSingleSelection: false,
			_bSelectionDone: false,
			_POTyp: "",
			_PO: "",
			_POStat: "",
			_vPONumberItem: ""
		};
		this.Cross = "";
		var _ = this;
		this._oTPC_PO = new sap.m.TablePersoController({
			table: this.getView().byId("POTable"),
			persoService: elsan.zmmpur.puritems.util.PersoService
		}).activate();
		this._oTPC_SI = new sap.m.TablePersoController({
			table: this.getView().byId("SITable"),
			persoService: elsan.zmmpur.puritems.util.PersoService
		}).activate();
		this._oTPC_PR = new sap.m.TablePersoController({
			table: this.getView().byId("PRTable"),
			persoService: elsan.zmmpur.puritems.util.PersoService
		}).activate();
		this._oTPC_GR = new sap.m.TablePersoController({
			table: this.getView().byId("GRTable"),
			persoService: elsan.zmmpur.puritems.util.PersoService
		}).activate();
		this.cellIndexToTabKeyMap = {
			0: "ALL",
			6: "PO",
			5: "PR",
			7: "GR",
			8: "SI"
		};
		this.filterNameToFilterIndexMap = {
			"SUPPLIER": 0,
			"PURCHASING_GROUP": 1,
			"MATERIAL_GROUP": 2,
			"PLANTS": 3,
			"STATUS": 4
		};
		this.GroupItems = ["Supplier", "MaterialGroup", "PurchasingGroup", "Plant", "Status"];
		this.oApplicationFacade.getODataModel().setDefaultCountMode(sap.ui.model.odata.CountMode.Inline);
		this._applyGroup(this._getBinding("ALL"), this._getSortersForGrouping("Supplier", false));
		this._applyFilter(this._getBinding("ALL"), this.smartFilterCondition);
		this._quant_format_fixed = function (v, u) {
			var x = sap.ui.core.format.NumberFormat.getFloatInstance({
				minFractionDigits: 0,
				maxFractionDigits: 3
			}).format(v);
			return x + " " + u;
		};

		var c = sap.ui.core.Component.getOwnerIdFor(this.getView());
		this.bInitialLoadingCompleted = true;
		this._oComponentData = sap.ui.component(c).getComponentData();
		if (this._oComponentData.startupParameters.PUR) {
			var m = this.getView().byId("searchField");
			m.setValue(this._oComponentData.startupParameters.PUR[0]);
			m.setEnabled(false);
			this._customSearchKey = this._oComponentData.startupParameters.PUR[0];
			var tab = this.getView().byId("v210IconTabBar");
			tab.setSelectedKey("PO");
			this.POFilterChanged = true;
			this._PODisp = true;
			this._checkBindingAndInitialize("PO");
		} else if (sap.ushell.Container.getService("UserInfo").getUser().getId()) {
			var requ = [];
			var row = {
				keyField: "Requi",
				operation: "EQ",
				tokenKey: sap.ushell.Container.getService("UserInfo").getUser().getId(),
				tokenText: sap.ushell.Container.getService("UserInfo").getUser().getFullName(),
				type: "row",
				value1: sap.ushell.Container.getService("UserInfo").getUser().getId()
			};
			requ.push(row);
			this._setFilterParamsForVariant("filterBarInputRequi", requ);
			// this._filterChanged = true;
		}

		this.oRouter.attachRouteMatched(function (e) {
			if (_.oApplicationFacade.getODataModel().getServiceMetadata()) {
				if (e.getParameter("arguments") && !e.getParameter("arguments").hasOwnProperty("activity")) {
					_._handleExternalNavigation();
				}
			} else {
				_.oApplicationFacade.getODataModel().attachMetadataLoaded(null, function () {
					_._handleExternalNavigation();
				}, _);
			}
		});
	},
	_getDownloadUrl: function (b, t, f) {
		var p = [],
			P;
		if (f) {
			p.push("$format=" + encodeURIComponent(f));
		}
		if (b.sSortParams) {
			// p.push(b.sSortParams);
		}
		if (b.sFilterParams) {
			p.push(b.sFilterParams);
		}
		if (b.sCustomParams) {
			var aCols = this._createColumnConfig(t);
			var k = b.sCustomParams.split("select");
			var s = k[0].concat("select=", aCols);
			// p.push(b.sCustomParams);
			p.push(s);
		}
		P = b.oModel.resolve(b.sPath, b.oContext);
		if (P) {
			return b.oModel._createRequestUrl(P, null, p);
		}
	},
	onDataExport: function (e) {
		var t = e.getSource().getParent().getParent();
		var b = t.getBinding("items");
		var d = this._getDownloadUrl(b, t, "xlsx");
		sap.m.URLHelper.redirect(d, true);

	},
	/**
	 * Event Downlaod Button Pressed
	 * @returns {Promise.<Object>} return excel column
	 * @public
	 **/
	_createColumnConfig: function (t) {
		var aColumn = t.getColumns();
		var aTmp = t.getBindingInfo("items").template.getAggregation("cells");
		var aCol;
		var qan = this.getView().getModel("i18n").getResourceBundle().getText("QUANTITY");

		for (var i = 0; i < aColumn.length; i++) {
			if (aColumn[i].getVisible() === true) {
				var m = aTmp[i].getBindingInfo("text");
				var ti = aTmp[i].getBindingInfo("title");
				if (m) {
					for (var j = 0; j < m.parts.length; j++) {
						if (m.parts[j].model && m.parts[j].model === 'i18n') {
							continue;
						}
						if (aCol) {
							if(m.parts[j].path === "RequisitionerName")
							{
								aCol = aCol + '%2c' + "Requi";
							}
							aCol = aCol + '%2c' + m.parts[j].path; 
						} else {
							aCol = m.parts[j].path;
						}
					}

					if (ti) {
						for (var j = 0; j < ti.parts.length; j++) {
							if (ti.parts[j].model && ti.parts[j].model === 'i18n') {
								continue;
							}
							if (aCol) {
								aCol = aCol + '%2c' + ti.parts[j].path;
							} else {
								aCol = ti.parts[j].path;
							}
						}
					}
				} else if (aColumn[i].getHeader().mProperties.text.includes(qan)) {
					var s = aTmp[i].getAggregation("content");
					if (s && s.length > 1) {
						for (var l = 0; l < s.length; l++) {
							var s1 = aTmp[i].getAggregation("content")[l].getAggregation("content")[1].getBindingInfo("text");
							if (s1) {
								for (var r = 0; r < s1.parts.length; r++) {
									if (aCol) {
										aCol = aCol + '%2c' + s1.parts[r].path;
									} else {
										aCol = s1.parts[r].path;
									}
								}

							}

						}
					} else {
						var s0 = s[0].getBindingInfo("text");
						if (s0) {
							for (var x = 0; x < s0.parts.length; x++) {
								if (aCol) {
									aCol = aCol + '%2c' + s0.parts[x].path;
								} else {
									aCol = s0.parts[x].path;
								}
							}

						}

					}

				}
			}
		}
		return aCol;
	},

	getHeaderFooterOptions: function () {
		var t = this;
		return {
			buttonList: [
				// 	{
				// 	sId: "ft_PO",
				// 	sI18nBtnTxt: "CREATE_PO",
				// 	bDisabled: true,
				// 	onBtnPressed: function() {
				// 		t.CreatePO(null);
				// 	}
				// },
				{
					sId: "ft_email",
					sI18nBtnTxt: "email",
					bDisabled: true,
					onBtnPressed: function () {
						t.Sendemail(null);
					}
				}, {
					sId: "ft_print",
					sI18nBtnTxt: "print",
					bDisabled: true,
					onBtnPressed: function () {
						t.POprint(null);
					}
				}, {
					sId: "ft_PostGR",
					sI18nBtnTxt: "POST_GR",
					bDisabled: true,
					onBtnPressed: function () {
						t.PostGR(null);
					}
				}
			]
		};
	},
	_getPONumber: function (p) {
		return p.split("/")[0].replace("(", "").trim();
	},
	_getFilterNameById: function (i) {
		if (parseInt(i.search("searchField"), 10) > 0) {
			return "search";
		} else {
			return i.slice(parseInt(i.search("filterBarInput"), 10) + 14);
		}
	},
	onSelectorPress: function (e) {
		this.oObjectHeaderIconDomRef = e.getParameters().domRef;
	},
	_IconCountHandler: function (t, c) {
		if (typeof t === "string" && typeof c === "string") {
			var C = Number(c);
			this.getView().byId(t).setCount(C);
			C += Number(this.getView().byId("overviewTab").getCount());
			this.getView().byId("overviewTab").setCount(C);
		} else if (typeof t === "object" && t.results && Array.isArray(t.results)) {
			var d = t;
			var f = 0,
				b = 0,
				g = 0,
				s = 0;
			for (var i = 0; i < d.results.length; i++) {
				switch (d.results[i].PurchasingDocumentCategory) {
				case "F":
					f = f + d.results[i].Cnt;
					break;
				case "B":
					b = b + d.results[i].Cnt;
					break;
				case "S":
					s = s + d.results[i].Cnt;
					break;
				case "G":
					g = g + d.results[i].Cnt;
					break;
				default:
					break;
				}
			}
			var o = f + b + s + g;
			this.getView().byId("overviewTab").setCount(o);
			this.getView().byId("POTab").setCount(f);
			this.getView().byId("PRTab").setCount(b);
			this.getView().byId("GRTab").setCount(g);
			this.getView().byId("SITab").setCount(s);
		}
	},
	onPersoButtonPressed: function () {
		var t = this.getView().byId("v210IconTabBar").getSelectedKey();
		switch (t) {
		case "PO":
			this._oTPC_PO.openDialog();
			break;
		case "SI":
			this._oTPC_SI.openDialog();
			break;
		case "PR":
			this._oTPC_PR.openDialog();
			break;
		case "GR":
			this._oTPC_GR.openDialog();
			break;
		default:
			break;
		}
	},
	onAfterRendering: function () {
		if (this._extTabKey && this._extTabKey !== "") {
			for (var k in this.cellIndexToTabKeyMap) {
				if (this.cellIndexToTabKeyMap[k] === this._extTabKey) {
					this._tabKey = this._extTabKey;
					this.oIconTabBar.setSelectedKey(this._extTabKey);
					this.tabSelected();
					break;
				}
			}
		}
	}
});
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.ValueHelp);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.SmartFilterBarHandling);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.ValueHelpHandler);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.TypeAheadSuggestion);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.VariantHandling);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.InitializingOfTabs);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.InnerAppNavigation);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.TableLayout);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype, elsan.zmmpur.puritems.mixins.Validation);