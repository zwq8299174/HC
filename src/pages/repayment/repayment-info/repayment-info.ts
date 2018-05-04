import { Component } from '@angular/core';
import { App,NavController, NavParams } from 'ionic-angular';
import { AppApi} from '../../../providers/app-api/app-api';
/**
 * Generated class for the RepaymentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-repayment-info',
  templateUrl: 'repayment-info.html',
})
export class RepaymentInfoPage {
  repaymentId :any = this.navParams.get('plan_id');
  repaymentInfoList :any = [];
  showInfonum :number = 4;
  myDate:any;
  showD :boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appApi : AppApi,
		//private app : App
  ) {
  }
  ngOnInit(): void {
		
  }
  dateChange(event):void{
    let param = {
      plan_id:this.repaymentId,
      query_date: this.myDate
    };
    this.appApi.getRepaymentInfo(param).subscribe(data => {
      this.repaymentInfoList = data.plan_detail;	
    });
  }
  showMore():void{
    if(this.showD){
      this.showInfonum = this.repaymentInfoList.length;
    }else{
      this.showInfonum = 4;
    }
    this.showD = !this.showD;
  }
  ionViewDidEnter() {
    this.getRepaymentIfo();
  }
  getRepaymentIfo():void{
    let param = {
      plan_id:this.repaymentId
    };
    this.appApi.getRepaymentInfo(param).subscribe(data => {
      this.repaymentInfoList = data.plan_detail;	
    });
  }
}
