// src/components/WaveBackground.tsx

export default function WaveBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)",
        opacity: 0.1,
        zIndex: -1,
      }}
    />
  );
}
