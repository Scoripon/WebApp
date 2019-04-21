import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'artical-table',
  templateUrl: './articalTable.component.html',
  styleUrls: ['./articalTable.component.scss']
})
export class ArticalTableComponent implements OnInit, OnChanges {

    @Input() articles;
    @Input() isUserAdmin: boolean;
    @Output() productAction = new EventEmitter<any>();

    elements = [];

    constructor(private productService: ProductService) { }


    ngOnInit() {
        this.repackProducts();
        this.elements = this.articles;
    }

    ngOnChanges() {
        // Every time a user clicked on the product edit button in the table, form will be
        // "created" again and filled with product informations
        this.repackProducts();
        this.elements = this.articles;
    }

    /**
     * @name editProduct
     * @param product Product to edit
     * @description It will delete current product and triger method in user settings
     * that will update product list in the table
     */
    deleteProduct(product): void {
        this.productService.deleteProduct(product.id_product).subscribe(
            (data) => {
                this.productAction.emit(false);
                console.log('Product deleted!', data);
            },
            (error) => {}
        );
    }

    /**
     * @name editProduct
     * @param product Product to edit
     * @description It will send product data to user settings component
     * and triger method that will send product data to article form
     */
    editProduct(product): void {
        this.productAction.emit(product);
    }

    /**
     * @name repackProducts
     * @description It will add detailsSummary property to every artical because we want to
     * prevent displaying more than 3 words in details columns
     */
    repackProducts(): void {
        this.articles.forEach(element => {
            // First split details string into array of words
            const detailsArray = element.details.split(' ');
            let detailsSummary = null;

            if (detailsArray.length > 3) {
                // If details have at least 3 words then remove all words after 3rd word
                detailsSummary = detailsArray.slice(0, 3).join(' ');
            }

            element.detailsSummary = detailsSummary;
        });
    }


}
