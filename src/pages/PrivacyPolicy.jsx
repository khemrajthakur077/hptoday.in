import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white py-16 px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your privacy is our priority. Learn how HP Today handles and protects your personal data.
          </p>
          <div className="mt-6 inline-flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-sm font-semibold text-blue-300 mr-2">Last Updated:</span>
            <span className="text-sm text-white">April 12, 2026</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 sm:p-16 space-y-12 mb-10">
          
          {/* Section 1: Commitment */}
          <section className="relative pl-4 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Our Commitment</h2>
            <p className="text-slate-600 leading-relaxed">
              At <strong>HP Today</strong> (hptoday.in), operated by Raj Thakur in Sundernagar, HP, we are committed to protecting your personal information. This policy is designed in compliance with the <strong>Digital Personal Data Protection Act (DPDP), 2023</strong>. We ensure that any data collected is used solely for enhancing your news experience.
            </p>
          </section>

          {/* Section 2: Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">2</span>
              Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2">Personal Information</h3>
                <p className="text-sm text-slate-600">Name, email address, and contact details provided when you subscribe to our newsletter or post comments.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2">Technical Data</h3>
                <p className="text-sm text-slate-600">IP address, browser type, and device information collected via Google Analytics to optimize site performance.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Usage of Data */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">3</span>
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-slate-600 ml-12 list-disc">
              <li>To deliver daily news updates and alerts.</li>
              <li>To improve our website's user interface and content quality.</li>
              <li>To respond to your feedback or inquiries via <strong>hptoday16@gmail.com</strong>.</li>
              <li>To ensure the security of our platform against unauthorized access.</li>
            </ul>
          </section>

          {/* Section 4: Cookies */}
          <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Cookies & Tracking</h2>
            <p className="text-slate-600 leading-relaxed">
              We use "cookies" to enhance your browsing experience. Cookies help us understand which news categories you prefer. You can choose to disable cookies through your browser settings, though some features of the site may not function properly as a result.
            </p>
          </section>

          {/* Section 5: Your DPDP Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">5</span>
              Your Legal Rights (DPDP Act)
            </h2>
            <p className="text-slate-600 mb-4">Under Indian law, you have the right to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Access your data', 'Correct inaccuracies', 'Request data deletion', 'Withdraw consent'].map((right) => (
                <div key={right} className="flex items-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-slate-700 font-medium">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Grievance & Contact */}
          <section className="bg-slate-900 text-slate-100 p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b border-slate-700 pb-4">
              Grievance Officer & Support
            </h2>
            <p className="mb-6 text-slate-400">
              For any privacy concerns or to exercise your data rights, please contact our designated officer:
            </p>
            <div className="space-y-3 bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p><span className="text-blue-400 font-medium">Officer:</span> Raj Thakur</p>
              <p><span className="text-blue-400 font-medium">Email:</span> hptoday16@gmail.com</p>
              <p><span className="text-blue-400 font-medium">Location:</span> Sundernagar, Himachal Pradesh, India</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;