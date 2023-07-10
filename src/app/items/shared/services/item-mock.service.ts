import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemMock } from '../../item-mock';
import { Item } from '../../item.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemMockService {
  // Copy object references into the new array (shallow copy)
  // https://stackoverflow.com/questions/7486085/copy-array-by-value
  private data: Item[] = [...ItemMock.data];
  private items: BehaviorSubject<Item[]> = new BehaviorSubject(this.data);

  get data$(): Observable<Item[]> {
    return this.items.asObservable().pipe(delay(3000)); // delay to simulate http request
  }

  getById(id: string): Promise<Item> {
    const item = this.data.find((x) => x.id === id);

    return new Promise((resolve, reject) =>
      setTimeout(() => {
        // delay to simulate http request
        if (item !== undefined) {
          return resolve(item);
        } else {
          return reject(new Error(`No item found with id ${id}`));
        }
      }, 2000)
    );
  }

  // update(id: string, data: Partial<Item>): Promise<void> {}
  // create(item: Item): Promise<void> {}
  // delete(id: string): Promise<void> {}
}
