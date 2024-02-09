export default class AppUser {
  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    hashedPassword: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.emailAddress = emailAddress
    this.hashedPassword = hashedPassword
  }

  id: string

  emailAddress: string

  firstName: string

  lastName: string

  hashedPassword: string
}
