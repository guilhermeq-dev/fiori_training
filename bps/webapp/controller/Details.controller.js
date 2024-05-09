// @ts-nocheck
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/models"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator, models) {
    "use strict";

    return Controller.extend("fiorinov.bps.controller.Details", {
      onInit: function () {
        const oPartners = [
          {
            id: "0001",
            name: "Lab2dev",
            type: "Consultoria SAP"
          },
          {
            id: "0002",
            name: "BRASTEMP",
            type: "Cliente"
          },
          {
            id: "0003",
            name: "EPI-USE",
            type: "Consultoria SAP"
          },
          {
            id: "0004",
            name: "MARABRAZ",
            type: "Cliente"
          }
        ]


        const oModel = new JSONModel(oPartners)
        this.getView().setModel(oModel, "partnerInfos")

        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("Details")
          .attachPatternMatched(this.sRouteDetails, this);

      },
      sRouteDetails: function (oEvent) {

        const oArgs = oEvent.getParameter('arguments')
        const oModel = this.getView().getModel('partnerInfos')
        oModel.setProperty('/partnerId', oArgs.sPartnerId)

      },
    });
  }
);
