import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-tabelcustomer',
  templateUrl: './tabelcustomer.component.html',
  styleUrls: ['./tabelcustomer.component.css'],
  providers: [MasterService]
})
export class TabelcustomerComponent implements OnInit {

  daftarcustomer!: Customer[];
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
    this.ms.listCustomer().subscribe((data) => {
      this.daftarcustomer = data;
    });
  }

}
