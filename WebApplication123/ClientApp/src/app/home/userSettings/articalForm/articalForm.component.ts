import { OnInit, Component, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'artical-form',
  templateUrl: './articalForm.component.html',
  styleUrls: ['./articalForm.component.scss']
})

export class ArticalFormComponent implements OnInit, OnChanges {

    // Setup form
    articalForm: FormGroup;

    @Output() productChanged = new EventEmitter();
    @Input() product;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.createArticlesForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        // Every time a user clicked on the product edit button in the table, form will be
        // "created" again and filled with product informations
        this.createArticlesForm();
    }


    createArticlesForm() {
        let productName = '';
        let productCategory = '';
        let price = '';
        let quantity = '';
        let productDetails = '';

        // If this is product-edit operation then fill the form with product information
        if (this.product) {
            productName = this.product.productName;
            productCategory = this.product.category;
            price = this.product.price;
            quantity = this.product.quantity;
            productDetails = this.product.details;
        }

        this.articalForm = this.formBuilder.group({
            productName: [productName, Validators.required],
            productCategory: [productCategory, Validators.required],
            price: [price, Validators.required],
            quantity: [quantity],
            productDetails: [productDetails, Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.articalForm.controls; }

    onSubmit() {

        if (this.articalForm.invalid) {
            return alert('Wrong data!');
        }

        // Create Product object
        const product: any = {
            productName: this.f.productName.value,
            price: this.f.price.value,
            quantity: this.f.quantity.value,
            category: this.f.productCategory.value,
            details: this.f.productDetails.value
        };

        if (this.product) {
            product.id_product = this.product.id_product;
            this.productService.editProduct(product).subscribe(
                data => {
                    console.log('Product edited', data);
                    this.productChanged.emit();
                },
                error => {}
            );
        } else {
            this.productService.addProduct(product).subscribe(
                data => {
                    console.log('Product Added', data);
                    this.productChanged.emit();
                },
                error => {}
            );
        }
    }
}
