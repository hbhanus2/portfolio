import { PropsWithChildren, useState, useEffect } from "react";
import "./styles/Landing.css";

const greetings = [
  { hello: "Hello! I'm", first: "HARSH", last: "BHANUSHALI" }, // English
  { hello: "¡Hola! Soy", first: "HARSH", last: "BHANUSHALI" }, // Spanish
  { hello: "Bonjour! Je suis", first: "HARSH", last: "BHANUSHALI" }, // French
  { hello: "नमस्ते! मैं हूँ", first: "हर्ष", last: "भानुशाली" }, // Hindi
  { hello: "こんにちは！私は", first: "ハルシュ", last: "バヌシャリ" }, // Japanese
  { hello: "你好！我是", first: "哈什", last: "巴努沙利" }, // Chinese (Mandarin)
  { hello: "Hallo! Ich bin", first: "HARSH", last: "BHANUSHALI" }, // German
];

const Landing = ({ children }: PropsWithChildren) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2 key={`hello-${index}`}>{greetings[index].hello}</h2>
            <h1 key={index}>
              {greetings[index].first}
              <br />
              <span>{greetings[index].last}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Full Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software</div>
              <div className="landing-h2-2" style={{ display: 'none' }}>Software</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1" style={{ display: 'none' }}>Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
