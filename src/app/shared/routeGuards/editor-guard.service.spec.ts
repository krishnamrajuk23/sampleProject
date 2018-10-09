import { TestBed, inject } from '@angular/core/testing';

import { EditorGuardService } from './editor-guard.service';

describe('EditorGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorGuardService]
    });
  });

  it('should be created', inject([EditorGuardService], (service: EditorGuardService) => {
    expect(service).toBeTruthy();
  }));
});
