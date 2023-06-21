import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailPageComponent {
  public readonly title = 'Welcome';
  public readonly text = 'Link was set to your email address. ' +
    'Please verify it.';
}
