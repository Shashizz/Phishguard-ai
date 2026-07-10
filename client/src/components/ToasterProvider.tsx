/*
 * ToasterProvider — Dark-themed toast notification container
 */
import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "rgba(13, 17, 23, 0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#FFFFFF",
          backdropFilter: "blur(16px)",
        },
        className: "border-[rgba(255,255,255,0.08)]",
      }}
      richColors
    />
  );
}
