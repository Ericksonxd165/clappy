import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const userSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  fullname: z.string().min(1, 'El nombre completo es requerido'),
  email: z.string().email('Email no válido'),
  phone: z.string().optional(),
  cedula: z.string().optional(),
  address: z.string().optional(),
  password: z.string().optional(),
  is_staff: z.boolean(),
});

const UserEditModal = ({ isOpen, onClose, user, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset({
        username: '',
        fullname: '',
        email: '',
        phone: '',
        cedula: '',
        address: '',
        password: '',
        is_staff: false,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    // Filter out empty password field if not provided
    const userData = { ...data };
    if (!userData.password) {
      delete userData.password;
    }
    onSave(userData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Editar Usuario' : 'Agregar Usuario'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre de Usuario"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          label="Nombre Completo"
          {...register('fullname')}
          error={errors.fullname?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Teléfono"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Cédula"
          {...register('cedula')}
          error={errors.cedula?.message}
        />
        <Input
          label="Dirección"
          {...register('address')}
          error={errors.address?.message}
        />
        <Input
          label="Contraseña (dejar en blanco para no cambiar)"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_staff"
            {...register('is_staff')}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="is_staff" className="ml-2 block text-sm text-gray-900">
            Es Administrador
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserEditModal;
