export interface User {

  id: string,
  username: string,
  password: string,
  // repeatPassword: string,
  email: string,
  token: string,
  roles: any
  rate: number
}
