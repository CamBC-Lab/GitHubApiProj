import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  const loadNextCandidate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchResult = await searchGithub();
      
      if (!searchResult?.items?.length) {
        setNoMoreCandidates(true);
        setCurrentCandidate(null);
        return;
      }

      // Try up to 3 times to get a candidate that hasn't been saved
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * searchResult.items.length);
        const login = searchResult.items[randomIndex].login;
        
        // Check if candidate is already saved
        const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        if (!savedCandidates.some((c: Candidate) => c.login === login)) {
          const userDetails = await searchGithubUser(login);
          setCurrentCandidate(userDetails);
          return;
        }
      }

      // If we couldn't find a new candidate after 3 tries
      setNoMoreCandidates(true);
      setCurrentCandidate(null);

    } catch (err) {
      setError('Unable to load candidate. Please try again.');
      setCurrentCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      try {
        const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        if (!savedCandidates.some((c: Candidate) => c.id === currentCandidate.id)) {
          localStorage.setItem(
            'savedCandidates',
            JSON.stringify([...savedCandidates, currentCandidate])
          );
        }
        loadNextCandidate();
      } catch (err) {
        setError('Failed to save candidate. Please try again.');
      }
    }
  };

  useEffect(() => {
    loadNextCandidate();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">Loading candidate...</div>
        </div>
      </div>
    );
  }

  if (noMoreCandidates) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto text-center bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">No More Candidates Available</h2>
          <p>There are no more candidates to review at this time.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto text-center bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadNextCandidate}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentCandidate) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto text-center">
          <button 
            onClick={loadNextCandidate}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Load New Candidate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <img 
          src={currentCandidate.avatar_url} 
          alt={`${currentCandidate.login}'s avatar`}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center mb-4">
          {currentCandidate.name || currentCandidate.login}
        </h2>
        <div className="space-y-2">
          <p><strong>Username:</strong> {currentCandidate.login}</p>
          <p><strong>Location:</strong> {currentCandidate.location || 'Not specified'}</p>
          <p><strong>Email:</strong> {currentCandidate.email || 'Not specified'}</p>
          <p><strong>Company:</strong> {currentCandidate.company || 'Not specified'}</p>
          <p>
            <strong>Profile:</strong>{' '}
            <a 
              href={currentCandidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {currentCandidate.html_url}
            </a>
          </p>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={loadNextCandidate}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            aria-label="Reject candidate"
          >
            -
          </button>
          <button
            onClick={saveCandidate}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            aria-label="Accept candidate"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;