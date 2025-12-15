// import React, { useState } from "react";
// import { useHistory } from "@docusaurus/router";   // ✔ Docusaurus router
// import { supabase } from "../supabaseClient";      // ✔ Correct supabase import

// export default function Signup() {
//   const history = useHistory(); // ✔ React Router v6 alternative

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Step 1 fields
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Step 2 fields
//   const [software, setSoftware] = useState("");
//   const [hardware, setHardware] = useState("");
//   const [experience, setExperience] = useState("");

//   const handleNext = () => {
//     if (!name || !email || !password || !confirmPassword) {
//       alert("Please fill all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     setStep(2);
//   };

//   const handleSignup = async () => {
//     try {
//       setLoading(true);

//       // Create user in Supabase
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (error) {
//         alert(error.message);
//         setLoading(false);
//         return;
//       }

//       const user = data.user;

//       // Insert profile data
//       const { error: profileError } = await supabase
//         .from("profiles")
//         .insert([
//           {
//             id: user.id,
//             name,
//             email,
//             software_background: software,
//             hardware_background: hardware,
//             experience_level: experience,
//           },
//         ]);

//       if (profileError) {
//         alert(profileError.message);
//         setLoading(false);
//         return;
//       }

//       alert("Signup Successful!");

//       // Redirect to book
//       history.push("/docs/intro");

//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 450, margin: "0 auto" }}>
//       <h2>RoboLearn SSO</h2>
//       <p>Secure Single Sign-On</p>

//       {/* ---------------- STEP 1 ---------------- */}
//       {step === 1 && (
//         <>
//           <h3>Create your account</h3>

//           <label>Name *</label>
//           <input
//             style={input}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <label>Email *</label>
//           <input
//             style={input}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label>Password *</label>
//           <input
//             type="password"
//             style={input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <label>Confirm Password *</label>
//           <input
//             type="password"
//             style={input}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button style={btn} onClick={handleNext}>
//             Continue →
//           </button>
//         </>
//       )}

//       {/* ---------------- STEP 2 ---------------- */}
//       {step === 2 && (
//         <>
//           <h3>Tell us about yourself</h3>

//           <p><b>Software Background</b></p>
//           <select
//             style={input}
//             value={software}
//             onChange={(e) => setSoftware(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <p><b>Hardware & OS</b></p>
//           <select
//             style={input}
//             value={hardware}
//             onChange={(e) => setHardware(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Windows">Windows PC</option>
//             <option value="Mac">Mac</option>
//             <option value="Linux">Linux</option>
//             <option value="Chromebook">Chromebook / Web</option>
//           </select>

//           <p><b>Experience Level</b></p>
//           <select
//             style={input}
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <button style={btn} onClick={handleSignup} disabled={loading}>
//             {loading ? "Creating..." : "Create Account"}
//           </button>

//           <button style={backBtn} onClick={() => setStep(1)}>
//             ← Back
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// const input = {
//   width: "100%",
//   padding: 12,
//   marginBottom: 15,
//   fontSize: 16,
// };

// const btn = {
//   width: "100%",
//   padding: 12,
//   background: "black",
//   color: "white",
//   fontSize: 16,
//   cursor: "pointer",
// };

// const backBtn = {
//   width: "100%",
//   padding: 12,
//   marginTop: 10,
//   border: "1px solid #999",
//   background: "transparent",
//   cursor: "pointer",
// };




// with ui
// import React, { useState } from "react";

// export default function Signup() {
//   const [step, setStep] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     background: "",
//     os: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const nextStep = () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }
//     setStep(2);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.background || !form.os) {
//       alert("Please complete your learning profile.");
//       return;
//     }

//     alert("Signup Completed! Redirecting...");
//     window.location.href = "/docs/intro";
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0a0044, #4b0082)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "480px",
//           background: "rgba(255,255,255,0.1)",
//           backdropFilter: "blur(10px)",
//           padding: "35px",
//           borderRadius: "20px",
//           boxShadow: "0 0 40px rgba(0,0,0,0.4)",
//           color: "white",
//         }}
//       >
//         {step === 1 && (
//           <>
//             <h2 style={{ textAlign: "center" }}>Create Account</h2>

//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <button style={btnStyle} onClick={nextStep}>
//               Continue
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <h2 style={{ textAlign: "center" }}>Tell us about yourself</h2>

//             <p style={{ marginTop: "10px" }}>What's your software background?</p>

//             <select
//               name="background"
//               onChange={handleChange}
//               style={inputStyle}
//             >
//               <option value="">Select</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>

//             <p style={{ marginTop: "10px" }}>Your Hardware / OS?</p>

//             <select name="os" onChange={handleChange} style={inputStyle}>
//               <option value="">Select</option>
//               <option value="Windows">Windows</option>
//               <option value="Mac">Mac</option>
//               <option value="Linux">Linux</option>
//               <option value="Chromebook">Chromebook</option>
//             </select>

//             <button style={btnStyle} onClick={handleSubmit}>
//               Create Account
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "12px",
//   marginBottom: "15px",
//   borderRadius: "10px",
//   border: "none",
//   outline: "none",
// };

// const btnStyle = {
//   width: "100%",
//   padding: "12px",
//   background: "linear-gradient(135deg, #6a00ff, #009dff)",
//   color: "white",
//   border: "none",
//   borderRadius: "10px",
//   cursor: "pointer",
//   fontSize: "16px",
// };





// import React, { useState } from "react";
// export default function Signup() {
//   const [step, setStep] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     background: "",
//     os: "",
//     goal: "",       // Step 3
//     experience: "", // Step 3
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // STEP 1 → STEP 2
//   const nextStep = () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }
//     setStep(2);
//   };

//   // STEP 2 → STEP 3
//   const nextStep2 = () => {
//     if (!form.background || !form.os) {
//       alert("Please complete your learning profile.");
//       return;
//     }
//     setStep(3);
//   };

//   // FINAL SUBMIT
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.goal || !form.experience) {
//       alert("Please complete step 3.");
//       return;
//     }

//     // Save login state
//     localStorage.setItem("userLoggedIn", "true");

//     alert("Signup Completed! Redirecting...");
//     window.location.href = "/docs/intro";
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0a0044, #4b0082)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "480px",
//           background: "rgba(255,255,255,0.1)",
//           backdropFilter: "blur(10px)",
//           padding: "35px",
//           borderRadius: "20px",
//           boxShadow: "0 0 40px rgba(0,0,0,0.4)",
//           color: "white",
//         }}
//       >
//         {/* STEP 1 */}
//         {step === 1 && (
//           <>
//             <h2 style={{ textAlign: "center" }}>Create Account</h2>

//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <button style={btnStyle} onClick={nextStep}>
//               Continue
//             </button>
//           </>
//         )}

//         {/* STEP 2 */}
//         {step === 2 && (
//           <>
//             <h2 style={{ textAlign: "center" }}>Tell us about yourself</h2>

//             <p style={{ marginTop: "10px" }}>Software Background</p>
//             <select name="background" onChange={handleChange} style={inputStyle}>
//               <option value="">Select</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>

//             <p style={{ marginTop: "10px" }}>Your Hardware / OS</p>
//             <select name="os" onChange={handleChange} style={inputStyle}>
//               <option value="">Select</option>
//               <option value="Windows">Windows</option>
//               <option value="Mac">Mac</option>
//               <option value="Linux">Linux</option>
//               <option value="Chromebook">Chromebook</option>
//             </select>

//             <button style={btnStyle} onClick={nextStep2}>
//               Next
//             </button>
//           </>
//         )}

//         {/* STEP 3 */}
//         {step === 3 && (
//           <>
//             <h2 style={{ textAlign: "center" }}>Learning Preferences</h2>

//             <p style={{ marginTop: "10px" }}>What is your learning goal?</p>
//             <select name="goal" onChange={handleChange} style={inputStyle}>
//               <option value="">Select</option>
//               <option value="Build Robots">Build Robots</option>
//               <option value="Learn Coding">Learn Coding</option>
//               <option value="AI & ML">AI / Machine Learning</option>
//               <option value="Electronics">Electronics Skills</option>
//             </select>

//             <p style={{ marginTop: "10px" }}>Experience Level</p>
//             <select name="experience" onChange={handleChange} style={inputStyle}>
//               <option value="">Select</option>
//               <option value="New Student">New Student</option>
//               <option value="Some Experience">Some Experience</option>
//               <option value="Pro User">Pro User</option>
//             </select>

//             <button style={btnStyle} onClick={handleSubmit}>
//               Complete Signup
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "12px",
//   marginBottom: "15px",
//   borderRadius: "10px",
//   border: "none",
//   outline: "none",
// };

// const btnStyle = {
//   width: "100%",
//   padding: "12px",
//   background: "linear-gradient(135deg, #6a00ff, #009dff)",
//   color: "white",
//   border: "none",
//   borderRadius: "10px",
//   cursor: "pointer",
//   fontSize: "16px",
// };






















// import React, { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { loginUser } from "../auth";

// export default function Signup() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Step 1 fields
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Step 2 fields
//   const [software, setSoftware] = useState("");
//   const [hardware, setHardware] = useState("");
//   const [experience, setExperience] = useState("");

//   const handleNext = () => {
//     if (!name || !email || !password || !confirmPassword) {
//       alert("Please fill all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     setStep(2);
//   };

//   const handleSignup = async () => {
//     // Validate Step 2 fields
//     if (!software || !hardware || !experience) {
//       alert("Please complete all fields in Step 2");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Create user in Supabase
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             name: name,
//           }
//         }
//       });

//       if (error) {
//         alert(error.message);
//         setLoading(false);
//         return;
//       }

//       const user = data.user;

//       if (!user) {
//         alert("User creation failed");
//         setLoading(false);
//         return;
//       }

//       // Insert profile data
//       const { error: profileError } = await supabase
//         .from("profiles")
//         .insert([
//           {
//             id: user.id,
//             name,
//             email,
//             software_background: software,
//             hardware_background: hardware,
//             experience_level: experience,
//           },
//         ]);

//       if (profileError) {
//         console.error("Profile Error:", profileError);
//         alert(profileError.message);
//         setLoading(false);
//         return;
//       }

//       // ✅ Save login state in localStorage
//       loginUser({
//         id: user.id,
//         name,
//         email,
//       });

//       console.log("✅ Signup successful! Data saved to Supabase.");

//       // ✅ Show success message
//       alert("Signup Successful! Redirecting to book...");

//       // ✅ Force redirect after small delay
//       setLoading(false);
      
//       // Use setTimeout to ensure state is saved
//       setTimeout(() => {
//         if (typeof window !== 'undefined') {
//           window.location.href = "/docs/intro";
//         }
//       }, 500);

//     } catch (err) {
//       console.error("Signup Error:", err);
//       alert(err?.message || "Signup failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 450, margin: "0 auto" }}>
//       <h2>RoboLearn SSO</h2>
//       <p>Secure Single Sign-On</p>

//       {/* ---------------- STEP 1 ---------------- */}
//       {step === 1 && (
//         <>
//           <h3>Create your account</h3>

//           <label>Name *</label>
//           <input
//             style={input}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <label>Email *</label>
//           <input
//             type="email"
//             style={input}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label>Password *</label>
//           <input
//             type="password"
//             style={input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <label>Confirm Password *</label>
//           <input
//             type="password"
//             style={input}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button style={btn} onClick={handleNext}>
//             Continue →
//           </button>
//         </>
//       )}

//       {/* ---------------- STEP 2 ---------------- */}
//       {step === 2 && (
//         <>
//           <h3>Tell us about yourself</h3>

//           <p><b>Software Background</b></p>
//           <select
//             style={input}
//             value={software}
//             onChange={(e) => setSoftware(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <p><b>Hardware & OS</b></p>
//           <select
//             style={input}
//             value={hardware}
//             onChange={(e) => setHardware(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Windows">Windows PC</option>
//             <option value="Mac">Mac</option>
//             <option value="Linux">Linux</option>
//             <option value="Chromebook">Chromebook / Web</option>
//           </select>

//           <p><b>Experience Level</b></p>
//           <select
//             style={input}
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <button style={btn} onClick={handleSignup} disabled={loading}>
//             {loading ? "Creating..." : "Create Account"}
//           </button>

//           <button style={backBtn} onClick={() => setStep(1)}>
//             ← Back
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// const input = {
//   width: "100%",
//   padding: 12,
//   marginBottom: 15,
//   fontSize: 16,
// };

// const btn = {
//   width: "100%",
//   padding: 12,
//   background: "black",
//   color: "white",
//   fontSize: 16,
//   cursor: "pointer",
// };

// const backBtn = {
//   width: "100%",
//   padding: 12,
//   marginTop: 10,
//   border: "1px solid #999",
//   background: "transparent",
//   cursor: "pointer",
// };


















import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { loginUser } from "../auth";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 fields
  const [software, setSoftware] = useState("");
  const [hardware, setHardware] = useState("");
  const [experience, setExperience] = useState("");

  const handleNext = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStep(2);
  };

  const handleSignup = async () => {
    if (!software || !hardware || !experience) {
      alert("Please complete all fields in Step 2");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name }
        }
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        alert("User creation failed");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            name,
            email,
            software_background: software,
            hardware_background: hardware,
            experience_level: experience,
          },
        ]);

      if (profileError) {
        console.error("Profile Error:", profileError);
        alert(profileError.message);
        setLoading(false);
        return;
      }

      loginUser({
        id: user.id,
        name,
        email,
      });

      console.log("✅ Signup successful! Data saved to Supabase.");
      alert("Signup Successful! Redirecting to book...");

      setLoading(false);
      
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = "/docs/intro";
        }
      }, 500);

    } catch (err) {
      console.error("Signup Error:", err);
      alert(err?.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Animated Background */}
      <div style={backgroundStyle}></div>
      
      <div style={cardStyle}>
        {/* Logo/Header */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={titleStyle}>
            Physical AI & <span style={{ color: "#ff6ec7" }}>Humanoid</span>
          </h1>
          <p style={subtitleStyle}>Create your RoboLearn account</p>
        </div>

        {/* Progress Indicator */}
        <div style={progressContainer}>
          <div style={{ ...progressStep, background: step >= 1 ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#444" }}>
            1
          </div>
          <div style={progressLine}></div>
          <div style={{ ...progressStep, background: step >= 2 ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#444" }}>
            2
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={formContainer}>
            <h3 style={stepTitle}>Account Details</h3>

            <div style={inputGroup}>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
              />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                style={inputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>

            <button style={primaryBtn} onClick={handleNext}>
              Continue to Profile →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={formContainer}>
            <h3 style={stepTitle}>Learning Profile</h3>

            <div style={inputGroup}>
              <label style={labelStyle}>Software Background</label>
              <select
                style={selectStyle}
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
              >
                <option value="">Select your level</option>
                <option value="Beginner">🌱 Beginner - Just starting</option>
                <option value="Intermediate">📚 Intermediate - Some experience</option>
                <option value="Advanced">🚀 Advanced - Experienced</option>
              </select>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Hardware & Operating System</label>
              <select
                style={selectStyle}
                value={hardware}
                onChange={(e) => setHardware(e.target.value)}
              >
                <option value="">Select your setup</option>
                <option value="Windows">🪟 Windows PC</option>
                <option value="Mac">🍎 Mac</option>
                <option value="Linux">🐧 Linux</option>
                <option value="Chromebook">☁️ Chromebook / Web</option>
              </select>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Experience Level</label>
              <select
                style={selectStyle}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select your experience</option>
                <option value="Beginner">🎓 New Student</option>
                <option value="Intermediate">💼 Some Experience</option>
                <option value="Advanced">⭐ Pro User</option>
              </select>
            </div>

            <button style={primaryBtn} onClick={handleSignup} disabled={loading}>
              {loading ? "Creating Account..." : "🚀 Start Learning"}
            </button>

            <button style={secondaryBtn} onClick={() => setStep(1)}>
              ← Back to Account Details
            </button>
          </div>
        )}

        {/* Footer */}
        <p style={footerText}>
          Already have an account? <a href="/login" style={linkStyle}>Sign In</a>
        </p>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 110, 199, 0.3), transparent 50%)",
  animation: "pulse 8s ease-in-out infinite",
};

const cardStyle = {
  width: "100%",
  maxWidth: "500px",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  padding: "40px",
  borderRadius: "24px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(102, 126, 234, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
  zIndex: 1,
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  background: "linear-gradient(135deg, #667eea 0%, #ff6ec7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "8px",
};

const subtitleStyle = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "16px",
};

const progressContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "30px",
};

const progressStep = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
};

const progressLine = {
  width: "60px",
  height: "3px",
  background: "rgba(255, 255, 255, 0.2)",
  margin: "0 10px",
};

const formContainer = {
  animation: "fadeIn 0.5s ease-in",
};

const stepTitle = {
  color: "white",
  fontSize: "22px",
  marginBottom: "25px",
  textAlign: "center",
};

const inputGroup = {
  marginBottom: "20px",
};

const labelStyle = {
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "14px",
  fontWeight: "500",
  display: "block",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "12px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "12px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  cursor: "pointer",
  boxSizing: "border-box",
};

const primaryBtn = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  marginTop: "10px",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
};

const secondaryBtn = {
  width: "100%",
  padding: "14px",
  background: "transparent",
  color: "rgba(255, 255, 255, 0.7)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "12px",
  transition: "all 0.3s ease",
};

const footerText = {
  textAlign: "center",
  color: "rgba(255, 255, 255, 0.6)",
  marginTop: "25px",
  fontSize: "14px",
};

const linkStyle = {
  color: "#ff6ec7",
  textDecoration: "none",
  fontWeight: "600",
};