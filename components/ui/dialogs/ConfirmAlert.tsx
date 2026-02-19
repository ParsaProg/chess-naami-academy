"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmAlertProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmAlert({
  show,
  onClose,
  onConfirm,
  message = "آیا واقعاً می‌خواهید این مورد را حذف کنید؟",
  confirmText = "بله",
  cancelText = "خیر",
}: ConfirmAlertProps) {
  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [show]);

  const content = (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/40 z-[9999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Alert modal - light mode palette */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="fixed z-[9999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       bg-white rounded-xl shadow-xl shadow-neutral-300/50
                       w-[90vw] max-w-[380px] p-6
                       border border-neutral-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="confirm-title"
              className="text-neutral-800 font-bold text-lg mb-4 text-center"
            >
              {message}
            </h2>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                }}
                className="px-5 py-2.5 rounded-lg font-medium
                         bg-neutral-100 text-neutral-700 hover:bg-neutral-200
                         transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-lg font-medium
                         bg-red-500 text-white hover:bg-red-600
                         transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
