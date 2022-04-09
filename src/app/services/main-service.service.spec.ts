import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MainServiceService } from './main-service.service';

describe('MainServiceService', () => {
  let service: MainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,

      ]
    });
    service = TestBed.inject(MainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
