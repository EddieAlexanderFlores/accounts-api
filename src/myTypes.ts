export type Email = string;
export type Application = number;

export interface Account {
  application: number;
  emails: Email[];
  name: string;
}

export interface Person {
  applications: Application[];
  emails: Email[];
  name: string;
}

export interface ExtendedAccount extends Account {
  belongsTo: number;
}
