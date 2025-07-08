export interface Answer {
    id: number
    text: string
    description: string
    active: boolean
    question: number
  }
  
  export interface Question {
    id: number
    answers: Answer[]
    description: string
    text: string
    sound: string | null
    active: boolean
    question_type: "button" | "text" | "emoji"
    agreement: string
    section: number
  }
  
  export interface Section {
    id: number
    questions: Question[]
    number: number
    category: number
  }
  
  export interface Main {
    id: number
    sections: Section[]
    name: string
  }
  
  