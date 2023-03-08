// Library imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Internal Dependencies
import { ImgDirective } from "@app/shared/ui/directives/image/img.directive";
import { LoaderDirective } from "@app/shared/ui/directives/loader/loader.directive";

@NgModule({
  declarations: [ImgDirective, LoaderDirective],
  imports: [CommonModule],
  exports: [ImgDirective, LoaderDirective],
})
export class SharedModule {}
