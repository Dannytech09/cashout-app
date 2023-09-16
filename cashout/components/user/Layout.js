import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="h-screen mb-50 flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
