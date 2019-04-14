import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * @name addProduct
     * @param product Product object type of '_models/product' with all data needed for adding product to database
     * @description It will send Product object to the backend API and add it to the database
     */
    addProduct(product) {
        return this.http.post('/Product/AddProduct', product);
    }

    /**
     * @name getAllProducts
     * @description It will get all added products from the database
     */
    getAllProducts() {
        return this.http.get('/Product/Index');
    }

    /**
     * @name editProduct
     * @param product Product object with edited data
     * @description It will send edited Product object to the backend API, and update the product
     */
    editProduct(product) {
        return this.http.put('/Product/Edit', product);
    }

    /**
     * @name getProductById
     * @param id Product ID
     * @description It will get product with specified id from the database, if he exists
     */
    getProductById(id) {
        return this.http.get('/Product/Details/' + id);
    }

    /**
     * @name deleteProduct
     * @param id Product ID
     * @description It will delete product with the specified id from the database
     */
    deleteProduct(id) {
        return this.http.delete('/Product/Delete/' + id);
    }
}
