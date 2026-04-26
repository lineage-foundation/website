import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";
import { URL_GITHUB_ORG } from "@/lib/constants";

export const metadata = docsPageMetadata({
  title: "API usage",
  description:
    "Tutorials for using the Lineage HTTP API and integrating with open-source tooling.",
  path: "/docs/api-tutorials",
});

export default function ApiTutorialsIndexPage() {
  return (
    <DocsArticle title="API usage">
      <p>
        This section collects tutorials that go beyond the raw endpoint
        reference: how to think about requests, what to verify first, and how
        to line up with the{" "}
        <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
          published repositories
        </a>{" "}
        and release process.
      </p>
      <p>
        Continue with the{" "}
        <Link href="/docs/api-tutorials/get-started">Get started</Link> walkthrough
        for a practical order of operations, then use{" "}
        <Link href="/docs/api/overview">API overview</Link> to jump into
        mempool, storage, or miner reference material.
      </p>
    </DocsArticle>
  );
}
