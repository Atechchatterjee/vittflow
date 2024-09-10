"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-10">
      <div className="flex flex-col items-center gap-4">
        <h2>Something went wrong!</h2>
        <div className="flex gap-2">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => setShowError((err) => !err)}>
            Show Error logs
          </Button>
        </div>
      </div>
      {showError ? (
        <div className="flex flex-col gap-2 text-center">
          <h4>{error.message}</h4>
          <p className="text-center">{error.stack}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
