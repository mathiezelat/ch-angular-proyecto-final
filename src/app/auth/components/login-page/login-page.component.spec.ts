import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should not be valid if email and password are empty', () => {
    const form = component.loginForm;
    form.setValue({
      email: '',
      password: '',
    });
    expect(form.valid).toBe(false);
  });

  it('should call login from AuthService', () => {
    const form = component.loginForm;
    form.setValue({
      email: 'test@email.com',
      password: '123456',
    });
    component.login();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('login should not be executed if form is not valid', () => {
    const form = component.loginForm;
    form.setValue({
      email: '',
      password: '',
    });
    component.login();
    expect(form.invalid).toBeTrue();
    expect(loginSpy).not.toHaveBeenCalled();
  });
});
