// External Dependencies
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-image",
  template: `<img
    loading="lazy"
    src="{{ IMAGES_LOCATION_RELATIVE_PATH + imageName }}"
    [alt]="alt"
    [class]="classes"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgDirective {
  /**
   * Path to images folder to be used as prefix
   * @type {string}
   */
  public IMAGES_LOCATION_RELATIVE_PATH: string =
    "../../../../../../assets/images/";
  /**
   * @Input() value to be received from components wherever image is used
   * @type {string}
   */
  @Input() imageName: string = "";
  /**
   * @Input() value to be received from components wherever image is used
   * @type {string}
   */
  @Input() alt: string = "";
  /**
   * @Input() value to be received from components wherever image is used
   * @type {string}
   */
  @Input() classes: string = "";
}
