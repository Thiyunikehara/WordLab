const About = () => {
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">About WordLab</h1>

            <div className="prose prose-slate max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                    WordLab is your go-to destination for quick, reliable, and entirely free text manipulation tools. Our mission is to make text analysis and formatting effortless for students, professionals, and writers worldwide.
                </p>

                <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-6">
                    What started as a simple word counter has evolved into a comprehensive suite of over 20 text-processing utilities. We realized that while there are many tools scattered across the web, few offer a clean, ad-light, and completely integrated experience. WordLab fixes that.
                </p>

                <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Features</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li><strong>Text Analysis:</strong> Count words, characters, sentences, and calculate reading time.</li>
                    <li><strong>Formatting:</strong> Change text case, remove extra spaces, and tidy up paragraphs.</li>
                    <li><strong>Developer Tools:</strong> Base64 and URL encoding/decoding.</li>
                    <li><strong>Completely Free:</strong> All features are accessible at no cost.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Privacy First</h2>
                <p className="text-gray-600 mb-6">
                    Everything happens in your browser for the majority of our tools. We take privacy seriously and ensure that your text is not stored without your explicit consent (e.g., saving tool history in your dashboard).
                </p>
            </div>
        </div>
    );
};

export default About;
