/**
 * FormValidation component for dynamic form building with real-time validation.
 * Generates form fields based on JSON config, validates inputs, stores data in localStorage,
 * and redirects to submissions page after successful submission.
 */

import React, { useState } from "react";

function FormValidation({ setActiveTab }) {
  // JSON configuration for form fields
  const formConfig = [
    { id: 'name', type: 'text', label: 'Name', required: true },
    { id: 'email', type: 'email', label: 'Email', required: true },
    { id: 'age', type: 'number', label: 'Age', required: false, min: 18 },
    { id: 'gender', type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
    { id: 'role', type: 'radio', label: 'Role', required: true, options: ['Developer', 'Designer', 'Manager'] },
    { id: 'skill', type: 'checkbox', label: 'Skills', required: true, options: ['HTML', 'CSS', 'JS'] }
  ];

  // State for form data (object with field ids as keys)
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    formConfig.forEach(field => {
      if (field.type === 'checkbox') {
        initialData[field.id] = [];
      } else {
        initialData[field.id] = '';
      }
    });
    return initialData;
  });

  // State for validation errors (object with field ids as keys)
  const [errors, setErrors] = useState({});

  /**
   * Validates a single field based on its config
   * @param {string} fieldId - The id of the field to validate
   * @param {any} value - The value to validate
   * @returns {string} - Error message or empty string if valid
   */
  const validateField = (fieldId, value) => {
    const field = formConfig.find(f => f.id === fieldId);
    if (!field) return '';

    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required.`;
    }

    if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address.';
    }

    if (field.type === 'number' && field.min !== undefined && value < field.min) {
      return `${field.label} must be at least ${field.min}.`;
    }

    return '';
  };

  /**
   * Handles input changes, updates formData, and performs real-time validation
   * @param {string} fieldId - The id of the field being changed
   * @param {any} value - The new value
   */
  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    const error = validateField(fieldId, value);
    setErrors(prev => ({ ...prev, [fieldId]: error }));
  };

  /**
   * Handles form submission: validates all fields, saves to localStorage, clears form, redirects
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    formConfig.forEach(field => {
      const error = validateField(field.id, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      // Add timestamp
      const submission = { ...formData, timestamp: new Date().toISOString() };

      // Retrieve existing submissions from localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');

      // Append new submission
      existingSubmissions.push(submission);

      // Save back to localStorage
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

      // Clear form
      const clearedData = {};
      formConfig.forEach(field => {
        if (field.type === 'checkbox') {
          clearedData[field.id] = [];
        } else {
          clearedData[field.id] = '';
        }
      });
      setFormData(clearedData);
      setErrors({});

      // Form submitted successfully - data saved to localStorage
      alert('Form submitted successfully! Data saved to localStorage.');
      // Redirect to submissions page
      setActiveTab('submissions');
    }
  };

  // Check if there are any validation errors to disable submit button
  const hasErrors = Object.values(errors).some(error => error !== '');

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }} className="form-container">
      <h2>Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Dynamically render form fields based on config */}
        {formConfig.map(field => (
          <div key={field.id} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              {field.label}{field.required && ' *'}
            </label>

            {/* Render different input types */}
            {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
              <input
                type={field.type}
                value={formData[field.id]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors[field.id] ? '1px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
                min={field.min}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.id]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors[field.id] ? '1px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select {field.label}</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div>
                {field.options.map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '5px' }}>
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      checked={formData[field.id] === option}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : field.type === 'checkbox' ? (
              <div>
                {field.options.map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '5px' }}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData[field.id].includes(option)}
                      onChange={(e) => {
                        const current = formData[field.id];
                        const updated = current.includes(option)
                          ? current.filter(item => item !== option)
                          : [...current, option];
                        handleInputChange(field.id, updated);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : null}

            {/* Display error message if any */}
            {errors[field.id] && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors[field.id]}</p>}
          </div>
        ))}

        {/* Submit button, disabled if there are errors */}
        <button
          type="submit"
          disabled={hasErrors}
          style={{
            padding: '10px 20px',
            backgroundColor: hasErrors ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: hasErrors ? 'not-allowed' : 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormValidation;
