// pages/about.js (Next.js 12)
// or app/about/page.js (Next.js 13+)

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">About</h1>
        <p className="text-gray-800 mb-4 leading-relaxed">
          This project extends <span className="font-semibold text-indigo-600">bKash</span> services for personal users.  
          Since official APIs are only for merchants, I built a system where:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            An Android app reads bKash SMS{" "}
            <a
              href="https://github.com/swajan-75/Bkash_sms_reader.git"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              (SMS Reader)
            </a>.
          </li>
          <li>
            It sends data to backend{" "}
            <a
              href="https://github.com/swajan-75/g_sheets"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              (GitHub)
            </a>.
          </li>
          <li>Transactions are validated and stored in PostgreSQL.</li>
        </ul>
        <p className="text-gray-800 mt-4 font-medium">
          ✅ A simple way for individuals to track and manage their bKash transactions programmatically.
        </p>
      </div>
    </div>
  );
}
