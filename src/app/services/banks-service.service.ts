import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BanksServiceService {

  constructor(private _http: HttpClient) { }

  bankList = [];
  async getList(city){
    await this._http.get('https://vast-shore-74260.herokuapp.com/banks?city='+city).toPromise().then((res:any) => {
      this.bankList = res;
    }).catch(err =>{
      console.error(err);
    });
  }

  getBankList(){
    return this.bankList;
  }
}
