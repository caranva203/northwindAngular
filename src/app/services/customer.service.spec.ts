import { TestBed, inject } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { environment } from '../../environments/environment.prod';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
