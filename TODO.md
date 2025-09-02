Dynamic Form Builder with Data Display
 
Objective:
 
Create a React application that includes a dynamic form builder based on a JSON configuration,
validates inputs in real-time, and displays submitted data on a separate page. Store form
submissions using Redux or localStorage, ensuring the application is fully responsive across
devices.
Requirements:
 
1. Dynamic Form:
 
● Build a React component that generates a form dynamically based on a JSON
configuration.
● The JSON config should define fields, e.g.:
● json
[
{ id: 'name', type: 'text', label: 'Name', required: true },
{ id: 'email', type: 'email', label: 'Email', required: true },
{ id: 'age', type: 'number', label: 'Age', required: false, min: 18 },
{ id: 'gender', type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
{ id: 'role', type: 'radio', label: 'Role', required: true, options: ['Developer', 'Designer', 'Manager'] },
{ id: 'skill', type: ‘check-box’, label: ‘Skills’, required: true, options: ['HTML', 'CSS’, 'JS'] }
]
 
● Support input types: text, email, number, select, radio and check-box.
 
2.Validation:
 
● Implement real-time validation for all fields:
● Required fields must not be empty.
● Email fields must follow a valid email format
● Display error messages below invalid fields.
● Disable the submit button if there are validation errors.
 
3.Form Submission:
 
● Clear the form after submission.
● Redirect the user to a separate page to view submitted data.
 
4.Data Storage:
 
● Store submitted form data persistently using either Redux or localStorage.
● If using Redux, set up a store with appropriate reducers to manage submissions.
● If using localStorage, ensure data persists across page refreshes.
 
5.Submission Display Page:
 
● Create a separate page (accessible via React Router) to display all submitted
form data in a table.
● Table headers should dynamically reflect the field labels from the JSON config.● Each row should represent one submission, with a unique identifier (e.g.,
timestamp or UUID).
● If no submissions exist, display a message like "No submissions yet."
 
6. Responsiveness:
 
● Ensure the form and submission table are fully responsive across devices
(mobile, tablet, desktop).
● Form inputs and the table should be usable and visually appealing on all screen
sizes.
 
7. Styling:
 
● Style the form and table for a clean, professional look.
● Highlight invalid inputs (e.g., red border) and display error messages clearly.
● Ensure consistent spacing, typography, and visual hierarchy.
 
Deliverables:
 
● A complete React application with:
● Source code (well-organized and commented).
● A brief description of your approach and any assumptions made.
● Ensure the code is committed to a Git repository (e.g., GitLab, GitHub) with clear commit messages.
 
 
Note: Don't use any libraries like Bootstrap, TailwindCSS, JQuery

## Responsiveness Implementation TODO

### Steps to Make Form and Submission Table Fully Responsive

1. **Update App.css with responsive media queries**
   - Add media queries for mobile (<768px) and tablet (<1024px) to adjust .app margins, padding, font sizes, and tabs layout.
   - Ensure the overall app container adapts to smaller screens without excessive padding.

2. **Modify FormValidation.js for mobile usability**
   - Adjust the form container styles to reduce padding and margins on smaller screens.
   - Ensure inputs and labels remain readable and accessible on mobile devices.

3. **Update Submissions.js to make table responsive**
   - Wrap the table in a div with overflow-x: auto to enable horizontal scrolling on small screens.
   - Add responsive styles to prevent table overflow and maintain usability across devices.

4. **Test responsiveness**
   - Verify the app works on mobile, tablet, and desktop screen sizes.
   - Ensure form inputs are touch-friendly and the table scrolls properly without layout breaks.
