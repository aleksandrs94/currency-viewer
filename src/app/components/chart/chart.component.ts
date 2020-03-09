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
  @Input() private positive: boolean;
  public lineChartOptions: (ChartOptions & { responsive: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: this.positive ? 'rgba(218,222,13,0.5)' : 'rgba(255,0,0,0.3)',
      },
    ]
  }

}
