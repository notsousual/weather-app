import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient directly
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for route params

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  units: string = 'metric';
  country: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {} // Inject HttpClient and ActivatedRoute

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country')!; // Get country from the route
    this.getWeatherData(this.country, this.units);
  }

  getWeatherData(country: string, units: string): void {
    const appId = '794ee95e63c5a32aaf88cd813fa2e425'; // Replace with your OpenWeatherMap API Key
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=${units}&APPID=${appId}`
      )
      .subscribe((data) => (this.weatherData = data));
  }

  switchUnits(): void {
    this.units = this.units === 'metric' ? 'imperial' : 'metric';
    this.getWeatherData(this.country, this.units);
  }
}
