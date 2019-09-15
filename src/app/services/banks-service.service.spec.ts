import { TestBed } from '@angular/core/testing';

import { BanksServiceService } from './banks-service.service';

describe('BanksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BanksServiceService = TestBed.get(BanksServiceService);
    expect(service).toBeTruthy();
  });
});
