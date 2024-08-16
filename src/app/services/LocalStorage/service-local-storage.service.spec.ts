import { TestBed } from '@angular/core/testing';

import { ServiceLocalStorageService } from './service-local-storage.service';

describe('ServiceLocalStorageService', () => {
  let service: ServiceLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
