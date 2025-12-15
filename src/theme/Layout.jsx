// src/theme/Layout.jsx   ← file name exactly aisa hi hona chahiye

import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import GeminiChatbot from '@site/src/components/GeminiChatbot';

export default function Layout(props) {
  return (
    <OriginalLayout {...props}>
      {props.children}
      {/* <GeminiChatbot /> */}
    </OriginalLayout>
  );
}

// new
// import React from "react";
// import OriginalLayout from "@theme-original/Layout";
// import GeminiChatbot from "@site/src/components/GeminiChatbot";

// export default function Layout(props) {
//   return (
//     <>
//       <OriginalLayout {...props} />
//       <GeminiChatbot />   {/* This renders on ALL pages */}
//     </>
//   );
// }
