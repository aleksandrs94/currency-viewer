import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() public lineChartData: ChartDataSets[];
  @Input() public lineChartLabels: Label[];
  @Input()
  set positive(positive: boolean) {
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: positive ? 'rgba(218,222,13,0.5)' : 'rgba(255,0,0,0.3)'
      },
    ];
  };

  public lineChartOptions: (ChartOptions & { responsive: boolean }) = {
    responsive: true,
  };
  public lineChartColors: Color[];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
