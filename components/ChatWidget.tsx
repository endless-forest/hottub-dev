"use client";

import { useEffect } from "react";

export function ChatWidget() {
  useEffect(() => {
    const widgetUrl = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_URL;
    if (!widgetUrl) return;

    const script = document.createElement("script");
    script.src = widgetUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
