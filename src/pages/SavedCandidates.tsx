import React, { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <p>No Candidates have been saved.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Userame</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.username}>
              <td><img src={candidate.avatar_url} alt="Avatar" width="50" /></td>
              <td>{candidate.id}</td>
              <td>{candidate.login}</td>
              <td>{candidate.name}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.organizations_url}</td>
              <td><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/">Back to Home</a>
    </div>
  );
};

export default SavedCandidates;