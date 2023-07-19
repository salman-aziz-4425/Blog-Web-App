import * as React from "react";

export default function Comments(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "12px",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#333333",
            lineHeight: "1.5",
            marginTop: "0",
          }}
        >
          {props.body}
        </p>
      </div>
    </>
  );
}
