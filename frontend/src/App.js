
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file for styling

function App() {
  const [features, setFeatures] = useState({
    firstTermGpa: "",
    secondTermGpa: "",
    firstLanguage: "",
    funding: "",
    school: "",
    fastTrack: "",
    coop: "",
    residency: "",
    gender: "",
    previousEducation: "",
    ageGroup: "",
    highSchoolAverageMark: "",
    mathScore: "",
    englishGrade: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the input fields (optional validation logic)
      if (Object.values(features).some((value) => value === "")) {
        setError("All fields are required. Please fill out all inputs.");
        return;
      }

      const formattedFeatures = Object.values(features).map((value) =>
        isNaN(value) ? value : Number(value)
      );
      console.log("Formatted Features Sent to Backend:", formattedFeatures);

      // Send features as JSON to the backend
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: formattedFeatures,
      });

      // Set prediction
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error("Error during prediction:", error);
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="App">
      <h1>TensorFlow Model Prediction</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {/* First row: First Term GPA and Second Term GPA */}
          <div className="form-group">
            <label>First Term GPA:</label>
            <input
              type="number"
              name="firstTermGpa"
              value={features.firstTermGpa}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Second Term GPA:</label>
            <input
              type="number"
              name="secondTermGpa"
              value={features.secondTermGpa}
              onChange={handleChange}
            />
          </div>

          {/* Second row: First Language and Funding */}
          <div className="form-group">
            <label>First Language:</label>
            <select
              name="firstLanguage"
              value={features.firstLanguage}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">English</option>
              <option value="2">French</option>
              <option value="3">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Funding:</label>
            <select
              name="funding"
              value={features.funding}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">Apprentice_PS</option>
              <option value="2">GPOG_FT</option>
              <option value="3">Intl Offshore</option>
              <option value="4">Intl Regular</option>
              <option value="5">Intl Transfer</option>
              <option value="6">Joint Program Ryerson</option>
              <option value="7">Joint Program UTSC</option>
              <option value="8">Second Career Program</option>
              <option value="9">Work Safety Insurance Board</option>
            </select>
          </div>

          {/* Third row: School and Fast Track */}
          <div className="form-group">
            <label>School:</label>
            <select
              name="school"
              value={features.school}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">Advancement</option>
              <option value="2">Business</option>
              <option value="3">Communications</option>
              <option value="4">Community and Health</option>
              <option value="5">Hospitality</option>
              <option value="6">Engineering</option>
              <option value="7">Transportation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fast Track (Y/N):</label>
            <select name="fastTrack" value={features.fastTrack} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Y</option>
              <option value="2">N</option>
            </select>
          </div>

          {/* Fourth row: Coop and Residency */}
          <div className="form-group">
            <label>Coop (Y/N):</label>
            <select name="coop" value={features.coop} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Y</option>
              <option value="2">N</option>
            </select>
          </div>

          <div className="form-group">
            <label>Residency:</label>
            <select name="residency" value={features.residency} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Domestic</option>
              <option value="2">International</option>
            </select>
          </div>

          {/* Fifth row: Gender and Previous Education */}
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={features.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="3">Neutral</option>
            </select>
          </div>

          <div className="form-group">
            <label>Previous Education:</label>
            <select name="previousEducation" value={features.previousEducation} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">HighSchool</option>
              <option value="2">PostSecondary</option>
            </select>
          </div>

          {/* Sixth row: Age Group and High School Average Mark */}
          <div className="form-group">
            <label>Age Group:</label>
            <select name="ageGroup" value={features.ageGroup} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">0 to 18</option>
              <option value="2">19 to 20</option>
              <option value="3">21 to 25</option>
              <option value="4">26 to 30</option>
              <option value="5">31 to 35</option>
              <option value="6">36 to 40</option>
              <option value="7">41 to 50</option>
              <option value="8">51 to 60</option>
              <option value="9">61 to 65</option>
              <option value="10">66+</option>
            </select>
          </div>

          <div className="form-group">
            <label>High School Average Mark:</label>
            <input
              type="number"
              name="highSchoolAverageMark"
              value={features.highSchoolAverageMark}
              onChange={handleChange}
            />
          </div>

          {/* Seventh row: Math Score and English Grade */}
          <div className="form-group">
            <label>Math Score:</label>
            <input
              type="number"
              name="mathScore"
              value={features.mathScore}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>English Grade (Level-130 to Level-180):</label>
            <select name="englishGrade" value={features.englishGrade} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Level-130</option>
              <option value="2">Level-131</option>
              <option value="3">Level-140</option>
              <option value="4">Level-141</option>
              <option value="5">Level-150</option>
              <option value="6">Level-151</option>
              <option value="7">Level-160</option>
              <option value="8">Level-161</option>
              <option value="9">Level-170</option>
              <option value="10">Level-171</option>
              <option value="11">Level-180</option>
            </select>
          </div>

        </div>

        <button type="submit">Get Prediction</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h2>Prediction Result: {prediction}</h2>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}
export default App;
// // export default App;
// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css"; // Ensure this file includes the required styles for the layout

// function App() {
//   const [features, setFeatures] = useState({
//     firstTermGpa: "",
//     secondTermGpa: "",
//     firstLanguage: "",
//     funding: "",
//     school: "",
//     fastTrack: "",
//     coop: "",
//     residency: "",
//     gender: "",
//     previousEducation: "",
//     ageGroup: "",
//     highSchoolAverageMark: "",
//     mathScore: "",
//     englishGrade: "",
//   });

//   const [students, setStudents] = useState([
//     { name: "Daniel Carter", gpa: 9.57 },
//     // Add more preloaded students if needed
//   ]);

//   const [selectedStudent, setSelectedStudent] = useState(students[0]);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFeatures((prevFeatures) => ({
//       ...prevFeatures,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (Object.values(features).some((value) => value === "")) {
//         setError("All fields are required. Please fill out all inputs.");
//         return;
//       }

//       const formattedFeatures = Object.values(features).map((value) =>
//         isNaN(value) ? value : Number(value)
//       );

//       const response = await axios.post("http://127.0.0.1:5000/predict", {
//         features: formattedFeatures,
//       });

//       setPrediction(response.data.prediction);
//       setError(null);
//     } catch (error) {
//       console.error("Error during prediction:", error);
//       setError("Error: " + error.message);
//     }
//   };

//   const handleAddStudent = (e) => {
//     e.preventDefault();

//     const newStudent = {
//       name: features.name || "New Student",
//       gpa: features.firstTermGpa || 0,
//     };

//     setStudents([...students, newStudent]);
//     setFeatures({
//       firstTermGpa: "",
//       secondTermGpa: "",
//       firstLanguage: "",
//       funding: "",
//       school: "",
//       fastTrack: "",
//       coop: "",
//       residency: "",
//       gender: "",
//       previousEducation: "",
//       ageGroup: "",
//       highSchoolAverageMark: "",
//       mathScore: "",
//       englishGrade: "",
//     });
//   };

//   const handleStudentChange = (e) => {
//     const studentName = e.target.value;
//     const student = students.find((s) => s.name === studentName);
//     setSelectedStudent(student);
//   };

//   return (
//     <div className="app-container">
//       <h1>Predict Student Outcome</h1>

//       {/* Dropdown Section */}
//       <div className="dropdown-section">
//         <label htmlFor="student-select">Select a Student:</label>
//         <select
//           id="student-select"
//           className="dropdown"
//           value={selectedStudent.name}
//           onChange={handleStudentChange}
//         >
//           {students.map((student, index) => (
//             <option key={index} value={student.name}>
//               {student.name} - GPA: ({student.gpa})
//             </option>
//           ))}
//         </select>
//         <button className="predict-button">Predict</button>
//         <button className="edit-button">Edit Student</button>
//         <button className="remove-button">Remove Student</button>
//       </div>

//       {/* Prediction Result Section */}
//       {prediction && (
//         <div className="prediction-result">
//           <h2>
//             Prediction Result:{" "}
//             <span className="prediction-text">{prediction}</span>
//           </h2>
//         </div>
//       )}

//       {error && <div className="error">{error}</div>}

//       {/* Add New Student Form */}
//       <form onSubmit={handleAddStudent}>
//         <h2>Add New Student</h2>
//         <div className="form-grid">
//           {Object.keys(features).map((key) => (
//             <div className="form-group" key={key}>
//               <label>
//                 {key
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/^./, (str) => str.toUpperCase())}:
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={features[key]}
//                 onChange={handleChange}
//               />
//             </div>
//           ))}
//         </div>
//         <button type="submit" className="add-student-button">
//           Add Student
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;
