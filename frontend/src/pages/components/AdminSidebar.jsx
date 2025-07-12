import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      style={{
        width: "280px",
        background: "linear-gradient(180deg, #2c3e50 0%, #3498db 100%)",
        padding: "2rem",
        color: "white",
        height: "100vh",
        boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          borderBottom: "2px solid rgba(255,255,255,0.1)",
          paddingBottom: "1rem",
        }}
      >
        Admin Panel
      </h2>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {[
            { to: "/admin/pending-items", label: "Pending Items" },
            { to: "/admin/users", label: "Users" },
            { to: "/admin/swaps", label: "Swaps" },
          ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none",
              backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "all 0.3s ease",
              display: "block",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
