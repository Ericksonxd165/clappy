import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const UIlayout = ({ children, isAdmin = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isAdmin={isAdmin}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isAdmin={isAdmin}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default UIlayout
