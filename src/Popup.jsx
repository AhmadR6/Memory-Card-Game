function Popup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p className="gameStatus">{message}</p>
        <button className="restart-btn" onClick={onClose}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default Popup;
