/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");
sap.ca.scfld.md.ConfigurationBase.extend("elsan.zmmpur.puritems.Configuration", {
	oServiceParams: {
		serviceList: [{
			name: "ZZME2STAR_ODATA_SRV",
			masterCollection: "PDocItem",
			serviceUrl: elsan.zmmpur.puritems.Component.getMetadata().getManifestEntry("sap.app").dataSources["ME2STAR_OD_SRV"].uri,
			isDefault: true,
			useBatch: true,
			mockedDataSource: jQuery.sap.getModulePath("elsan.zmmpur.puritems") + "/" + elsan.zmmpur.puritems.Component.getMetadata().getManifestEntry(
				"sap.app").dataSources["ME2STAR_OD_SRV"].settings.localUri
		}]
	},
	getServiceParams: function() {
		return this.oServiceParams;
	},
	getAppConfig: function() {
		return this.oAppConfig;
	},
	getServiceList: function() {
		return this.oServiceParams.serviceList;
	},
	getMasterKeyAttributes: function() {
		return ["Id"];
	}
});