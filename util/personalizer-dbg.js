/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.util.personalizer");

elsan.zmmpur.puritems.util.PersoService = {	

		 getPersData : function () {
		    var oDeferred = new jQuery.Deferred();
		    if (!this._oBundle) {
		      this._oBundle = this.oData;
		    }
		    var oBundle = this._oBundle;
		    oDeferred.resolve(oBundle);
		    return oDeferred.promise();
		  },

		  setPersData : function (oBundle) {
		    var oDeferred = new jQuery.Deferred();
		    this._oBundle = oBundle;
		    oDeferred.resolve();
		    return oDeferred.promise();
		  },
		  
		  resetPersData : function () {
		    var oDeferred = new jQuery.Deferred();
		    oDeferred.resolve();
		    return oDeferred.promise();
		  },
		  
		};