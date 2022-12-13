/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
// define a root UIComponent which exposes the main view
jQuery.sap.declare("elsan.zmmpur.puritems.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// extent of sap.ca.scfld.md.ComponentBase
sap.ca.scfld.md.ComponentBase.extend("elsan.zmmpur.puritems.Component", {
	metadata : sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
	    "manifest": "json",
		
		viewPath : "elsan.zmmpur.puritems.view",

		fullScreenPageRoutes : {
			// fill the routes to your full screen pages in here.
			"fullscreen" : {
				"pattern" : "",
				"view" : "S1"
			// "tabChange" : {
			// "pattern" : "purchasingDocument/{tabKey}",
			// "view" : 'S1'
			//					
			// }
			}

		}
	}),

	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function() {
		var oViewData = {
			component : this
		};
		return sap.ui.view({
			viewName : "elsan.zmmpur.puritems.Main",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : oViewData
		});
	}
});