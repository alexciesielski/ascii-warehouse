import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-ad',
  templateUrl: 'ad.component.html',
  styleUrls: ['ad.component.css']
})
export class AdComponent implements OnInit {
  @Input('src') url: string = '';

  constructor() {}

  ngOnInit() {
  }

}
