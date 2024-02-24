// export type Test = {
//     id: string
//     name: string
//     author: string
//     lastUpdated: string
//   }

  export interface TestPage {
    current_page: number
    data: Test[]
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

  export interface Test {
    id: number
    created_at: string
    updated_at: string
    name: string
    question_bank_id: number
    user_id: number

  }

  export interface Link {
    url?: string
    label: string
    active: boolean
  }
