// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  login: string; //in response name appears in login
  id: number;
  name: string;
  username:string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  organizations_url: string;
  // Add other fields as necessary
}

export default Candidate;