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
  private positiveP = false;

  @Input()
  set positive(positive: boolean) {
    this.positiveP = positive;
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: this.positiveP ? 'rgba(218,222,13,0.5)' : 'rgba(255,0,0,0.3)',
      },
    ];
  }

  get positive(): boolean { return this.positiveP; }

  public lineChartOptions: (ChartOptions & { responsive: any }) = {
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
