import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ICountryData} from '../../core/interfaces/IcountryData';
import {CovidAppServiceService} from '../../core/services/covid-app-service.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateX(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}))
          ]
        )]
    )
  ],
})
export class CardComponent implements OnInit {
  @Input() countryData: ICountryData;
  countryFlag: string;
  private dateHasChanged = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.countryFlag = `https://www.countryflags.io/${this.countryData.code}/flat/64.png`;
  }

  onDateHasChanged(event: ICountryData) {
    this.countryData = event;
    this.dateHasChanged = true;
    this.cdr.markForCheck();
  }
}
