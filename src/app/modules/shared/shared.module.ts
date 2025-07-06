import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ArabicNumbersPipe } from './pipes/arabic-numbers.pipe';

@NgModule({
  declarations: [ArabicNumbersPipe],
  imports: [CommonModule, SharedRoutingModule],
  exports: [ArabicNumbersPipe],
})
export class SharedModule {}
