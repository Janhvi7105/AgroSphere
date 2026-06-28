import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    setPasswordError("");

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("SUCCESS RESPONSE:", response.data);

      alert(response.data.message || "User Registered Successfully");

      navigate("/farmer-dashboard");
    } catch (error) {
      console.log("ERROR RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },

    decorativeCircle1: {
      position: "absolute",
      top: "-100px",
      right: "-100px",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
    },

    decorativeCircle2: {
      position: "absolute",
      bottom: "-150px",
      left: "-100px",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
    },

    card: {
      width: "100%",
      maxWidth: isMobile ? "350px" : "450px",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      padding: isMobile ? "30px 25px" : "45px 40px",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      border: "1px solid rgba(255,255,255,0.2)",
      position: "relative",
      zIndex: 1,
    },

    logo: {
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "48px",
    },

    title: {
      textAlign: "center",
      color: "#1a3c1f",
      marginBottom: "8px",
      fontSize: isMobile ? "28px" : "34px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
    },

    subtitle: {
      textAlign: "center",
      color: "#6b7280",
      marginBottom: "30px",
      fontSize: "15px",
      fontWeight: "400",
    },

    inputGroup: {
      marginBottom: "20px",
      position: "relative",
    },

    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#1f2937",
      fontSize: "14px",
    },

    input: {
      width: "100%",
      padding: "14px 16px",
      border: "2px solid #e5e7eb",
      borderRadius: "10px",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      backgroundColor: "#f9fafb",
      fontFamily: "inherit",
    },

    passwordWrapper: {
      position: "relative",
    },

    passwordToggle: {
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      color: "#6b7280",
      padding: "4px",
    },

    errorMessage: {
      color: "#dc2626",
      fontSize: "13px",
      marginTop: "5px",
      display: "block",
    },

    button: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #2e7d32, #388e3c)",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(46, 125, 50, 0.3)",
      marginTop: "10px",
      position: "relative",
      overflow: "hidden",
    },

    buttonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
    },

    loginText: {
      textAlign: "center",
      marginTop: "25px",
      fontSize: "15px",
      color: "#6b7280",
    },

    loginLink: {
      color: "#2e7d32",
      cursor: "pointer",
      fontWeight: "700",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },

    divider: {
      display: "flex",
      alignItems: "center",
      margin: "25px 0",
      gap: "15px",
    },

    dividerLine: {
      flex: 1,
      height: "1px",
      background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
    },

    dividerText: {
      color: "#9ca3af",
      fontSize: "13px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    },

    backButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      background: "none",
      border: "none",
      color: "#6b7280",
      cursor: "pointer",
      fontSize: "14px",
      transition: "color 0.3s ease",
      marginTop: "15px",
      width: "100%",
    },

    loadingSpinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255,255,255,0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      verticalAlign: "middle",
      marginRight: "10px",
    },

    passwordStrength: {
      marginTop: "8px",
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },

    strengthBar: {
      flex: 1,
      height: "4px",
      borderRadius: "2px",
      background: "#e5e7eb",
      overflow: "hidden",
    },

    strengthFill: {
      height: "100%",
      borderRadius: "2px",
      transition: "width 0.3s ease",
    },
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { width: "0%", color: "#e5e7eb", label: "" };
    if (password.length < 6) return { width: "33%", color: "#dc2626", label: "Weak" };
    if (password.length < 10) return { width: "66%", color: "#f59e0b", label: "Medium" };
    return { width: "100%", color: "#2e7d32", label: "Strong" };
  };

  const strength = getPasswordStrength();

  return (
    <div style={styles.page}>
      <div style={styles.decorativeCircle1} />
      <div style={styles.decorativeCircle2} />

      <div style={styles.card}>
        <div style={styles.logo}>🌾</div>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join AgroSphere and start your farming journey</p>

        <form onSubmit={registerUser}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2e7d32";
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2e7d32";
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {password.length > 0 && (
              <div style={styles.passwordStrength}>
                <span style={{ fontSize: "12px", color: "#6b7280", minWidth: "50px" }}>
                  {strength.label}
                </span>
                <div style={styles.strengthBar}>
                  <div
                    style={{
                      ...styles.strengthFill,
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {passwordError && (
            <span style={styles.errorMessage}>{passwordError}</span>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled),
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <span style={styles.loadingSpinner} />
                Creating Account...
              </>
            ) : (
              "🚀 Create Account"
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            style={styles.loginLink}
            onClick={() => navigate("/login")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1a3c1f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#2e7d32";
            }}
          >
            Sign In
          </span>
        </p>

        <button
          style={styles.backButton}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1a3c1f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          ← Back to Home
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;