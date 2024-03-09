export interface MemberPage {
    current_page: number
    data: Member[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }

  export interface Member {
    id: number
    name: string
    email: string
    email_verified_at: any
    created_at?: string
    updated_at?: string
    role_name: string
  }

  export interface Link {
    url?: string
    label: string
    active: boolean
  }
