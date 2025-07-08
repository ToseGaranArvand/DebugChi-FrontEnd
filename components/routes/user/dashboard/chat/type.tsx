export interface User {
    id: string
    name: string
    image: string
  }
  
  export interface Message {
    type: 'text' | 'image' | 'document' | 'audio'
    content: string
    sender: string
    receiver: string
    fileName?: string
  }
  
  