import { useState } from "react";
import api from "../api/axios";

export const RETURN_WINDOW_DAYS = 7;
const DAY = 24 * 60 * 60 * 1000;

const CANCEL_REASONS = [
  "Ordered by mistake",
  "Want to change address / items",
  "Found a better price elsewhere",
  "Delivery is taking too long",
  "Other",
];
const RETURN_REASONS = [
  "Product damaged / spoiled",
  "Wrong item received",
  "Quantity or weight is less",
  "Quality not as expected",
  "Other",
];

export const statusClass = (s) => `status-${String(s).replace(/\s+/g, "-")}`;

// days left in the 7-day return window (<= 0 means window is over)
export const returnDaysLeft = (order) => {
  if (order.status !== "Delivered") return 0;
  const deliveredOn = new Date(order.deliveredAt || order.updatedAt).getTime();
  return Math.ceil((deliveredOn + RETURN_WINDOW_DAYS * DAY - Date.now()) / DAY);
};

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const OrderActions = ({ order, onUpdated, compact = false }) => {
  const [mode, setMode] = useState(null); // "cancel" | "return" | null
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const canCancel = order.status === "Processing";
  const daysLeft = returnDaysLeft(order);
  const canReturn = order.status === "Delivered" && daysLeft > 0;

  const close = () => {
    setMode(null);
    setReason("");
    setOther("");
    setError("");
  };

  const submit = async () => {
    const finalReason = reason === "Other" ? other.trim() : reason;
    if (!finalReason) {
      setError(reason === "Other" ? "Please tell us the reason." : "Please select a reason.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { data } = await api.put(`/orders/${order._id}/${mode}`, { reason: finalReason });
      onUpdated(data);
      close();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const reasons = mode === "cancel" ? CANCEL_REASONS : RETURN_REASONS;

  return (
    <>
      {!compact && order.status === "Cancelled" && (
        <div className="notice notice-danger">
          <strong>Order cancelled</strong>
          {order.cancelledAt && <> on {fmt(order.cancelledAt)}</>}
          {order.cancelReason && <div>Reason: {order.cancelReason}</div>}
          {order.isPaid && <div>Your refund will be sent to the original payment method in 5–7 business days.</div>}
        </div>
      )}
      {!compact && order.status === "Return Requested" && (
        <div className="notice notice-warn">
          <strong>Return requested</strong>
          {order.returnRequestedAt && <> on {fmt(order.returnRequestedAt)}</>}
          <div>Reason: {order.returnReason}</div>
          <div>Our team will contact you shortly to arrange pickup and refund.</div>
        </div>
      )}
      {!compact && order.status === "Returned" && (
        <div className="notice notice-ok">
          <strong>Return completed</strong>
          {order.returnedAt && <> on {fmt(order.returnedAt)}</>}
          <div>Your refund will reach the original payment method in 5–7 business days.</div>
          {order.returnAdminNote && <div>Note: {order.returnAdminNote}</div>}
        </div>
      )}
      {!compact && order.status === "Return Rejected" && (
        <div className="notice notice-danger">
          <strong>Return request rejected</strong>
          {order.returnAdminNote && <div>Note: {order.returnAdminNote}</div>}
          <div>Need help? Please contact our support team.</div>
        </div>
      )}
      {!compact && canReturn && (
        <div className="notice notice-info">
          You can return this order within {RETURN_WINDOW_DAYS} days of delivery —{" "}
          <strong>{daysLeft} day{daysLeft > 1 ? "s" : ""} left</strong>.
        </div>
      )}
      {!compact && order.status === "Delivered" && !canReturn && (
        <div className="notice">The {RETURN_WINDOW_DAYS}-day return window for this order has ended.</div>
      )}
      {!compact && order.status === "Shipped" && (
        <div className="notice">This order has been shipped and can no longer be cancelled.</div>
      )}

      {(canCancel || canReturn) && (
        <div className="order-actions">
          {canCancel && (
            <button className="btn btn-danger btn-sm" onClick={() => setMode("cancel")}>
              Cancel Order
            </button>
          )}
          {canReturn && (
            <button className="btn btn-outline btn-sm" onClick={() => setMode("return")}>
              Return Order
            </button>
          )}
        </div>
      )}

      {mode && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>{mode === "cancel" ? "Cancel this order?" : "Return this order"}</h3>
            <p className="modal-sub">
              {mode === "cancel"
                ? "Your order hasn't shipped yet, so it can be cancelled free of charge."
                : `Returns are accepted within ${RETURN_WINDOW_DAYS} days of delivery. Our team will arrange pickup and refund.`}
            </p>

            <label className="modal-label">Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="modal-field">
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {reason === "Other" && (
              <textarea
                className="modal-field"
                rows={3}
                maxLength={300}
                placeholder="Tell us more…"
                value={other}
                onChange={(e) => setOther(e.target.value)}
              />
            )}
            {error && <div className="modal-error">{error}</div>}

            <div className="modal-actions">
              <button className="btn btn-outline btn-sm" onClick={close} disabled={busy}>
                Keep order
              </button>
              <button
                className={`btn btn-sm ${mode === "cancel" ? "btn-danger" : "btn-primary"}`}
                onClick={submit}
                disabled={busy}
              >
                {busy ? "Please wait…" : mode === "cancel" ? "Yes, cancel order" : "Submit return request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderActions;
