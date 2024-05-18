export interface QBPage {
    current_page: number
    data: QB[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
  }

  export interface QB {
    id: number
    name: string
    display_name: string
    description: string
    created_at: string
    updated_at: string
  }

  export interface Link {
    url: string
    label: string
    active: boolean
  }
