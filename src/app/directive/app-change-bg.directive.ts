import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
  standalone: true
})
export class ChangeBgDirective {
  @Input() set appChangeBg(condition: 'correct' | 'incorrect' | 'unattempted' | undefined) {
    const colors: { [key: string]: string } = {
      correct: '#d4edda', // Light green
      incorrect: '#f8d7da', // Light red
      unattempted: '#fefefe' // Light grey or white
    };
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', colors[condition || 'unattempted']);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
