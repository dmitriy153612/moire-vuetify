export interface Breadcrumbs {
  title: string
  disabled: boolean
  to: {
    name: string
    query?: Record<string, string>
  }
}
