// import React, { useState } from "react";
// import { useHistory } from "@docusaurus/router";

// export default function Login() {
//   const history = useHistory();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     alert("Login Successful");

//     history.push("/docs/intro"); // redirect to docs
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Login</h1>

//       <form onSubmit={submitHandler} style={{ maxWidth: "400px" }}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           style={inputStyle}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           style={inputStyle}
//         />

//         <button type="submit" style={btnStyle}>Login</button>
//       </form>

//       <p>
//         Don't have an account? <a href="/signup">Signup</a>
//       </p>
//     </div>
//   );
// }

// const inputStyle = {
//   display: "block",
//   width: "100%",
//   padding: "12px",
//   marginBottom: "12px",
//   fontSize: "16px",
// };

// const btnStyle = {
//   padding: "12px 20px",
//   width: "100%",
//   fontSize: "16px",
//   cursor: "pointer",
// };






// working with ui 

// import React, { useState } from "react";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       alert("Please enter email and password");
//       return;
//     }
//  localStorage.setItem("userLoggedIn", "true");
//     // Later you can add Supabase login here

//     alert("Login successful!");
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
//       <form
//         onSubmit={handleLogin}
//         style={{
//           width: "100%",
//           maxWidth: "420px",
//           background: "rgba(255,255,255,0.12)",
//           backdropFilter: "blur(12px)",
//           padding: "35px",
//           borderRadius: "20px",
//           boxShadow: "0 0 40px rgba(0,0,0,0.4)",
//           color: "white",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome Back</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email address"
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         <button type="submit" style={btnStyle}>
//           Login
//         </button>

//         <p style={{ textAlign: "center", marginTop: "15px" }}>
//           Don’t have an account?{" "}
//           <a href="/signup" style={{ color: "#8ac7ff" }}>
//             Signup
//           </a>
//         </p>
//       </form>
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
// import { login } from "../auth"; // <<--- IMPORTANT

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
  

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       alert("Please enter email and password");
//       return;
//     }

//     // Save login status
//     login();

//     alert("Login successful!");

//     // Redirect to docs page
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
//       <form
//         onSubmit={handleLogin}
//         style={{
//           width: "100%",
//           maxWidth: "420px",
//           background: "rgba(255,255,255,0.12)",
//           backdropFilter: "blur(12px)",
//           padding: "35px",
//           borderRadius: "20px",
//           boxShadow: "0 0 40px rgba(0,0,0,0.4)",
//           color: "white",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           Welcome Back
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email address"
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         <button type="submit" style={btnStyle}>
//           Login
//         </button>

//         <p style={{ textAlign: "center", marginTop: "15px" }}>
//           Don’t have an account?{" "}
//           <a href="/signup" style={{ color: "#8ac7ff" }}>
//             Signup
//           </a>
//         </p>
//       </form>
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





import React, { useState } from "react";
import { login } from "../auth"; // IMPORTANT

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    // Save login status
    login();

    alert("Login successful!");

    // Redirect to docs
    window.location.href = "/docs/intro";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0044, #4b0082)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={btnStyle}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#8ac7ff" }}>
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #6a00ff, #009dff)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};
