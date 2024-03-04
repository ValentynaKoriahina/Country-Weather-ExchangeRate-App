import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})

export class CountriesPage {
  countries: any[] = [];
  searchText: string = '';

  constructor(private http: MyHttpService) { }

  ngOnInit() {
    this.getCountriesList();
  }

  // Asynchronous function to get the list of countries from the server
  async getCountriesList() {
    const options: HttpOptions = {
      url: "https://restcountries.com/v3.1/all"
    };
    const response = await this.http.get(options);
    this.countries = response.data;
  }
  
  // Getter to display the filtered list of countries (live search)
  // https://nick-babchenko.tech/posts/angular-getters
  get countriesToDisplay() {
    return this.countries.filter(country =>
      country.name.official.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
