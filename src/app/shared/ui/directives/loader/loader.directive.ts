// External Dependencies
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loader",
  styleUrls: ["./loader.scss"],
  template: `<div class="loader"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderDirective {}
