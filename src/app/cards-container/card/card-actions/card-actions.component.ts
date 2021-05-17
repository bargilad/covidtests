import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ICountryData} from '../../../core/interfaces/IcountryData';
import {CovidAppServiceService} from '../../../core/services/covid-app-service.service';
import {MatDatepicker} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/typings/esm5/datepicker';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActionsComponent implements OnInit{
  @Input() countryData: ICountryData;
  @Output() dateHasChanged = new EventEmitter<ICountryData>();
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  minDate: Date;
  constructor(private covidAppServiceService: CovidAppServiceService,
              private http: HttpClient,
              public datepipe: DatePipe) {
  }

  addToFavorites() {
    this.covidAppServiceService.addCountyToFavorites.next(this.countryData);
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    const date = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.getCountryDetails(date).subscribe(
      (res) => {
        this.calculateCountryNewValues(res[0]);
      },
    _ => {
        this.covidAppServiceService.presentErrorMsg.next();
    }
  );
  }

  private getCountryDetails(date: string): Observable<any> {
    const queryParams = `/report/country/name?name=${this.countryData.country}&date=${date}`;
    return this.http.get(`${this.covidAppServiceService.rapidAPI}${queryParams}`,
      this.covidAppServiceService.rapidHeaders);
  }

  private calculateCountryNewValues(res: any) {
    this.resetCountryValues();
    for (const state of res.provinces) {
      this.countryData.deaths += state.deaths;
      this.countryData.confirmed += state.confirmed;
      this.countryData.recovered += state.recovered;
    }
    this.dateHasChanged.emit(this.countryData);
  }

  private resetCountryValues() {
    this.countryData.deaths = 0;
    this.countryData.confirmed = 0;
    this.countryData.recovered = 0;
  }

  ngOnInit(): void {
    this.minDate = new Date('2020-04-01T00:00:00');
  }
}
