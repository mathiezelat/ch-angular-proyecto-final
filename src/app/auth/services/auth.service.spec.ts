import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from './../../core/models/user';
import { SingleUserResponse } from '../../core/models/reqres.interface';

const mockUser: User = new User(
  7,
  'michael.lawson@reqres.in',
  'Michael',
  'Lawson',
  'https://reqres.in/img/faces/7-image.jpg',
  true
);

const mockSingleUserResponse: SingleUserResponse = {
  data: {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  },
  support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
  },
};

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should work', (done) => {
    service
      .login(
        {
          email: 'fakemail@mail.com',
          password: '123456',
        },
        true
      )
      .subscribe((user) => {
        expect(user).toEqual(mockUser);
        done();
      });

    httpTestingController
      .expectOne({
        url: `${service.apiUrl}/login`,
        method: 'POST',
      })
      .flush({
        token: 'QpwL5tke4Pnpja7X2',
      });

    httpTestingController
      .expectOne({
        url: `${service.apiUrl}/users/7`,
        method: 'GET',
      })
      .flush(mockSingleUserResponse);
  });
});
