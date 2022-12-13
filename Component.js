/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.HashChanger");
sap.ca.scfld.md.ComponentBase.extend("elsan.zmmpur.puritems.Component", {
	metadata: sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
		"manifest": "json",
		viewPath: "elsan.zmmpur.puritems.view",
		fullScreenPageRoutes: {
			"fullscreen": {
				"pattern": ":?query:",
				"view": "S1"
			}
		}
	}),
	createContent: function() {
		var v = {
			component: this
		};
		return sap.ui.view({
			viewName: "elsan.zmmpur.puritems.Main",
			type: sap.ui.core.mvc.ViewType.XML,
			viewData: v
		});
	}
});