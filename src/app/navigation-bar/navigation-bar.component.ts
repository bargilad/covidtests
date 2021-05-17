import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EPresentationType} from '../core/Enums/EpresentationType';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {
  @Output() changePresentationEvent = new EventEmitter<EPresentationType>();
  @Output() searchForCountryEvent = new EventEmitter<string>();
  countryToSearch: any;
  constructor() { }

  ngOnInit() {
  }

  changePresentationToPopular() {
    this.changePresentationEvent.emit(EPresentationType.POPULAR);
  }

  changePresentationToFavorites() {
    this.changePresentationEvent.emit(EPresentationType.FAVORITES);
  }

  searchForCountry() {
    this.searchForCountryEvent.emit(this.countryToSearch);
  }
}
