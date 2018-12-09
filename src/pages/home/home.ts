import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  FormGroup,
  FormControl

} from '@angular/forms';
import { AlertController , LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	meal:boolean=false;
	langs;
  	langForm;
  	show:boolean=true;
  	show1:boolean=false;
  	count:number;
  	today:any;
  	date:any;
  	month:any;
  	year:any;
  	currDate:any;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private fireauth: AngularFireAuthModule,
    private firedata: AngularFireDatabase) {
    this.langForm = new FormGroup({
      "langs": new FormControl({value: 'yes', disabled: false})
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Response',
      subTitle: "Submitted Successfully.",
      buttons: ['Dismiss']
    });
    alert.present();
  }

 async doSubmit() 
  {
  	//Pop up a alert that response is marked.
    console.log('Submitting form', this.langForm.value);
  	
  	if(this.langForm.value.langs=="no")
  	{
  		const database = this.firedata.database;
  		await database.ref("mess/").child(this.currDate).set(--this.count).then(()=>{
  			console.log("Database");
  		}); 	
  		this.presentAlert();
  	}
  	else
  	{
  		this.presentAlert();
  	}
  	this.show=false;
  	this.show1=true;
  }

  async ionViewWillLoad()
  {
  	const database = this.firedata.database;
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
}
