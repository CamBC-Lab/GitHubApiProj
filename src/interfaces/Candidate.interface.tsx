// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;          // GitHub username
    avatar_url: string;     // Profile picture URL
    html_url: string;       // GitHub profile URL
    id: number;            // Unique identifier
  }