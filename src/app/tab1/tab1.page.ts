import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  onViewClick() {
    const linkToOpen = 'https://main--magnificent-eclair-cb873d.netlify.app/';
    Browser.open({ url: linkToOpen });
  }

}
