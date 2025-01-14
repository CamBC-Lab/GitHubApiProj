import { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';


function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] =useState<Candidate[]>(()=>{
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved):[];
  });

  
  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await searchGithub();
        if (Array.isArray(response)) {
          setCandidates(response);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        // You might want to set an error state here to show to the user
        alert(error instanceof Error ? error.message : 'Failed to fetch candidates');
      }
    }
    fetchCandidates();
  }, []);

  const saveCandidate = () =>{
    const newSavedCandidates = [...savedCandidates, candidates[currentIndex]];
    setSavedCandidates(newSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(newSavedCandidates));
    nextCandidate();
  };
  const nextCandidate = () =>{
    if(currentIndex < candidates.length -1){
      setCurrentIndex(currentIndex + 1);
    }
    else{
      alert('No more candidates available');
    }
  };
   if (candidates.length === 0){
    return<p>Loading candidates...</p>
   }

   const currentCandidate = candidates[currentIndex];
   console.log(currentCandidate);
  return (
    <div>
      <main>
        <div className="search-container">
          <h1>Candidate Search</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={currentCandidate.avatar_url} alt="Candidate Avatar" style={{ width: '100px', height: '100px' }} />
           <ul className="searchList">
            <li>Id: {currentCandidate.id}</li>
            <li>Username: {currentCandidate.login}</li>
            <li>Name: {currentCandidate.name}</li>
            <li>Location: {currentCandidate.location}</li>
            <li>Email: {currentCandidate.email}</li>
            <li>Company: {currentCandidate.organizations_url}</li>
             {/* <li><a href={currentCandidate.organizations_url} target="_blank" rel="noopener noreferrer">Company Page</a></li> */}
            <li><a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
            </ul>
            </div>
            <div className="operator">
          <button onClick={nextCandidate}>-</button>
          <button onClick={saveCandidate}>+</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CandidateSearch;