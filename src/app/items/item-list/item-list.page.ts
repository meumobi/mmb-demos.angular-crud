import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.data$;
  }
}
