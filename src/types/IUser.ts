export interface IGeoLocation {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoLocation;
}

export interface ICompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IAddress;
  company: ICompany;
}
