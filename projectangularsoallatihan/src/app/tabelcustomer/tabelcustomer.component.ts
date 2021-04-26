import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../model/customer';
import { MasterService } from '../services/master.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tabelcustomer',
  templateUrl: './tabelcustomer.component.html',
  styleUrls: ['./tabelcustomer.component.css'],
  providers: [MasterService]
})
export class TabelcustomerComponent implements OnInit {

  daftarcustomer!: Customer[];
  cariDataForm!: FormGroup;
  nama!: string;
  alamat!: string;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject()
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
    // this.ms.listCustomer().subscribe((data) => {
    //   this.daftarcustomer = data;
    // });
    this.cariDataForm = new FormGroup({
      nama: new FormControl(),
      alamat: new FormControl()
    });
    const that = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        const parameter = new Map<string, any>();
        parameter.set('nama', this.cariDataForm.controls.nama.value)
        parameter.set('alamat', this.cariDataForm.controls.alamat.value)
        that.ms.getDaftarKelasAll(parameter, dataTablesParameters).subscribe(resp => {
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      search: false,
      serverSide: true,
      processing: true,
      columns: [{
        title: 'ID',
        data: 'id',
        orderable: false
      }, {
        title: 'Nama',
        data: 'nama'
      }, {
        title: 'Alamat',
        data: 'alamat'
      }, {
        title: 'Kota',
        data: 'kota'
      }, {
        title: 'Pendapatan',
        data: 'pendapatan'
      }, {
        title: 'Action',
        orderable: false,
        render(data, type, row): any {
          return '<a href ="editcustomer/${row.id}">Edit</a>'
        }
      }],
      rowCallback(row): void {
        const idx = this.rowId;
        // $('td:eq(0)', row).html('<b>' + idx + '</b>');
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cariData() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}