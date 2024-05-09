/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "fiorinov/bps/model/models",
    "sap/ui/model/json/JSONModel",
  ],
  function (UIComponent, Device, models, JSONModel) {
    "use strict";

    return UIComponent.extend("fiorinov.bps.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        this.getRouter().attachBeforeRouteMatched(this.onBrowsing, this);

        const oModel = new JSONModel();
        oModel.setProperty("/layout", "OneColumn");
        this.setModel(oModel, "layout");

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },
      onBrowsing: function (oEvent) {
        const sRouteName = oEvent.getParameter("name");
        let sLayout;
        if (sRouteName === "Details") {
          sLayout = "TwoColumnsMidExpanded";
        } else {
          sLayout = "OneColumn";
        }

        const oModel = this.getModel("layout");
        oModel.setProperty("/layout", sLayout);
      },
    });
  }
);
