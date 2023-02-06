import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import * as fromAuth from '../../store/auth.reducer';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ result: 'test' }) },
        },
        provideMockStore({ initialState: fromAuth.initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login page', () => {
    expect(component).toBeTruthy();
  });

  it('should have a loading initialized false', () => {
    expect(component.loading).toBeFalse();
  });

  it('should log in', () => {
    const loginForm = component.loginForm;

    expect(component.loading).toBeFalse();

    loginForm.setValue({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });

    component.login();

    expect(component.loading).toBeTrue();
    expect(component.error).toBeNull();
  });

  it('form should not be valid if email and password are empty', () => {
    const loginForm = component.loginForm;

    loginForm.setValue({
      email: '',
      password: '',
    });

    expect(loginForm.valid).toBe(false);
  });

  // it('should not be able to log in if the form is invalid', () => {
  //   component.loginForm.patchValue({
  //     email: '',
  //     password: '',
  //   });

  //   expect(component.loginForm.invalid).toBeTrue();

  //   component.login();

  //   expect(loginSpy).not.toHaveBeenCalledWith({
  //     email: '',
  //     password: '',
  //   });
  // });

  // it('should call login from AuthService', () => {
  //   const loginForm = component.loginForm;

  //   loginForm.setValue({
  //     email: 'test@email.com',
  //     password: '123456',
  //   });

  //   component.login();

  //   expect(loginSpy).toHaveBeenCalled();
  // });
});
