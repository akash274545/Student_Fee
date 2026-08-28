// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const CATEGORIES = [
//   { key: "fee-receipt", label: "Fee Receipts" },
//   { key: "marksheet", label: "Mark Sheets (Semester-wise)" },
//   { key: "exam-fee", label: "Exam Fee Receipts" },
//   { key: "scholarship", label: "Scholarship Forms" },
//   { key: "university-form", label: "University Forms" },
//   { key: "certificate", label: "Certificates (Workshops, Sports, Events)" },
//   { key: "event-photo", label: "Event / Function Photos" },
//   { key: "memory-photo", label: "Personal Memories / Achievements Photos" },
//   { key: "id-doc", label: "ID Card / Bonafide / TC / Other Docs" },
//   { key: "other-doc", label: "Any Other Documents" },
// ];

// function App({ user, onLogout }) {
//   const [profile, setProfile] = useState({ name: "", branch: "" });
//   const [profileError, setProfileError] = useState("");

//   const [selectedFiles, setSelectedFiles] = useState({});
//   const [docsByCategory, setDocsByCategory] = useState({});
//   const [docErrors, setDocErrors] = useState({});

//   if (!user) {
//     return (
//       <div className="main-container">
//         <h2>Please login to access the dashboard.</h2>
//       </div>
//     );
//   }

//   // ---------- profile validation ----------
//   const validateProfile = () => {
//     let err = "";

//     if (!/^[A-Za-z ]+$/.test(profile.name)) {
//       err = "Name should contain only letters.";
//     } else if (!/^[A-Za-z ]+$/.test(profile.branch)) {
//       err = "Branch should contain only letters.";
//     }

//     setProfileError(err);
//     return err === "";
//   };

//   // ---------- save profile (Enter button) ----------
//   const handleProfileSubmit = (e) => {
//     e.preventDefault();
//     if (!validateProfile()) return;

//     axios
//       .post("http://localhost:5000/api/profile", {
//         username: user.username,
//         name: profile.name,
//         branch: profile.branch,
//       })
//       .then(() => {
//         alert("Details saved successfully!");
//       })
//       .catch(() => {
//         setProfileError("Could not save details. Try again.");
//       });
//   };

//   // ---------- file select ----------
//   const handleFileChange = (category, e) => {
//     const file = e.target.files[0];
//     setSelectedFiles((prev) => ({ ...prev, [category]: file }));
//   };

//   // ---------- upload document for a category ----------
//   const handleUpload = (category) => {
//     const file = selectedFiles[category];
//     let newErrors = { ...docErrors };

//     if (!file) {
//       newErrors[category] = "Please select a file.";
//       setDocErrors(newErrors);
//       return;
//     }

//     const allowed = ["application/pdf", "image/jpeg", "image/png"];
//     if (!allowed.includes(file.type)) {
//       newErrors[category] = "Only PDF, JPG, PNG allowed.";
//       setDocErrors(newErrors);
//       return;
//     }

//     const data = new FormData();
//     data.append("username", user.username);
//     data.append("category", category);
//     data.append("file", file);

//     axios
//       .post("http://localhost:5000/api/documents/upload", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then(() => {
//         setDocErrors((prev) => ({ ...prev, [category]: "" }));
//         setSelectedFiles((prev) => ({ ...prev, [category]: null }));
//         // refresh list for that category
//         fetchDocuments(category);
//       })
//       .catch(() => {
//         setDocErrors((prev) => ({
//           ...prev,
//           [category]: "Upload failed. Try again.",
//         }));
//       });
//   };

//   // ---------- fetch documents for a category ----------
//   const fetchDocuments = (category) => {
//     axios
//       .get(
//         `http://localhost:5000/api/documents/${user.username}/${category}`
//       )
//       .then((res) => {
//         setDocsByCategory((prev) => ({
//           ...prev,
//           [category]: res.data,
//         }));
//       })
//       .catch(() => {
//         setDocErrors((prev) => ({
//           ...prev,
//           [category]: "Could not load data.",
//         }));
//       });
//   };

