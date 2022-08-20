import { TestBed } from '@angular/core/testing';

import { ItokenService } from './itoken.service';

describe('ItokenService', () => {
  let service: ItokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
