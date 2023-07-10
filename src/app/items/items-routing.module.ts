import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListPage } from './item-list/item-list.page';
import { ItemDetailPage } from './item-detail/item-detail.page';

const routes: Routes = [
  { path: '', component: ItemListPage },
  { path: 'detail/:id', component: ItemDetailPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
