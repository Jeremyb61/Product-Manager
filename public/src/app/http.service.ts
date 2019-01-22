import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

add(newProduct){
  return this._http.post('/product',newProduct)
}
getProducts() {
  return this._http.get('/product')
}
deleteProducts(id){
  return this._http.delete('/product/' + id)
}
update(id, updateproduct){
  return this._http.put('/product/' + id, updateproduct)
}
find(id) {
  return this._http.get('/product/' + id)
}





}
