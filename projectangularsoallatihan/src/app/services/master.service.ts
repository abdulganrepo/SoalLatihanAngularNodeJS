import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private HttpKlien: HttpClient) { }

  listCustomer(): Observable<Customer[]> {
    return this.HttpKlien.get(environment.baseUrl + '/getdata')
      .pipe(map(data => data as Customer[]));
  }

  insertCustomer(objData: Customer): Observable<any> {
    return this.HttpKlien.post(environment.baseUrl + '/savedata', objData)

  }
     getKelasbyId(id : string): Observable<any> {
    return this.HttpKlien.get(environment.baseUrl + '/getdatabyid/' + id)
      .pipe(map(data => data));
  }

}
