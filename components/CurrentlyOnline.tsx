"use client";

import { setServerInfo } from "@/redux/slices/serverStatusSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function CurrentlyOnline() {
  const [clientsLength, setClientsLength] = useState(0);
  const [animation, setAnimation] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket(String(process.env.NEXT_PUBLIC_WEBSOCKET_URL));

    socket.addEventListener("message", (event) => {
      const clientsLength = JSON.parse(event.data).clientsLength;

      dispatch(setServerInfo({ isServerOnline: clientsLength > 0 }));
      setClientsLength(clientsLength);
      setAnimation(true);

      setTimeout(() => {
        setAnimation(false);
      }, 500);
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (clientsLength === 0) {
      const interval = setInterval(() => {
        window.location.reload();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [clientsLength, router]);

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
