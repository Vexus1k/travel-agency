import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/AuthService";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
  ) {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): void {
    if (!this.loginForm.valid) {
      Object.keys(this.loginForm.controls).forEach(controlName => {
        const control = this.loginForm.controls[controlName];
        control.markAsDirty();
        control.updateValueAndValidity();
      });

      return;
    }

    this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  public hasControlErrors(name: string): boolean {
    const control = this.loginForm.controls[name];

    return control.invalid && control.dirty;
  }
}
