import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div>
      <div className="page-hero container">
        <h1>Refund, Cancellation &amp; Return Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="container section legal-content" style={{ maxWidth: 820, margin: "0 auto" }}>
        <p>
          At Rewamix, customer satisfaction is important to us. Please read
          this policy to understand how cancellations, returns and refunds work.
        </p>

        <h3>1. Order cancellation</h3>
        <p>
          You can cancel an order yourself, free of charge, from{" "}
          <Link to="/my-orders">My Orders</Link> as long as its status is
          <strong> Processing</strong> (i.e. before it is shipped). Once an
          order is marked <strong>Shipped</strong> it can no longer be
          cancelled — you may return it after delivery as described below.
        </p>

        <h3>2. 7-day return policy</h3>
        <p>
          You can request a return within <strong>7 days of delivery</strong>.
          To return an order, open it from <Link to="/my-orders">My Orders</Link>{" "}
          and tap <strong>Return Order</strong>. Please keep the product in its
          original packaging and share the reason for the return. Our team will
          review the request and contact you to arrange pickup.
        </p>
        <p>Returns are accepted for:</p>
        <ul>
          <li>Damaged, spoiled or leaking products</li>
          <li>Wrong item received</li>
          <li>Short quantity or weight</li>
          <li>Quality not as expected</li>
        </ul>
        <p>
          Because our products are perishable food items, returns may be
          declined if the product has been opened, partly consumed, or stored
          improperly after delivery. For damaged or wrong items, please attach
          photos of the product and packaging when our team contacts you.
        </p>

        <h3>3. Refund process</h3>
        <p>
          Once your return is received and approved, or your order is cancelled
          after payment, the refund is issued to the original payment method
          (for Cash on Delivery orders, to a bank account / UPI ID shared with
          our team). Refunds typically reflect within 5–7 business days,
          depending on your bank or payment provider.
        </p>

        <h3>4. Undelivered or failed delivery</h3>
        <p>
          If an order could not be delivered due to an incorrect address or the
          customer being unavailable, delivery charges already incurred may be
          deducted from any refund issued.
        </p>

        <h3>5. Need help?</h3>
        <p>
          Reach out through the <Link to="/contact">Contact page</Link> or email{" "}
          <a href="mailto:support@rewamix.com">support@rewamix.com</a> with your
          order ID and we will assist you as quickly as possible.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
