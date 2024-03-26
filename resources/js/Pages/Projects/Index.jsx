import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_TEXT_MAP } from "@/lib/constants";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("projects.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortBy = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.direction === "asc") {
        queryParams.direction = "desc";
      } else {
        queryParams.direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.direction = "asc";
    }
    router.get(route("projects.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center justify-between my-4">
                <TextInput
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                  defaultValue={queryParams.name}
                  className="py-2 px-4 w-1/2"
                  placeholder="Search..."
                />
                <div className="flex items-center gap-2">
                  <SelectInput
                    defaultValue={queryParams.status}
                    onChange={(e) =>
                      searchFieldChanged("status", e.target.value)
                    }
                    className="px-4 py-2"
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <PrimaryButton>New</PrimaryButton>
                </div>
              </div>

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-no2rap">
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      direction={queryParams.direction}
                      sortBy={sortBy}
                    >
                      ID
                    </TableHeading>
                    <th className="px-3 py-2">Image</th>
                    <TableHeading
                      name="name"
                      sort_field={queryParams.sort_field}
                      direction={queryParams.direction}
                      sortBy={sortBy}
                    >
                      Name
                    </TableHeading>
                    <TableHeading
                      name="status"
                      sort_field={queryParams.sort_field}
                      direction={queryParams.direction}
                      sortBy={sortBy}
                    >
                      Status
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_field={queryParams.sort_field}
                      direction={queryParams.direction}
                      sortBy={sortBy}
                    >
                      Create date
                    </TableHeading>
                    <TableHeading
                      name="due_date"
                      sort_field={queryParams.sort_field}
                      direction={queryParams.direction}
                      sortBy={sortBy}
                    >
                      Due Date
                    </TableHeading>
                    <th className="px-3 py-2">Created By</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th className="px-3 py-2">{project.id}</th>
                      <td className="px-3 py-2">
                        <img
                          className="w-10 h-10"
                          src={project.image_path}
                          alt="Image"
                        />
                      </td>
                      <td className="px-3 py-2">{project.name}</td>
                      <td className="px-3 py-2">
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </td>
                      <td className="px-3 py-2">{project.created_at}</td>
                      <td className="px-3 py-2">{project.due_date}</td>
                      <td className="px-3 py-2">{project.created_by.name}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("projects.edit", project.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route("projects.destroy", project.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
