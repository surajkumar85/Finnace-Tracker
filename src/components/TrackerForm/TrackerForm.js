import React, { useEffect, useState } from "react";
import "./TrackerForm.css";
import { useFirestore } from "../../hooks/useFirestore";

function TrackerForm({ uid }) {
  const [forWhat, setForWhat] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, isPending, error, success } = useFirestore("trackers");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDocument({ uid: uid, amount, forWhat });
  };

  useEffect(() => {
    if (success) {
      setAmount("");
      setForWhat("");
    }
  }, [success]);

  return (
    <div className="tracker">
      <div className="tracker__box">
        <h1 className="tracker__heading">Add Finance</h1>
        <form className="tracker__form" onSubmit={handleSubmit}>
          <div className="tracker__formgroup">
            <label htmlFor="note">For What</label>
            <input
              value={forWhat}
              onChange={(e) => setForWhat(e.target.value)}
              type="text"
              id="note"
              className="tracker__input"
              required
            />
          </div>
          <div className="tracker__formgroup">
            <label htmlFor="amount">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              id="amount"
              className="tracker__input"
              required
            />
          </div>
          {!isPending && <button className="form__btn">Add</button>}
          {isPending && (
            <button className="form__btn" disabled>
              Adding...
            </button>
          )}
          {error && <h1>{error}</h1>}
        </form>
      </div>
    </div>
  );
}

export default TrackerForm;
