import React, { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "./store";

function ServiceWorkerInstalledMessage() {
  const { serviceWorkerRegistered } = useTypedSelector(
    (state) => state.serviceWorkerRegistration
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (serviceWorkerRegistered) {
      setShow(true);
    }
  }, [serviceWorkerRegistered]);

  if (!serviceWorkerRegistered || !show) {
    return null;
  }

  function onClick() {
    setShow(false);
  }
  return (
    <div>
      This app works offline. <button onClick={onClick}>Hide</button>
    </div>
  );
}

function ServiceWorkerUpdatedMessage() {
  const dispatch = useAppDispatch();
  const { serviceWorkerUpdated, serviceWorkerRegistration } = useTypedSelector(
    (state) => state.serviceWorkerRegistration
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (serviceWorkerUpdated) {
      setShow(true);
    }
  }, [serviceWorkerUpdated]);

  const registrationWaiting = serviceWorkerRegistration?.waiting;

  if (!serviceWorkerUpdated || !show || !registrationWaiting) {
    return null;
  }

  function reloadPage() {
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" });

      registrationWaiting.addEventListener("statechange", (e) => {
        // eslint-disable-next-line no-console
        console.log('e,typeof e', e, typeof e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e?.target?.state === "activated") {
          setShow(false);
          window.location.reload();
        }
      });
    }
  };
  return (
    <div>
      There's an update available. <button onClick={reloadPage}>Update</button>
    </div>
  );
}

function ServiceWorkerMessages() {
  return (
    <>
      <ServiceWorkerInstalledMessage />
      <ServiceWorkerUpdatedMessage />
    </>
  );
}

export default ServiceWorkerMessages;
