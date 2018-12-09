import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController , LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	count:number;
  	today:any;
  	date:any;
  	month:any;
  	year:any;
  	currDate:any;
  	loading = this.loadingCtrl.create({
    content: 'Fetching Data......',
    spinner:'bubbles'
  	});
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private fireauth: AngularFireAuthModule,
    private firedata: AngularFireDatabase,public loadingCtrl: LoadingController) {
  	this.count=10;
  }

  async init()
  {
  	this.loading.present();
  	this.today=new Date();
      var date,month,year,currDate;
      this.month=this.today.getMonth()+1;
      this.year=this.today.getFullYear();

      if(this.month>9)
        this.currDate=this.year+""+this.month;
      else
        this.currDate=this.year+"0"+this.month;

      if(this.today.getDate()>9)
        this.date=""+this.today.getDate();
      else
        this.date="0"+this.today.getDate();
  	
  	this.currDate=this.currDate+""+this.date;
  		console.log(this.currDate);
  			const database = this.firedata.database;
  	  var temp;
  	await database.ref("mess/").child(this.currDate).once("value").then(function(snapshot)
  		{
  			temp=snapshot.val();
  		}).then(()=>{
  			if(temp!=null && temp!=undefined)
  				this.count=temp;
  			else
  				this.count=10;
  			console.log(this.count);
  		}).then(()=>{
  			if(this.loading)
  			{
  				this.loading.dismiss();
  			}
  		});
  }

async  doRefresh(refresher)
  {
  	setTimeout(()=>{
  		refresher.complete();
  	},500);
  const database = this.firedata.database;
  	  var temp;
  	await database.ref("mess/").child(this.currDate).once("value").then(function(snapshot)
  		{
  			temp=snapshot.val();
  		}).then(()=>{
  			if(temp!=null && temp!=undefined)
  				this.count=temp;
  			else
  				this.count=10;
  			console.log(this.count);
  		});
  }

  ionViewWillLoad()
  {
  	this.init(); 
  }


}