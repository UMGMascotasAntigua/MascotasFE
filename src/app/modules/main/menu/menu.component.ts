import { Component } from '@angular/core';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  cakes: any[] = [];
  constructor(private cakeService: CakeService){
    this.cakeService.getCakes()
    .subscribe((e) => {
      if(e.success == true){
        this.cakes = e.result;
      }
    })
  }
}
