import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service, ServiceTaxCalculation } from './service';
import { Router } from 'aurelia-router';

@inject(Router, Service, ServiceTaxCalculation, BindingEngine)
export class List {

  @bindable data;
  @bindable error;

  taxCode = [1, 2, 3];

  GrandTotal=0;
  TotalAmount=0;
  TotalTaxAmount=0;

  columnsProduct = [
    { field: "Name", title: "Name" },
    { field: "TaxCode", title: "Tax Code" },
    { field: "Type", title: "Type" },
  ];

  columnsTaxCalculation = [
    { field: "Name", title: "Name" },
    { field: "TaxCode", title: "Tax Code" },
    { field: "Type", title: "Type" },
    { field: "Amount", title: "Amount" },
    { field: "TaxAmount", title: "Tax Amount" },
    { field: "Total", title: "Total Amount" },
  ];

  items = {
    columns: [
      { header: "Name", value: "Product" },
      { header: "TaxCode", value: "TaxCode" },
      { header: "Type", value: "Type" },
      { header: "Amount", value: "Amount" },
    ],
    onAdd: function () {
      this.data.items.push({});
    }.bind(this),
  };

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false,
  }

  constructor(router, service, serviceTaxCalculation, bindingEngine) {
    this.service = service;
    this.serviceTaxCalculation = serviceTaxCalculation;
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.getProduct = true;
    this.getTaxCalculation = false;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  taxLoader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: 1,
      order: order,
    };

    return this.getTaxCalculation ?
      (
        this.serviceTaxCalculation.search(args)
          .then(result => {
            this.GrandTotal=result.data[0].GrandTotal;
            this.TotalAmount=result.data[0].TotalAmount;
            this.TotalTaxAmount=result.data[0].TotalTaxAmount;
            return {
              total: result.info.total,
              data: result.data[0].Details
            };
          })
      ) : { total: 0, data: [] };
  }

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      order: order,
    };

    return this.getProduct ?
      (
        this.service.search(args)
          .then(result => {
            return {
              total: result.info.total,
              data: result.data
            };
          })
      ) : { total: 0, data: [] };
  }

  createProduct() {
    //create product
    this.service.create(this.data)
      .then(result => {
        alert("Data created");
        this.showProduct();
        this.data = {};
      })
      .catch(e => {
        this.error = e;
      })
  }

  submit() {

    var dataCalculation = {
      TotalAmount: 0,
      TotalTaxAmount: 0,
      GrandTotal: 0,
      Details: this.data.items,
    }
    this.serviceTaxCalculation.create(dataCalculation)
      .then(result => {
        this.getTaxCalculation = true;
        this.taxCalculationTable.refresh();
      })
      .catch(e => {
        this.error = e;
      })
  }

  getTaxCalculation() {
    // this.getTaxCalculation = false;
    this.taxCalculationTable.refresh();
  }

  showProduct() {
    this.getProduct = true;
    this.productTable.refresh();
  }


}
