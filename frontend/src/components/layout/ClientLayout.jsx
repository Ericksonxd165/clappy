import { Outlet } from 'react-router-dom'
import UILayout from './Layout'

const ClientLayout = () => {
  return (
    <UILayout isAdmin={false}>
      <Outlet />
    </UILayout>
  )
}

export default ClientLayout
