import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(savedCandidates);
  }, []);

  const removeCandidate = (id: number) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };

  if (candidates.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Potential Candidates</h1>
        <p>No candidates have been accepted yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Potential Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-lg shadow-lg p-6">
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.login}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center mb-4">
              {candidate.name || candidate.login}
            </h2>
            <div className="space-y-2">
              <p><strong>Username:</strong> {candidate.login}</p>
              <p><strong>Location:</strong> {candidate.location || 'Not specified'}</p>
              <p><strong>Email:</strong> {candidate.email || 'Not specified'}</p>
              <p><strong>Company:</strong> {candidate.company || 'Not specified'}</p>
              <p>
                <strong>Profile:</strong>{' '}
                <a 
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {candidate.html_url}
                </a>
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => removeCandidate(candidate.id)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                aria-label="Remove candidate"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;