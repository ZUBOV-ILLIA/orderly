"use client";

import { useEffect, useState } from "react";

export default function CurrentlyOnline() {
  const [clientsLength, setClientsLength] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(String(process.env.NEXT_PUBLIC_WEBSOCKET_URL));
    // const socket = new WebSocket("ws://localhost:3005");

    socket.addEventListener("message", (event) => {
      setClientsLength(JSON.parse(event.data).clientsLength);
      setAnimation(true);

      setTimeout(() => {
        setAnimation(false);
      }, 500);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center gap-1 lh-1">
      <span
        className={`text-success fw-bold animate__animated ${animation ? "animate__headShake" : ""}`}
      >
        {clientsLength > 0 ? (
          clientsLength
        ) : (
          <div
            className="spinner-border spinner-border-sm text-info"
            role="status"
          />
        )}
      </span>
      <span className="text-secondary fw-light ">Online</span>
    </div>
  );
}