//   return (
//     <div className="main-container">
//       {/* Logout button */}
//       <button
//         onClick={onLogout}
//         style={{
//           float: "right",
//           background: "#ff4b4b",
//           color: "white",
//           padding: "8px 15px",
//           borderRadius: "6px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>

//       <h1>Student Digital Document Dashboard</h1>

//       {/* ENTER YOUR DETAILS */}
//       <div className="card">
//         <h2>Enter Your Details</h2>
//         <form onSubmit={handleProfileSubmit}>
//           <input
//             name="name"
//             placeholder="Name"
//             value={profile.name}
//             onChange={(e) =>
//               setProfile((prev) => ({ ...prev, name: e.target.value }))
//             }
//             required
//           />
//           <input
//             name="branch"
//             placeholder="Branch"
//             value={profile.branch}
//             onChange={(e) =>
//               setProfile((prev) => ({ ...prev, branch: e.target.value }))
//             }
//             required
//           />
//           {profileError && <p className="error">{profileError}</p>}
//           <button type="submit">Enter</button>
//         </form>
//       </div>

//       {/* DOCUMENT CATEGORIES */}
//       {CATEGORIES.map((cat) => (
//         <div className="card" key={cat.key}>
//           <h2>{cat.label}</h2>

//           <input
//             type="file"
//             onChange={(e) => handleFileChange(cat.key, e)}
//           />

//           {docErrors[cat.key] && (
//             <p className="error">{docErrors[cat.key]}</p>
//           )}

//           <div style={{ marginTop: "8px" }}>
//             <button
//               type="button"
//               onClick={() => handleUpload(cat.key)}
//               style={{ marginRight: "10px" }}
//             >
//               Upload File
//             </button>

//             <button type="button" onClick={() => fetchDocuments(cat.key)}>
//               View Data
//             </button>
//           </div>

//           {/* show list only if data loaded */}
//           {docsByCategory[cat.key] && docsByCategory[cat.key].length > 0 && (
//             <ul style={{ marginTop: "10px" }}>
//               {docsByCategory[cat.key].map((doc) => (
//                 <li key={doc._id}>
//                   {doc.originalName || "Document"}{" "}
//                   <a
//                     href={`http://localhost:5000/${doc.filePath}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     Download
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const CATEGORIES = [
  { key: "fee-receipt", label: "Fee Receipts" },
  { key: "marksheet", label: "Mark Sheets (Semester-wise)" },
  { key: "exam-fee", label: "Exam Fee Receipts" },
  { key: "scholarship", label: "Scholarship Forms" },
  { key: "university-form", label: "University Forms" },
  { key: "certificate", label: "Certificates (Workshops, Sports, Events)" },
  { key: "event-photo", label: "Event / Function Photos" },
  { key: "memory-photo", label: "Personal Memories / Achievements Photos" },
  { key: "id-doc", label: "ID Card / Bonafide / TC" },
  { key: "other-doc", label: "Any Other Documents" },
];

