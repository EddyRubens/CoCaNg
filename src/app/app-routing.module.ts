import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureComponent } from './views/capture/capture.component';
import { TestimonyComponent } from './views/testimony/testimony.component';

const routes: Routes = [
  { path: 'testimony', component: TestimonyComponent, data: { } },
  { path: 'capture', component: CaptureComponent, data: { } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
