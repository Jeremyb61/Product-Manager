import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  product: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.showProducts()
  }

  showProducts() {
    let observable = this._httpService.getProducts();
    observable.subscribe((data) => {
      console.log("Show products method", data);
      this.product = data;
    });
  }
  delete(id) {
    let observable = this._httpService.deleteProducts(id);
    observable.subscribe((data) => {
      console.log("Show products method", data);
      this.showProducts();
  })

}


}