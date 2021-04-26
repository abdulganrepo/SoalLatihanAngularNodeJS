import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { Datatableresponse } from '../model/datatablesresponse.model';
import { Datatablesrequest } from '../model/datatablesrequest.model';

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
  getKelasbyId(id: string): Observable<any> {
    return this.HttpKlien.get(environment.baseUrl + '/getdatabyid/' + id)
      .pipe(map(data => data));
  }
  getDaftarKelasAll(parameter: Map<string, any>, datatablesParameters: any): Observable<Datatableresponse> {
    const dtReq = new Datatablesrequest();
    dtReq.draw = datatablesParameters.draw;
    dtReq.length = datatablesParameters.length;
    dtReq.start = datatablesParameters.start;
    dtReq.sortCol = datatablesParameters.order[0].column;
    dtReq.sortDir = datatablesParameters.order[0].dir;
    dtReq.extrParam = {};
    parameter.forEach((value, key: string) => {
      // @ts-ignore
      dtReq.extrParam[key] = value;
    });
    console.log(dtReq);
    return this.HttpKlien.post(environment.baseUrl + '/getdata', dtReq
    ).pipe(map(data => data as Datatableresponse));
  }

}
