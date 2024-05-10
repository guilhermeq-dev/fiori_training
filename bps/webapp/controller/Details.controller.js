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
            type: "Consultoria SAP",
            infos: {
              street: "Marina Cretti",
              number: "1",
              complement: "floor 7, apto 22",
              city: "Osasco",
              state: "SP",
              country: "Brasil",
              zipcode: "00000-000",
              phone: "(11) 99999-9999",
              email: "contato@lab.com",
              site: "www.lab2dev.com.br",
              cnpj: "00.000.000/0000-00",
            }
          },
          {
            id: "0002",
            name: "BRASTEMP",
            type: "Cliente",
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
        const oDataModel = oModel.getData();
        const oPartner = oDataModel.find((partner) => partner.id === oArgs.sPartnerId)
        oModel.setProperty('/partnerId', oArgs.sPartnerId);
        oModel.setProperty('/partnerDetails', oPartner);
      },
      openEditData: function () {
        if (!this.sDialog) {
          this.sDialog = sap.ui.xmlfragment(
            "fiorinov.bps.view.fragments.EditData",
            this
          );
          this.getView().addDependent(this.sDialog);
        }
        const oModel = this.getView().getModel('partnerInfos').getData();
        const currentModel = oModel.partnerDetails
        const oEditModel = new JSONModel(currentModel);
        this.getView().setModel(oEditModel, "editData");

        this.sDialog.open();
      },
      onCloseEdit: function () {
        this.sDialog.close();
      },
      onEditData: function () {
        debugger
      }
    });
  }
);
