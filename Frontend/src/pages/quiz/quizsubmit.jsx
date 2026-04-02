import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function Quizsubmit() {
  const navigate = useNavigate();
  const { result, id, topicname, catagory, difficulty } = useParams();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  return (
    <div className="h-150 flex justify-center items-center text-white">

      {result >= 70 && showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: -20 }}
        transition={{ duration: 0.6 }}
        className="w-96 bg-[#1f1f1f] bg-opacity-10  p-10 rounded-2xl shadow-2xl text-center"
      >
        <h1 className="text-2xl font-bold mb-4">
          🎉 Quiz Completed!
        </h1>

        <div className="text-4xl font-extrabold text-green-400 mb-6">
          {result}%
        </div>

        <p className="mb-6 text-gray-300">
          {result >= 70
            ? "Great job! Keep it up 🔥"
            : "Don't worry! Practice makes perfect 💪"}
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() =>
              navigate(`/quiz/subject/${id}/${catagory}/${topicname}/${difficulty}`)
            }
            className="primary-btn"
          >
            Retake
          </button>

          <button
            onClick={() => {navigate("/quiz")
               localStorage.removeItem(quizkey);
            }}
            className="primary-btn"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
