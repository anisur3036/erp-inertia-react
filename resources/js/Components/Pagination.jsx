import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link, index) => (
        <Link
          preserveScroll
          href={link.url}
          key={index}
          className={
            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
            (link.active ? "bg-gray-900 " : "") +
            (!link.url
              ? "!text-gray-500 cursor-not-allowed "
              : "hover:bg-gray-900 ")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
