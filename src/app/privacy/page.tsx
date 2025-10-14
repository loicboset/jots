import Header from "@/components/collections/layouts/Header";

const Privacy = (): React.ReactElement => (
  <div className="relative isolate">
    <Header />
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            Privacy Policy
          </h2>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            <div className="space-y-6 text-gray-300">
              <h3 className="text-2xl font-semibold text-white">
                1. Introduction
              </h3>
              <p>
                Welcome to <strong>Jots</strong>. Your privacy is important to
                us. This policy explains what data we collect, why we collect
                it, how we use it, and your rights under the GDPR.
              </p>

              <h3 className="text-2xl font-semibold text-white">
                2. Data We Collect
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  <strong>Account Information:</strong> Email and authentication
                  details when you create an account (via Supabase Auth).
                </li>
                <li>
                  <strong>Journal Entries:</strong> Text content you write and
                  store in the app.
                </li>
                <li>
                  <strong>Technical Data:</strong> Basic usage data like page
                  visits and IP addresses, collected via Vercel for operational
                  purposes.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">
                3. Legal Basis for Processing
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  <strong>Account and journal data:</strong> To provide the
                  service (performance of a contract).
                </li>
                <li>
                  <strong>Analytics/technical data:</strong> Our legitimate
                  interest to maintain and improve the app.
                </li>
                <li>
                  <strong>Email communications (if opted in):</strong> Your
                  consent.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">4. Cookies</h3>
              <p>
                We use <strong>essential cookies only</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  <strong>Purpose:</strong> To keep you logged in and secure
                  your session.
                </li>
                <li>
                  <strong>Type:</strong> Authentication session cookies via
                  Supabase.
                </li>
                <li>No marketing or analytics cookies are used.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">
                5. How We Use Your Data
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Provide and sync your journal entries.</li>
                <li>Secure your account and prevent misuse.</li>
                <li>Improve the functionality and performance of Jots.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">
                6. Data Sharing and Storage
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  Your data is stored securely using{" "}
                  <a
                    href="https://supabase.com/privacy"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Supabase
                  </a>
                  , a third-party EU-compliant provider.
                </li>
                <li>
                  Hosting and edge functions are managed by{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vercel
                  </a>
                  .
                </li>
                <li>
                  We do <strong>not</strong> sell or share your data with third
                  parties for marketing or advertising.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">
                7. Data Retention
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>We retain your data while your account is active.</li>
                <li>
                  You can delete your account and associated data at any time.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">
                8. Your Rights
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Access your data.</li>
                <li>Request correction or deletion.</li>
                <li>Withdraw consent (where applicable).</li>
                <li>
                  File a complaint with your local data protection authority.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white">9. Contact</h3>
              <p>
                For any privacy-related questions,{" "}
                <a
                  href="mailto:loic.boset@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Privacy;
