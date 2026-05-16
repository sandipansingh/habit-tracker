const PrivacyComponent = () => {
  const privacyText = `Privacy Policy

Last Updated: April 17, 2026

We value your privacy and are committed to protecting your personal information.

1. Information We Collect
• Name and contact information
• Account credentials
• Payment information
• Communications with us

2. How We Use Your Information
• Provide and improve services
• Process transactions
• Send updates
• Respond to inquiries

3. Data Security
We implement safeguards against unauthorized access.

4. Your Rights
• Access data
• Request correction
• Request deletion
• Opt-out of marketing

5. Third-Party Services
We may share data with trusted providers.

6. Cookies
Used to enhance your experience.

7. Changes
Policy may be updated periodically.

8. Contact
Email: privacy@example.com`;

  return (
    <div className="mx-auto my-10 max-w-4xl px-4">
      <section className="border-4 border-black bg-yellow-300 p-6 shadow-[8px_8px_0px_black]">
        <h1 className="mb-4 border-b-4 border-black pb-2 text-3xl font-black uppercase tracking-tight text-black">
          Privacy Policy
        </h1>

        <pre className="whitespace-pre-wrap font-sans text-base leading-7 text-black">
          {privacyText}
        </pre>
      </section>
    </div>
  );
};

export default PrivacyComponent;
