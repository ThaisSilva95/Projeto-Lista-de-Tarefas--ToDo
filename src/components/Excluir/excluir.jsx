import './index.scss';

function DeleteModal({ taskText, onCancel, onConfirm }) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Deseja excluir este item?</h2>
          <p>{taskText}</p>
          <div className="modal-actions">
            <button onClick={onCancel} className="cancel">Não</button>
            <button onClick={onConfirm} className="confirm">Sim</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteModal;
  