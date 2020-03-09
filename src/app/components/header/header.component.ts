import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() date: string;
  @Input() startAt: string;
  @Input() endAt: string;
  @Input() base: string;
  @Input() baseDropDown: Array<string>;
  @Output() changedParams: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedPeriodParams: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeParams(date: string, base: string): void {
    const params = {
      date,
      base
    };
    this.changedParams.emit(params);
  }

  changePeriodParams(startAt: string, endAt: string, base: string): void {
    const params = {
      startAt,
      endAt,
      base
    };
    this.changedPeriodParams.emit(params);
  }

}
