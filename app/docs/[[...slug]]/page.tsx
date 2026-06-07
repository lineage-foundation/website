import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { DocsHome } from "@/components/docs/DocsHome";
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
    return <DocsHome />;
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
