export default function PostCard({ username, text }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        backgroundColor: "#fff"
      }}
    >
      <strong>{username}</strong>
      <p>{text}</p>
    </div>
  );
}