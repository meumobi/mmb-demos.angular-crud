import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListPage } from './item-list/item-list.page';
import { ItemDetailPage } from './item-detail/item-detail.page';

@NgModule({
  declarations: [ItemListPage, ItemDetailPage],
  imports: [CommonModule, ItemsRoutingModule],
})
export class ItemsModule {}
