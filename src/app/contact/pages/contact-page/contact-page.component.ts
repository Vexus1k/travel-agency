import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamLeadersImagesSrcEnum } from "../../enums/TeamLeadersImagesSrcEnum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as emailJS from "emailjs-com";
import { serviceId, templateIdContact, userId } from "../../../../../keys";
import { NotificationService } from "../../../core/services/NotificationService";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  public contactForm: FormGroup;
  public readonly footerTabs = [
    {
      name: 'about',
      subTabs: ['features', 'legal terms']
    },
    {
      name: 'travels',
      subTabs: ['destinations', 'reservations']
    },
    {
      name: 'media',
      subTabs: ['blog', 'newsletter']
    },
    {
      name: 'team',
      subTabs: ['our team', 'contact']
    }
  ];

  protected readonly teamLeadersImagesSrcEnum = TeamLeadersImagesSrcEnum;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _notificationsService: NotificationService
  ) {
    this.contactForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      message: ['', [Validators.required]],
      accept: [null, [Validators.required]],
    });
  }

  public hasControlErrors(name: string): boolean {
    const control = this.contactForm.controls[name];

    return control.invalid && control.dirty;
  }

  public sendEmail(): void {
    if (!this.contactForm.valid) {
      Object.keys(this.contactForm.controls).forEach(controlName => {
        const control = this.contactForm.controls[controlName];
        control.markAsDirty();
        control.updateValueAndValidity();
      });

      return;
    }

    const formValue = this.contactForm.value;

    const emailParams = {
      phone_number: formValue.phoneNumber,
      from_name: formValue.name,
      from_email: formValue.email,
      message: formValue.message
    };

    emailJS.send(serviceId, templateIdContact, emailParams, userId)
      .then(() => {
        this._notificationsService.pushSuccess('Message sent',
          'Message was sent Travel agency respond you as fast as it possible.');
      }, () => {
        this._notificationsService.pushError('Error sending',
          'There was an error sending the email, please try again.');
      });

    this.resetEmailOfferForm();
  }

  public resetEmailOfferForm(): void {
    this.contactForm.reset({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
      accept: null,
    });
  }
}
