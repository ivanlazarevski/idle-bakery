import { TestBed } from '@angular/core/testing';

import { AchievementsService } from './achievements.service';

describe('Achievements', () => {
  let service: AchievementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
