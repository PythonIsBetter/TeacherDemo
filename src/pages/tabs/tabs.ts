import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ClassPage} from "../class/class";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClassPage;
  tab3Root = ContactPage;
  tab4Root=AboutPage;

  constructor() {

  }
}
