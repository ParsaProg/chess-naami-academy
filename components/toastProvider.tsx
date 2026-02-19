// components/ToastProvider.tsx
'use client';

import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <>
      <ToastContainer
        className="z-[999999]"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { direction: 'rtl' },
        }}
        containerStyle={{ zIndex: 999999 }}
      />
    </>
  );
}