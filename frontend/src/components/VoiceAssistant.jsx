import React, { useState } from "react";
import axios from "axios";

const VoiceAssistant = () => {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("voiceLanguage") || "en-IN"
  );

  const speakAnswer = (message) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.lang =
      localStorage.getItem("voiceLanguage") || "en-IN";

    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  };

  const askAI = async (question) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          question,
        }
      );

      setAnswer(data.answer);

      speakAnswer(data.answer);
    } catch (err) {
      console.log(err);

      setAnswer("Unable to get AI response.");
    }

    setLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      localStorage.getItem("voiceLanguage") ||
      "en-IN";

    recognition.start();

    recognition.onresult = (event) => {
      const voiceText =
        event.results[0][0].transcript;

      setText(voiceText);

      askAI(voiceText);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
    };
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#14532d",
            fontSize: "32px",
          }}
        >
          🤖 AgroSphere AI Assistant
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px",
          }}
        >
          Ask farming questions using voice or text.
        </p>
      </div>

      <select
        value={selectedLanguage}
        onChange={(e) => {
          setSelectedLanguage(e.target.value);

          localStorage.setItem(
            "voiceLanguage",
            e.target.value
          );
        }}
        style={{
          width: "220px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          fontSize: "15px",
          marginBottom: "25px",
        }}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="mr-IN">Marathi</option>
        <option value="te-IN">Telugu</option>
        <option value="kn-IN">Kannada</option>
      </select>

      <br />

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your farming question..."
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "15px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          outline: "none",
          resize: "vertical",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => {
            if (question.trim() !== "") {
              setText(question);
              askAI(question);
            }
          }}
          style={{
            flex: 1,
            padding: "15px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          🤖 Ask AI
        </button>

        <button
          onClick={startListening}
          style={{
            flex: 1,
            padding: "15px",
            background: "#15803d",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          🎤 Start Speaking
        </button>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div
          style={{
            background: "#e8f5e9",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>👨 Farmer</h3>

          <p>{text || "No question yet."}</p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            padding: "18px",
            borderRadius: "12px",
            border: "1px solid #ddd",
          }}
        >
          <h3>🤖 AgroSphere AI</h3>

          {loading ? (
            <p>⏳ Thinking...</p>
          ) : (
            <p>{answer || "AI response will appear here."}</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => speakAnswer(answer)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#0b5d1e",
              color: "white",
              cursor: "pointer",
            }}
          >
            🔊 Listen Again
          </button>

          <button
            onClick={() =>
              navigator.clipboard.writeText(answer)
            }
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#1976d2",
              color: "white",
              cursor: "pointer",
            }}
          >
            📋 Copy
          </button>

          <button
            onClick={() => {
              setQuestion("");
              setText("");
              setAnswer("");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
            }}
          >
            🗑 Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;