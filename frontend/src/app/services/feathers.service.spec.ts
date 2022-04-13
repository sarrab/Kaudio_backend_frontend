/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeathersService } from './feathers.service';

describe('Service: Feathers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeathersService]
    });
  });

  it('should ...', inject([FeathersService], (service: FeathersService) => {
    expect(service).toBeTruthy();
  }));
});
