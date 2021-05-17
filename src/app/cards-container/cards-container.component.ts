import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICountryData} from '../core/interfaces/IcountryData';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsContainerComponent {
  @Input() countriesDetails: ICountryData[] = [];
  constructor() { }

}
