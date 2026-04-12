import React from 'react';

const TermsConditions = () => {
  // Current Year automatic update ke liye - Ab yeh niche footer mein use ho raha hai
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        {/* Header Section - Modern Gradient Look */}
        <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-8 text-center border-b border-white/10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            By using HP Today, you agree to follow the rules and guidelines outlined below. 
            We ensure transparency in our news delivery.
          </p>
          <div className="mt-6 inline-flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-sm font-semibold text-blue-300 mr-2">Last Updated:</span>
            <span className="text-sm text-white">April 12, 2026</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 sm:p-16 space-y-12">
          
          {/* Section 1: Identity */}
          <section className="relative pl-4 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction & Ownership</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Welcome to <strong>HP Today</strong> (hptoday.in). This news portal is owned and operated by <strong>Raj Thakur</strong>, located in Sundernagar, Himachal Pradesh. These Terms govern your use of our digital content. By accessing this website, you acknowledge that you have read and agreed to these terms under the Information Technology Act, 2000.
            </p>
          </section>

          {/* Section 2: Content Copyright */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">2</span>
              Intellectual Property Rights
            </h2>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                All editorial content, including news reports, original photographs, videos, and logos, are the exclusive intellectual property of HP Today.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✔</span> Commercial reproduction is strictly prohibited.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✔</span> Automated data scraping/mining is banned.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✔</span> Social sharing is encouraged via official links.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✔</span> No modification of news headlines is allowed.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Editorial Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">3</span>
              Accuracy & News Disclaimer
            </h2>
            <p className="text-slate-600 leading-relaxed">
              News is a real-time industry. While we strive for 100% accuracy, HP Today does not warrant that the content is always error-free or complete. Information provided is for general awareness. We reserve the right to edit or remove content at any time due to legal requirements or editorial corrections.
            </p>
          </section>

          {/* Section 4: IT Rules Compliance */}
          <section className="bg-slate-900 text-slate-100 p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b border-slate-700 pb-4">
              Grievance Redressal (IT Rules 2021)
            </h2>
            <p className="mb-6 text-slate-400">
              As a digital news publisher, we comply with the IT Rules 2021. Any complaint regarding content should be sent to:
            </p>
            <div className="space-y-3 bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p><span className="text-blue-400 font-medium">Grievance Officer:</span> Raj Thakur</p>
              <p><span className="text-blue-400 font-medium">Email:</span> hptoday16@gmail.com</p>
              <p><span className="text-blue-400 font-medium">Jurisdiction:</span> Sundernagar, Himachal Pradesh, India</p>
            </div>
          </section>

          {/* Section 5: User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">4</span>
              User Conduct
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Users must not post comments that are defamatory, incite violence, or violate Indian law. We hold the right to terminate access or delete comments that damage the community's integrity.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-4 shadow-md">5</span>
              Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-4">
              In no event shall HP Today or Raj Thakur be held liable for any direct or indirect damages arising out of your use of the website or reliance on any news report.
            </p>
          </section>

        </div>

        {/* Professional Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 p-12 text-center">
          <div className="mb-6">
            <p className="text-slate-500 font-medium mb-2">For any legal or content related inquiries:</p>
            <a 
              href="mailto:hptoday16@gmail.com" 
              className="text-blue-600 hover:text-blue-800 font-bold text-xl transition-all duration-300 underline underline-offset-4 break-all"
            >
              hptoday16@gmail.com
            </a>
          </div>
          <p className="text-xs text-slate-400 tracking-widest uppercase">
            &copy; {currentYear} HP TODAY NEWS NETWORK | All Rights Reserved
          </p>
        </footer>

      </div>
    </div>
  );
};

export default TermsConditions;