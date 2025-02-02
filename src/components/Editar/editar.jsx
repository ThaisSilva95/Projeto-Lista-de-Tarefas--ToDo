import './index.scss';

function EditModal({ text, setText, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Deseja editar esse item?</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel">Não</button>
          <button onClick={onConfirm} className="confirm">Sim</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;