import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "../../core/services/AuthService";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  public registerForm: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
  ) {
    this.registerForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    });
  }

  public register(): void {
    if (!this.registerForm.valid) {
      Object.keys(this.registerForm.controls).forEach(controlName => {
        const control = this.registerForm.controls[controlName];
        control.markAsDirty();
        control.updateValueAndValidity();
      });

      return;
    }

    this._authService.register(this.registerForm.value.email, this.registerForm.value.password);
  }

  public hasControlErrors(name: string): boolean {
    const control = this.registerForm.controls[name];

    return control.invalid && control.dirty;
  }
}
