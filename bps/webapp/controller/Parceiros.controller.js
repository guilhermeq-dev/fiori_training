// @ts-nocheck
sap.ui.define([
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

        return Controller.extend("fiorinov.bps.controller.Parceiros", {
            onInit: function () {
                const oPartners = [
                    {
                        id: 1,
                        name: "Lab2dev",
                        type: "Consultoria SAP"
                    },
                    {
                        id: 2,
                        name: "BRASTEMP",
                        type: "Cliente"
                    },
                    {
                        id: 3,
                        name: "EPI-USE",
                        type: "Consultoria SAP"
                    },
                    {
                        id: 4,
                        name: "MARABRAZ",
                        type: "Cliente"
                    }
                ]


                const oModel = new JSONModel(oPartners)
                this.getView().setModel(oModel, "partnerInfos")
            },
            onSearch: function (oEvent) {

                const sValue = oEvent.getSource().getValue();
                const aFilters = [];

                if (sValue && sValue.length > 0) {
                    const oFilter = new Filter({
                        filters: [
                            new Filter('id', FilterOperator.EQ, sValue),
                            new Filter('name', FilterOperator.Contains, sValue),
                            new Filter('type', FilterOperator.Contains, sValue)
                        ],
                    });
                    aFilters.push(oFilter);
                }

                const oTable = this.getView().byId('partnersTable');

                const oBinding = oTable.getBinding('items')

                oBinding.filter(aFilters)
            },
            onNav: function (oEvent) {

                const oRouter = this.getOwnerComponent().getRouter();

                const oContext = oEvent.getSource().getBindingContext('partnerInfos');

                const sPartnerID = oContext.getProperty('id');

                oRouter.navTo("Details", {
                    sPartnerId: sPartnerID
                });
            },
            onAddPartner: function () {
                if (!this.sDialog) {
                    this.sDialog = sap.ui.xmlfragment(
                        "fiorinov.bps.view.fragments.AddPartner",
                        this
                    );
                    this.getView().addDependent(this.sDialog);
                }

                const newPartner = {
                    name: "",
                    type: ""
                }

                const oModel = new JSONModel(newPartner);

                this.getView().setModel(oModel, "addPartner");

                this.sDialog.open();
            },
            onCloseDialog: function () {
                this.sDialog.close();
            },
            onSendFormData: function () {
                const oAddPartner = this.getView().getModel("addPartner").getData();
                const oModel = this.getView().getModel('partnerInfos').getData();

                const oNewPartner = [
                    ...oModel,
                    {
                        id: oModel[oModel.length - 1].id + 1,
                        ...oAddPartner
                    }
                ];

                this.getView().getModel("partnerInfos").setData(oNewPartner);

                this.sDialog.close();
            }
        });
    });
