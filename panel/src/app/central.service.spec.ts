import { TestBed, inject } from '@angular/core/testing';

import { CentralService } from './central.service';

describe('CentralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentralService]
    });
  });

  it('should be created', inject([CentralService], (service: CentralService) => {
    expect(service).toBeTruthy();
  }));
});
