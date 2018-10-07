import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "product";
const taxCalculationServiceUri = "tax-calculation";

class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }


}

class ServiceTaxCalculation extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var endpoint = `${taxCalculationServiceUri}`;
    return super.list(endpoint, info);
  }

  create(data) {
    var endpoint = `${taxCalculationServiceUri}`;
    return super.post(endpoint, data);
  }

}

export {
  Service,
  ServiceTaxCalculation,
};
