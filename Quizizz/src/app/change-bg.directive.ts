import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  @Input() isCorrect : Boolean = false;

  constructor(private ef:ElementRef) { }

}
