import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { BankProfileComponent } from './components/bank-profile/bank-profile.component';

const routes: Routes = [
  { path:  '', component:  BankDetailsComponent},
  { path:  ':city/:ifsc', component:  BankProfileComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
