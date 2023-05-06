import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
@Component({
  selector: 'app-angry',
  template: `<div>put your svg code</div>`,
})
export class SvgName implements OnChanges, OnDestroy {
  @ViewChild('wrapper') containerRef: ElementRef;
  @Input()
  props: any = {};
  @Input()
  ngAfterViewInit() {
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  private render() {
    return `<div> put your svg</div>`;
  }
}

//https://dev.to/bubblydoo/transitioning-from-angular-to-react-without-starting-from-scratch-j66
// node version 12 for custom avatar et version 8 for avaatar generator