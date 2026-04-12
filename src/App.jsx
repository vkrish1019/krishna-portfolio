import { useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    let animationFrameId;

    function init() {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.ceil(window.innerWidth);
      const height = Math.ceil(window.innerHeight);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function animate() {
      const width = Math.ceil(window.innerWidth);
      const height = Math.ceil(window.innerHeight);

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      gradient.addColorStop(0, "rgba(99,102,241,0.25)");
      gradient.addColorStop(0.5, "rgba(139,92,246,0.15)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    function handleResize() {
      init();
    }

    init();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas}></canvas>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* HERO */}
      <section style={styles.heroSection}>
        <img src="/profile.png" style={styles.heroImage} />
        <div>
          <h1 style={styles.title}>Jai Krishna V</h1>
          <p style={styles.subtitle}>
            PMO | Creative Professional | Content Creator
          </p>
          <p style={styles.heroTagline}>
            Helping brands grow through creative design and structured execution.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <h2 style={styles.heading}>About Me</h2>

        <p style={styles.text}>
          I am a PMO professional specializing in execution, coordination, and delivering structured outcomes across projects.
        </p>

        <p style={styles.text}>
          Alongside my core role, I work on photo editing, video editing, digital creatives, and branding visuals.
        </p>

        <p style={styles.text}>
          I focus on combining creativity with strategy to create engaging and impactful content.
        </p>

        <p style={styles.text}>
          I have contributed to projects including logo animation for Mocavo Coffee.
        </p>

        <p style={styles.text}>
          I am also interested in customer email support, ensuring clear communication and professional handling of client interactions.
        </p>
      </Section>

      {/* CLIENTS */}
      <Section>
        <h2 style={styles.heading}>Clients</h2>
        <div style={styles.logoCenter}>
          <img src="/mocavo.jpeg" style={styles.logo} />
        </div>
      </Section>

      {/* WORK */}
      <Section id="work">
        <h2 style={styles.heading}>Featured Work</h2>

        <p style={styles.projectDesc}>
          Objective: Create a clean and modern logo animation for Mocavo Coffee.
        </p>

        <p style={styles.projectDesc}>
          Role: Concept development, animation, and final delivery.
        </p>

        <p style={styles.projectDesc}>
          Outcome: Delivered a smooth, engaging brand animation suitable for digital platforms.
        </p>

        <video src="/Client%20video.mp4" controls style={styles.video} />
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <h2 style={styles.heading}>Connect With Me</h2>

        <a href="mailto:jaikrishnavasu@gmail.com" style={styles.link}>
          📧 Email Me
        </a>

        <a
          href="https://instagram.com/wander_._soul_"
          target="_blank"
          style={styles.link}
        >
          📸 Instagram
        </a>
      </Section>
    </div>
  );
}

/* SECTION */
function Section({ children, id }) {
  return (
    <section id={id} style={styles.section} className="fade-in">
      {children}
    </section>
  );
}

/* STYLES */
const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
    width: "100%",
    overflowX: "hidden",
    background: "#020617",
  },

  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    display: "block",
  },

  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "15px",
    background: "rgba(2,6,23,0.6)",
    backdropFilter: "blur(10px)",
    zIndex: 10,
  },

  heroSection: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    minHeight: "100vh",
    paddingLeft: "10%",
  },

  heroImage: {
    width: "180px",
  },

  title: {
    fontSize: "3rem",
    color: "#ffffff",
  },

  subtitle: {
    color: "#cbd5f5",
  },

  heroTagline: {
    marginTop: "10px",
    color: "#94a3b8",
    maxWidth: "400px",
  },

  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  heading: {
    color: "#cbd5f5",
    marginBottom: "15px",
  },

  text: {
    maxWidth: "600px",
    color: "#e2e8f0",
  },

  projectDesc: {
    color: "#94a3b8",
    fontSize: "14px",
    maxWidth: "500px",
  },

  video: {
    width: "300px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  link: {
    color: "#cbd5f5",
    textDecoration: "none",
    marginTop: "10px",
  },

  logoCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },

  logo: {
    width: "120px",
  },
};