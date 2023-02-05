export class User {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public avatar: string,
    public isAdmin: boolean,
    public isActive: boolean
  ) {}
}
