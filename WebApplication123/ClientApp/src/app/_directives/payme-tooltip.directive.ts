import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[paymeTooltip]'
})
export class PaymeTooltipDirective {

    // tslint:disable-next-line:no-input-rename
    @Input('paymeTooltip') tooltipTitle: string;
    @Input() placement: string;
    @Input() delay: number;
    tooltip: HTMLElement;

    offset = 10;
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    // Listen for mouseenter event and display tooltip every time user hover over targeted el
    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltip) { this.show(); }
    }

    // Listen for mouseleave event and hide tooltip
    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltip) { this.hide(); }
    }

    show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
    }

    hide() {
        this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
        window.setTimeout(() => {
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
        }, this.delay);
    }

    create() {
        // Here we create tooltip span
        this.tooltip = this.renderer.createElement('span');

        // Then append tooltip text to it
        this.renderer.appendChild(
        this.tooltip,
        this.renderer.createText(this.tooltipTitle) // textNode
        );

        // Here we append our tootip span to body element
        this.renderer.appendChild(document.body, this.tooltip);
        // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

        // Then add ng-tooltip class and class that will determine position of tooltip
        this.renderer.addClass(this.tooltip, 'ng-tooltip');
        this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

        // Set delay in ms
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
    }

    setPosition() {
        // Get position of html element on which we use the tooltip
        const hostPos = this.el.nativeElement.getBoundingClientRect();

        // Get position of tooltip
        const tooltipPos = this.tooltip.getBoundingClientRect();

        // window scroll top
        // getBoundingClientRect
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

        // Calculate top and left position of tooltip based on placement
        if (this.placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }

        if (this.placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }

        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

}
