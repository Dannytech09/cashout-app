import Sidebar from "./Sidebar";
// import Footer from './Footer'
// import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="h-screen mb-50 flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
