import { Directive, TemplateRef, ViewContainerRef, ChangeDetectorRef, DoCheck, IterableDiffer, IterableDiffers } from '@angular/core';

// Based on ngFor from 
// https://github.com/angular/angular/blob/master/modules/%40angular/common/src/directives/ng_for.ts
@Directive({
  selector: '[forProductsWithAds]',
  inputs: ['forProductsWithAdsOf']
})
export class ForProductsWithAds implements DoCheck {

  private _collection: any;
  private _differ: IterableDiffer;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _differs: IterableDiffers,
    private _template: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) { }

  set forProductsWithAdsOf(coll: any) {
    this._collection = coll;
    if (coll && !this._differ) {
      this._differ = this._differs.find(coll).create(this._changeDetector);
    }
  }

  ngDoCheck() {
    if (this._differ) {
      var changes = this._differ.diff(this._collection);
      if (changes) {
        changes.forEachAddedItem((change) => {
          console.log('_collection-length: ' + this._collection.length);
          var view = this._viewContainer.createEmbeddedView(this._template);
          view.context.$implicit = change.item;
        });
      }
    }

  }

}
