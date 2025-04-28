import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCabeceras20]',
  standalone: false,
})
export class Cabeceras20Directive {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.fontsize = '20px';
  }
}
