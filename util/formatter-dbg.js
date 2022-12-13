/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("elsan.zmmpur.puritems.util.formatter");

elsan.zmmpur.puritems.util.formatter = {
	
		nameIdTuple : function(name, id) {
			return name + ((id) ? " (" + id + ")" : "");
		},
		IDBraces : function(id) {
			return ((id) ? " (" + id + ")" : "");
		},
		ConcatSlash : function(header,item) {
			if(header === ""){
				return "";
			}
			else if(item !== null & header !== null){
				return header + " / " + item;
			}
		},
		calcRelevance5: function(value) {
			return ((value / 1) > 1) ? (5) : (value / 1 * 5);
		},
		isDownloadButtonVisible: function() {
			return sap.ui.Device.system.desktop;
		},
		setPostGRButtonDisabled: function(value){
			return (value === true ? true : false);
		}
		
};