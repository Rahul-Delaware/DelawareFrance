/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.util.formatter");
elsan.zmmpur.puritems.util.formatter = {
	nameIdTuple: function(n, i) {
		return n + ((i) ? " (" + i + ")" : "");
	},
	IDBraces: function(i) {
		return ((i) ? " (" + i + ")" : "");
	},
	Clean: function(n, i){
		if (i === "00000")
		{
			return "";
		}else{
			return n + " / " + i;
		}
	},
	ConcatSlash: function(h, i) {
		if (h === "") {
			return "";
		} else if (i !== null & h !== null) {
			return h + " / " + i;
		}
	},
	calcRelevance5: function(v) {
		return ((v / 1) > 1) ? (5) : (v / 1 * 5);
	},
	isDownloadButtonVisible: function() {
		return sap.ui.Device.system.desktop;
	},
	setPostGRButtonDisabled: function(v) {
		return (v === true ? true : false);
	},
	fnEmailValueState: function(sValue){
       if(sValue === true){
         return sap.ui.core.ValueState.Success;
       }else{
       	return sap.ui.core.ValueState.Error;
       }	
    },
    fnCalcEmail: function(sValue) {
		var oResourceBundle = this.getModel("i18n").getResourceBundle();
		var sText;
        if(sValue === true){
        	sText = oResourceBundle.getText("Sent");
        }else{
        	sText = oResourceBundle.getText("NotSent");
        }
        return sText;
	}
};