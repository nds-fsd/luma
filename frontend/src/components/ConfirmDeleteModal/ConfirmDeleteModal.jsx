import Modal from 'react-modal';
import styles from './ConfirmDeleteModal.module.css';

Modal.setAppElement('#root'); 

function ConfirmDeleteModal({ isOpen, onRequestClose, onConfirm, type }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Deletion"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Confirmar Eliminación</h2>
      {type && type==='event' && <p>¿Estás seguro de que deseas eliminar este evento? Esta acción es irreversible.</p>}
      {type && type==='account' && <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.</p>}
      {type && type==='user' && <p>¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.</p>}
      <div className={styles.buttons}>
        <button onClick={onConfirm} className={styles.confirmButton}>Eliminar</button>
        <button onClick={onRequestClose} className={styles.cancelButton}>Cancelar</button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
