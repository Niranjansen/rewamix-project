const TermsConditions = () => {
  return (
    <div>
      <div className="page-hero container">
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="container section legal-content" style={{ maxWidth: 820, margin: "0 auto" }}>
        <p>
          Welcome to Rewamix. By accessing or using our website and placing an
          order with us, you agree to be bound by the following terms and
          conditions. Please read them carefully before using our services.
        </p>

        <h3>1. General</h3>
        <p>
          These terms apply to all visitors, users and customers of the
          Rewamix website. We reserve the right to update or modify these
          terms at any time without prior notice. Continued use of the site
          after changes means you accept the revised terms.
        </p>

        <h3>2. Products &amp; pricing</h3>
        <p>
          We make every effort to display our products and their prices
          accurately. However, prices, availability and offers may change
          without notice, and we reserve the right to correct any pricing
          errors before an order is confirmed.
        </p>

        <h3>3. Orders</h3>
        <p>
          Placing an order constitutes an offer to buy a product. We reserve
          the right to accept or decline any order for reasons including but
          not limited to product unavailability, errors in pricing or
          description, or suspected fraudulent activity. You will be notified
          if your order cannot be fulfilled.
        </p>

        <h3>4. Payments</h3>
        <p>
          All payments are processed through secure, third-party payment
          gateways. We do not store your card, UPI or net-banking credentials
          on our servers. By making a payment, you confirm that the payment
          details provided are accurate and that you are authorised to use
          the chosen payment method.
        </p>

        <h3>5. Account responsibility</h3>
        <p>
          If you create an account with us, you are responsible for
          maintaining the confidentiality of your login credentials and for
          all activities that occur under your account.
        </p>

        <h3>6. Intellectual property</h3>
        <p>
          All content on this website — including text, images, logos and
          design — is the property of Rewamix and may not be reproduced,
          copied or used without our written permission.
        </p>

        <h3>7. Limitation of liability</h3>
        <p>
          Rewamix shall not be liable for any indirect, incidental or
          consequential damages arising from the use of our website or
          products, to the extent permitted by applicable law.
        </p>

        <h3>8. Governing law</h3>
        <p>
          These terms are governed by and construed in accordance with the
          laws of India, and any disputes shall be subject to the exclusive
          jurisdiction of the courts in our registered place of business.
        </p>

        <h3>9. Contact us</h3>
        <p>
          For any questions regarding these Terms &amp; Conditions, please
          contact us at{" "}
          <a href="mailto:support@rewamix.com">support@rewamix.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
