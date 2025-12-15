// import Layout from '@theme-original/Layout';
// import GeminiChatbot from '../../components/GeminiChatbot';


// export default function LayoutWrapper(props) {
//   return  <Layout {...props} />

  
// }


// import React from 'react';
// import Layout from '@theme-original/Layout';
// import GeminiChatbot from '../../components/GeminiChatbot';

// Import your Chatbot component

// export default function LayoutWrapper(props) {
//   return (
//     <>
//       <Layout {...props}>
//         {props.children}
//       </Layout>
//       {/* The Chatbot component will appear outside the main Layout 
//         content but inside the root structure, making it visible on all pages.
//       */}
//       <GeminiChatbot /> 
//     </>
//   );
// }

// //new
import React from 'react';
import Layout from '@theme-original/Layout';
import GeminiChatbot from '../../components/GeminiChatbot';
import { isLoggedIn } from "../../auth";
import { useEffect } from 'react';

export default function ProtectedLayout(props) {
    useEffect(() => {
    const path = window.location.pathname;

    // Block entire docs section
    if (path.startsWith("/docs") && !isLoggedIn()) {
      window.location.href = "/signup";
    }
  }, []);
  return (
    <>
      <Layout {...props}>
        {props.children}
      </Layout>
      {/* The Chatbot component will appear outside the main Layout 
        content but inside the root structure, making it visible on all pages.
      */}
      <GeminiChatbot /> 
    </>
  );
}




// import React from 'react';
// import Layout from '@theme-original/Layout';
// import GeminiChatbot from '../../components/GeminiChatbot';
// import { isLoggedIn } from "../../auth";

// export default function ProtectedLayout(props) {
  // useEffect(() => {
  //   const path = window.location.pathname;

  //   // Block entire docs section
  //   if (path.startsWith("/docs") && !isLoggedIn()) {
  //     window.location.href = "/signup";
  //   }
  // }, []);

//   return  <Layout {...props} />
 
  
// }