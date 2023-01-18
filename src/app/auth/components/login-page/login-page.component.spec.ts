import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;
  let loginSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    loginSpy = spyOn(authService, 'login').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the login page', () => {
    expect(component).toBeTruthy();
  });

  it('should have a loading initialized false', () => {
    expect(component.loading).toBeFalse();
  });

  it('should log in', () => {
    component.loginForm.patchValue({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });

    component.login();

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
  });

  it('should not be able to log in if the form is invalid', () => {
    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    expect(component.loginForm.invalid).toBeTrue();

    component.login();

    expect(loginSpy).not.toHaveBeenCalledWith({
      email: '',
      password: '',
    });
  });
});
