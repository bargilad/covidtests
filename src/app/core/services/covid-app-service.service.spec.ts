import { TestBed } from '@angular/core/testing';

import { CovidAppServiceService } from './covid-app-service.service';

describe('CovidAppServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidAppServiceService = TestBed.get(CovidAppServiceService);
    expect(service).toBeTruthy();
  });
});
