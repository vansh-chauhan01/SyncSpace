import React from "react";
import "../app.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <div className="logoBadge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="14" height="12" rx="3" fill="white" />
              <path d="M17 10L22 7V17L17 14V10Z" fill="white" />
            </svg>
          </div>
          <h2>Sync Spase</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <Link to="/auth">
            <div className="loginBtn" role="button">
              <p>Login</p>
            </div>
          </Link>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="heroText">
          <div className="betaBadge">
            <span className="dot" /> NOW IN PUBLIC BETA
          </div>
          <h1
            style={{
              fontSize: "3.8rem",
              lineHeight: "1.1",
              fontWeight: "650",
            }}
          >
            <span style={{ color: "#4d7fff" }}>Video Calls</span> worth showing
            up for.
          </h1>
          <p>
            Sync Space provides seamless HD video and audio calling powered by{" "}
            <span style={{ color: "#4d7fff" }}>WebRTC</span>. Chat with
            participants in real time using{" "}
            <span style={{ color: "#4d7fff" }}>WebSockets</span> , and instantly
            toggle your microphone or camera during meetings.
          </p>
          <div className="heroButtons">
            <div role="button" className="primaryBtn">
              Get Started
            </div>
            <div role="button" className="secondaryBtn">
              Join as Guest
            </div>
          </div>
        </div>
        <div className="heroImageWrap">
          <img
            src="/laptopVid.avif"
            alt=""
            style={{
              width: "600px",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>

      <div className="featuresSection">
        <div className="featuresGrid">
          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="6" width="14" height="12" rx="2" />
                <path d="M17 10L22 7V17L17 14V10Z" />
              </svg>
            </div>
            <h3>Crystal-clear HD video</h3>
            <p>
              Adaptive bitrate streaming keeps calls sharp and smooth regardless
              of network conditions.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
              </svg>
            </div>
            <h3>End-to-end encryption</h3>
            <p>
              Every call is encrypted at rest and in transit. Zero-knowledge
              architecture means we cannot see your meetings.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <h3>Low-latency infrastructure</h3>
            <p>
              Distributed edge nodes on six continents keep your voice arriving
              as naturally as if you were in the room.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 010 20a15 15 0 010-20" />
              </svg>
            </div>
            <h3>Works everywhere</h3>
            <p>
              Browser-native. No downloads, no plugins. Join from a laptop,
              tablet, or phone in seconds.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0014 0M12 19v3" />
              </svg>
            </div>
            <h3>AI noise suppression</h3>
            <p>
              Background cafe, construction site, barking dog — our neural
              filter learns and removes ambient noise in real time.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="7" r="4" />
                <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M23 21v-2a4 4 0 00-3-3.87" />
              </svg>
            </div>
            <h3>Scales with your team</h3>
            <p>
              Host company all-hands, webinars, or intimate standups on the same
              platform with no tier switching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
