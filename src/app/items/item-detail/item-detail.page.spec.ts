import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailPage } from './item-detail.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemDetailPage', () => {
  let component: ItemDetailPage;
  let fixture: ComponentFixture<ItemDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailPage],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(ItemDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
