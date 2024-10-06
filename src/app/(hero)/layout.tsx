import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className='h-screen overflow-hidden'>
          <Navbar />
          {children}
        <ToastContainer />
      </div>
  );
}
