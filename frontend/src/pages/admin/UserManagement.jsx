import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { listUsers, deleteUser, createUser, updateUser } from '../../api/users.api';
import Button from '../../components/UI/Button';
import { Edit, Trash, Plus, Download, DollarSign, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import UserEditModal from '../../components/admin/UserEditModal';
import AdminRegisterPaymentModal from '../../components/admin/AdminRegisterPaymentModal';
import jsPDF from 'jspdf';
import {MoonLoader} from 'react-spinners'
import autoTable from 'jspdf-autotable';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    setIsPaymentModalOpen(false);
  };

  const handleOpenPaymentModal = (user) => {
    setSelectedUser(user);
    setIsPaymentModalOpen(true);
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
    const headers = ['ID', 'Username', 'Email', 'Address', 'Is Admin'];
    const rows = users.map(user => [user.id, user.username, user.email, user.address, user.is_staff]);
  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Reporte de Usuarios", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Nombre Completo', 'Email', 'Cédula', 'Teléfono', 'Dirección']],
      body: users.map(user => [
        user.id,
        user.fullname || user.username,
        user.email,
        user.cedula,
        user.phone,
        user.address || 'N/A'
      ]),
      headStyles: {
        fillColor: [220, 38, 38] // Red color for header
      },
    });

    doc.save('reporte_usuarios.pdf');
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <Layout isAdmin={true}><div style={{display:"flex", justifyContent:"center", alignItems:"center",minHeight:"100vh"}} >
      <MoonLoader 
       color={"red"}
       size={60}
       loading={true}
      />
    </div>;</Layout>;
  if (error) return <Layout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Layout>;

  return (
    <Layout isAdmin={true}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportToCSV}><Download className="h-4 w-4 mr-2"/>Exportar a CSV</Button>
          <Button onClick={exportToPDF}><Download className="h-4 w-4 mr-2"/>Exportar a PDF</Button>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.fullname || user.username}</div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cedula}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_staff ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.is_staff ? 'Admin' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="icon" onClick={() => handleOpenPaymentModal(user)} className="text-green-600 hover:text-green-900">
                        <DollarSign className="h-5 w-5" />
                      </Button>
                      <Button variant="icon" onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button variant="icon" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-5 w-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No se encontraron usuarios</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Cuando se agreguen usuarios, aparecerán aquí.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, users.length)} de {users.length} resultados
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 hover:bg-gray-50'}`}                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}

      {isPaymentModalOpen && (
        <AdminRegisterPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onPaymentRegistered={() => {
            fetchUsers();
            handleCloseModal();
          }}
        />
      )}
    </Layout>
  );
};

export default UserManagement;