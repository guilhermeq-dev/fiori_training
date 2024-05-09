// @ts-nocheck
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("fiorinov.bps.controller.Details", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("Details")
          .attachPatternMatched(this.sRouteDetails, this);
      },
      sRouteDetails: function (oEvent) {
          debugger;
          const sPartnerID = oEvent.getParameter('arguments').sPartnerId
      },
    });
  }
);
