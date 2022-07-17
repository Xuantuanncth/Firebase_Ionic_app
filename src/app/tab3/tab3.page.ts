import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public event = {
    month: '2017-02-19',
    timeStatMotor: '07:43',
    timeStopMotor: '07:45',
    timeStartLight: '09:45',
    timeStopLight:'09:50'
  }
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient.get("https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Timer.json").subscribe(data=>{
        let parserData = JSON.parse(JSON.stringify(data));
        console.log("ParseData: ",parserData);

        this.event.timeStatMotor = parserData.motor.start;
        this.event.timeStopMotor = parserData.motor.stop;
        this.event.timeStartLight = parserData.light.start;
        this.event.timeStopLight = parserData.light.stop;
      });
  }

  async updateTime(id){
    let f_link ="";
    let data="";
    if(id == 1){
      f_link = "motor/start";
      data = this.event.timeStatMotor;
    } else if(id == 2){
      f_link = "motor/stop";
      data = this.event.timeStopMotor;
    } else if(id ==3){
      f_link = "light/start";
      data = this.event.timeStartLight;
    }else{
      f_link = "light/stop";
      data = this.event.timeStopLight;
    }
    console.log("ID : ", id, "f_link: ", data);
    this.httpClient.put(
      'https://smarthomedevice-83e1f-default-rtdb.firebaseio.com/Timer/'+f_link+'.json','"'+data+'"'
      ).subscribe(response => console.log("response: ", response) )
  }

}
