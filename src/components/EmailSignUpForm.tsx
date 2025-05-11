import type { JSX } from 'react';

const EmailSignupForm = (): JSX.Element => {
  return (
    <form
      action="https://app.convertkit.com/forms/8040752/subscriptions"
      method="POST"
      target="_blank"
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Stay in the loop</h2>
      <p className="text-gray-600 text-sm">Get updates on our latest features, dev tips and news. And also excluive perks.</p>
      <input
        type="email"
        name="email_address"
        required
        placeholder="Your email"
        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}

export default EmailSignupForm;