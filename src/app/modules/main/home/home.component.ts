import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { AnnouncesService } from 'src/app/services/announces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public photoEndpoint: string = `${environment.apiUrl}announce/`;
  constructor(private announce: AnnouncesService){

  }
  
  public announces:any[] = [];
  ngOnInit(): void {
    this.loadAnnounces();
  }

  private loadAnnounces(){
    this.announce.getAll()
    .subscribe((e) => {
      if(e.success == true){
        this.announces = e.result;
      }
    })
  }
}
