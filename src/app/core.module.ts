import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreService} from './service/core/core.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ // components that we want to make available
  ],
  declarations: [ // components for use in THIS module
  ],
  providers: [ // singleton services
    CoreService,
  ]
})
export class CoreModule { }
