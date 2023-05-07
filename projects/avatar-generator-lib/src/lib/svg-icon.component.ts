import { Component, OnChanges, SecurityContext, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `<div id="svg-icon"><span [innerHTML]="svgIcon"></span></div>`,
  styleUrls: ['./svg-icon.component.css'],
})
export class SvgIconComponent implements OnChanges {
  @Input()
  public name?: string;
  @Input()
  public folder?: string;
  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    }
    this.httpClient
      .get(`assets/${this.folder}/${this.name}.svg`, { responseType: 'text' })
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
}
