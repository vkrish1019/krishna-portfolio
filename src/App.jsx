import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";

function Scene() {
  const particles = new Float32Array(5000 * 3);

  for (let i = 0; i < 5000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <Points positions={particles} stride={3}>
        <PointMaterial size={0.02} color="white" />
      </Points>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.1} />
    </>
  );
}

export default function App() {
  return (
    <div
      style={{
        height: "270vh",
        background: "linear-gradient(to bottom, #0f0f0f, #1a1a1a)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 3D Intro */}
      <div style={{ position: "fixed", width: "100%", height: "100vh" }}>
        <h1
          style={{
            position: "absolute",
            top: "40%",
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            lineHeight: "1.6",
            letterSpacing: "1px",
          }}
        >
          Jai Krishna V <br />
          PMO | Visual Storyteller | Photo Editor <br />
          Bridging execution with creativity
        </h1>

        <Canvas>
          <Scene />
        </Canvas>
      </div>

      {/* Portfolio Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          position: "relative",
          top: "100vh",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          color: "#111",
          padding: "80px 15px",
          borderRadius: "20px",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "60px",
          }}
        >
          My Work
        </h2>

        {/* Videos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            marginBottom: "80px",
            justifyContent: "center",
          }}
        >
          <video
            src="/video1.mp4"
            controls
            style={cardStyle}
          />
          <video
            src="/video2.mp4"
            controls
            style={cardStyle}
          />
        </div>

        {/* Photo Editing */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          Photo Editing
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            justifyItems: "center",
            marginBottom: "80px",
          }}
        >
          <ImageCard label="Before" src="/before1.jpeg" />
          <ImageCard label="After" src="/after1.jpeg" />
        </div>

        {/* Professional */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "700px",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "30px", marginBottom: "15px" }}>
            Professional Experience
          </h2>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Managing project execution, stakeholder communication, and ensuring
            delivery across teams with structured planning and reporting.
            Combining execution with creativity.
          </p>
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h3>Let’s Work Together</h3>
          <p>Open to collaborations & projects</p>
        </div>
      </motion.div>
    </div>
  );
}

/* 🔥 Reusable Styles */

const cardStyle = {
  width: "100%",
  borderRadius: "15px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  transition: "0.4s",
};

function ImageCard({ label, src }) {
  return (
    <div>
      <p style={{ textAlign: "center" }}>{label}</p>
      <img src={src} style={cardStyle} />
    </div>
  );
}