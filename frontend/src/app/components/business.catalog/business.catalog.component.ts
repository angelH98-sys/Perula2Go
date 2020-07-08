import { Component, OnInit } from '@angular/core';


import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { hoverZoom, listAnimation } from 'src/app/utilities/animations';

export interface businessCard {
  business: Business;
  zoom: String;
}

@Component({
  selector: 'app-business-catalog',
  templateUrl: './business.catalog.component.html',
  styleUrls: ['./business.catalog.component.css'],
  animations:[
    hoverZoom,
    listAnimation
  ]
})

export class BusinessCatalogComponent implements OnInit {

  isHover = false;

  businessList: Business[];
  cardList: businessCard[] = [];

  constructor( public businessService: BusinessService ) { 
    businessService.getBusiness().subscribe(res=>{
      this.businessList = res as Business[];
      this.createCards();
    })
  }

  ngOnInit(): void {
  }

  createCards(){
    for(let b of this.businessList){
      this.cardList.push({'business': b, 'zoom': 'out'});
    }
  }

  zoomIn(card: businessCard){
    card.zoom = 'in';
  }

  zoomOut(card: businessCard){
    card.zoom = 'out';
  }

}
