import { TestBed } from '@angular/core/testing';

import { FillingService } from './filling.service';

describe('FillingService', () => {
  let service: FillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
