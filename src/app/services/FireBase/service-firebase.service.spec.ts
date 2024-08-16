import { TestBed } from '@angular/core/testing';

import { ServiceFirebaseService } from './service-firebase.service';

describe('ServiceFirebaseService', () => {
  let service: ServiceFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
