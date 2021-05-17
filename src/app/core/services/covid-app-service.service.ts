import {Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ICountryData} from '../interfaces/IcountryData';

@Injectable({
  providedIn: 'root'
})
export class CovidAppServiceService {
  addCountyToFavorites = new Subject<ICountryData>();
  presentErrorMsg = new Subject<void>();
  rapidAPI = this.env.api;
  rapidHeaders = {
    headers: {
      'x-rapidapi-key': '55ad8b86bfmshb0de3f87fe2a7d5p1d7102jsne6262d8d497e',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    }
  };

  constructor(@Inject('ENV') private env) { }
}
