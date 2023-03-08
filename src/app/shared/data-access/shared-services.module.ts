// External Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Internal Dependencies
import { ErrorService } from "@app/shared/data-access/error-service/error.service";
import { StorageService } from "@app/shared/data-access/storage-service/storage.service";
import { UtilityService } from "@app/shared/data-access/utility-service/utility.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StorageService, ErrorService, UtilityService],
})
export class SharedServicesModule {}
