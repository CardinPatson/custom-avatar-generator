import { NgModule } from '@angular/core';
import { AvatarGeneratorComponent } from './avatar-generator.component';
import {AvatarComponent} from "./avatar/avatar.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { SvgIconComponent } from './svg-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AvatarGeneratorComponent, AvatarComponent, SvgIconComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule,HttpClientModule ],
  exports: [AvatarGeneratorComponent, SvgIconComponent]
})
export class AvatarGeneratorModule { }
