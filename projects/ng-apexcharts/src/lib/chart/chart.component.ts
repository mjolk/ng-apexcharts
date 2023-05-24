import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  NgZone,
  ChangeDetectionStrategy,
  AfterViewInit,
} from "@angular/core";
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexMarkers,
  ApexNoData,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexForecastDataPoints,
  ApexOptions,
} from "../model/apex-types";
import { asapScheduler } from "rxjs";

import ApexCharts from "apexcharts/dist/apexcharts.esm.js";

@Component({
  selector: "apx-chart",
  template: `<div #chart></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnDestroy, AfterViewInit {
  @Input() set options(options: ApexOptions | null) {
    if (!options) return;
    console.log({ setoptions: options });
    this._options = options;
    asapScheduler.schedule(() =>
      this.ngZone.runOutsideAngular(() => {
        if (!this._chartObj) {
          return;
        }
        console.debug({ updateoptions: this._options });
        this._chartObj.updateOptions(this._options, true, true);
      })
    );
  }
  get options(): ApexOptions | null {
    return this._options;
  }
  private _options: ApexOptions | null = null;

  @ViewChild("chart", { static: true }) private chartElement: ElementRef;
  private _chartObj: any | null;

  constructor(private ngZone: NgZone) {}

  ngOnDestroy() {
    if (this._chartObj) {
      this._chartObj.destroy();
    }
  }

  ngAfterViewInit() {
    if (this._chartObj) {
      this._chartObj.destroy();
    }

    if (this._options) {
      this.ngZone.runOutsideAngular(() => {
        this._create();
      });
    }
  }

  private _create() {
    console.debug({ createchart: this._options });
    this._chartObj = new ApexCharts(
      this.chartElement.nativeElement,
      this._options
    );
    this._chartObj.render();
  }
}
