function Popup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>Restart Game</button>
      </div>
    </div>
  );
}

export default Popup;
