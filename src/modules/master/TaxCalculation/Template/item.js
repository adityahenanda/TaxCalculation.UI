import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-tax-loader')

export class item {
    @bindable Product;

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.Product = this.data.Name;
    }


    ProductChanged(newValue, oldValue) {
        if (newValue) {
            // this.Product = newValue;
            this.data.Name = newValue.Name;
            this.data.TaxCode = newValue.TaxCode;
            this.data.Type = newValue.Type;
        } else {
            this.data = {};
        }
    }


    get productLoader() {
        return ProductLoader;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}
