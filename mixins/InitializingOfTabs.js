/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.mixins.InitializingOfTabs");
(function() {
	"use strict";
	elsan.zmmpur.puritems.mixins.InitializingOfTabs = {
		_checkBindingAndInitialize: function(t) {
			switch (t) {
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
			var t = new sap.m.ColumnListItem({
				vAlign: "Middle",
				cells: [new sap.m.ObjectListItem({
					id: this.createId("Supplier"),
					title: "{Supplier}",
					attributes: [new sap.m.ObjectAttribute({
						text: "{path: 'SupplierName', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
					})]
				}), new sap.m.ObjectListItem({
					id: this.createId("MaterialGroup"),
					title: "{MaterialGroup}",
					visible: false,
					attributes: [new sap.m.ObjectAttribute({
						text: "{path: 'MaterialGroupName', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
					})]
				}), new sap.m.ObjectListItem({
					id: this.createId("PurchasingGroup"),
					title: "{PurchasingGroup}",
					visible: false,
					attributes: [new sap.m.ObjectAttribute({
						text: "{path: 'PurchasingGroup', formatter:'elsan.zmmpur.puritems.util.formatter.IDBraces'}"
					})]
				}), new sap.m.ObjectListItem({
					id: this.createId("Plant"),
					title: "{Plant}",
					visible: false,
					attributes: [new sap.m.ObjectAttribute({
						text: "{PlantName}"
					})]
				}), new sap.m.ObjectListItem({
					id: this.createId("Status"),
					title: "{StatusText}",
					visible: false
				}), new sap.m.Link({
					text: "{CntB}",
					press: [this.handleNavigation, this]
				}), new sap.m.Link({
					text: "{CntF}",
					press: [this.handleNavigation, this]
				}), new sap.m.Link({
					text: "{CntG}",
					press: [this.handleNavigation, this]
				}), new sap.m.Link({
					text: "{CntS}",
					press: [this.handleNavigation, this]
				})]
			});
			// var f = [];
			// var p = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
		 //   f.push(p);
		 
		        var f = [];
		        var p1 = this._getODataParameterForFilterBarSearch("filterBar", [], [], 0, 0, "ME2STAR_SFB");
		        if( p1 && p1.filters && p1.filters.length > 0 ){
			    	f = p1.filters;
		        }
		        
		    
			this.getView().byId("overviewTable").bindItems({
				path: "/M2SOview",
				template: t,
				parameters: {
					select: "SupplierName,Supplier,Cnt,CntF,CntB,CntG,CntS"
				},
				filters: f
			});
			this.OverviewBinded = true;
		},
		_initializePO: function() {
			var P = this.getView().byId("POTable");
			P.setModel(this.oApplicationFacade.getODataModel());
			var a = new sap.m.ColumnListItem({
				type: "Navigation",
				vAlign: "Middle",
				cells: [new sap.m.CheckBox({
						// visible: "{PostGr}",
						width: "30px",
						select: [this._validForPostGR, this]
					}), 
					// new sap.m.ObjectIdentifier({
					// 	text: "{} / {}"
					// }),
					new sap.m.Text({
						width: "90px",
						text: {
							parts: [{
								path: 'PurchasingDocument'
							}, {
								path: 'PurchasingDocumentItem'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.Clean
						}
					}),
					new sap.m.ObjectIdentifier({
						text: "{Company}"
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchasingOrganization'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}),
					new sap.m.ObjectIdentifier({
						text: "{Venpdh}"
					}),
					new sap.m.ObjectIdentifier({
					title: "{SupplierName}",
					text: {
						parts: [{
							path: 'Supplier'
						}]
						// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
					}),
					// new sap.m.Text({
					// 	text: {
					// 		parts: [{
					// 			path: 'SupplierName'
					// 		}, {
					// 			path: 'Supplier'
					// 		}],
					// 		formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					// 	}
					// }),
					new sap.m.ObjectIdentifier({
						text: "{PurchasingDocumentType} {PurgDocumentTypeDescription}"
					}),  
                    new sap.m.Text({
                    	width:"150px",
						text:'{PurchasingDocumentItemText}'
								// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}),
					new sap.m.Text({
						width:"80px",
						text: "{path: 'CreationDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
					}),
					new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchaseOrderNetAmount'
							}, {
								path: 'Currency'
							}]
						}
					}),
					new sap.m.Button({
						tooltip: "{i18n>AccountAssignementDetails}",
						icon: "sap-icon://monitor-payments",
						press: [this._onAccountAssignementDetailPressedPO, this]
					}),
						new sap.m.ObjectIdentifier({
						text: "{ElstatusName}"//"{StatusDescription}"
					}),

					new sap.m.ObjectStatus({
						// state: {
						// 	parts: [{
						// 		path: 'EmailStatus'
						// 	}],
						// 	formatter: elsan.zmmpur.puritems.util.formatter.fnEmailValueState
						// },
						// text: {
						// 	parts: [{
						// 		path: 'EmailStatus'
						// 	}],
						// 	formatter: elsan.zmmpur.puritems.util.formatter.fnCalcEmail
						// }
						state :"{= ${NastStatus} === true ? 'Success' : ${EmailStatus} === true ? 'Success' : ${PrintStatus} === true ? 'Success' : 'Error' }",
						text : "{= ${NastStatus} === true ? ${i18n>NastSent} : ${EmailStatus} === true ? ${i18n>Sent} : ${PrintStatus} === true ? ${i18n>print} : ${i18n>NotSent} }"
					}),
					new sap.m.ObjectIdentifier({
						text: "{RequisitionerName}"
					}),
					new sap.m.ObjectIdentifier({
						text: "{ZzpersoninchargeName}"
					}), 
					
					new sap.m.Text({
						text: {
							parts: [{
								path: 'PrNum'
							}, {
								path: 'PrItm'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.Clean
						}
					}),
					 new sap.ui.layout.VerticalLayout({
						content: [new sap.ui.layout.HorizontalLayout({
							content: [new sap.m.ObjectAttribute({
								text: "{i18n>ORDERED}:  "
							}), new sap.m.ObjectAttribute({
								text: {
									parts: [{
										path: 'PurchaseOrderQuantity'
									}, {
										path: 'PurchaseOrderQuantityUnit'
									}],
									formatter: this._quant_format_fixed
								}
							})]
						}), new sap.ui.layout.HorizontalLayout({
							content: [new sap.m.ObjectAttribute({
								text: "{i18n>DELIVERED}:  "
							}), new sap.m.ObjectAttribute({
								text: {
									parts: [{
										path: 'GoodsReceiptQuantity'
									}, {
										path: 'PurchaseOrderQuantityUnit'
									}],
									formatter: this._quant_format_fixed
								}
							})]
						})]
					}),  new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'InvoiceReceiptQuantity'
								}, {
									path: 'PurchaseOrderQuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'InvoiceReceiptValue'
							}, {
								path: 'DocumentCurrency'
							}]
						},
						customData: [new sap.ui.core.CustomData({
							key: "Status",
							value: "{Status}"
						})]
					}),

					new sap.ui.layout.VerticalLayout({
						content: [new sap.m.Text({
							text: "{CostCenterName}"
						}), new sap.m.Text({
							text: {
								parts: [{
									path: 'CostCenter'
								}],
								formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
							}
						})]
					}), new sap.ui.layout.VerticalLayout({
						content: [new sap.m.Text({
							text: "{WorkPackageFullName}"
						}), new sap.m.Text({
							text: {
								parts: [{
									path: 'WBSElementExternalID'
								}],
								formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
							}
						})]
					}), new sap.m.ObjectIdentifier({
						text: {
							parts: [{
								path: 'SalesOrder'
							}, {
								path: 'SalesOrderItem'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.ConcatSlash
						}
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'ServicePerformerName'
							}, {
								path: 'ServicePerformer'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}), new sap.m.Text({
						text: {
							path: 'DeliveryDate',
							type: 'sap.ui.model.type.Date',
							formatOptions: {
								style: 'short'
							}
						}
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'SupplyingPlantName'
							}, {
								path: 'SupplyingPlant'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchasingDocumentItemText'
							}]
						}
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchaseOrderItemCategoryName'
							}, {
								path: 'PurchaseOrderItemCategory'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'AccountAssignmentCategoryName'
							}, {
								path: 'AccountAssignmentCategory'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}), new sap.m.RatingIndicator({
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
			if (this.extHookPOListItem) {
				this.extHookPOListItem(a);
			}
			
			// p = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
		   //   f.push(p);
		        var f = [];
		  
		        var p1 = this._getODataParameterForFilterBarSearch("filterBar", [], [], 0, 0, "ME2STAR_SFB");
		        
		        if( p1 && p1.filters && p1.filters.length > 0 ){
			    	f = p1.filters;
		        }
		        
				var p = new sap.ui.model.Filter("PurchasingDocumentCategory", sap.ui.model.FilterOperator.EQ, "F");
		      	f.push(p);
				// if (f && f.length > 0) {
				// var F1 = new sap.ui.model.Filter(f, true);
				// }
				
			var o = new sap.ui.model.Sorter("Supplier", false, function(C) {
				return C.getProperty("SupplierName");
			});
			var b = new sap.ui.model.Sorter("PurchasingDocument", true, function(C) {
				return C.getProperty("SupplierName");
			});
			var c = new sap.ui.model.Sorter("PurchasingDocumentItem", false, function(C) {
				return C.getProperty("SupplierName");
			});
			P.bindItems({
				path: "/PDocItem",
				template: a,
				parameters: {
					select: this.POSelectParams,
					custom: {
						search: this._customSearchKey
					}
				},
				sorter: [o, b, c],
				filters: f
			});
			this.POBinded = true;
		},
		_initializePR: function() {
			var P = this.getView().byId("PRTable");
			P.setModel(this.oApplicationFacade.getODataModel());
			var a = new sap.m.ColumnListItem({
				type: "Navigation",
				vAlign: "Middle",
				cells: [new sap.m.ObjectIdentifier({
						// title: "{PurgDocumentTypeDescription}",
						text: "{PurchaseRequisition} / {PurchaseRequisitionItem}"
					}),new sap.m.ObjectIdentifier({
						text: "{Company}"
					}),new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchasingOrganization'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}),
					new sap.m.ObjectIdentifier({
					title: "{Fixedvendorname}",
					text: {
						parts: [{
							path: 'FixedVendor'
						}]
						// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
					}),
					new sap.m.ObjectIdentifier({
						text: "{PurchasingDocumentType}"
					}),
					new sap.m.ObjectIdentifier({
						text: "{PurchasingDocumentItemText}"
					}),
					new sap.m.ObjectIdentifier({
						text: "{Zzsuppliermaterialnumber}"
					}),
					new sap.m.ObjectIdentifier({
					title: "{MaterialGroupName}",
					text: {
						parts: [{
							path: 'MaterialGroup'
						}]
						// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
					}),
					// new sap.m.Text({
					// 	text: {
					// 		parts: [{
					// 			path: ''
					// 		},{
					// 			path: ''
					// 		}],
					// 		formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					// 	}
					// }),
					new sap.m.ObjectIdentifier({
						text: "{OpExternalProcessingPrice} {Currency}"
					}),
					new sap.m.Text({
						text: "{path: 'RequisitionDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
					}), 
					new sap.m.Button({
						tooltip: "{i18n>AccountAssignementDetails}",
						icon: "sap-icon://monitor-payments",
						press: [this._onAccountAssignementDetailPressed, this]
					}), 
					new sap.m.ObjectIdentifier({
						text: "{RequisitionerName}"
					}),
                    new sap.m.ObjectIdentifier({
						text: "{ElstatusName}" //"{StatusDescription}"
					}),
					new sap.m.ObjectIdentifier({
						text: "{ZzpersoninchargeName}"
					}),
					new sap.m.ObjectIdentifier({
						text: "{Zzpo}"
					}), 
					
					new sap.m.ObjectIdentifier({
						text: "{MaterialGroup}"
					}),     
					 
					new sap.ui.layout.VerticalLayout({
						content: [new sap.ui.layout.HorizontalLayout({
							content: [new sap.m.ObjectAttribute({
								text: "{i18n>ORDERED}:  "
							}), new sap.m.ObjectAttribute({
								text: {
									parts: [{
										path: 'OrderedQuantity'
									}, {
										path: 'OrderedQuantityUnit'
									}],
									formatter: this._quant_format_fixed
								}
							})]
						}), new sap.ui.layout.HorizontalLayout({
							content: [new sap.m.ObjectAttribute({
								text: "{i18n>DELIVERED}:  "
							}), new sap.m.ObjectAttribute({
								text: {
									parts: [{
										path: 'DeliveredQuantity'
									}, {
										path: 'OrderedQuantityUnit'
									}],
									formatter: this._quant_format_fixed
								}
							})]
						})]
					}), new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: "{CreatedByUser}"
						})]
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'PlantName'
							}]
						}
					}), new sap.m.RatingIndicator({
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
			if (this.extHookPRListItem) {
				this.extHookPRListItem(a);
			}
			
			 var f = [];
		  
		        var p1 = this._getODataParameterForFilterBarSearch("filterBar", [], [], 0, 0, "ME2STAR_SFB");
		        
		        if( p1 && p1.filters && p1.filters.length > 0 ){
			    	f = p1.filters;
		        }
		        
				var p = new sap.ui.model.Filter("PurchasingDocumentCategory", sap.ui.model.FilterOperator.EQ, "B");
		      	f.push(p);
		      	
			// var p = new sap.ui.model.Filter("PurchasingDocumentCategory", sap.ui.model.FilterOperator.EQ, "B");
			// var f = [];
			// f.push(p);
			// p = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
		 //   f.push(p);
		    
			var o = new sap.ui.model.Sorter("Supplier", false, function(C) {
				return C.getProperty("SupplierName");
			});
			var b = new sap.ui.model.Sorter("PurchaseRequisition", true, function(C) {
				return C.getProperty("SupplierName");
			});
			var c = new sap.ui.model.Sorter("PurchaseRequisitionItem", false, function(C) {
				return C.getProperty("SupplierName");
			});
			P.bindItems({
				path: "/PReqItem",
				parameters: {
					select: this.PRSelectParams,
					custom: {
						search: this._customSearchKey
					}
				},
				template: a,
				sorter: [o, b, c],
				filters: f
			});
			this.PRBinded = true;
		},
		_initializeGR: function() {
			var G = this.getView().byId("GRTable");
			G.setModel(this.oApplicationFacade.getODataModel());
			var a = new sap.m.ColumnListItem({
				type: "Navigation",
				vAlign: "Middle",
				cells: [new sap.m.ObjectIdentifier({
					text: "{PurchasingDocument} / {PurchasingDocumentItem} / {MaterialDocumentYear}"
				}), new sap.m.ObjectIdentifier({
					title: "{PurgDocumentTypeDescription}",
					text: "{PurchaseOrder} / {PurchaseOrderItem}"
				}), 
				new sap.m.Text({
						text: {
							parts: [{
								path: 'PurchasingOrganization'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}),
					new sap.m.ObjectIdentifier({
					title: "{SupplierName}",
					text: {
						parts: [{
							path: 'Supplier'
						}]
						// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
					}),
					// new sap.m.Text({
					// 	text: {
					// 		parts: [{
					// 			path: ''
					// 		}, {
					// 			path: 'Supplier'
					// 		}],
					// 		formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					// 	}
					// }),
				
				
				new sap.m.ObjectIdentifier({
					title: "{PurchasingDocumentItemText}",
					text: {
						parts: [{
							path: 'MaterialGroupName'
						}],
						formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
				}), new sap.ui.layout.VerticalLayout({
					content: [new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: "{i18n>ORDERED}:   "
						}), new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'PurchaseOrderQty'
								}, {
									path: 'PurgOrderQuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					}), new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: "{i18n>DELIVERED}:  "
						}), new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'Quantity'
								}, {
									path: 'PurgOrderQuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					})]
				}), new sap.m.Text({
					text: "{path: 'DeliveryDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
				}), new sap.m.Text({
					text: "{path: 'PostingDate' , type:'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}"
				}), new sap.m.Text({
					text: {
						parts: [{
							path: 'ServicePerformerName'
						}, {
							path: 'ServicePerformer'
						}],
						formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					}
				}), new sap.m.Text({
					text: {
						parts: [{
							path: 'WorkItemName'
						}, {
							path: 'WorkItem'
						}],
						formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					}
				}), new sap.m.ObjectIdentifier({
					text: "{StatusDescription}"
				}),	new sap.m.ObjectIdentifier({
						text: "{Venpdh}"
				})]
			});
			if (this.extHookGRListItem) {
				this.extHookGRListItem(a);
			}
			
			var f = [];
			var s = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
		    f.push(s);
		    
			var g = new sap.ui.model.Sorter("Supplier", false, function(c) {
				return c.getProperty("SupplierName");
			});
			var o = new sap.ui.model.Sorter("PurchasingDocument", true, function(c) {
				return c.getProperty("SupplierName");
			});
			var b = new sap.ui.model.Sorter("PurchasingDocumentItem", false, function(c) {
				return c.getProperty("SupplierName");
			});
			G.bindItems({
				path: "/PGrItem",
				parameters: {
					select: this.GRSelectParams,
					custom: {
						search: this._customSearchKey
					}
				},
				template: a,
				sorter: [g, o, b],
				filters: f
			});
			this.GRBinded = true;
		},
		_initializeSI: function() {
			var S = this.getView().byId("SITable");
			S.setModel(this.oApplicationFacade.getODataModel());
			var a = new sap.m.ColumnListItem({
				type: "Navigation",
				vAlign: "Middle",
				cells: [new sap.m.ObjectIdentifier({
					// title: "{InvoiceTypeDescription}",
					text:"{PurchaseOrder}"  //"{PurchasingDocument}"
				}), 
				new sap.m.Text({
						text: {
							parts: [{
							 path: 'PurchasingOrganization'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
						}
					}),
					new sap.m.ObjectIdentifier({
					title: "{SupplierName}",
					text: {
						parts: [{
							path: 'Supplier'
						}]
						// formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
					}),
					// new sap.m.Text({
					// 	text: {
					// 		parts: [{
					// 			path: 'SupplierName'
					// 		}, {
					// 			path: 'Supplier'
					// 		}],
					// 		formatter: elsan.zmmpur.puritems.util.formatter.nameIdTuple
					// 	}
					// }),
				
				new sap.m.ObjectIdentifier({
					title: "{PurchasingDocumentItemText}",
					text: {
						parts: [{
							path: 'MaterialGroupName'
						}],
						formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
					}
				}), new sap.ui.layout.VerticalLayout({
					content: [new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: "{i18n>ORDERED}:  "
						}), new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'PurchaseOrderItemQuantity'
								}, {
									path: 'QuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					}), new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: "{i18n>DELIVERED}:  "
						}), new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'GoodsMovementQuantity'
								}, {
									path: 'QuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					})]
				}), new sap.m.Text({
					text: {
						parts: [{
							path: 'PurchaseOrderItemNetAmount'
						}, {
							path: 'PurchaseOrderCurrency'
						}]
					}
				}), new sap.ui.layout.VerticalLayout({
					content: [new sap.ui.layout.HorizontalLayout({
						content: [new sap.m.ObjectAttribute({
							text: {
								parts: [{
									path: 'Quantity'
								}, {
									path: 'QuantityUnit'
								}],
								formatter: this._quant_format_fixed
							}
						})]
					})]
				}), new sap.m.Text({
					text: {
						parts: [{
							path: 'AmountInTranactionCurrency'
						}, {
							path: 'CompanyCodeCurrency'
						}]
					}
				}), new sap.m.ObjectIdentifier({
					text: "{StatusDescription}"
				}), new sap.ui.layout.VerticalLayout({
					content: [new sap.m.Text({
						text: "{CostCenterName}"
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'CostCenter'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
						}
					})]
				}), new sap.ui.layout.VerticalLayout({
					content: [new sap.m.Text({
						text: "{WorkPackageFullName}"
					}), new sap.m.Text({
						text: {
							parts: [{
								path: 'WBSElementExternalID'
							}],
							formatter: elsan.zmmpur.puritems.util.formatter.IDBraces
						}
					})]
				}), new sap.m.ObjectIdentifier({
					text: {
						parts: [{
							path: 'SalesOrder'
						}, {
							path: 'SalesOrderItem'
						}],
						formatter: elsan.zmmpur.puritems.util.formatter.ConcatSlash
					}
				}),new sap.m.ObjectIdentifier({
						text: "{Venpdh}"
				}),
				new sap.m.ObjectIdentifier({
					title: "{InvoiceTypeDescription}",
					text: "{PurchasingDocument} / {InvoiceReferenceFiscalYear} / {PurchasingDocumentItem}"
				})
				]
			});
			if (this.extHookSIListItem) {
				this.extHookSIListItem(a);
			}
			var s = new sap.ui.model.Filter("PurchasingDocumentCategory", sap.ui.model.FilterOperator.EQ, "S");
			var f = [];
			f.push(s);
			s = new sap.ui.model.Filter("Requi", sap.ui.model.FilterOperator.EQ, sap.ushell.Container.getService("UserInfo").getUser().getId());
		    f.push(s);
		    
			var o = new sap.ui.model.Sorter("Supplier", false, function(C) {
				return C.getProperty("SupplierName");
			});
			var b = new sap.ui.model.Sorter("PurchasingDocument", true, function(C) {
				return C.getProperty("SupplierName");
			});
			var c = new sap.ui.model.Sorter("InvoiceReferenceFiscalYear", false, function(C) {
				return C.getProperty("SupplierName");
			});
			S.bindItems({
				path: "/SupInvItem",
				parameters: {
					select: this.SISelectParams,
					custom: {
						search: this._customSearchKey
					}
				},
				template: a,
				sorter: [o, b, c],
				filters: f
			});
			this.SIBinded = true;
		}
	};
})();