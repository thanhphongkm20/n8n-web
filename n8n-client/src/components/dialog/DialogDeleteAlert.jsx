import DialogConfirm from './DialogConfirm.jsx';
import LANGUAGE from '../../utils/language.util.js';

const DialogDeleteAlert = ({ title, open, onClose, onConfirm, loading, description }) => (
  <DialogConfirm
    open={open}
    onClose={onClose}
    onConfirm={onConfirm}
    title={title}
    description={description}
    confirmText={LANGUAGE.BUTTON.DELETE}
    cancelText={LANGUAGE.BUTTON.CANCEL}
    loading={loading}
  />
);

export default DialogDeleteAlert;