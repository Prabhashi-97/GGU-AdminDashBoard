import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-administrators',
  templateUrl: './list-administrators.component.html',
  styleUrls: ['./list-administrators.component.scss']
})
export class ListAdministratorsComponent implements OnInit {
  listadmins : any = [];
  p:number=1;
  user: any;

  constructor(private AdminService : AdminService) { }

  ngOnInit(): void {
    this.AdminService.listAdmin().subscribe(data =>{
      this.listadmins = data as String[];
    });
  }

  token(){
    var token = window.localStorage.getItem('token');
  }
}

