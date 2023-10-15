import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto w-screen">
        {children}
      {/* <Footer/> */}
      </div>
    </div>
  );
}