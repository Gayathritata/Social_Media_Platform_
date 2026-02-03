import AppLayout from "../../Components/global/AppLayout";
import bgVideo from "../../assets/explore-bg.mp4";
import "./Explore.css";

// Dummy data (replace later with API data)
const trendingPosts = [
  { id: 1, title: "React Hooks Best Practices" },
  { id: 2, title: "Building Scalable MERN Apps" },
  { id: 3, title: "Frontend Performance Tips" },
];

const people = [
  { id: 1, name: "Mubeena", role: "Frontend Developer" },
  { id: 2, name: "Sravani", role: "Backend Engineer" },
  { id: 3, name: "Gayathri", role: "UI/UX Designer" },
];

export default function Explore() {
  return (
    <AppLayout>
      <div className="explore-page">

        {/* Background Video */}
        <video
          className="explore-video"
          src={bgVideo}
          autoPlay
          loop
          muted
        />

        {/* Content Overlay */}
        <div className="explore-content">

          {/* Page Header */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "6px" }}>Explore</h2>
            <p style={{ color: "#6b7280" }}>
              Discover trending posts and connect with people
            </p>
          </div>

          {/* Trending Posts */}
          <div style={{ marginBottom: "35px" }}>
            <h3 style={{ marginBottom: "14px" }}>🔥 Trending</h3>

            {trendingPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "18px",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
              >
                <strong style={{ fontSize: "15px" }}>{post.title}</strong>
              </div>
            ))}
          </div>

          {/* Suggested People */}
          <div>
            <h3 style={{ marginBottom: "14px" }}>👥 Suggested People</h3>

            {people.map((person) => (
              <div
                key={person.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div>
                  <strong style={{ fontSize: "15px" }}>{person.name}</strong>
                  <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                    {person.role}
                  </p>
                </div>

                <button
                  disabled
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

