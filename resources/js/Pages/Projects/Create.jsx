import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_TEXT_MAP } from "@/lib/constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
  const { post, data, setData, processing, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("projects.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projects Create
        </h2>
      }
    >
      <Head title="Projects create" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-3">
                  <InputLabel
                    className="col-span-1"
                    htmlFor="project_image_path"
                    value="Project image"
                  />
                  <div className="flex flex-col gap-2 col-span-2">
                    <TextInput
                      className="w-full"
                      type="file"
                      id="project_image_path"
                      name="project_image_path"
                      onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <InputError message={errors.image} />
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <InputLabel
                    className="col-span-1"
                    htmlFor="name"
                    value="Name"
                  />
                  <div className="flex flex-col col-span-2">
                    <TextInput
                      className="w-full"
                      id="name"
                      name="name"
                      placeholder="Project name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <InputLabel
                    className="col-span-1"
                    htmlFor="description"
                    value="Description"
                  />
                  <div className="flex flex-col col-span-2">
                    <TextAreaInput
                      id="description"
                      name="description"
                      placeholder="Type your descrition here."
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} />
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <InputLabel
                    className="col-span-1"
                    htmlFor="due_date"
                    value="Due date"
                  />
                  <div className="flex flex-col col-span-2">
                    <TextInput
                      type="date"
                      id="due_date"
                      name="due_date"
                      value={data.due_date}
                      onChange={(e) => setData("due_date", e.target.value)}
                    />
                    <InputError message={errors.due_date} />
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <InputLabel
                    className="col-span-1"
                    htmlFor="status"
                    value="Status"
                  />
                  <div className="flex flex-col col-span-2">
                    <SelectInput
                      name="status"
                      id="status"
                      className="w-full"
                      onChange={(e) => setData("status", e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                    <InputError message={errors.status} />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
