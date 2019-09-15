import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BanksServiceService } from 'src/app/services/banks-service.service';

@Component({
  selector: 'app-bank-profile',
  templateUrl: './bank-profile.component.html',
  styleUrls: ['./bank-profile.component.css']
})
export class BankProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private bankService: BanksServiceService
    ) { }

  ifsc : string = '';
  city : string = '';
  selectedBank : any;
  onGoingRequest: boolean = true;
  ngOnInit() {

    this.route.params.subscribe( params => {
      this.ifsc = params.ifsc;
      this.city = params.city;
    });
    this.getBank();
  }

  async getBank(){
    this.onGoingRequest = true;
    await this.bankService.getList(this.city);
    let bankList = this.bankService.getBankList() || [];
    const selectedBank = bankList.filter(bank => bank.ifsc === this.ifsc);
    this.selectedBank = selectedBank[0];
    this.onGoingRequest = false;
  }

}
