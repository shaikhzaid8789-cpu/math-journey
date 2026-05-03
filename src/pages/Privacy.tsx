import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last Updated: November 2025</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <p>Welcome to our website. Your privacy is important to us. This Privacy Policy explains how we handle user information.</p>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Do Not Collect</h2>
            <p className="mb-3">We want to clearly state that our website does <strong>NOT</strong> collect, store, or process any personal information from users.</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>No user registration or login is required</li>
              <li>We do not collect personal details such as name, email address, or phone number</li>
              <li>We do not maintain any database of user information</li>
              <li>We do not directly track users or store personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use of Cookies</h2>
            <p>Our website itself does not use cookies to store personal data. However, third-party services used on this website may use cookies or similar technologies for advertising and analytics purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Third-Party Advertising</h2>
            <p className="mb-3">We use third-party advertising services such as Propeller Ads to display ads and generate revenue. These services may:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Use cookies or tracking technologies</li>
              <li>Collect non-personal information such as browser type, device type, IP address, or general location</li>
              <li>Show personalized or non-personalized advertisements</li>
            </ul>
            <p className="mt-3">We do not control how these third-party services collect or use data. Users are advised to review their respective privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p>Since we do not collect or store any personal data, there is no risk of your personal information being stored or misused by us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. External Links</h2>
            <p>Our website may contain links to external websites. We are not responsible for the content or privacy practices of those external sites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Children's Information</h2>
            <p>Our website does not knowingly collect any information from children. Since no data is collected at all, there is no risk related to children's data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised "Last Updated" date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can contact us through the website.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Math.
          </Link>
        </div>
      </article>
    </main>
  );
};

export default Privacy;
