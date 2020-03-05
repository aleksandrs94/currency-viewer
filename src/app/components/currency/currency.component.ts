import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  @Input() rate: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
