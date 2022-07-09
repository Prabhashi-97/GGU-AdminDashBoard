import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLogged:boolean=false;

  constructor(private tokenStorage: TokenStorageService, private router: Router ) { }

  ngOnInit(): void {
    this.autoLogout();
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/overview/login');
    this.tokenStorage.logout();
    
    
  }

  islogged(){
    if(localStorage.getItem('token') != null)
    this.isLogged=true;
    return this.isLogged;
  }


  autoLogout(){
    setTimeout(()=>{
      this.logout();
    }, 3600000 );
  

  }
 

}
