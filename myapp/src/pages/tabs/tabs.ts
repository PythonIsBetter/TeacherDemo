import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {VideoPage} from "../video/video";
import {BlankPage} from "../blank/blank";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = VideoPage;
  tab2Root =BlankPage;
  tab3Root = ContactPage;
  tab4Root=AboutPage;

  constructor() {

  }
}