function App({ user, onLogout }) {
  const [profile, setProfile] = useState({ name: "", branch: "" });
  const [profileError, setProfileError] = useState("");

  const [selectedFiles, setSelectedFiles] = useState({}); // category -> [files]
  const [docsByCategory, setDocsByCategory] = useState({}); // category -> docs[]
  const [docErrors, setDocErrors] = useState({});
  const [visibleCategories, setVisibleCategories] = useState({}); // category -> bool
  const [darkMode, setDarkMode] = useState(false);

  if (!user) {
    return (
      <div className="main-container light">
        <h2>Please login to access the dashboard.</h2>
      </div>
    );
  }

  // ---------- profile validation ----------
  const validateProfile = () => {
    let err = "";

    if (!/^[A-Za-z ]+$/.test(profile.name)) {
      err = "Name should contain only letters.";
    } else if (!/^[A-Za-z ]+$/.test(profile.branch)) {
      err = "Branch should contain only letters.";
    }

    setProfileError(err);
    return err === "";
  };

  // ---------- save profile (Enter button) ----------
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    axios
      .post("http://localhost:5000/api/profile", {
        username: user.username,
        name: profile.name,
        branch: profile.branch,
      })
      .then(() => {
        alert("Details saved successfully!");
      })
      .catch(() => {
        setProfileError("Could not save details. Try again.");
      });
  };

  // ---------- file select (multiple) ----------
  const handleFileChange = (category, e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => ({ ...prev, [category]: files }));
  };

  // ---------- upload documents for a category (multiple files) ----------
  const handleUpload = async (category) => {
    const files = selectedFiles[category];
    let newErrors = { ...docErrors };

    if (!files || files.length === 0) {
      newErrors[category] = "Please select at least one file.";
      setDocErrors(newErrors);
      return;
    }

    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    const invalid = files.find((file) => !allowed.includes(file.type));
    if (invalid) {
      newErrors[category] = "Only PDF, JPG, PNG allowed.";
      setDocErrors(newErrors);
      return;
    }

    try {
      await Promise.all(
        files.map((file) => {
          const data = new FormData();
          data.append("username", user.username);
          data.append("category", category);
          data.append("file", file);

          return axios.post("http://localhost:5000/api/documents/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );

      setDocErrors((prev) => ({ ...prev, [category]: "" }));
      setSelectedFiles((prev) => ({ ...prev, [category]: [] }));
      // refresh list for that category if it's visible
      if (visibleCategories[category]) {
        fetchDocuments(category);
      }
    } catch (err) {
      setDocErrors((prev) => ({
        ...prev,
        [category]: "Upload failed. Try again.",
      }));
    }
  };

  // ---------- fetch documents for a category ----------
  const fetchDocuments = (category) => {
    axios
      .get(`http://localhost:5000/api/documents/${user.username}/${category}`)
      .then((res) => {
        setDocsByCategory((prev) => ({
          ...prev,
          [category]: res.data,
        }));
      })
      .catch(() => {
        setDocErrors((prev) => ({
          ...prev,
          [category]: "Could not load data.",
        }));
      });
  };

  // ---------- toggle view data (show/hide) ----------
  const toggleViewData = (category) => {
    setVisibleCategories((prev) => {
      const currentlyVisible = !!prev[category];
      const updated = { ...prev, [category]: !currentlyVisible };

      // if turning ON and we don't have data yet, fetch
      if (!currentlyVisible && !docsByCategory[category]) {
        fetchDocuments(category);
      }

      return updated;
    });
  };

  const modeClass = darkMode ? "dark" : "light";

  return (
    <div className={`main-container ${modeClass}`}>
      {/* Top bar: title + buttons */}
      <div className="top-bar">
        <h1>Student Digital Document Dashboard</h1>

        <div className="top-actions">
          <button
            className="mode-btn"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      

      {/* DOCUMENT CATEGORIES */}
      {CATEGORIES.map((cat) => (
        <div className="card" key={cat.key}>
          <h2>{cat.label}</h2>

          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(cat.key, e)}
          />

          {docErrors[cat.key] && (
            <p className="error">{docErrors[cat.key]}</p>
          )}

          <div className="button-row">
            <button type="button" onClick={() => handleUpload(cat.key)}>
              Upload File(s)
            </button>

            <button type="button" onClick={() => toggleViewData(cat.key)}>
              {visibleCategories[cat.key] ? "Hide Data" : "View Data"}
            </button>
          </div>

          {/* show list only if visible */}
          {visibleCategories[cat.key] &&
            docsByCategory[cat.key] &&
            docsByCategory[cat.key].length > 0 && (
              <ul className="doc-list">
                {docsByCategory[cat.key].map((doc) => (
                  <li key={doc._id}>
                    {doc.originalName || "Document"}{" "}
                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      See Doc
                    </a>
                  </li>
                ))}
              </ul>
            )}

          {visibleCategories[cat.key] &&
            docsByCategory[cat.key] &&
            docsByCategory[cat.key].length === 0 && (
              <p className="no-data">No documents uploaded yet.</p>
            )}
        </div>
      ))}
    </div>
  );
}

export default App;
