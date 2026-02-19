import { TestBed } from '@angular/core/testing';

import { Mlb } from './mlb';

describe('Mlb', () => {
  let service: Mlb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mlb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
