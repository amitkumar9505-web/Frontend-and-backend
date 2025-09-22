import React from "react";

export default function Card({ title, color, capacity }) {
  return (
    <>
      <div className="card">
        <h2>Title:{title}</h2>
        <p>Description:{color ? color : "No description for this item"}</p>
        <p>
          Description:{capacity ? capacity : "No description for this item"}
        </p>
      </div>
    </>
  );
}
