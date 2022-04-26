import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireAdmin } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request, "/posts");
  return json({});
};

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
