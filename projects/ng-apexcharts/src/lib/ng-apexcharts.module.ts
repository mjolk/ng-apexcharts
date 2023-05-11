import { NgModule } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";
import ApexCharts from "apexcharts/dist/apexcharts.esm.js";

/*declare global {
  interface Window {
    ApexCharts: any;
  }
}*/

//window.ApexCharts = ApexCharts;

const declarations = [ChartComponent];

@NgModule({
  declarations: [...declarations],
  imports: [],
  exports: [...declarations],
})
export class NgApexchartsModule {}
