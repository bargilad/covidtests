import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {concat, forkJoin, interval, Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {CovidAppServiceService} from './core/services/covid-app-service.service';
import {ICountryData} from './core/interfaces/IcountryData';
import {EPresentationType} from './core/Enums/EpresentationType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private popularCountriesDetails = [];
  private favoritesCountriesDetails = [];
  countriesDetails = this.popularCountriesDetails;
  private shouldPresentNoResultsError = false;
  receivedResults = false;

  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private covidAppServiceService: CovidAppServiceService) {
  }

  ngOnInit(): void {
    this.subscribeToAddFavorites();
    this.getPopularStatesData();
  }

  searchForCountry(country) {
    this.getCountryDetails(country).subscribe(
      (res) => {
        this.handleSearchResults(res);
      }
    );
  }

  private subscribeToAddFavorites() {
    this.covidAppServiceService.addCountyToFavorites.subscribe((countryToAdd: ICountryData) => {
      this.favoritesCountriesDetails.push(countryToAdd);
    });
    this.covidAppServiceService.presentErrorMsg.subscribe(_ => {
      this.shouldPresentNoResultsError = true;
    });
  }

  private getPopularStatesData() {
    const popularDestinationsDetails = this.getPopularCountriesDetails();
    concat(...popularDestinationsDetails)
      .subscribe(
        (res) => {
          this.popularCountriesDetails.push(res[0]);
          this.cdr.markForCheck();
        },
        _ => {
          this.shouldPresentNoResultsError = true;
          this.cdr.markForCheck();
        }
      );
  }

  private getPopularCountriesDetails(): any[] {
    const italyDetails = this.getCountryDetails('Italy').pipe(delay(1100));
    const israelDetails = this.getCountryDetails('Israel').pipe(delay(1100));
    const indiaDetails = this.getCountryDetails('India').pipe(delay(1100));
    const iranDetails = this.getCountryDetails('Iran').pipe(delay(1100));
    const syriaDetails = this.getCountryDetails('Syria').pipe(delay(1100)).pipe(tap(_ => {
      this.receivedResults = true;
    }));
   return [italyDetails, israelDetails, indiaDetails, iranDetails, syriaDetails];
  }

  private getCountryDetails(country: string): Observable<any> {
    return this.http.get(`${this.covidAppServiceService.rapidAPI}/country?name=${country}`, this.covidAppServiceService.rapidHeaders);
  }

  private changePresentation(presentationType: EPresentationType) {
    this.countriesDetails = presentationType === EPresentationType.FAVORITES ? this.favoritesCountriesDetails : this.popularCountriesDetails;
    this.shouldPresentNoResultsError = this.popularCountriesDetails.length === 0;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.covidAppServiceService.addCountyToFavorites.unsubscribe();
    this.covidAppServiceService.presentErrorMsg.unsubscribe();
  }

  private handleSearchResults(res: any[]) {
    if (res.length > 0) {
      this.countriesDetails = [res[0]];
      this.shouldPresentNoResultsError = false;
    } else {
      this.shouldPresentNoResultsError = true;
    }
    this.cdr.markForCheck();
  }
}

