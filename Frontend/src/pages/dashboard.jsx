export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-[#22C55E]">Welcome to PrepHub</h1>
        <p className="text-gray-600">
          PrepHub is an AI-powered platform designed to help students prepare for 
          interviews and improve their resumes. You can analyze your resume, take 
          quizzes, chat with an AI mentor, and track your preparation progress.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#22C55E]">AI Mentor</h2>
          <p className="text-gray-600 text-sm">
            Ask questions about programming, interviews, or career guidance. 
            Our AI mentor provides quick and helpful answers.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#22C55E]">Resume Analyzer</h2>
          <p className="text-gray-600 text-sm">
            Upload your resume and receive an ATS score along with suggestions 
            to improve your chances of getting shortlisted.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#22C55E]">Quiz Practice</h2>
          <p className="text-gray-600 text-sm">
            Test your knowledge through quizzes based on programming, 
            aptitude, and interview questions.
          </p>
        </div>

      </div>

      {/* How it Helps */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-[#22C55E]">
          How PrepHub Helps You
        </h2>

        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>Improve your resume with AI-based suggestions</li>
          <li>Practice interview questions and quizzes</li>
          <li>Track your preparation progress</li>
          <li>Get instant career guidance from AI Mentor</li>
        </ul>
      </div>

      {/* Stats Section */}
      {/* <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-gray-500 ">Quizzes Completed</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-2xl font-bold">78%</h3>
          <p className="text-gray-500 ">Resume Score</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-2xl font-bold">25</h3>
          <p className="text-gray-500">AI Mentoring Sessions</p>
        </div>

      </div> */}

    </div>
  );
}