import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];
    const shootingStars = [];

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    // ⭐ stars
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
      });
    }

    // 💫 shooting stars
    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 2 + 1.5, // ✅ slower
      });
    }

    setInterval(createShootingStar, 4000); // ✅ less frequent

    function animate() {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🌌 nebula glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        700
      );
      gradient.addColorStop(0, "rgba(99,102,241,0.2)");
      gradient.addColorStop(1, "rgba(168,85,247,0.15)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ⭐ stars (cursor interaction)
      stars.forEach((s) => {
        const dx = mouse.current.x - s.x;
        const dy = mouse.current.y - s.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          s.x -= dx * 0.01;
          s.y -= dy * 0.01;
        }

        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 💫 shooting stars
      shootingStars.forEach((s, index) => {
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length);
        ctx.stroke();

        s.x -= s.speed;
        s.y += s.speed;

        if (s.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas}></canvas>

      {/* HERO */}
      <Section>
        <h1 style={styles.title}>Jai Krishna V</h1>
        <p style={styles.subtitle}>
          Creative IT Professional | PMO | Content Creator
        </p>
        <p style={styles.tagline}>
          Bridging execution with creativity
        </p>
      </Section>

      {/* ABOUT */}
      <Section>
        <h2 style={styles.heading}>About Me</h2>

        <p style={styles.text}>
          I’m Jai Krishna V, a detail-oriented IT professional working as a PMO,
          with a strong passion for creativity, storytelling, and digital experiences.
        </p>

        <p style={styles.text}>
          With a balance of structure and creativity, I specialize in managing workflows,
          organizing ideas, and delivering meaningful outcomes. Beyond my professional role,
          I actively create content—capturing travel moments, food experiences, and visual stories that reflect my perspective.
        </p>

        <p style={styles.text}>
          I enjoy blending strategy with creativity, whether it’s designing presentations,
          building engaging digital experiences, or crafting stories that connect with people.
          I’m also exploring personal ventures, including content creation, storytelling, and building digital products.
        </p>

        <p style={styles.text}>
          I believe in continuous growth, learning, and turning ideas into impactful experiences.
        </p>
      </Section>

      {/* EXPERIENCE */}
      <Section>
        <h2 style={styles.heading}>Experience</h2>
        <p style={styles.text}>
          Managing project execution, stakeholder communication, and ensuring delivery across teams.
        </p>
      </Section>

      {/* WORK */}
      <Section>
        <h2 style={styles.heading}>Featured Work</h2>

        <div style={styles.videoGrid}>
          <video src="/video1.mp4" controls style={styles.video} />
          <video src="/video2.mp4" controls style={styles.video} />
        </div>
      </Section>

      {/* PHOTO */}
      <Section>
        <h2 style={styles.heading}>Photo Editing</h2>

        <div style={styles.beforeAfter}>
          <div>
            <p style={styles.label}>Before</p>
            <img src="/before1.jpeg" style={styles.media} />
          </div>

          <div>
            <p style={styles.label}>After</p>
            <img src="/after1.jpeg" style={styles.media} />
          </div>
        </div>
      </Section>
    </div>
  );
}

/* SECTION */
function Section({ children }) {
  return (
    <section style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={styles.inner}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* STYLES */
const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    background: "#020617",
    color: "#ffffff",
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    height: "100vh",
  },

  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  },

  section: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    scrollSnapAlign: "start",
    position: "relative",
    zIndex: 1,
    padding: "80px 20px",
  },

  inner: {
    maxWidth: "800px",
    textAlign: "center",
  },

  title: {
    fontSize: "clamp(3rem, 6vw, 5rem)",
    fontWeight: "700",
    color: "#ffffff",
  },

  subtitle: {
    color: "#e2e8f0",
  },

  tagline: {
    color: "#cbd5f5",
  },

  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#f8fafc",
  },

  text: {
    color: "#e2e8f0",
    lineHeight: "1.8",
    marginBottom: "20px",
  },

  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "40px",
  },

  video: {
    width: "100%",
    height: "350px",
    borderRadius: "15px",
  },

  beforeAfter: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  media: {
    width: "300px",
    height: "250px",
    borderRadius: "10px",
  },

  label: {
    color: "#e2e8f0",
    marginBottom: "10px",
  },
};