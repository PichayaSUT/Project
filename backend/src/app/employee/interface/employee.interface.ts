export interface TEmployee {
  id?: number;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  phone?: string;
}

export enum EmployeeRole {
  DEVELOPER = 'developer',
  ADMIN = 'admin',
}
