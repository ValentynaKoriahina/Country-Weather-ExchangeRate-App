import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CountriesPage } from "../countries/countries.page";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, CountriesPage]
})
export class HomePage {
  constructor() {}
}
