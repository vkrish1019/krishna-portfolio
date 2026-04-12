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

      {/* HERO */}
      <section style={styles.heroSection}>
        <img src="/profile.png" style={styles.heroImage} />
        <div>
          <h1 style={styles.title}>Jai Krishna V</h1>
          <p style={styles.subtitle}>
            PMO | Creative Professional | Content Creator
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <Section>
        <h2 style={styles.heading}>About Me</h2>
        <p style={styles.text}>
          I am a PMO professional focused on execution, coordination, and delivering structured outcomes.
        </p>
        <p style={styles.text}>
          Skilled in photo editing, video editing, digital creative design and Customer support. 
        </p>
        <p style={styles.text}>
          Passionate about creating engaging visuals and improving user experiences.
        </p>
        <p style={styles.text}>
          I enjoy combining creativity with technology to build impactful content.
        </p>
        <p style={styles.text}>
          I have worked on logo animation projects including Mocavo Coffee.
        </p>
        <p style={styles.text}>
          Interested in handling customer email support with a professional approach.
        </p>
      </Section>

      {/* CLIENTS */}
      <Section>
        <h2 style={styles.heading}>Clients</h2>

        <div style={styles.logoCenter}>
          <img src="/mocavo.jpeg" style={styles.logo} />
        </div>

        <p style={styles.text}>
          Worked on branding and logo animation projects including Mocavo Coffee and other creative assignments.
        </p>
      </Section>

      {/* FEATURED */}
      <Section>
        <h2 style={styles.heading}>Featured Work</h2>

        <div style={styles.videoColumn}>
          <div>
            <p style={styles.smallHeading}>Mocavo Coffee Logo Animation</p>
            <video src="/Client%20video.mp4" controls style={styles.video} />
          </div>

          <video src="/video2.mp4" controls style={styles.video} />
        </div>

        <div style={styles.beforeAfter}>
          <div>
            <p style={styles.smallHeading}>Before</p>
            <img src="/before1.jpeg" style={styles.media} />
          </div>
          <div>
            <p style={styles.smallHeading}>After</p>
            <img src="/after1.jpeg" style={styles.media} />
          </div>
        </div>
      </Section>

      {/* AVAILABILITY */}
      <Section>
        <h2 style={styles.heading}>Availability</h2>
        <p style={styles.text}>
          Available on weekdays after 7 PM IST and weekends (flexible).
          Available on all weekends.
        </p>
      </Section>

      {/* CONNECT */}
      <Section>
        <h2 style={styles.heading}>Connect With Me</h2>
        <p style={styles.text}>📧 jaikrishnavasu@gmail.com</p>
        <p style={styles.text}>📸 Instagram: wander_._soul_</p>
      </Section>
    </div>
  );
}

/* SECTION */
function Section({ children }) {
  return <section style={styles.section}>{children}</section>;
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

  smallHeading: {
    color: "#cbd5f5",
  },

  text: {
    maxWidth: "600px",
    color: "#e2e8f0",
  },

  videoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    marginTop: "20px",
  },

  video: {
    width: "300px",
    borderRadius: "10px",
  },

  beforeAfter: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  media: {
    width: "170px",
    borderRadius: "10px",
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