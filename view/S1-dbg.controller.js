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

sap.ca.scfld.md.controller.BaseFullscreenController
  .extend(
    "elsan.zmmpur.puritems.view.S1",
    {

     onInit : function() {
      if (!jQuery.support.touch) {
       this.getView().addStyleClass("sapUiSizeCompact");
      }

      this._customSearchKey = "";
      this.GroupKey = "Supplier";
      this._groupKey = "Supplier";
      this._sortKey = "";
      this.SortKey = "";
      this._groupKeyOld = "";
      this.overviewSelectParams = "SupplierName,Supplier,Cnt,CntF,CntB,CntG,CntS";
      this.POSelectParams = "Supplier,SupplierName,PurchasingGroupName,PurchasingGroup,PurchasingOrganization,PurchasingOrganizationName,PurchasingDocumentType,PurchasingDocumentCategory,PurgDocumentTypeDescription,PurchasingDocument,PurchasingDocumentItem,Material,MaterialName,MaterialGroup,MaterialGroupName,PurchaseOrderQuantity,PurchaseOrderQuantityUnit,GoodsReceiptQuantity,Plant,InvoiceReceiptQuantity,PurchaseOrderNetAmount,Currency,InvoiceReceiptValue,GoodsReceiptValue,PurchasingDocumentItemText,Status,StatusDescription,PostGr,WBSElementExternalID,SalesOrder,SalesOrderItem,CostCenter,CostCenterName,ControllingArea,WorkPackageFullName,WBSDescription,WeightedRelevance,ServicePerformer,ServicePerformerName,DeliveryDate,SupplyingPlant,SupplyingPlantName,PurchasingDocumentItemText,PurchasingDocumentType,PurchaseOrderItemCategory,PurchaseOrderItemCategoryName,AccountAssignmentCategory,AccountAssignmentCategoryName,PurchasingDocumentItemText,DocumentCurrency";
      this.PRSelectParams = "Supplier,SupplierName,PurchasingGroupName,PurchasingGroup,PurchasingDocumentType,PurchasingDocument,PurchasingDocumentCategory,PurgDocumentTypeDescription,PurchaseRequisition,PurchaseRequisitionItem,Material,MaterialName,MaterialGroup,MaterialGroupName,OrderedQuantity,OrderedQuantityUnit,RequisitionerUser,Plant,PlantName,Status,StatusDescription,DeliveredQuantity,CreatedByUser,Cnt,WeightedRelevance,DeliveryDate,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory";
      this.SISelectParams = "PurchasingDocument,InvoiceReferenceFiscalYear,PurchasingDocumentItem,PurchaseOrder,PurchaseOrderItem,Material,Quantity,QuantityUnit,GoodsMovementQuantity,AmountInTranactionCurrency,CompanyCodeCurrency,PurchaseOrderItemQuantity,PurchaseOrderItemNetAmount,PurchaseOrderCurrency,Status,PurchasingGroup,SupplyingPlant,MaterialGroup,Supplier,SupplierName,PurchasingOrganization,PurchasingOrganizationName,MaterialName,MaterialGroupName,InvoiceTypeDescription,Status,Plant,PurchasingDocumentItemText,PurchasingDocumentType,PurchasingGroupName,DocumentDate,CreationDate,PurchaseOrderVendor,EnteredByUser,InvoiceReceiptHeaderText,InvoiceReference1,MfgOrderSequenceBranchOpearat,BankAccount,BankCountryKey,InvoiceReceiptDate,BusinessArea,ErpContractId,AccountingDocumentType,PaymentTerm,PostingDate,PurchasingDocumentCategory,PurchasingDocumentCategory,StatusDescription,WBSElementExternalID,SalesOrder,SalesOrderItem,CostCenter,CostCenterName,ControllingArea,WorkPackageFullName,WBSDescription,DeliveryDate,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory";
      this.GRSelectParams = "PurchasingDocument,PurchasingDocumentItem,MaterialDocumentYear,GoodsMovementType,PurchaseOrder,PurchaseOrderItem,PurchaseOrderType,Material,MaterialGroup,PurchaseOrderQty,Quantity,PurgOrderQuantityUnit,DeliveryDate,PostingDate,PurchasingGroup,SupplyingPlant,Supplier,SupplierName,PurchasingOrganization,PurchasingOrganizationName,ServicePerformer,ServicePerformerName,WorkItem,WorkItemName,MaterialName,MaterialGroupName,PurgDocumentTypeDescription,Status,Plant,PlantName,PurchasingDocumentItemText,PurchasingDocumentType,PurchasingGroupName,PurchasingDocumentCategory,StatusDescription,SupplyingPlant,PurchasingDocumentItemText,PurchasingDocumentType,AccountAssignmentCategory";
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
      //this.aBusyDialog = [];
      this.oResourceBundle = this.oApplicationFacade
        .getResourceBundle();
      this.oFacetFilter = this.byId("v210FacetFilter");
      this.oIconTabBar = this.byId("v210IconTabBar");
      this.navLabel = this.byId("navLabel");
      this._oPGRValidPO = {
       _vPONumber : "",
       _bValid : false,
       _bBackendValidation : false,
       _bSingleSelection : false,
       _bSelectionDone : false
      };
      var _that = this;
      // personalization ver2
      this._oTPC_PO = new sap.m.TablePersoController(
        {
         table : this.getView().byId("POTable"),
         persoService : elsan.zmmpur.puritems.util.PersoService
        }).activate();

      this._oTPC_SI = new sap.m.TablePersoController(
        {
         table : this.getView().byId("SITable"),
         persoService : elsan.zmmpur.puritems.util.PersoService
        }).activate();

      this._oTPC_PR = new sap.m.TablePersoController(
        {
         table : this.getView().byId("PRTable"),
         persoService : elsan.zmmpur.puritems.util.PersoService
        }).activate();

      this._oTPC_GR = new sap.m.TablePersoController(
        {
         table : this.getView().byId("GRTable"),
         persoService : elsan.zmmpur.puritems.util.PersoService
        }).activate();

      this.cellIndexToTabKeyMap = {
       0 : "ALL",
       6 : "PO",
       5 : "PR",
       7 : "GR",
       8 : "SI"
      };
      this.filterNameToFilterIndexMap = {
       "SUPPLIER" : 0,
       "PURCHASING_GROUP" : 1,
       "MATERIAL_GROUP" : 2,
       "PLANTS" : 3,
       "STATUS" : 4
      };

      this.GroupItems = [ "Supplier", "MaterialGroup",
        "PurchasingGroup", "Plant", "Status" ];

      this.oApplicationFacade.getODataModel()
        .setDefaultCountMode(
          sap.ui.model.odata.CountMode.Inline);

      this._applyGroup(this._getBinding("ALL"), this
        ._getSortersForGrouping("Supplier", false));
      this._applyFilter(this._getBinding("ALL"),
        this.smartFilterCondition);

      // Begin of tab selected code
      // Formatter for Quantity from here
      this._quant_format_fixed = function(oValue, oUnit) {
       var x = sap.ui.core.format.NumberFormat.getFloatInstance({
        minFractionDigits: 0, maxFractionDigits: 3
       }).format(oValue);
       // x = " " + x;
       return x + " " + oUnit;

      };

      this.oRouter
        .attachRouteMatched(function(oEvent) {
         if (_that.oApplicationFacade
           .getODataModel()
           .getServiceMetadata()) {
          if (oEvent.getParameter("arguments")
            && !oEvent.getParameter(
              "arguments")
              .hasOwnProperty(
                "activity")) {
                                            _that._handleExternalNavigation();
          }
         } else {
          _that.oApplicationFacade
           .getODataModel().attachMetadataLoaded(null, function(){
            _that._handleExternalNavigation();
          },_that);
         }
        });
     },

     _getDownloadUrl : function(oBinding, sFormat) {

      var aParams = [],
      sPath;
      if (sFormat) {
       aParams.push("$format=" + encodeURIComponent(sFormat));
      }
      if (oBinding.sSortParams) {
       aParams.push(oBinding.sSortParams);
      }
      if (oBinding.sFilterParams) {
       aParams.push(oBinding.sFilterParams);
      }
      if (oBinding.sCustomParams) {
       aParams.push(oBinding.sCustomParams);
      }

      sPath = oBinding.oModel.resolve(oBinding.sPath, oBinding.oContext);

      if (sPath) {
       return oBinding.oModel._createRequestUrl(sPath, null, aParams);
      }

     },

     /**
     * Called if download button is pressed 
     * @param {Object} oEvent - event which is caused by pressing button
     */
     onDataExport: function (oEvent) {
      var oTable = oEvent.getSource().getParent().getParent();
      var oBinding = oTable.getBinding("items");
      var sDownloadURL = this._getDownloadUrl(oBinding, "xlsx");
      sap.m.URLHelper.redirect(sDownloadURL, true);
     },

     getHeaderFooterOptions : function() {
      var that = this;
      return {
       buttonList : [ {
        sId : "ft_PO",
        sI18nBtnTxt : "CREATE_PO",
        bDisabled : true,
        onBtnPressed : function() {
         that.CreatePO(null);
        }
       }, {
        sId : "ft_PostGR",
        sI18nBtnTxt : "POST_GR",
        bDisabled : true,
        onBtnPressed : function() {
         that.PostGR(null);
        }
       }]
      };
      // this.setHeaderFooterOptions(this.oHeaderFooterOptions);
     },

     _getPONumber : function(vPONumber) {
      return vPONumber.split("/")[0].replace("(", "").trim();
     },

     _getFilterNameById : function(vId) {
      if (parseInt(vId.search("searchField"),10) > 0) {
       return "search";
      } else {
       return vId.slice(parseInt(vId
         .search("filterBarInput"),10) + 14);
      }

     },
     onSelectorPress : function(oEvent) {
      this.oObjectHeaderIconDomRef = oEvent.getParameters().domRef;
      // this.readVariantList();
     },
     _IconCountHandler : function(sTab, sCounterValue){
      if ( typeof sTab === "string" && typeof sCounterValue === "string" ) {
       //set the certain counter on <sTab> from the OData response
       var iCnt = Number( sCounterValue );
       this.getView().byId( sTab ).setCount( iCnt );
       //update the overview counter on overviewTab
       iCnt += Number( this.getView().byId("overviewTab").getCount() );
       this.getView().byId("overviewTab").setCount( iCnt );
      }
      else if (typeof sTab === "object" && sTab.results && Array.isArray(sTab.results)) {
       var oData = sTab;
       var f = 0, b = 0, g = 0, s = 0;
       for (var i = 0; i < oData.results.length; i++) {

        switch(oData.results[i].PurchasingDocumentCategory){
         case "F": 
          f = f + oData.results[i].Cnt;
          break;
         case "B": 
          b = b + oData.results[i].Cnt;
          break;
         case "S": 
          s = s + oData.results[i].Cnt;
          break;
         case "G": 
          g = g + oData.results[i].Cnt;
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
     // Personalization
     onPersoButtonPressed : function() {

      var vTab = this.getView().byId("v210IconTabBar")
        .getSelectedKey();
      switch (vTab) {
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

                 onAfterRendering: function() {
                        if (this._extTabKey && this._extTabKey !== "") {
                         for (var key in this.cellIndexToTabKeyMap) {
                          if (this.cellIndexToTabKeyMap[key] === this._extTabKey) {
                           this._tabKey = this._extTabKey;
                           this.oIconTabBar.setSelectedKey(this._extTabKey);
                           this.tabSelected();
                           break;
                          }
                         }
                        }
                 }
    });

jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.ValueHelp);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.SmartFilterBarHandling);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.ValueHelpHandler);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.TypeAheadSuggestionMe2Star);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.TypeAheadSuggestion);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.ExternalNavigationFromOutside);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.ExternalNavigationToOutside);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.VariantHandling);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.InitializingOfTabs);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.InnerAppNavigation);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.TableLayout);
jQuery.extend(elsan.zmmpur.puritems.view.S1.prototype,
  elsan.zmmpur.puritems.mixins.Validation);