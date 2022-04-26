import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { getPost } from "~/models/post.server";
import type { Post } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  const seconds = 1;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const browserCache = minutes * 7;
  const cdnCache = days * 30;
  const staleTime = minutes * 10;

  return json<LoaderData>(
    { post, html },
    {
      headers: {
        "Cache-Control": `public, max-age=${browserCache}, s-maxage=${cdnCache}, stale-while-revalidate=${staleTime}`,
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") || "no-cache",
  };
};

export default function PostSlug() {
  const { post, html } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
