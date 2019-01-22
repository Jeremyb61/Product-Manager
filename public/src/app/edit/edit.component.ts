import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct: any;
  titleError: any;
  priceError: any;
  imageError: any;
  itemId: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {



  }

  ngOnInit() {
    this.editProduct = { title: '', price: '', image: '' }
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])

      let observable = this._httpService.find(params.id);
      observable.subscribe((res) => {
        console.log(res);
          this.editProduct = res['data'];
          console.log(this.editProduct)
        
        // set the item to our components variable e.g. this.editproduct = productfromserver
      });


    });

  }

  edit() {
    let observable = this._httpService.update(this.editProduct._id,this.editProduct);
    observable.subscribe((res) => {
      if (res['status']) {
      this.editProduct = res['data']
      console.log("Hit the add method", res);
      } else {
        console.log(res)
        if (res['err']['errors']['title']) {
          this.titleError = res['err']['errors']['title']['message'];
        }
        if (res['err']['errors']['price']) {
          this.priceError = res['err']['errors']['price']['message'];
        }
        if (res['err']['errors']['image']) {
          this.imageError = res['err']['errors']['image']['message'];
        }
      }
    });
  }

}
