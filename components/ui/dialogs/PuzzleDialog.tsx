import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl";
import Image from "next/image";

interface PuzzleDialogData {
  title: string;
  puzzleImage: string;
  answers: Array<string>;
  correctAnswer: string;
}

export default function DialogTrigger({
  show,
  value,
  setIsShowDialog,
}: {
  show: boolean;
  value: PuzzleDialogData;
  setIsShowDialog: (value: boolean) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Reset answer state when dialog opens
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleAnswerSelect = (answerIndex: string) => {
    if (hasAnswered) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    setHasAnswered(true);
  };

  const getAnswerColor = (index: string) => {
    if (!hasAnswered) return "bg-gray-100 hover:bg-gray-200";
    if (index === value.correctAnswer) return "bg-green-100 border-2 border-green-500";
    if (index === selectedAnswer && index !== value.correctAnswer) 
      return "bg-red-100 border-2 border-red-500";
    return "bg-gray-100";
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={() => setIsShowDialog(false)}
            className="fixed inset-0 bg-[#0000006b] z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {/* Dialog */}
          <motion.div
            className="fixed z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-white rounded-lg shadow-xl shadow-[#00000063] 
                       w-[95vw] max-w-[800px] max-h-[90vh] overflow-hidden
                       flex flex-col"
            initial={{ scale: 0.7, opacity: 0}}
            animate={{ scale: 0.9, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h1 className="font-bold text-lg md:text-xl">{value.title}</h1>
              <button 
                onClick={() => setIsShowDialog(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="بستن"
              >
                <SlClose size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 flex flex-col items-center">
              {/* Puzzle Image */}
              <div className="relative w-full max-w-[600px] aspect-square mb-6">
                <Image
                  alt="تصویر معما"
                  src={value.puzzleImage}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 600px"
                  priority
                />
              </div>

              {/* Answer Options */}
              <div className="w-full max-w-[600px]">
                <h3 className="font-semibold mb-4 text-right">گزینه‌های پاسخ:</h3>
                <div className="grid grid-cols-4 gap-3">
                  {value.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index.toString())}
                      disabled={hasAnswered}
                      className={`text-center font-bold text-xl p-4 rounded-md transition-all ${getAnswerColor(index.toString())} ${
                        !hasAnswered && "cursor-pointer hover:shadow-md"
                      } ${selectedAnswer === index.toString() ? "ring-2 ring-blue-500" : ""}`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>

                {/* Submit Button */}
                {!hasAnswered && (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`mt-6 w-full py-3 rounded-md text-white font-medium ${
                      selectedAnswer === null
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors`}
                  >
                    تایید پاسخ
                  </button>
                )}

                {/* Result Message */}
                {hasAnswered && (
                  <div className={`mt-6 p-4 rounded-md text-center ${
                    selectedAnswer === value.correctAnswer
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedAnswer === value.correctAnswer
                      ? "پاسخ شما درست است! 🎉"
                      : "پاسخ شما نادرست است. پاسخ صحیح انتخاب شده است."}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}