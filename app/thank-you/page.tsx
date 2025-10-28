export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 text-center px-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Thank You!
      </h1>
      <p className="text-lg text-gray-700 max-w-lg">
        Your appointment request has been received. We’ll send a confirmation email shortly with your visit details.
      </p>
      <a
        href="/"
        className="mt-8 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Back to Home
      </a>
    </main>
  );
}
