import React from "react";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      <p>Welcome to your Kanban Task Manager 🎯</p>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Today</h3>
          <p>0 Tasks</p>
        </div>

        <div style={styles.card}>
          <h3>This Week</h3>
          <p>0 Tasks</p>
        </div>

        <div style={styles.card}>
          <h3>Later</h3>
          <p>0 Tasks</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Dashboard;
