import React, { useState } from 'react';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import { adminCreateCajaPersona } from '../../api/box.api';

const AdminRegisterPaymentModal = ({ isOpen, onClose, user, onPaymentRegistered }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterPayment = async () => {
    setIsSubmitting(true);
    try {
      await adminCreateCajaPersona({
        user_id: user.id,
        payment_method: 'Efectivo',
      });
      alert('Pago en efectivo registrado exitosamente.');
      onPaymentRegistered();
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrar el pago.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Registrar Pago para ${user?.username}`}>
      <div className="space-y-4">
        <p>
          ¿Estás seguro de que quieres registrar un pago en efectivo para este usuario?
          Esta acción marcará el pago como aprobado y descontará una caja del stock.
        </p>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleRegisterPayment} disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrar Pago en Efectivo'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminRegisterPaymentModal;
