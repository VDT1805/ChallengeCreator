export interface QPage {
    current_page: number
    data: Question[]
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

  export interface Question {
    id: number
    created_at: any
    updated_at: any
    question: string
    ans1: string
    ans2: string
    ans3: string
    ans4: string
    ans5: string
    ans6: string
    correct: number
    question_bank_id: number
    inTest?: boolean
  }

  export interface Link {
    url?: string
    label: string
    active: boolean
  }

  export interface QuestionEvent {
    author: string
    question: Question
  }
