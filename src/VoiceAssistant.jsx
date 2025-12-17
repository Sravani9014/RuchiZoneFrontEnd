// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// const VoiceAssistant = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [listening, setListening] = useState(false);

//   if (!SpeechRecognition) {
//     return null; // browser not supported
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = "en-IN";
//   recognition.interimResults = false;
//   recognition.continuous = false;

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-IN";
//     window.speechSynthesis.speak(utterance);
//   };

//   const handleCommand = (command) => {
//     const text = command.toLowerCase();
//     console.log("VOICE:", text);

//     if (text.includes("veg")) {
//       speak("Open veg ");
//       navigate("/veg");
//     } else if (text.includes("non veg")) {
//       speak("Opening non veg page");
//       navigate("/nonveg");
//     } else if (text.includes("drinks")) {
//       speak("Opening drinks page");
//       navigate("/drinks");
//     } else if (text.includes("ice")) {
//       speak("Opening ice creams");
//       navigate("/icecreams");
//     } else if (text.includes("cart")) {
//       speak("Opening cart");
//       navigate("/cart");
//     } else if (text.includes("orders")) {
//       speak("Opening orders");
//       navigate("/orders");
//     } else if (text.includes("home")) {
//       speak("Going to home");
//       navigate("/");
//     } else if (text.includes("contact")) {
//       speak("Opening contact page");
//       navigate("/contact");
//     } else if (text.includes("about")) {
//       speak("Opening about page");
//       navigate("/about");
//     } else {
//       speak("Sorry, I did not understand");
//     }
//   };

//   const startListening = () => {
//     setListening(true);
//     setMessage("🎤 Listening...");
//     //speak("May I know how can I assist you?");

//     recognition.start();

//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript;
//       setMessage(`You said: "${spokenText}"`);
//       handleCommand(spokenText);
//       setListening(false);
//     };

//     recognition.onerror = () => {
//       setMessage("Voice recognition error");
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <button
//         onClick={startListening}
//         title="Voice Assistant"
//         style={{
//           width: "42px",
//           height: "42px",
//           borderRadius: "50%",
//           border: "none",
//           fontSize: "20px",
//           cursor: "pointer",
//           background: listening ? "#ffcc00" : "white",
//         }}
//       >
//         🤖
//       </button>

//       {message && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50px",
//             right: "0",
//             background: "white",
//             padding: "6px 10px",
//             borderRadius: "8px",
//             fontSize: "13px",
//             width: "220px",
//             boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceAssistant;


import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const lastCommandRef = useRef(""); // ✅ ADD THIS

  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  if (!SpeechRecognition) return null;

  // ✅ CREATE RECOGNITION ONLY ONCE
  if (!recognitionRef.current) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const lastIndex = event.results.length - 1;
      const spokenText = event.results[lastIndex][0].transcript
        .toLowerCase()
        .trim();

      // ❌ Ignore same command repeating
      if (spokenText === lastCommandRef.current) return;

      lastCommandRef.current = spokenText; // ✅ store last command

      setMessage(`You said: "${spokenText}"`);
      handleCommand(spokenText);

      // ✅ Allow same command again after 2 sec
      setTimeout(() => {
        lastCommandRef.current = "";
      }, 2000);
    };

    recognition.onerror = () => {
      setMessage("Voice recognition error");
    };

    recognition.onend = () => {
      if (listening) recognition.start(); // 🔁 auto restart
    };

    recognitionRef.current = recognition;
  }

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (command) => {
    if (command.includes("veg")) {
      speak("Open veg");
      navigate("/veg");
    } else if (command.includes("non veg")) {
      speak("non-veg");
      navigate("/nonveg");
    } else if (command.includes("drinks")) {
      speak("drinks");
      navigate("/drinks");
    } else if (command.includes("ice")) {
      speak("Opening ice creams");
      navigate("/icecreams");
    } else if (command.includes("cart")) {
      speak("cart");
      navigate("/cart");
    } else if (command.includes("orders")) {
      speak("orders");
      navigate("/orders");
    } else if (command.includes("home")) {
      speak("home");
      navigate("/");
    } else if (command.includes("contact")) {
      speak("Opening contact");
      navigate("/contact");
    } else if (command.includes("about")) {
      speak("Opening about");
      navigate("/about");
    }
  };

  const startListening = () => {
    setListening(true);
    setMessage("🎤 Listening...");
    recognitionRef.current.start();
  };

  const stopListening = () => {
    setListening(false);
    recognitionRef.current.stop();
    setMessage("🛑 Stopped listening");
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={listening ? stopListening : startListening}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          background: listening ? "#ffcc00" : "white",
        }}
      >
        {listening ? "🛑" : "🤖"}
      </button>

      {message && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            background: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "13px",
            width: "220px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
