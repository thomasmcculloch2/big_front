import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
//import logout user
import { logoutUser } from "../../pages/api/index";
import { FC } from "react";

import Link from "next/link";
import NextLink from "next/link";
import { AuthContext } from "../../context";

const DoctorNavigation = [
  { name: "Home", href: "/doctor-table", icon: HomeIcon, current: true },
  {
    name: "Task History",
    href: "/my-submissions",
    icon: InboxIcon,
    current: false,
  },
];

const PatientNavigation = [
  { name: "Home", href: "/my-submissions", icon: HomeIcon, current: true },
  {
    name: "New Submission",
    href: "/new-submission",
    icon: PlusIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children: React.ReactNode;
}

export const Sidebar: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLogedIn, role, logoutUserContext } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: logout, isError } = useMutation(
    async () => await logoutUser(),
    {
      onSuccess(data) {
        localStorage.removeItem("token");
        logoutUserContext();
        router.push("/login");
      },
      onError(error: any) {
        alert(error.request.statusText);
        //setErrorMessage(error.request.statusText)
      },
    }
  );

  const onLogOut = () => {
    logout();
  };

  const onInfo = () => {
    router.push("/patient-info");
  };


  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {role == "doctor"
                        ? DoctorNavigation.map((item) => (
                            <NextLink
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                router.asPath == item.href
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                              )}
                              
                            >
                              <item.icon
                                className={classNames(
                                  router.asPath == item.href
                                    ? "text-gray-300"
                                    : "text-gray-400 group-hover:text-gray-300",
                                  "mr-4 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </NextLink>
                          ))
                        : PatientNavigation.map((item) => (
                            <NextLink
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                router.asPath == item.href
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                              )}
                              
                            >
                              <item.icon
                                className={classNames(
                                  router.asPath == item.href
                                    ? "text-gray-300"
                                    : "text-gray-400 group-hover:text-gray-300",
                                  "mr-4 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </NextLink>
                          ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                        
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Tom Cook
                          </p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            Sign Out
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {role == "doctor"
                  ? DoctorNavigation.map((item) => (
                      <NextLink
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.asPath == item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </NextLink>
                    ))
                  : PatientNavigation.map((item) => (
                      <NextLink
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.asPath == item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </NextLink>
                    ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  {role == "patient" ? (
                    <a href="#" onClick={() => onInfo()} className="text-sm font-medium text-white">
                      {user?.name}
                    </a>
                  ) : (
                    <a className="text-sm font-medium text-white">
                      {user?.name}
                    </a>
                  )}
                  {isLogedIn ? (
                    <Link href="/login">
                      <div className="ext-xs font-medium text-gray-300 group-hover:text-gray-200">
                        Sign In
                      </div>
                    </Link>
                  ) : (
                    <Link href="#">
                      <div
                        onClick={() => onLogOut()}
                        className="ext-xs font-medium text-gray-300 group-hover:text-gray-200"
                      >
                        Log out
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto  px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
