import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-delete-news',
  templateUrl: './delete-news.component.html',
  styleUrls: ['./delete-news.component.scss']
})


export class DeleteNewsComponent implements OnInit {

  NewsId: String= '';
  constructor(private activatedRoute: ActivatedRoute,
     private NewsService : NewsService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(data=>{
        this.NewsId=data.newsID;
      })
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true,
      confirmButtonColor: 'limegreen',
      cancelButtonColor:'red'
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed){
         
          if(this.NewsId){
        
            this.NewsService.deleteNews(this.NewsId).subscribe(data=>{
              swalWithBootstrapButtons.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted!',
                text:'Event Deleted Successfully!',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2500,
                buttonsStyling: true,
                confirmButtonColor: 'limegreen', 
              })
            },err=>{
              swalWithBootstrapButtons.fire({
                position: 'center',
                icon: 'error',
                title: 'Unable to Delete Event!',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2500
              })
            })
              
          }
            
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              '',
              'error'
            )
          }
          this.router.navigateByUrl('/news/list');
        })
        
      }
      
      }