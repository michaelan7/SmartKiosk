sap.ui.define([], function () {
	"use strict";

	return {
		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		imageURL: function (sURL) {
			return sURL ? URI(sURL).path() : "";
		},

		floatParser: function (sValue) {
			return parseFloat(sValue);
		},

		ratingNumber: function (sRatingNumber) {
			return this.getResourceBundle().getText("xfld.ratingLayout", [sRatingNumber]);
		}
	};
});