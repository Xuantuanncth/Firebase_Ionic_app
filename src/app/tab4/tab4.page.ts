import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }
  public src_img:any;
  public src_img1:any;
  ngOnInit() {
    this.src_img = '../../assets/img/lan.jpg'
    this.src_img1 ='../../assets/img/chaulan.jpg'
  }

}
