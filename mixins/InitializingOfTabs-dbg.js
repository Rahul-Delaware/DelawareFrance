/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.InitializingOfTabs");

(function() {
 "use strict";
 elsan.zmmpur.puritems.mixins.InitializingOfTabs = {
  _checkBindingAndInitialize: function(vTab) {

   switch (vTab) {
    case "PO":
     if (!this.POBinded) {
      this._initializePO();
     }
     break;

    case "PR":
     if (!this.PRBinded) {
      this._initializePR();
     }
     break;

    case "GR":
     if (!this.GRBinded) {
      this._initializeGR();
     }
     break;

    case "SI":
     if (!this.SIBinded) {
      this._initializeSI();
     }
     break;
    default:
     if (!this.OverviewBinded) {
      this._initializeOverview();
     }
     break;
   }

  },

  _initializeOverview: function() {
   var oTemplate = new sap.m.ColumnListItem({
    vAlign: "Middle",
    cells: [
      new sap.m.ObjectListItem({
       id:this.createId("Supplier"),
       title:"{Supplier}",
       attributes: [
        new sap.m.ObjectAttribute({
         text:"{path: 'SupplierName', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
        })]
      }),
      new sap.m.ObjectListItem({
       id:this.createId("MaterialGroup"),
       title:"{MaterialGroup}",
       visible:false,
       attributes: [
        new sap.m.ObjectAttribute({
         text:"{path: 'MaterialGroupName', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
        })]
      }),
      new sap.m.ObjectListItem({
       id:this.createId("PurchasingGroup"),
       title:"{PurchasingGroup}",
       visible:false,
       attributes: [
        new sap.m.ObjectAttribute({
         text:"{path: 'PurchasingGroup', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
        })]
      }),
      new sap.m.ObjectListItem({
       id:this.createId("Plant"),
       title:"{Plant}",
       visible:false,
       attributes: [
        new sap.m.ObjectAttribute({
         text:"{PlantName}"
        })]
      }),
      new sap.m.ObjectListItem({
       id:this.createId("Status"),
       title:"{StatusText}",
       visible:false
      }),
      new sap.m.Link({
       text:"{CntB}",
       press:[this.handleNavigation, this]
      }),
      new sap.m.Link({
       text:"{CntF}",
       press:[this.handleNavigation, this]
      }),
      new sap.m.Link({
       text:"{CntG}",
       press:[this.handleNavigation, this]
      }),
      new sap.m.Link({
       text:"{CntS}",
       press:[this.handleNavigation, this]
      })
     ]
    });
   this.getView().byId("overviewTable").bindItems({path:"/M2SOview", template: oTemplate, parameters:{select:"SupplierName,Supplier,Cnt,CntF,CntB,CntG,CntS"}});
   this.OverviewBinded = true;
  },

  _initializePO: function() {
   // PO
   var POtable = this.getView().byId("POTable");
   POtable.setModel(this.oApplicationFacade
    .getODataModel());

   var POlistItems = new sap.m.ColumnListItem({
    type: "Navigation",
    vAlign: "Middle",
    cells: [
           // Selection
           new sap.m.CheckBox({
      visible: "{PostGr}",
      width: "30px",
      select: [
              this._validForPostGR,
              this]
     }),

           // Document
           new sap.m.ObjectIdentifier({
      title: "{PurgDocumentTypeDescription}",
      text: "( {PurchasingDocument} / {PurchasingDocumentItem} )"
     }),
           // Material
           new sap.m.ObjectIdentifier({
      title: "{PurchasingDocumentItemText}",
      text: {
       parts: [{
        path: 'MaterialGroupName'
               }],
       formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     }),
           // Quantity
           new sap.ui.layout.VerticalLayout({
      content: [
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>ORDERED}:  "
         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'PurchaseOrderQuantity'
                           },
            {
             path: 'PurchaseOrderQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       }),
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>DELIVERED}:  "

         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'GoodsReceiptQuantity'
                           },
            {
             path: 'PurchaseOrderQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       }) ]
     }),
           // Order Value
           new sap.m.Text({
      text: {
       parts: [
        {
         path: 'PurchaseOrderNetAmount'
                 },
        {
         path: 'Currency'
                 }]
      }
     }),
           // Invoiced Quantity
           new sap.ui.layout.HorizontalLayout({
      content: [new sap.m.ObjectAttribute({
       text: {
        parts: [
         {
          path: 'InvoiceReceiptQuantity'
                    },
         {
          path: 'PurchaseOrderQuantityUnit'
                    }],
        formatter: this._quant_format_fixed
       }
      })]
     }),

           // Invoice Value
           new sap.m.Text({
      text: {
       parts: [
        {
         path: 'InvoiceReceiptValue'
                 },
        {
         path: 'DocumentCurrency'
                 }]
      },
      customData: [
                new sap.ui.core.CustomData({
        key: "Status",
        value: "{Status}"
       })]

     }),
           // Status
           new sap.m.ObjectIdentifier({
      text: "{StatusDescription}"
     }),
     // Cost Center
     new sap.ui.layout.VerticalLayout({
      content: [ new sap.m.Text({
      text: "{CostCenterName}"
     }),
     new sap.m.Text({
      text: {parts:[{path:'CostCenter'}],
          formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     })]}),




           // WBS Element
     new sap.ui.layout.VerticalLayout({
      content: [  new sap.m.Text({
      text: "{WorkPackageFullName}"
     }),
     new sap.m.Text({
      text: {parts:[{path:'WBSElementExternalID'}],
          formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     })]}),


           // Sales Order
           new sap.m.ObjectIdentifier({

      text: {
       parts: [
        {
         path: 'SalesOrder'
                 },
        {
         path: 'SalesOrderItem'
                 }],
       formatter: elsan.zmmpur.puritems.util.formatter.ConcatSlash
      }

     }),
     // Service Performer
     new sap.m.Text({
      text: {parts: [{path: 'ServicePerformerName'},{path: 'ServicePerformer'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     // Purchasing Organization
     new sap.m.Text({
      text: {parts: [{path: 'PurchasingOrganizationName'},{path: 'PurchasingOrganization'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     // Delivery Date
     new sap.m.Text({
      text:{path:'DeliveryDate', type:'sap.ui.model.type.Date', formatOptions: { style: 'short'}}

     }),
     // Supplying Plant
     new sap.m.Text({
      text: {parts: [{path: 'SupplyingPlantName'},{path: 'SupplyingPlant'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     // Short Text
     new sap.m.Text({
      text: {parts: [{path: 'PurchasingDocumentItemText'}]}
     }),
     // Purchase Order Item Category
     new sap.m.Text({
      text: {parts: [{path: 'PurchaseOrderItemCategoryName'},{path: 'PurchaseOrderItemCategory'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     // Account Assignment Category
     new sap.m.Text({
      text: {parts: [{path: 'AccountAssignmentCategoryName'},{path: 'AccountAssignmentCategory'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     new sap.m.RatingIndicator({
      value: {
       path: 'WeightedRelevance',
       formatter: elsan.zmmpur.puritems.util.formatter.calcRelevance5
      },
      id: this.createId("ratingIndicator"),
      maxValue: 5,
      enabled: false,
      iconSize: "0.8rem",
      iconSelected: sap.ui.core.IconPool.getIconURI("color-fill"),
      iconUnselected: sap.ui.core.IconPool.getIconURI("color-fill")
     })
    ]
   });
   /**
    * @ControllerHook [PO List Item Extension] Use
    *                 addAggregation() to add new columns
    *                 to cells aggregation in the List. eg:
    *                 POlistItems.addAggregation("cells",new
    *                 sap.m.ObjectIdentifier({.....}),false);
    *                 This hook should be called when the
    *                 table is bound. To modify the SELECT
    *                 parameters, modify
    *                 this.POSelectParams in the
    *                 extHookPOListItem()
    * @callback elsan.zmmpur.puritems.S1.controller~extHookPOListItem
    * @param {object}
    *            POlistItems
    */
   if (this.extHookPOListItem) {
    this.extHookPOListItem(POlistItems);
   }
   var oPOFilter = new sap.ui.model.Filter(
    "PurchasingDocumentCategory",
    sap.ui.model.FilterOperator.EQ, "F");
   var oFilter = [];
   oFilter.push(oPOFilter);

   var oPOSorter = new sap.ui.model.Sorter(
    "Supplier",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oPOSorter1 = new sap.ui.model.Sorter(
    "PurchasingDocument",
    true,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oPOSorter2 = new sap.ui.model.Sorter(
    "PurchasingDocumentItem",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   POtable.bindItems({
    path: "/PDocItem",
    template: POlistItems,
    parameters: {
     select: this.POSelectParams,
     custom: {
      search: this._customSearchKey
     }
    },
    sorter: [oPOSorter, oPOSorter1, oPOSorter2],
    filters: oFilter
   });
   this.POBinded = true;
  },

  _initializePR: function() {

   // PR
   var PRtable = this.getView().byId("PRTable");
   PRtable.setModel(this.oApplicationFacade
    .getODataModel());
   var PRlistItems = new sap.m.ColumnListItem({
    type: "Navigation",
    vAlign: "Middle",
    cells: [
           // Document
           new sap.m.ObjectIdentifier({
      title: "{PurgDocumentTypeDescription}",
      text: "( {PurchaseRequisition} / {PurchaseRequisitionItem} )"
     }),
           // Material
           new sap.m.ObjectIdentifier({
      title: "{MaterialName}",
      text: {
       parts: [{
        path: 'MaterialGroupName'
               }],
       formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     }),

           // Quantity
           new sap.ui.layout.VerticalLayout({
      content: [
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>ORDERED}:  "
         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'OrderedQuantity'
                           },
            {
             path: 'OrderedQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       }),
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>DELIVERED}:  "

         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'DeliveredQuantity'
                           },
            {
             path: 'OrderedQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       })]
     }),
           // Requestor
           new sap.ui.layout.HorizontalLayout({
      content: [new sap.m.ObjectAttribute({
       text: "{CreatedByUser}"
      })]
     }),
           // Receiving Plant
           new sap.m.Text({
      text: {
       parts: [{
        path: 'PlantName'
             }]
      }
     }),
           // Status
           new sap.m.ObjectIdentifier({
      text: "{StatusDescription}"
     }),

     new sap.m.RatingIndicator({
      value: {
       path: 'WeightedRelevance',
       formatter: elsan.zmmpur.puritems.util.formatter.calcRelevance5
      },
      maxValue: 5,
      enabled: false,
      iconSize: "0.8rem",
      iconSelected: sap.ui.core.IconPool.getIconURI("color-fill"),
      iconUnselected: sap.ui.core.IconPool.getIconURI("color-fill")
     })
    ]
   });
   /**
    * @ControllerHook [PR List Item Extension] Use
    *                 addAggregation() to add new columns
    *                 to cells aggregation in the List. eg:
    *                 PRlistItems.addAggregation("cells",new
    *                 sap.m.ObjectIdentifier({.....}),false);
    *                 This hook should be called when the
    *                 table is bound. To modify the SELECT
    *                 parameters, modify
    *                 this.PRSelectParams in the
    *                 extHookPRListItem()
    * @callback elsan.zmmpur.puritems.S1.controller~extHookPRListItem
    * @param {object}
    *            PRlistItems
    */
   if (this.extHookPRListItem) {
    this.extHookPRListItem(PRlistItems);
   }
   var oPRFilter = new sap.ui.model.Filter(
    "PurchasingDocumentCategory",
    sap.ui.model.FilterOperator.EQ, "B");
   var oFilter = [];
   oFilter.push(oPRFilter);

   var oPRSorter = new sap.ui.model.Sorter(
    "Supplier",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oPRSorter1 = new sap.ui.model.Sorter(
    "PurchaseRequisition",
    true,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oPRSorter2 = new sap.ui.model.Sorter(
    "PurchaseRequisitionItem",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   PRtable.bindItems({
    path: "/PReqItem",
    parameters: {
     select: this.PRSelectParams,
     custom: {
      search: this._customSearchKey
     }
    },
    template: PRlistItems,
    sorter: [oPRSorter, oPRSorter1, oPRSorter2],
    filters: oFilter
   });
   this.PRBinded = true;

  },

  _initializeGR: function() {

   // GR
   var GRtable = this.getView().byId("GRTable");
   GRtable.setModel(this.oApplicationFacade
    .getODataModel());
   var GRlistItems = new sap.m.ColumnListItem({
    type: "Navigation",
    vAlign: "Middle",
    cells: [
           // Document
           new sap.m.ObjectIdentifier({
      // title :
      // "{PurgDocumentTypeDescription}",
      text: "{PurchasingDocument} / {PurchasingDocumentItem} / {MaterialDocumentYear}"
     }),
           // PO
           new sap.m.ObjectIdentifier({
      title: "{PurgDocumentTypeDescription}",
      text: "{PurchaseOrder} / {PurchaseOrderItem}"

     }),
           // Material
           new sap.m.ObjectIdentifier({
      title: "{PurchasingDocumentItemText}",
      text: {
       parts: [{
        path: 'MaterialGroupName'
               }],
       formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     }),
           // Quantity

           new sap.ui.layout.VerticalLayout({
      content: [
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>ORDERED}:   "
         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'PurchaseOrderQty'
                           },
            {
             path: 'PurgOrderQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       }),
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>DELIVERED}:  "

         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'Quantity'
                           },
            {
             path: 'PurgOrderQuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       })]
     }),

     new sap.m.Text({
      text: "{path: 'DeliveryDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
     }),

     new sap.m.Text({
      text: "{path: 'PostingDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
     }),

     // Service Performer
     new sap.m.Text({
      text: {parts: [{path: 'ServicePerformerName'},{path: 'ServicePerformer'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     // Work item
     new sap.m.Text({
      text: {parts: [{path: 'WorkItemName'},{path: 'WorkItem'}], formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple}
     }),
     new sap.m.ObjectIdentifier({
      text: "{StatusDescription}"
     })

         ]
   });
   /**
    * @ControllerHook [GR List Item Extension] Use
    *                 addAggregation() to add new columns
    *                 to cells aggregation in the List. eg:
    *                 GRlistItems.addAggregation("cells",new
    *                 sap.m.ObjectIdentifier({.....}),false);
    *                 This hook should be called when the
    *                 table is bound. To modify the SELECT
    *                 parameters, modify
    *                 this.GRSelectParams in the
    *                 extHookGRListItem()
    * @callback elsan.zmmpur.puritems.S1.controller~extHookPOListItem
    * @param {object}
    *            GRlistItems
    */
   if (this.extHookGRListItem) {
    this.extHookGRListItem(GRlistItems);
   }

   // var oGRFilter = new sap.ui.model.Filter(
   // "PurchasingDocumentCategory",
   // sap.ui.model.FilterOperator.EQ, "F");
   // var oFilter = [];
   // oFilter.push(oGRFilter);
   var oGRSorter = new sap.ui.model.Sorter(
    "Supplier",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oGRSorter1 = new sap.ui.model.Sorter(
    "PurchasingDocument",
    true,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oGRSorter2 = new sap.ui.model.Sorter(
    "PurchasingDocumentItem",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });

   GRtable.bindItems({
    path: "/PGrItem",
    parameters: {
     select: this.GRSelectParams,
     custom: {
      search: this._customSearchKey
     }
    },
    template: GRlistItems,
    sorter: [oGRSorter, oGRSorter1, oGRSorter2]
    // filters : oFilter
   });
   this.GRBinded = true;

  },

  _initializeSI: function() {

   // SI

   var SItable = this.getView().byId("SITable");
   SItable.setModel(this.oApplicationFacade
    .getODataModel());
   var SIlistItems = new sap.m.ColumnListItem({
    type: "Navigation",
    vAlign: "Middle",
    cells: [
           // Document
           new sap.m.ObjectIdentifier({
      title :
      "{InvoiceTypeDescription}",
      text: "{PurchasingDocument} / {InvoiceReferenceFiscalYear} / {PurchasingDocumentItem}"
     }),
           // Material
           new sap.m.ObjectIdentifier({
      title: "{PurchasingDocumentItemText}",
      text: {
       parts: [{
        path: 'MaterialGroupName'
               }],
       formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     }),
           // Quantity

           new sap.ui.layout.VerticalLayout({
      content: [
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>ORDERED}:  "
         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'PurchaseOrderItemQuantity'
                           },
            {
             path: 'QuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       }),
                new sap.ui.layout.HorizontalLayout({
        content: [
                     new sap.m.ObjectAttribute({
          text: "{i18n>DELIVERED}:  "

         }),
                     new sap.m.ObjectAttribute({
          text: {
           parts: [
            {
             path: 'GoodsMovementQuantity'
                           },
            {
             path: 'QuantityUnit'
                           }],
           formatter: this._quant_format_fixed
          }
         })]
       })]
     }),
           // Order Value

           new sap.m.Text({
      text: {
       parts: [
        {
         path: 'PurchaseOrderItemNetAmount'
                 },
        {
         path: 'PurchaseOrderCurrency'
                 }]
      }
     }),
           new sap.ui.layout.VerticalLayout({
      content: [
                new sap.ui.layout.HorizontalLayout({
        content: [new sap.m.ObjectAttribute({
         text: {
          parts: [
           {
            path: 'Quantity'
                         },
           {
            path: 'QuantityUnit'
                         }],
          formatter: this._quant_format_fixed
         }
        })]
       })]
     }),

           // Invoice Value
           new sap.m.Text({
      text: {
       parts: [
        {
         path: 'AmountInTranactionCurrency'
                 },
        {
         path: 'CompanyCodeCurrency'
                 }]
      }
     }),
           new sap.m.ObjectIdentifier({
      text: "{StatusDescription}"
     }),

           // Cost Center
     new sap.ui.layout.VerticalLayout({
      content: [ new sap.m.Text({
      text: "{CostCenterName}"
     }),
     new sap.m.Text({
      text: {parts:[{path:'CostCenter'}],
          formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     })]}),


           // WBS Element
        new sap.ui.layout.VerticalLayout({
      content: [  new sap.m.Text({
      text: "{WorkPackageFullName}"
     }),
     new sap.m.Text({
      text: {parts:[{path:'WBSElementExternalID'}],
          formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
      }
     })]}),

           // Sales Order
           new sap.m.ObjectIdentifier({

      text: {
       parts: [
        {
         path: 'SalesOrder'
                 },
        {
         path: 'SalesOrderItem'
                 }],
       formatter: elsan.zmmpur.puritems.util.formatter.ConcatSlash
      }

     })]
   });

   /**
    * @ControllerHook [SI List Item Extension] Use
    *                 addAggregation() to add new columns
    *                 to cells aggregation in the List. eg:
    *                 SIlistItems.addAggregation("cells",new
    *                 sap.m.ObjectIdentifier({.....}),false);
    *                 This hook should be called when the
    *                 table is bound. To modify the SELECT
    *                 parameters, modify
    *                 this.SISelectParams in the
    *                 extHookSIListItem()
    * @callback elsan.zmmpur.puritems.S1.controller~extHookSIListItem
    * @param {object}
    *            SIlistItems
    */
   if (this.extHookSIListItem) {
    this.extHookSIListItem(SIlistItems);
   }
   var oSIFilter = new sap.ui.model.Filter(
    "PurchasingDocumentCategory",
    sap.ui.model.FilterOperator.EQ, "S");
   var oFilter = [];
   oFilter.push(oSIFilter);
   var oSISorter = new sap.ui.model.Sorter(
    "Supplier",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oSISorter1 = new sap.ui.model.Sorter(
    "PurchasingDocument",
    true,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   var oSISorter2 = new sap.ui.model.Sorter(
    "InvoiceReferenceFiscalYear",
    false,
    function(oContext) {
     return oContext.getProperty("SupplierName");
    });
   SItable.bindItems({
    path: "/SupInvItem",
    parameters: {
     select: this.SISelectParams,
     custom: {
      search: this._customSearchKey
     }
    },
    template: SIlistItems,
    sorter: [oSISorter, oSISorter1, oSISorter2],
    filters: oFilter
   });
   this.SIBinded = true;

  }
 };
})();