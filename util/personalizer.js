/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.util.personalizer");
elsan.zmmpur.puritems.util.PersoService = {
	getPersData: function() {
		var d = new jQuery.Deferred();
		if (!this._oBundle) {
			this._oBundle = this.oData;
		}
		var b = this._oBundle;
		d.resolve(b);
		return d.promise();
	},
	setPersData: function(b) {
		var d = new jQuery.Deferred();
		this._oBundle = b;
		d.resolve();
		return d.promise();
	},
	resetPersData: function() {
		var d = new jQuery.Deferred();
		d.resolve();
		return d.promise();
	},
};