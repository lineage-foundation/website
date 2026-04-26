import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { segmentsToPath, titleFromSegments } from "@/lib/docs-catchall-config";
import { getPortedDocPage } from "@/lib/docs-ported";
import { URL_GITHUB_ORG } from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";
import { allCatchallStaticSlugs, allDocsNavHrefs } from "@/lib/flatten-doc-nav-hrefs";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return allCatchallStaticSlugs();
}

export async function generateMetadata({ params }: Props) {
  const { slug = [] } = await params;
  if (slug.length === 0) {
    return docsPageMetadata({
      title: "Documentation",
      description:
        "Developer documentation for Lineage — concepts, tutorials, and API reference.",
      path: "/docs",
    });
  }
  const path = segmentsToPath(slug);
  const displayTitle = titleFromSegments(slug);
  const ported = getPortedDocPage(path);
  if (ported) {
    return docsPageMetadata({
      title: ported.title ?? displayTitle,
      description: ported.description,
      path,
    });
  }
  return docsPageMetadata({
    title: displayTitle,
    description: `Lineage documentation — ${displayTitle}.`,
    path,
  });
}

export default async function DocsCatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const path = segmentsToPath(slug);
  if (!allDocsNavHrefs().includes(path)) {
    notFound();
  }

  if (slug.length === 0) {
    return (
      <DocsArticle title="Welcome to Lineage">
        <p>
          Here you can find what you need to build on Lineage: how the network is
          structured, how to integrate with the HTTP API, and links to deeper
          guides. Whether you are evaluating the protocol or shipping an
          integration, this section is the entry point for technical material.
        </p>
        <p>
          Use the left-hand navigation to move between{" "}
          <Link href="/docs/concepts">concepts</Link>,{" "}
          <Link href="/docs/tutorials-overview">tutorials</Link>, and the{" "}
          <Link href="/docs/api/overview">API</Link>. Open-source repositories
          and community discussion are linked from the main site; the{" "}
          <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
            Lineage Foundation GitHub organisation
          </a>{" "}
          is the hub for code and issues.
        </p>
        <h2>Before you dive in</h2>
        <ul>
          <li>
            <Link href="/docs/concepts">Network concepts</Link> — node roles and
            how data moves through the system.
          </li>
          <li>
            <Link href="/docs/api/overview">API overview</Link> — how the public
            HTTP API is organised (mempool, storage, miner).
          </li>
          <li>
            <Link href="/docs/api-tutorials/get-started">API quick start</Link>{" "}
            — suggested workflow when you are ready to call endpoints.
          </li>
        </ul>
      </DocsArticle>
    );
  }

  const displayTitle = titleFromSegments(slug);
  const ported = getPortedDocPage(path);
  if (ported) {
    return (
      <DocsArticle title={ported.title ?? displayTitle}>
        {ported.children}
      </DocsArticle>
    );
  }

  return (
    <DocsArticle title={displayTitle}>
      <p>
        This topic appears in the navigation but does not have a full article
        here yet. Open an issue or pull request on{" "}
        <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
          GitHub
        </a>{" "}
        to help add it, or use the <Link href="/docs">docs home</Link> to find
        nearby material.
      </p>
    </DocsArticle>
  );
}
