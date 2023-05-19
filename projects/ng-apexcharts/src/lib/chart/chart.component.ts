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
    this._options = options;
    this.ngZone.runOutsideAngular(() => {
      if (!this._chartObj) {
        this._create();
        return;
      }
      this._chartObj.updateOptions(this._options, true, true, false);
    });
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
    this._chartObj = new ApexCharts(
      this.chartElement.nativeElement,
      this._options
    );
    this._chartObj.render();
  }

  public toggleSeries(seriesName: string): any {
    return this.ngZone.runOutsideAngular(() =>
      this._chartObj.toggleSeries(seriesName)
    );
  }

  public showSeries(seriesName: string) {
    this.ngZone.runOutsideAngular(() => this._chartObj.showSeries(seriesName));
  }

  public hideSeries(seriesName: string) {
    this.ngZone.runOutsideAngular(() => this._chartObj.hideSeries(seriesName));
  }

  public resetSeries() {
    this.ngZone.runOutsideAngular(() => this._chartObj.resetSeries());
  }

  public zoomX(min: number, max: number) {
    this.ngZone.runOutsideAngular(() => this._chartObj.zoomX(min, max));
  }

  public toggleDataPointSelection(
    seriesIndex: number,
    dataPointIndex?: number
  ) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.toggleDataPointSelection(seriesIndex, dataPointIndex)
    );
  }

  public destroy() {
    this._chartObj.destroy();
  }

  public setLocale(localeName?: string) {
    this.ngZone.runOutsideAngular(() => this._chartObj.setLocale(localeName));
  }

  public paper() {
    this.ngZone.runOutsideAngular(() => this._chartObj.paper());
  }

  public addXaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.addXaxisAnnotation(options, pushToMemory, context)
    );
  }

  public addYaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.addYaxisAnnotation(options, pushToMemory, context)
    );
  }

  public addPointAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any
  ) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.addPointAnnotation(options, pushToMemory, context)
    );
  }

  public removeAnnotation(id: string, options?: any) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.removeAnnotation(id, options)
    );
  }

  public clearAnnotations(options?: any) {
    this.ngZone.runOutsideAngular(() =>
      this._chartObj.clearAnnotations(options)
    );
  }

  public dataURI(options?: any): Promise<{ imgURI: string }> {
    return this._chartObj.dataURI(options);
  }
}
