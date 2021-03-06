export class Page {
  constructor(page = 1, size = 2, sizes = [1,2,3], 
    total, pages, data, prev = false, next = false) {
    this.page = page
    this.size = size
    this.sizes = sizes
    this.total = total
    this.pages = pages
    this.data = data
    this.prev = prev
    this.next = next
  }
}