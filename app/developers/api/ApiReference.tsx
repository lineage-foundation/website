"use client";

import Script from "next/script";

/**
 * Renders the Scalar API reference for the checked-in OpenAPI document.
 *
 * The spec at `/openapi.json` is generated from the fleet API and refreshed with
 * `scripts/update-openapi.mjs`, so this page never hand-tracks endpoints. Scalar's
 * standalone bundle is loaded from a CDN; once ready it mounts the reference onto the
 * container using the current `createApiReference` API.
 */
export function ApiReference() {
  return (
    <>
      <div id="scalar-api-reference" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest"
        strategy="afterInteractive"
        onLoad={() => {
          const scalar = (
            window as unknown as {
              Scalar?: {
                createApiReference: (
                  selector: string,
                  configuration: Record<string, unknown>,
                ) => void;
              };
            }
          ).Scalar;

          scalar?.createApiReference("#scalar-api-reference", {
            url: "/openapi.json",
            hideDownloadButton: false,
          });
        }}
      />
    </>
  );
}
