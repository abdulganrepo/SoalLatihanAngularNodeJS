import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelcustomerComponent } from './tabelcustomer/tabelcustomer.component';
import { UtamaComponent } from './utama/utama.component';

const routes: Routes = [
    { path: 'utama', component: UtamaComponent },
    { path: 'tabelcustomer', component: TabelcustomerComponent },
    { path: 'editcustomer/:id', component: UtamaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }



