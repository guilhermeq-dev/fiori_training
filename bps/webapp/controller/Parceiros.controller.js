// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("fiorinov.bps.controller.Parceiros", {
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
            },
            onSearch: function (oEvent) {

                const sValue = oEvent.getParameter('newValue');

                const oTable = this.getView().byId('partnersTable');

                const oBinding = oTable.getBinding('items')

                const aFilters = [];

                const oFilter = new Filter({
                    filters: [
                        new Filter('id', FilterOperator.Contains, sValue),
                        new Filter('name', FilterOperator.Contains, sValue),
                        new Filter('type', FilterOperator.Contains, sValue)
                    ],
                });

                aFilters.push(oFilter);

                oBinding.filter(aFilters)
            },
            onClick: function (oEvent) {
                const oContext = oEvent.getSource().getBindingContext('partnerInfos');
                console.log(oContext)
            }
        });
    });
