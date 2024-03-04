import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CountryDetailsPage implements OnInit {

  forecast!: string;

  // New variables to control paragraph display
  conversionResult!: string;
  enteredAmount!: number;

  // Declaring variables for storing country data
  countryOfficialName!: any;
  countryCca!: any;
  countryFlag!: any;
  countryPopulation!: number;
  countryCapital!: any;
  countryLanguages!: any;
  capitalLatlng!: any;
  currencyCode!: any;

  countries: any[] = [];

  constructor(private route: ActivatedRoute, private http: MyHttpService) { }

  ngOnInit() {
    // Obtaining Country ID from the route and requesting data
    // https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053
    this.countryCca = this.route.snapshot.paramMap.get('cca2');

    // Call getCountryDetails and, upon successful execution, call getWeatherDetails
    this.getCountryDetails()
      .then(() => {
        this.getWeatherDetails();
      });
  }

  // Asynchronous function to retrieve country details
  async getCountryDetails() {
    const request = "https://restcountries.com/v3.1/alpha/" + this.countryCca;
    const options: HttpOptions = {
      url: request
    };

    // API request
    let response = await this.http.get(options);
    this.countryFlag = response.data[0].flags.png;
    this.countryPopulation = response.data[0].population;
    this.countryCapital = response.data[0].capital;
    this.countryLanguages = response.data[0].languages;
    this.capitalLatlng = response.data[0].capitalInfo.latlng;
    this.countryOfficialName = response.data[0].name.official
    this.currencyCode = Object.keys(response.data[0].currencies)[0];
  }

  // Asynchronous function for currency conversion
  async convertToEUR() {
    const exchangeRate_API_KEY: string = "88caace63408514e03bf6c7d";
    const request: string = `https://v6.exchangerate-api.com/v6/${exchangeRate_API_KEY}/pair/${this.currencyCode}/EUR/${this.enteredAmount}`;
    const options: HttpOptions = {
      url: request
    };

    // API request
    let response = await this.http.get(options);
    this.conversionResult = `${this.enteredAmount} ${this.currencyCode} = ${response.data.conversion_result} EUR`
  }

  // Asynchronous function to retrieve weather data
  async getWeatherDetails() {
    const visualCrossingWeather_API_KEY: string = "7N3X9G3UBYWQ74RLTVWGSMK2E";
    const request: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.capitalLatlng}?key=${visualCrossingWeather_API_KEY}`;
    const options: HttpOptions = {
      url: request
    };

    // API request
    let response = await this.http.get(options);
    this.forecast = response.data.description;
  }
}
