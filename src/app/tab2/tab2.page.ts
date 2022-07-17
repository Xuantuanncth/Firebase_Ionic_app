import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgAnalyzeModulesHost } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  temperature : any;
  temperatureValue: any [] = [];
  airHumidity: any;
  airHumidityValue: any []=[];
  earthHumidity: any;
  earthHumidityValue: any []=[];
  timeLight: any;
  timeLightValue: any []=[];
  timeWatering: any;
  timeWateringValue: any []=[];
  
  public showItem = {
    s_temp : false,
    s_airHumi: false,
    s_earthHumi:false,
    s_light:false,
    s_warter:false,
  }
  
  constructor(private httpClient: HttpClient){
    this.httpClient.get("https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/DataStore.json").subscribe((data: any[])=>{
      let parserData = JSON.parse(JSON.stringify(data));
      console.log("-----------1--------------")
      this.temperature = Object.entries(parserData.Temperature);
      console.log("-----------2--------------")
      this.airHumidity = Object.entries(parserData.Air_Humidity);
      console.log("-----------3--------------")
      this.earthHumidity = Object.entries(parserData.Earth_humidity);
      console.log("-----------4--------------")
      this.timeLight = Object.entries(parserData.TimeLight);
      console.log("-----------5--------------")
      this.timeWatering = Object.entries(parserData.TimeWatering);
      for (const key in this.temperature) {
        console.log('Key: ',key)
        this.temperatureValue[key] = Object.entries(this.temperature[key][1]);
      }
      for (const key in this.airHumidity) {
        this.airHumidityValue[key] = Object.entries(this.airHumidity[key][1]);
      }
      for (const key in this.earthHumidity) {
        this.earthHumidityValue[key] = Object.entries(this.earthHumidity[key][1]);
      }
      for (const key in this.timeLight) {
        this.timeLightValue[key] = Object.entries(this.timeLight[key][1]);
      }
      for (const key in this.timeWatering) {
        this.timeWateringValue[key] = Object.entries(this.timeWatering[key][1])
      }
    });
  }

  async getData(event){
    console.log('Check button card : ', event)
    if(event == 1){
      this.showItem.s_temp = !this.showItem.s_temp;
    }else if(event == 2) {
      this.showItem.s_airHumi = !this.showItem.s_airHumi;
    }else if(event == 3) {
      this.showItem.s_earthHumi = !this.showItem.s_earthHumi;
    }else if(event == 4) {
      this.showItem.s_light = !this.showItem.s_light;
    }else
    {
      this.showItem.s_warter = !this.showItem.s_warter;
    }
  }
  loadTemperature(index){
    console.log('Load temperature')
  }
  loadAirHumidity(index){
    console.log('loadAirHumidity')
    this.airHumidity[index].open = !this.airHumidity[index].open;
    if(this.airHumidity[index].open){
      this.airHumidity.filter((item, itemIndex)=>{
        itemIndex != index;
      }).map(item => item.open = false)
    }
    
  }
  loadEarthHumidity(index){
    console.log('loadEarthHumidity')
    this.earthHumidity[index].open = !this.earthHumidity[index].open;
    if(this.earthHumidity[index].open){
      this.earthHumidity.filter((item, itemIndex)=>{
        itemIndex != index;
      }).map(item => item.open = false)
    }
  }
  loadTimeLight(index){
    console.log('loadTimeLight')
    this.timeLight[index].open = !this.timeLight[index].open;
    if(this.timeLight[index].open){
      this.timeLight.filter((item, itemIndex)=>{
        itemIndex != index;
      }).map(item => item.open = false)
    }
  }
  loadTimeRun(index){
    console.log('loadTimeRun')
    this.timeWatering[index].open = !this.timeWatering[index].open;
    if(this.timeWatering[index].open){
      this.timeWatering.filter((item, itemIndex)=>{
        itemIndex != index;
      }).map(item => item.open = false)
    }
  }

  toggleSection(index){
    this.temperature[index].open = !this.temperature[index].open;
    if(this.temperature[index].open){
      this.temperature.filter((item, itemIndex)=>{
        itemIndex != index;
      }).map(item => item.open = false)
    }
  }
}
