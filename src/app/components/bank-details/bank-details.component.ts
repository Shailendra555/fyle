import { Component, OnInit, ViewChild } from '@angular/core';
import { BanksServiceService } from 'src/app/services/banks-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {uniqBy as _uniqBy} from 'lodash';


class BankDetails{
  address: String ;
bank_id: number;
bank_name: String;
branch: String;
city: String;
district: String;
ifsc: String;
state: String;
isFavorited: boolean;
}

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})

export class BankDetailsComponent implements OnInit {

  selectedCity:String = '';
  dataSource = new MatTableDataSource<BankDetails>();

  private static KEYS = {
    mumbai : 'MUMBAI',
    delhi : 'DELHI',
    hyderabad : 'HYDERABAD',
    pune : 'PUNE',
    kolkata : 'KOLKATA',
  }
  cityList = [
    { name: 'Mumbai', key: BankDetailsComponent.KEYS.mumbai, bankList: [] },
    { name: 'Delhi', key: BankDetailsComponent.KEYS.delhi, bankList: [] },
    { name: 'Hyderabad', key: BankDetailsComponent.KEYS.hyderabad, bankList: [] },
    { name: 'Pune', key: BankDetailsComponent.KEYS.pune , bankList: []},
    {name: 'Kolkata', key: BankDetailsComponent.KEYS.kolkata, bankList: [] }
  ]


  constructor(private bankService: BanksServiceService) { }

  displayedColumns = ['F','bank_id', 'bank_name', 'ifsc', 'address', 'branch', 'city', 'district', 'state'];
  displayNamesForColumns = ['','Id', 'Bank Name', 'IFSC', 'Address', 'Branch', 'City', 'District' ,'State'];
  onGoingRequest : boolean = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize: number = 50;

  ngOnInit() {
    this.selectedCity = "MUMBAI";
    this.changeSelection();
  }

  bankList: BankDetails[] = [];
  async changeSelection(){
  
   for(let i:any = 0; i < this.cityList.length ; i++){
     if(this.cityList[i].key === this.selectedCity){
      if(this.cityList && this.cityList[i].bankList && this.cityList[i].bankList.length){
        this.bankList = this.cityList[i].bankList;
      } else {
        this.onGoingRequest = true;
      await this.bankService.getList(this.selectedCity);
      const bankList = await this.bankService.getBankList();
      this.cityList[i].bankList = bankList;
      this.bankList = bankList as BankDetails[];
      this.onGoingRequest = false;
      }
     }
   }

   this.bankList.forEach(bank => {
    bank.isFavorited = false;
  });
   const listReturned = this.getUserSettings(this.storageName);
   if(listReturned && listReturned.length){
     listReturned.forEach(bank => {
       this.bankList.forEach(b => { 
        if(bank.ifsc === b.ifsc){
          b.isFavorited = bank.isFavorited;
        }
       });
     });
   }
   this.dataSource = new MatTableDataSource(this.bankList);
   this.dataSourceCopy = this.dataSource.data;
   this.dataSource.paginator = this.paginator;
  }

  pageSizeChange(){
    if(this.pageSize > 50) {
      this.dataSource.paginator = this.paginator;
    }
  }

  setDefaultPageSize(){
    if(this.pageSize < 50){
      this.pageSize = 50;
    } 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length < 1){
      this.setError('No Record Found', true);
    } else {
      this.errorObject = {
        msg: '',
        isError: false
      }
    }
  }

  errorObject = {
    msg: '',
    isError: false
  }

  setError(msg, isError){
    this.errorObject.msg = msg;
    this.errorObject.isError = isError;
  }

  toggleFavorite(bank){
    bank.isFavorited = !bank.isFavorited;
    const favoritedBanks = this.dataSource.data.filter(bank => bank.isFavorited);
    const dataToStore = favoritedBanks.map(bank => ({ ifsc: bank.ifsc, isFavorited: bank.isFavorited }));
    const prevArray = this.getUserSettings(this.storageName) || [];
    const resDataToStore = dataToStore.concat(prevArray);

    const newDataToStore = _uniqBy(resDataToStore, (e)=>{
      return e.ifsc;
    })
    if(!bank.isFavorited){
      const index = newDataToStore.findIndex(data=> {
        return data.ifsc === bank.ifsc;
      });
      if(index > -1){
        newDataToStore.splice(index, 1);
      }
    }
    this.setSettings(this.storageName, newDataToStore);
  }


  private storageName: string = "Settings";
  setSettings(cacheName, data: any) {
    localStorage.setItem(cacheName, JSON.stringify(data));
  }

  getUserSettings(cacheName) {
    let data = localStorage.getItem(cacheName);
    return JSON.parse(data);
  }


  dataSourceCopy = [];
  filterByFavorites(){
    this.dataSource.data = this.dataSource.data.filter(data => data.isFavorited);
  }

  resetFilter(){
    this.dataSource.data = this.dataSourceCopy;
  }

  // openBankProfile(selectedBank){
    
  // }

}
