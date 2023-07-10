import { TestBed } from '@angular/core/testing';

import { ItemMockService } from './item-mock.service';

describe('ItemMockService', () => {
  let itemMockService: ItemMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    itemMockService = TestBed.inject(ItemMockService);
  });

  it('should be created', () => {
    expect(itemMockService).toBeTruthy();
  });

  it('#data$ should return a non-empty array of items', (done: DoneFn) => {
    itemMockService.data$.subscribe((items) => {
      expect(!!items.length).toBeTrue();
      done();
    });
  });
});
