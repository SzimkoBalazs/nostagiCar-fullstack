import React from "react";


const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <img
        src={'./error.avif'}
        alt="404 error illustration"
        style={styles.illustration}
      />
      <h1 style={styles.header}>Whoops, page not found!</h1>
      <p style={styles.text}>
        It looks like the page you were looking for doesn't exist.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },
  illustration: {
    width: "50%",
    marginBottom: "20px",
  },
  header: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  text: {
    fontSize: "20px",
    textAlign: "center",
  },
};

export default ErrorPage;
