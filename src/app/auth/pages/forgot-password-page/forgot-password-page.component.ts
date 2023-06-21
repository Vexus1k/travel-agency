import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "../../core/services/AuthService";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPageComponent {
  public forgotPasswordForm: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
    private readonly _location: Location
  ) {
    this.forgotPasswordForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public forgotPassword(): void {
    if (!this.forgotPasswordForm.valid) {
      Object.keys(this.forgotPasswordForm.controls).forEach(controlName => {
        const control = this.forgotPasswordForm.controls[controlName];
        control.markAsDirty();
        control.updateValueAndValidity();
      });

      return;
    }

    this._authService.forgotPassword(this.forgotPasswordForm.value.email);
  }

  public hasControlErrors(name: string): boolean {
    const control = this.forgotPasswordForm.controls[name];

    return control.invalid && control.dirty;
  }

  public goBack(): void {
    this._location.back();
  }
}
