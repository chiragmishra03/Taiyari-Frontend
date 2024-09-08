import React from "react";

function FooterComponent() {
  return (
    <div
      style={{
        right: 0,
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        padding: "10px",
        fontSize: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <div>This Website is created by Chirag Mishra 🌟</div>
      <div>
        Check Here:
        <a
          href="https://www.linkedin.com/in/chirag-mishra-03a00a168/"
          style={{ color: "white", margin: "0 10px" }}
        >
          LinkedIn 🌐
        </a>
        <a
          href="https://github.com/chiragmishra03"
          style={{ color: "white", margin: "0 10px" }}
        >
          Github 🐱‍💻
        </a>
      </div>
    </div>
  );
}

export default FooterComponent;
