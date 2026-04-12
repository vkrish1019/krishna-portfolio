import { useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    let animationFrameId;

    function init() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2,
        speed: Math.random() * 0.4 + 0.1,
        depth: Math.random() * 2 + 0.5,
      }));
    }

    function animate() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.y += s.speed * s.depth;

        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.depth, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    }

    init();
    animate();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="container">
      <canvas ref={canvasRef} className="canvas"></canvas>
      <div ref={cursorRef} className="cursor-glow"></div>

      {/* NAV */}
      <nav className="nav glass">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* HERO */}
      <section id="home" className="section hero">
        <div className="glass card">
          <img src="/profile.png" alt="profile" className="profile" />
          <h1>Jai Krishna V</h1>
          <p className="subtitle">
            PMO | Creative Professional | Content Creator
          </p>
          <p className="tagline">
            Helping brands grow through creative design & structured execution
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="glass card">
          <h2>About Me</h2>
          <p>
            With a foundation in IT and experience as a PMO, I specialize in bringing structure to complexity and ensuring seamless execution of ideas. My approach is rooted in clarity, efficiency, and attention to detail.

I have also delivered my first creative project in AI—developing an animated logo for Mocavo Coffee—marking my entry into AI-driven design and digital creation.

Beyond my core role, I am deeply interested in digital creation—ranging from cinematic portfolios to engaging content and innovative business ideas. I am open to opportunities in AI-based work, flyer and poster design, advertisement creation, and customer support, where I can combine creativity with practical execution.

I continuously strive to learn, adapt, and create work that stands out in both form and function.
          </p>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section">
        <div className="glass card">
          <h2>We Worked with </h2>
          <video src="/Client%20video.mp4" controls></video>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="glass card">
          <h2>Connect</h2>
          <a href="mailto:jaikrishnavasu@gmail.com">📧 Email</a>
          <a
            href="https://instagram.com/wander_._soul_"
            target="_blank"
            rel="noreferrer"
          >
            📸 Instagram
          </a>
        </div>
      </section>
    </div>
  );
}