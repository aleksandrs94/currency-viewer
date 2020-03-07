import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';


const routes: Routes = [
  { path: '', component: CurrenciesComponent },
  { path: 'currency', component: CurrencyDetailComponent,
    children: [
      { path: ':name', component: CurrencyDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
