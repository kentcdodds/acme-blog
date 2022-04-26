import { Link, Outlet } from "@remix-run/react";
export default function PostsRoute() {
  return (
    <div>
      <div className="mx-auto mt-6 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          ACME Blog
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
