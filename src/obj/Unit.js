export class Unit {
  constructor(name, shortName, enable = true, description, unitHeader, address, postcode, 
    telephone, website, email) {
    this.name = name
    this.shortName = shortName
    this.enable = enable
    this.description = description
    this.unitHeader = unitHeader
    this.address= address
    this.postcode = postcode
    this.telephone = telephone
    this.website = website
    this.email = email
  }
}