import React, { useState } from "react";
import API from "../api";

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

      const { data } = await API.post(
        "/api/ai/chat",
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
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        border: "1px solid #e8ece8",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
          borderBottom: "2px solid #e8ece8",
          paddingBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#14532d",
            fontSize: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "36px" }}>🤖</span>
          AgroSphere AI Assistant
          <span style={{
            fontSize: "12px",
            background: "#f0fdf4",
            color: "#14532d",
            padding: "4px 12px",
            borderRadius: "20px",
            fontWeight: "500",
            border: "1px solid #bbf7d0"
          }}>
            Beta
          </span>
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px",
            marginBottom: 0,
            fontSize: "16px"
          }}
        >
          Ask farming questions using voice or text. Get instant AI-powered responses.
        </p>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "25px",
        flexWrap: "wrap"
      }}>
        <label style={{
          fontWeight: "600",
          color: "#14532d",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          🌐 Language
        </label>
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
            padding: "10px 16px",
            borderRadius: "10px",
            border: "2px solid #d1d5db",
            fontSize: "15px",
            background: "#fafbfc",
            outline: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
            minWidth: "180px"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#14532d";
            e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="en-IN">🇬🇧 English</option>
          <option value="hi-IN">🇮🇳 Hindi</option>
          <option value="mr-IN">🇮🇳 Marathi</option>
          <option value="te-IN">🇮🇳 Telugu</option>
          <option value="kn-IN">🇮🇳 Kannada</option>
        </select>
        <div style={{
          fontSize: "13px",
          color: "#6b7280",
          background: "#f3f4f6",
          padding: "4px 14px",
          borderRadius: "20px"
        }}>
          {selectedLanguage === "en-IN" && "🇬🇧 English"}
          {selectedLanguage === "hi-IN" && "🇮🇳 Hindi"}
          {selectedLanguage === "mr-IN" && "🇮🇳 Marathi"}
          {selectedLanguage === "te-IN" && "🇮🇳 Telugu"}
          {selectedLanguage === "kn-IN" && "🇮🇳 Kannada"}
        </div>
      </div>

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your farming question here... e.g., How to grow organic tomatoes?"
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "16px 18px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "2px solid #d1d5db",
          outline: "none",
          resize: "vertical",
          marginBottom: "20px",
          fontFamily: "inherit",
          transition: "all 0.3s ease",
          background: "#fafbfc",
          boxSizing: "border-box"
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#14532d";
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
          e.currentTarget.style.background = "white";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = "#fafbfc";
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap"
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
            padding: "16px 24px",
            background: "linear-gradient(135deg, #1976d2, #1565c0)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minWidth: "140px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(25, 118, 210, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(25, 118, 210, 0.3)";
          }}
        >
          🤖 Ask AI
        </button>

        <button
          onClick={startListening}
          style={{
            flex: 1,
            padding: "16px 24px",
            background: "linear-gradient(135deg, #15803d, #166534)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(21, 128, 61, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minWidth: "140px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(21, 128, 61, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(21, 128, 61, 0.3)";
          }}
        >
          🎤 Start Speaking
        </button>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid #bbf7d0"
          }}
        >
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#14532d",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            👨‍🌾 Farmer
          </h3>

          <p style={{
            margin: 0,
            color: "#1f2937",
            fontSize: "16px",
            lineHeight: "1.6",
            minHeight: "40px"
          }}>
            {text || "No question yet. Click the microphone to start speaking or type your question."}
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
            padding: "20px",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            minHeight: "100px"
          }}
        >
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#14532d",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            🤖 AgroSphere AI
            {loading && (
              <span style={{
                fontSize: "14px",
                color: "#6b7280",
                fontWeight: "400"
              }}>
                (Thinking...)
              </span>
            )}
          </h3>

          {loading ? (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "30px",
                height: "30px",
                border: "4px solid #e2e8f0",
                borderTop: "4px solid #14532d",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }}></div>
              <p style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "16px"
              }}>
                Generating response...
              </p>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          ) : (
            <p style={{
              margin: 0,
              color: "#1f2937",
              fontSize: "16px",
              lineHeight: "1.8",
              minHeight: "40px"
            }}>
              {answer || "AI response will appear here. Ask a question to get started!"}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => speakAnswer(answer)}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #0b5d1e, #14532d)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(11, 93, 30, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(11, 93, 30, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(11, 93, 30, 0.3)";
            }}
          >
            🔊 Listen Again
          </button>

          <button
            onClick={() =>
              navigator.clipboard.writeText(answer)
            }
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #1976d2, #1565c0)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(25, 118, 210, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(25, 118, 210, 0.3)";
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
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(239, 68, 68, 0.3)";
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