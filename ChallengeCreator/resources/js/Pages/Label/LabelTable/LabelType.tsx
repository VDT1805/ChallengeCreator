export interface LabelPage {
    current_page: number
    data: LabelType[]
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

  export interface LabelType {
    id: number
    name: string
    created_at: any
    updated_at: any
    description: string
    question_bank_id: number
    sublabels?: Array<LabelType>
    questions_count?: number
    label_id: any
  }

  export interface Link {
    url?: string
    label: string
    active: boolean
  }
