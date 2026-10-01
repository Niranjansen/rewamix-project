const ShippingPolicy = () => {
  return (
    <div>
      <div className="page-hero container">
        <h1>Shipping &amp; Delivery Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="container section legal-content" style={{ maxWidth: 820, margin: "0 auto" }}>
        <h3>1. Delivery areas</h3>
        <p>
          We currently deliver to select cities and pin codes across India.
          Serviceability for your area is confirmed automatically at
          checkout when you enter your delivery address.
        </p>

        <h3>2. Order processing time</h3>
        <p>
          Since our mithai and namkeen are prepared fresh, orders are
          typically processed and packed within 24 hours of confirmation.
          Bulk, wedding or festive gift-box orders may require additional
          preparation time, which will be communicated at the time of order.
        </p>

        <h3>3. Delivery timelines</h3>
        <p>
          Standard delivery usually takes 1–4 business days depending on your
          location. Estimated delivery timelines are shown at checkout and in
          your order confirmation email — actual delivery may vary due to
          courier delays, weather or other circumstances beyond our control.
        </p>

        <h3>4. Shipping charges</h3>
        <p>
          Shipping charges, if applicable, are calculated based on your
          delivery location and order value, and are shown at checkout before
          payment. Orders above a certain value may qualify for free
          shipping, as indicated on the site.
        </p>

        <h3>5. Packaging</h3>
        <p>
          All products are packed in sealed, food-grade and tamper-evident
          packaging designed to keep mithai and namkeen fresh in transit.
        </p>

        <h3>6. Order tracking</h3>
        <p>
          Once your order is dispatched, you will receive a confirmation with
          tracking details (where available). You can also check your order
          status anytime under{" "}
          <a href="/my-orders">My Orders</a>.
        </p>

        <h3>7. Failed or delayed delivery</h3>
        <p>
          Please ensure your delivery address and contact number are
          accurate. If a delivery attempt fails due to an incorrect address
          or unavailability, our team will get in touch to reschedule, and
          additional delivery charges may apply.
        </p>

        <h3>8. Contact us</h3>
        <p>
          For any shipping-related questions, contact us via the{" "}
          <a href="/contact">Contact page</a> or email{" "}
          <a href="mailto:support@rewamix.com">support@rewamix.com</a>.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
