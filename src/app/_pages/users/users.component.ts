import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { DataService } from '@app/_shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTableModule,
    MatIconModule,HttpClientModule,MatProgressSpinnerModule],
    providers:[DataService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class UsersComponent implements OnInit{
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['username', 'lastName', 'maidenName', 'weight'];
  columnsToDisplayWithExpand = ['expand',...this.columnsToDisplay];
  expandedElement!: Element | null;
  data:any;
  showtable =  new BehaviorSubject<boolean>(false);
  constructor (private dataService:DataService,private changeDetectorRef:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.showtable.next(false);
    this.dataService.getData().subscribe((data)=>{
      console.log("data",data);
      this.showtable.next(true);
      this.changeDetectorRef.detectChanges();
      this.data =data;
      this.dataSource = this.data['users'];
    });
  }

  
}
  
  const ELEMENT_DATA: Element[] = [
   
  ];


  export interface Element {
    username: string;
    lastName: string;
    maidenName: string;
    weight: string;
  }