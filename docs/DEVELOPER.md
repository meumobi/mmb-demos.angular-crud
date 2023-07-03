# Building and testing new features

This document describes the project structure adopted and how to contribute with new features.

## Project structure

Following [Angular Application structure recommendations](https://angular.io/guide/styleguide#application-structure-and-ngmodules), all feature areas are in their own folder, with their own NgModule.

```sh
./src
  /app
    /core
      analytics.service.ts|spec.ts
    /items
      items.component.ts|html|css|spec.ts
      /item-detail
        item-detail.component.ts|html|css|spec.ts
      /item-form
        item-form.component.ts|html|css|spec.ts
      /shared
        /components
          /item-headline
            item-headline.component.ts|html|css|spec.ts
        /services
          item.service.ts|spec.ts
          item-mock.service.ts
          index.ts
        item-mock.json
        item.model.ts
    /shared
      /components
        index.ts
      /directives
        index.ts
    ...
    app-routing.module.ts
    app.module.ts
```

## Use ng schematics instead of @ionic/angular-toolkit

If you run `ng generate page` command it will be interpreted by a ionic schematics instead of angular. This allow Ionic to add automatically `IonicModule` on newly created page. Same thing occurs with component.
The backward of this configuration is that you canâ€™t use all available [angular cli options](https://angular.io/cli/generate), for example [--changeDetection is unknown](https://github.com/ionic-team/angular-toolkit/issues/177).

Then we prefer to use angular schematics to create files based on a schematic.

## Adding Feature

> Rule of thumb is to try to create features which don't depend on any other features just on services provided by CoreModule and components provided by SharedModule.

### Module

It's considered a [best practice to add routing module for each feature module](https://angular.io/guide/lazy-loading-ngmodules).
Then we'll add a new module for stacks (before running each cli I recommend to add `--dry-run` to simulate cmd):

```bash
$ ng generate module stacks --routing
CREATE src/app/stacks/stacks-routing.module.ts (248 bytes)
CREATE src/app/stacks/stacks.module.ts (275 bytes)
```

StacksRoutingModule will handle any stacks-related routing. This keeps the appâ€™s structure organized as the app grows and allows you to reuse this module while easily keeping its routing intact.

StacksModule is needed for setting up lazy loading for your feature module.

### Pages

```bash
$ ng g component stacks/stack-list --module=stacks
$ ng g component stacks/stack-detail --module=stacks
```

### Routing

Open and edit `src/app/app-routing.module.ts` to add new module.

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/stack/home', pathMatch: 'full' },
...
  {
    path: 'stacks',
    loadChildren: () => import('./stacks/stacks.module').then(m => m.StacksModule)
  },
....
];
```

Open and edit src/app/stacks/stacks-routing.module.ts to add routes as below:

```typescript
...
import { StackListComponent } from './stack-list/stack-list.component';
import { StackDetailComponent } from './stack-detail/stack-detail.component';


const routes: Routes = [
  { path: '', component: StackListComponent},
  { path: 'detail/:id', component: StackDetailComponent},
];
...
```

### Model

TODO

## Navigating

## Testing

## Clean code concepts

We follow [Robert C. Martin's Clean Code principles, adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript). Find below some others best practices we follow:

### Boolean var prefix `isLoggedIn` or `hasAccess`

Prefix boolean variables and function names with "is" or "has". You know, something like isLoggedIn, hasAccess.
Use affirmative names, avoid `isDisabled`, prefer `isEnabled`.

[dev.to - Tips on naming boolean variables](https://dev.to/michi/tips-on-naming-boolean-variables-cleaner-code-35ig)

### Private var prefix `_items`

Ex.: `src/app/modules/dynamic-layout/dynamic-layout.component.ts`

```typescript
private _items: any[];
```

### [Dollar signs in variable names for Observables](https://angular.io/guide/rx-library#naming-conventions-for-observables)

Ex.: `src/app/pages/project/project.page.ts`

```typescript
this.project$ = this.projectService.selectAndGet(this.projectId);
```

### [Trailing comma](https://recology.info/2019/02/trailing-commas/)

Ex.: `src/app/modules/dynamic-layout/dynamic-layout.module`

```typescript
exports: [
  DynamicLayoutComponent,
  CarouselSliderComponent,
  FilterableListComponent,
  FilterableToolbarComponent,
  GridListComponent,
];
```

### Typescript aliases

When available prefer [aliases on imports](https://christianlydemann.com/simpler-typescript-paths-with-path-aliases/) instead of relative paths.
For example on `src/app/pages/home/home.page.ts`:

```ts
import { Stack } from '@shared/models/stack.model';
```

Manage aliases on tsconfig

```ts
"paths": {
  "@stacks/*": [
    "src/app/stacks/*"
  ],
  "@shared/*": [
    "src/app/shared/*"
  ]
}
```

## Angular tips

### Using Getters and Setters with Input decorator

- Donâ€™t use side effects in setters.
- Donâ€™t use subscription in setters.

Source: <https://andrew-morozw.medium.com/using-getters-and-setters-in-typescript-and-angular-d478829461c8>

## Typescript tips

### Extending TypeScript Types

```ts
this.projects$ = this.projectService
  .getMyProjects()
  .pipe(
    map((projects: Project[]) =>
      projects.map((project) => ({
        ...project,
        canEdit: this.projectService.isProjectAdmin(project),
      }))
    )
  );
```

```html
<div *ngIf="projects$ | async as projects" class="list-wrap">
  <ion-item *ngFor="let project of projects" class="my-projects-menu">
    <ion-button
      *ngIf="project?.canEdit"
      slot="end"
      (click)="openProjectMenu($event, project)"
      fill="clear"
      color="medium"
      class="projects-action"
    >
      <ion-icon name="ellipsis-vertical-outline" slot="icon-only"></ion-icon>
    </ion-button>
  </ion-item>
</div>
```

https://www.damirscorner.com/blog/posts/20180601-ExtendingTypescriptTypeswithIntersection.html

#### Intersection type

```ts
projects$: Observable<(Project & { canEdit?: boolean })[]>;
```

#### Type alias

```ts
type UserPermissions = {
  canEdit: boolean;
};
type WithUserPermissions<T> = T & UserPermissions;

projects$: Observable<WithUserPermissions<Project>[]>;
```

### Type predicate

item is Stack | Clip. If we call property 'dtePublished', only owned by Stack it will raised an error.

```html
<ion-icon
  [name]="item.dtePublished ? 'play-circle-outline' : 'create-outline'"
></ion-icon>
```

error TS2339: Property 'dtePublished' does not exist on type 'Stack | Clip'.

The process of refining types to more specific types than declared is called narrowing. To handle narrowing we can use [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates). A type predicate is a specially-defined function that returns a boolean when a specified argument returns true:

```ts
public isStack(item: Stack | Clip): item is Stack {
  return "stackId" in item;
}

public isClip(item: Stack | Clip): item is Clip {
  return "source" in item;
}

if (this.isStack(this.item)) {
  /**
   * Type predicate allows us to call for Stack property
   */
  const date = new Date(this.item.dtePublished);
 ...
}
```

```html
<ion-icon
  *ngIf="isStack(item)"
  else
  isClip
  [name]="item.dtePublished ? 'play-circle-outline' : 'create-outline'"
></ion-icon>
<ng-template #isClip>
  <ion-icon
    [name]="isPlaying ? 'pause-circle-outline' : 'play-circle-outline'"
  ></ion-icon>
</ng-template>
```

When possible prefer [Discriminated Unions vs Type Predicate](https://felt.com/blog/narrowing-typescript-type-predicates-discriminated-unions).

> Add a property to each type that says what type it is. That property is called a discriminant and it's often called `type` or `kind`.

### Juggling-check for null and undefined

```ts
if (x == null) {
}

// If you use a strict-check, it will only be true for values set to null
// and won't evaluate as true for undefined variables:

if (x === null) {
}
```

<https://stackoverflow.com/a/28984306/4982169>

### Optional chaining operator

[Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`.?`) operator.

```ts
if (window?.location && typeof window.location.reload === 'function') {
  window.location.reload();
}
```

### Nullish coalescing operator

[Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) (`??`) operator.

```ts
 getResizeObject(): ResizeObject {
   return {
     width: window?.innerWidth ?? this.platform.width(),
     height: window?.innerHeight ?? this.platform.height(),
   };
 }
```

## Furthermore

- [Tomas Trajan - 6 Best Practices & Pro Tips when using Angular CLI](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81)
- [Rik de Vos - 5 Tips & Best Practices to Organize your Angular Project](https://medium.com/dev-jam/5-tips-best-practices-to-organize-your-angular-project-e900db08702e)
