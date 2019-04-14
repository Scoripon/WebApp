import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'artical-form',
  templateUrl: './articalForm.component.html',
  styleUrls: ['./articalForm.component.scss']
})
export class ArticalFormComponent implements OnInit {

    // Setup form
    articalForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.createArticlesForm();
    }

    createArticlesForm() {
        this.articalForm = this.formBuilder.group({
            productName: ['', Validators.required],
            productCategory: ['', Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required],
            productDetails: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.articalForm.controls; }

    onSubmit() {

        if (this.articalForm.invalid) {
            return alert('Wrong data!');
        }

        // Create User object
        const product = {
            productName: this.f.productName.value,
            price: this.f.price.value,
            quantity: this.f.quantity.value,
            category: this.f.productCategory.value,
            details: this.f.productDetails.value
        };

        this.productService.addProduct(product).subscribe(
            data => {

                console.log('Product Added', data);
            },
            error => {}
        )
    }
}
