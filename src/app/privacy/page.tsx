/* eslint-disable max-len */
import Header from '@/components/collections/layouts/Header'

const Privacy = (): React.ReactElement => {
  return (
    <div className="relative isolate">
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Privacy Policy</h2>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              <div className="space-y-6 text-gray-300">
                <h3 className="text-2xl font-semibold text-white">1. Introduction</h3>
                <p>Welcome to <strong>Jots</strong>. Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights.</p>

                <h3 className="text-2xl font-semibold text-white">2. Data We Collect</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Journal Entries:</strong> We store the text you write in your journal.</li>
                  <li><strong>Account Information:</strong> If you create an account, we may store your email and authentication details.</li>
                  <li><strong>Usage Data:</strong> We collect basic analytics (e.g., page visits) to improve the app.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white">3. How We Use Your Data</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Store and sync your journal entries.</li>
                  <li>Improve Jot’s functionality and user experience.</li>
                  <li>Maintain security and prevent abuse.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white">4. Data Protection</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Your journal entries are stored securely.</li>
                  <li>We do not sell or share your data with third parties.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white">5. Your Rights</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>You can delete your journal entries at any time.</li>
                  <li>You can request access to your stored data.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white">6. Contact</h3>
                <p>For any privacy-related questions, <a href="mailto:loic.boset@gmail.com" className="text-blue-400 hover:underline">contact us</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
