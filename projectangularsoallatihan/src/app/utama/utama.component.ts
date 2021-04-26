import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/customer';
import { MasterService } from '../services/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-utama',
  templateUrl: './utama.component.html',
  styleUrls: ['./utama.component.css'],
  providers: [MasterService]
})
export class UtamaComponent implements OnInit {
  addDataForm!: FormGroup;
  daftarCustomer!: Customer;
  id!: string;
  isEdit = false;

  constructor(
    private ruter: Router,
    private route: ActivatedRoute,
    private ms: MasterService,
    private toastr: ToastrService
  ) {
    this.addDataForm = new FormGroup({
      nama: new FormControl(null, [Validators.required]),
      alamat: new FormControl(null, [Validators.required]),
      kota: new FormControl(null, [Validators.required]),
      pendapatan: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(hasil => {
      this.id = hasil.id;
      if (this.id) {
        this.isEdit = true;
        this.ms.getKelasbyId(this.id).subscribe((data) => {
          this.addDataForm.controls.nama.setValue(data[0].nama);
          this.addDataForm.controls.alamat.setValue(data[0].alamat);
          this.addDataForm.controls.kota.setValue(data[0].kota);
          this.addDataForm.controls.pendapatan.setValue(data[0].pendapatan);
        })
      }
    });
  }

  simpanData(): void {

    if (this.addDataForm.valid) {
      const CustomertTmp = new Customer;
      CustomertTmp.nama = this.addDataForm.controls.nama.value;
      CustomertTmp.alamat = this.addDataForm.controls.alamat.value;
      CustomertTmp.kota = this.addDataForm.controls.kota.value;
      CustomertTmp.pendapatan = this.addDataForm.controls.pendapatan.value;
      this.daftarCustomer = CustomertTmp;
      console.log(this.daftarCustomer);
      this.ms.insertCustomer(CustomertTmp).subscribe((data) => {
        this.toastr.success(data.message, 'Behasil').onTap.subscribe(
          () => {
            this.ruter.navigateByUrl("/editcustomer/" + data.key);
          });
      });
    }
  }

}
