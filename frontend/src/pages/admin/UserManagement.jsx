import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { listUsers, deleteUser, createUser, updateUser } from '../../api/users.api';
import Button from '../../components/UI/Button';
import { Edit, Trash, Plus, Download } from 'lucide-react';
import UserEditModal from '../../components/admin/UserEditModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await listUsers();
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los usuarios.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = async (data) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        alert('Usuario actualizado exitosamente.');
      } else {
        await createUser(data);
        alert('Usuario creado exitosamente.');
      }
      fetchUsers();
      handleCloseModal();
    } catch (err) {
      alert('Error al guardar el usuario.');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        alert('Usuario eliminado exitosamente.');
        fetchUsers();
      } catch (err) {
        alert('Error al eliminar el usuario.');
        console.error(err);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Is Admin'];
    const rows = users.map(user => [user.id, user.username, user.email, user.is_staff]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Layout isAdmin={true}><div className="text-center p-8">Cargando...</div></Layout>;
  if (error) return <Layout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Layout>;

  return (
    <Layout isAdmin={true}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <div className="flex space-x-2">
          <Button onClick={exportToCSV}><Download className="h-4 w-4 mr-2"/>Exportar a CSV</Button>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_staff ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.is_staff ? 'Admin' : 'Cliente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="icon" onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button variant="icon" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 ml-2">
                    <Trash className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
    </Layout>
  );
};

export default UserManagement;
