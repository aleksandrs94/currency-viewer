import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';

import { CurrencyReducer, DropReducer } from './reducers/currencies.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencyService } from './services/currency.service';
import { ErrorComponent } from './components/error/error.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    FooterComponent,
    ErrorComponent,
    CurrencyDetailComponent,
    HeaderComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      currency: CurrencyReducer,
      baseDropDown: DropReducer
    }),
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
