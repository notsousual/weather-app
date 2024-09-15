import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding
import { MatGridListModule } from '@angular/material/grid-list'; // Import Material components

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatGridListModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  searchTerm: string = '';
  isGridView: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 16;
  paginatedCountries: any[] = [];
  sortAscending: boolean = true;
  isLoading: boolean = true; // Track whether data is being loaded
  isSearching: boolean = false; // Track whether search is active

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.http
      .get('https://countriesnow.space/api/v0.1/countries')
      .subscribe((response: any) => {
        this.countries = response.data;
        this.paginateCountries();
        this.isLoading = false;
      });
  }

  selectCountry(country: string): void {
    this.router.navigate(['/weather', country]);
  }

  filteredCountries() {
    const filtered = this.countries
      .filter((country) =>
        country.country.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        return this.sortAscending
          ? a.country.localeCompare(b.country)
          : b.country.localeCompare(a.country);
      });
    return filtered;
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.paginateCountries();
  }

  paginateCountries(): void {
    const filtered = this.filteredCountries(); // Always search across all countries
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCountries = filtered.slice(start, end);
  }

  nextPage(): void {
    const filteredLength = this.filteredCountries().length;
    if (this.currentPage * this.itemsPerPage < filteredLength) {
      this.currentPage++;
      this.paginateCountries();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCountries();
    }
  }

  onSearch(): void {
    this.isSearching = true;
    setTimeout(() => {
      this.paginateCountries(); // Recalculate pagination based on search term
      this.isSearching = false;
    }, 500); // Simulating a slight delay for search
  }
}
