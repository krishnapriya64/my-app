import React, { useState, useEffect } from 'react';

/**
 * Submissions component displays all submitted form data in a table.
 * Data is retrieved from localStorage and displayed dynamically based on the JSON config.
 */
function Submissions() {
  // State to hold the list of submissions
  const [submissions, setSubmissions] = useState([]);

  // JSON config for form fields (same as in FormValidation.js)
  const formConfig = [
    { id: 'name', type: 'text', label: 'Name', required: true },
    { id: 'email', type: 'email', label: 'Email', required: true },
    { id: 'age', type: 'number', label: 'Age', required: false, min: 18 },
    { id: 'gender', type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
    { id: 'role', type: 'radio', label: 'Role', required: true, options: ['Developer', 'Designer', 'Manager'] },
    { id: 'skill', type: 'checkbox', label: 'Skills', required: true, options: ['HTML', 'CSS', 'JS'] }
  ];

  // Load submissions from localStorage on component mount
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmissions');
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  // If no submissions, display a message
  if (submissions.length === 0) {
    return <p>No submissions yet.</p>;
  }

  return (
    <div>
      <h2>Submitted Data</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr>
            {/* Dynamically generate table headers from formConfig */}
            {formConfig.map(field => (
              <th key={field.id} style={{ border: '1px solid #ddd', padding: '8px' }}>{field.label}</th>
            ))}
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each submission as a table row */}
          {submissions.map((submission, index) => (
            <tr key={index}>
              {formConfig.map(field => (
                <td key={field.id} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* Handle different field types for display */}
                  {field.type === 'checkbox' ? submission[field.id]?.join(', ') : submission[field.id]}
                </td>
              ))}
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{submission.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Submissions;
