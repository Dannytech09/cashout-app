import SidebarAdmin from "./Sidebar-Admin";
// import Footer from './Footer'
// import Header from './Header'

export default function LayoutAdmin({ children}) {

  return (
    <div className='flex h-screen bg-black'>
       <SidebarAdmin/>
      {children}
    </div>
  )
}
