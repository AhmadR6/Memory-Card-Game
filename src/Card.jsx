import React from "react";

function Card({ dog, isfliped, shuffleAndAnimate }) {
  return (
    <div key={dog.id} className={"card"} onClick={shuffleAndAnimate}>
      <img className="card-img front " id={dog.id} src={dog.url} alt="Dog" />
      <div className={isfliped ? "fliped" : "back"}></div>
    </div>
  );
}

export default Card;
