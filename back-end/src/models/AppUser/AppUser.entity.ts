export default class AppUser {
  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    hashedPassword: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = emailAddress
    this.hashedPassword = hashedPassword
  }

  id: string

  email: string

  firstName: string

  lastName: string

  hashedPassword: string
}
