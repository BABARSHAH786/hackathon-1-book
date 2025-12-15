// login protection for docs pages working code

// import React, { useEffect } from "react";
// import Layout from "@theme-original/Layout";
// import { isLoggedIn } from "../../auth";

// export default function ProtectedLayout(props) {
//   useEffect(() => {
//     const path = window.location.pathname;

//     // Protect all DOCS routes
//     if (path.startsWith("/docs") && !isLoggedIn()) {
//       window.location.href = "/login";
//     }
//   }, []);

//   return <Layout {...props} />;
// }




// import React, { useEffect } from "react";
// import Layout from "@theme-original/Layout";
// import { isLoggedIn } from "../../auth";

// export default function ProtectedLayout(props) {
//   useEffect(() => {
//     const path = window.location.pathname;

//     // Protect all DOCS routes
//     if (path.startsWith("/docs") && !isLoggedIn()) {
//       window.location.href = "/signup";
//     }
//   }, []);

//   return <Layout {...props} />;
// }







// import React, { useEffect } from "react";
// import Layout from "@theme-original/Layout";
// import GeminiChatbot from "../../components/GeminiChatbot";
// import { isLoggedIn } from "../../auth";

// export default function ProtectedLayout({ children, ...props }) {

//   // RUN AFTER PAGE LOAD
//   useEffect(() => {
//     const path = window.location.pathname;

//     // Protect all DOCS pages
//     if (path.startsWith("/docs") && !isLoggedIn()) {
//       console.log("User not logged in → redirecting...");
//       window.location.href = "/login";
//     }
//   }, []);

//   return (
//     <>
//       {/* KEEP ORIGINAL DOCUSAURUS LAYOUT SAFE */}
//       <Layout {...props}>
//         {children}
//       </Layout>

//       {/* Chatbot ALWAYS visible */}
//       <GeminiChatbot />
//     </>
//   );
// }






// import React, { useEffect } from "react";
// import Layout from "@theme-original/Layout";
// import { isLoggedIn } from "../../auth";

// export default function ProtectedLayout(props) {
//   useEffect(() => {
//     const path = window.location.pathname;

//     // ❗ If NOT logged in → redirect EVERYTHING to signup
//     if (!isLoggedIn()) {
//       // Allow only /signup page to open
//       if (!path.startsWith("/signup")) {
//         window.location.href = "/signup";
//       }
//     }

//   }, []);

//   return <Layout {...props} />;
// }





import React, { useEffect } from "react";
import Layout from "@theme-original/Layout";
import { isLoggedIn } from "../../auth";

export default function ProtectedLayout(props) {
  useEffect(() => {
    const path = window.location.pathname;

    // Block entire docs section
    if (path.startsWith("/docs") && !isLoggedIn()) {
      window.location.href = "/signup";
    }
  }, []);

  return  <Layout {...props} />
 
  
}

