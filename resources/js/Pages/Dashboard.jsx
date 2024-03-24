import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Dashboard({ auth, users }) {
  const perpage = useRef(10);
  const search = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePerPage = (e) => {
    perpage.current = e.target.value;
    getData();
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  const getData = () => {
    setIsLoading(true);
    router.get(
      route().current(),
      {
        perpage: perpage.current,
      },
      {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setIsLoading(false),
      }
    );
  };

  const { data, links, meta } = users;
  console.log(meta);
  //   console.log(users);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="my-4 flex items-center gap-6">
                <select
                  name="perpage"
                  id="perpage"
                  className="rounded-lg"
                  value={perpage.current}
                  onChange={handleChangePerPage}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <div>
                  <form>
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      onChange={handleSearch}
                      className="border rounded-md px-2 py-1"
                    />
                  </form>
                </div>
              </div>
              <div>
                <table className="w-full">
                  <thead className="bg-slate-700 text-white py-2">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Created at</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    ) : (
                      data.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td>
                            <button>Edit</button> | <button>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-slate-600">
                    Showing {meta.from} to {meta.to} of total {meta.total}
                  </p>
                  <div className="flex items-center gap-2">
                    {meta.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        className={
                          link.active
                            ? `bg-white text-slate-700 border border-slate-700 rounded px-[7px] py-[3]`
                            : `bg-slate-700 text-white py-1 px-2 text-sm rounded`
                        }
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        ></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
