import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../shared/services';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  itemId: string | null;
  item: Item | null | undefined;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
    this.itemId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.itemId !== null) {
      this.itemService
        .getById(this.itemId)
        .then((res) => {
          this.item = res;
        })
        .catch((error) => {
          this.item = null;
          console.log(error.message);
        });
    } // else { }
  }
}
