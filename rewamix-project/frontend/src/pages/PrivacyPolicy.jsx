const PrivacyPolicy = () => {
  return (
    <div>
      <div className="page-hero container">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="container section legal-content" style={{ maxWidth: 820, margin: "0 auto" }}>
        <p>
          Rewamix ("we", "us", "our") operates this website and the products and
          services offered on it. This Privacy Policy explains how we collect,
          use, store and protect your personal information when you visit our
          site or place an order with us.
        </p>

        <h3>1. Information we collect</h3>
        <p>We may collect the following information when you use our website:</p>
        <ul>
          <li>Name, email address, phone number and delivery address</li>
          <li>Order history and preferences</li>
          <li>Payment and transaction details (processed securely via our payment partners — we do not store your card, UPI or net-banking credentials)</li>
          <li>Technical data such as IP address, browser type and device information</li>
        </ul>

        <h3>2. How we use your information</h3>
        <ul>
          <li>To process and deliver your orders</li>
          <li>To communicate order updates, offers and customer support responses</li>
          <li>To improve our website, products and services</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>

        <h3>3. Sharing of information</h3>
        <p>
          We do not sell or rent your personal information to third parties. We
          may share necessary details with trusted logistics partners, payment
          gateways and service providers solely for the purpose of fulfilling
          your order, and with authorities where required by law.
        </p>

        <h3>4. Cookies</h3>
        <p>
          Our website may use cookies and similar technologies to remember your
          cart, preferences and login session, and to understand how visitors
          use our site. You can disable cookies in your browser settings,
          though some features may not work correctly as a result.
        </p>

        <h3>5. Data security</h3>
        <p>
          We use reasonable technical and organisational measures — including
          encrypted connections and secure password storage — to protect your
          personal information from unauthorised access, alteration or
          disclosure.
        </p>

        <h3>6. Your rights</h3>
        <p>
          You may request access to, correction of, or deletion of your
          personal information at any time by contacting us at{" "}
          <a href="mailto:support@rewamix.com">support@rewamix.com</a>.
        </p>

        <h3>7. Children's privacy</h3>
        <p>
          Our services are not directed at children under 18. We do not
          knowingly collect personal information from children.
        </p>

        <h3>8. Changes to this policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes
          will be posted on this page with a revised "last updated" date.
        </p>

        <h3>9. Contact us</h3>
        <p>
          If you have any questions about this Privacy Policy, please reach
          out via our <a href="/contact">Contact page</a> or email{" "}
          <a href="mailto:support@rewamix.com">support@rewamix.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
