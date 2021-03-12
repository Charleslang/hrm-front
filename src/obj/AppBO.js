export class UnitBO {
  constructor(unit = {}, user = {}) {
    this.unit = unit
    this.user = user
  }
}

export class RoleBO {
  constructor(role = {}, menuIds = []) {
    this.role = role
    this.menuIds = menuIds
  }
}