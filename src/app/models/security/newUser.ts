export default class NewUser {
  firstname: string;
  lastname: string;
  password: string;
  phonenumber: string;
  address: string;
  roles: string[];

  constructor(
    firstname: string,
    lastname: string,
    password: string,
    phonenumber: string,
    address: string,
    roles: string[]
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.phonenumber = phonenumber;
    this.address = address;
    this.roles = roles;
  }
}
