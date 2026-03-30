const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Terms of Service & Privacy Policy</h1>

            <div className="prose prose-slate max-w-none text-gray-600">
                <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">1. Terms of Service</h2>
                <p>By accessing WordLab, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

                <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">1.1 Use License</h3>
                <p>You may use WordLab's tools for personal or commercial projects. You may not attempt to extract the source code or use our API improperly without authorization.</p>

                <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">1.2 Disclaimer</h3>
                <p>The materials on WordLab are provided on an 'as is' basis. WordLab makes no warranties, expressed or implied, and hereby disclaims all other warranties.</p>

                <hr className="my-10 border-gray-200" />

                <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">2. Privacy Policy</h2>
                <p>Your privacy is important to us. It is WordLab's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.1 Information We Collect</h3>
                <p>If you create an account, we collect your name and email address. If you are logged in, we optionally save your tool usage history to populate your dashboard.</p>

                <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.2 User Data</h3>
                <p>The text you process using our non-authenticated tools is processed locally in your browser and is never sent to our servers. Certain features that require backend processing will securely transmit the data over SSL and will not retain the data after processing unless you save it.</p>

                <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.3 Third-Party Services</h3>
                <p>In the future, WordLab may use standard third-party advertising partners to display ads. These partners may use cookies to personalize content and ads.</p>

                <p className="mt-8 text-sm text-gray-400">Last Updated: March 2026</p>
            </div>
        </div>
    );
};

export default Terms;
