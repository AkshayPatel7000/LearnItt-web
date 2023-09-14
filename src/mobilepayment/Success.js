import React, { useEffect, useState } from "react";
import "./Success.css";
import { useSearchParams } from "react-router-dom";
function Success() {
  const [searchParams] = useSearchParams();
  const [flag, setflag] = useState(false);

  useEffect(() => {
    if (searchParams.get("status")?.toLowerCase() === "success") {
      setflag(!flag);
    }
  }, []);

  const Android = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ key: "value" }));
  };
  return (
    <div className="d-flex justify-content-center h-100">
      {flag ? (
        <div className="card cardSuccess">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
              margin: "auto",
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1 className="H1">Success</h1>
          <p className="P1">
            We received your purchase request
            <br /> we'll be in touch shortly!
          </p>
          <button onClick={() => Android()} className="buttonSuccess">
            OK
          </button>
        </div>
      ) : (
        <div className="card cardFail">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
              margin: "auto",
            }}
          >
            <i className="cross">✘</i>
          </div>
          <h1 className="H2">Failed</h1>
          <p className="P1">Failed received your purchase request</p>
          <button onClick={() => Android()} className="buttonSuccess">
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Success;
