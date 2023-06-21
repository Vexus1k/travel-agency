import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/NotificationService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _adminUsers = [
    {
      email: 'vexus28@gmail.com'
    }
  ]

  constructor(
    private readonly _fireAuth: AngularFireAuth,
    private readonly _router: Router,
    private readonly _notificationService: NotificationService,
  ) {}

  public login(email: string, password: string): void {
    this._fireAuth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');

      this._adminUsers?.forEach((admin) => {
        if (admin?.email === email) {
          localStorage.setItem('adminRole', 'true');
        }
      })

      if (res.user?.emailVerified) {
        this._router.navigate(['/main']);
      } else {
        this._router.navigate(['/auth/verify-email']);
      }
    }, err => {
      this._notificationService.pushError('Error login', 'Something went wrong. Try again later.');
      this._router.navigate(['/auth/login']);
    })
  }

  public register(email: string, password: string): void {
    this._fireAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      this._notificationService.pushSuccess('Register successfully', 'Account was created.');
      this._router.navigate(['/auth/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      this._notificationService.pushError('Error registry', 'Something went wrong. Try again later.');
      this._router.navigate(['/auth/register']);
    })
  }

  public async getUserId(): Promise<string> {
    const user = await this._fireAuth.currentUser;
    return user ? user.uid : '';
  }

  public logout(): void {
    this._fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('adminRole');
      this._router.navigate(['/auth/login']);
    }, err => {
      this._notificationService.pushError('Error login', 'Something went wrong. Try again later.');
    });
  }

  public forgotPassword(email: string): void {
    this._fireAuth.sendPasswordResetEmail(email).then(() => {
      this._router.navigate(['/auth/verify-email']);
    }, err => {
      this._notificationService.pushError('Reset password error', 'Something went wrong. Try again later.');
    })
  }

  private sendEmailForVerification(user: any): void {
    user.sendEmailVerification().then((res) => {
      this._router.navigate(['/auth/verify-email']);
    }, err => {
      this._notificationService.pushError('Activating account error', 'Email account does not exist. Try again');
    })
  }
}
