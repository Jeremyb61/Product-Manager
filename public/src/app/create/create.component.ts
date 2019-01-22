import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
newProduct:any;
titleError:any;
priceError:any;
imageError:any;

  constructor(private _httpService: HttpService,
              // private _route: ActivatedRoute,
              // private _router: Router
              ) { }

  ngOnInit() {
    this.newProduct = { title: '', price: '', image: '' }
  }

  addproduct(){
    let observable = this._httpService.add(this.newProduct);
    observable.subscribe((data) => {
      if (data['status']) {
        this.newProduct = { title: '', price: '', image: '' }
        console.log("Hit the add method", data);
      } else {
        if (data['err']['errors']['title']) {
          this.titleError = data['err']['errors']['title']['message'];
        }
        if (data['err']['errors']['price']) {
          this.priceError = data['err']['errors']['price']['message'];
        }
        if (data['err']['errors']['image']) {
          this.imageError = data['err']['errors']['image']['message'];
        }
      }
    });
  }
}
