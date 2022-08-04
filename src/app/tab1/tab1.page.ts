import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public isDisable: boolean;
  public cb_autoControl:boolean;
  isChecked:number;
  sensorData: any;

  constructor(private httpClient: HttpClient) {}
  ngOnInit(){ 
    this.httpClient.get("https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Sensor.json").subscribe(data=>{
        let parserData = JSON.parse("["+JSON.stringify(data)+"]");
        console.log("ParseData: ",parserData)
        this.sensorData = parserData;
      });
    this.httpClient.get("https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Control/Auto.json").subscribe(data=>{
      console.log("data: ",data)
      if(data == 1){
        this.isDisable = true
        this.cb_autoControl = true
      }
    });
    this.loadDataRealtime();
  }

  loadDataRealtime(){
    setInterval(()=>{ 
      this.httpClient.get("https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Sensor.json").subscribe(data=>{
        let parserData = JSON.parse("["+JSON.stringify(data)+"]");
        console.log("================> interval time: ",parserData)
        this.sensorData = parserData;
      })
    },5000)
  }

  machine(event){
    console.log("TDX ================> Check machine: ",event.detail.checked);
    if(event.detail.checked == true){
      this.isChecked = 1;
    } else
    {
      this.isChecked = 0;
    }
    this.httpClient.put(
      'https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Control/Motor.json',this.isChecked
      ).subscribe(response => console.log(response) )
  }

  light(event){
    console.log("TDX ================> Check light: ",event.detail.checked);
    if(event.detail.checked == true){
      this.isChecked = 1;
    } else
    {
      this.isChecked = 0;
    }
    this.httpClient.put(
      'https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Control/Light.json',this.isChecked
      ).subscribe(response => console.log(response) )
  }

  autoControl(event){
    if(event.detail.checked == true){
      this.isDisable = true;
    } else
    {
      this.isDisable=false;
    }
    if(event.detail.checked == true){
      this.isChecked = 1;
    } else
    {
      this.isChecked = 0;
    }
    this.httpClient.put(
      'https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Control/Auto.json',this.isChecked
      ).subscribe(response => console.log(response) )
  }
}
