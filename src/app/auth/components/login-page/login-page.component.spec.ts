import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import * as fromAuth from '../../store/auth.reducer';
import { selectAuthState } from '../../store/auth.selectors';
import { AuthUser } from '../../models/auth.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from '../../../dashboard/home/pages/home-page/home-page.component';

const mockAuthUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  password: '1234567',
  firstName: 'Test',
  lastName: 'One',
  address: 'Av. Siempre viva',
  phone: '4564564564',
  avatar: 'avatar',
  isAdmin: true,
  isActive: true,
};

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/home', component: HomePageComponent },
        ]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ result: 'test' }) },
        },
        provideMockStore({
          initialState: fromAuth.initialState,
          selectors: [
            {
              selector: selectAuthState,
              value: {
                authenticatedUser: mockAuthUser,
                loading: false,
                error: null,
              },
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
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

  it('should log in', (done) => {
    const loginForm = component.loginForm;

    expect(component.loading).toBeFalse();

    loginForm.setValue({
      email: 'test@example.com',
      password: '1234567',
    });

    component.login();

    expect(component.loading).toBeTrue();
    expect(component.error).toBeNull();

    store.select(selectAuthState).subscribe((state: any) => {
      expect(state.authenticatedUser).toEqual(mockAuthUser);
      expect(state.loading).toBeFalse();
      expect(state.error).toBeNull();

      done();
    });
  });

  it('form should not be valid if email and password are empty', () => {
    const loginForm = component.loginForm;

    loginForm.setValue({
      email: '',
      password: '',
    });

    expect(loginForm.valid).toBe(false);
  });

  // it('should not be able to log in if the form is invalid', (done) => {
  //   component.loginForm.setValue({
  //     email: '',
  //     password: '',
  //   });

  //   expect(component.loading).toBeFalse();

  //   expect(component.loginForm.invalid).toBeTrue();

  //   component.login();

  //   expect(component.loading).toBeTrue();
  //   expect(component.error).toBeNull();

  //   store.select(selectAuthState).subscribe((state) => {
  //     expect(state.authenticatedUser).toEqual(mockAuthUser);
  //     expect(state.loading).toBeFalse();
  //     expect(state.error).toBeNull();

  //     done();
  //   });
  // });

  it('should call login', (done) => {
    const loginForm = component.loginForm;

    loginForm.setValue({
      email: 'test@example.com',
      password: '1234567',
    });

    component.login();

    store.select(selectAuthState).subscribe((state: any) => {
      expect(state.authenticatedUser).toEqual(mockAuthUser);

      done();
    });
  });
});
