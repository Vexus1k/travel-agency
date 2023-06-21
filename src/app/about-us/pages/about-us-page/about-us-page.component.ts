import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamImagesSrcEnum } from "../../core/enums/TeamImagesSrcEnum";

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsPageComponent {
  public readonly teamImagesSrcEnum = TeamImagesSrcEnum;
}
