import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface InputProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<InputProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const isCurrentPage = (page: number) => {
    if (page === currentPage) {
      return "z-10 border-indigo-500 bg-indigo-50 text-indigo-600";
    } else {
        return "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() =>
            setCurrentPage(
              currentPage < totalPosts ? currentPage + 1 : currentPage
            )
          }
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div> */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {pages.map((page, index) => {
              return (
                <a
                  href="#"
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  aria-current="page"
                  className={`relative inline-flex items-center border 
                 ${isCurrentPage(page)}
                  px-4 py-2 text-sm font-medium  focus:z-20`}
                >
                  {page}
                </a>
              );

              {
                /* <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={page == currentPage ? "active" : ""}
                >
                  {page}
                </button> */
              }
            })}

            {/* <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span> */}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={() =>
                setCurrentPage(
                  currentPage < Math.ceil(totalPosts / postsPerPage) ? currentPage + 1 : currentPage
                )
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>

    // ------------------------------------------------------

    // <div className='pagination'>
    //     {pages.map((page, index) => {
    //         return (
    //             <button
    //                 key={index}
    //                 onClick={() => setCurrentPage(page)}
    //                 className={page == currentPage ? "active" : ""}>
    //                 {page}
    //             </button>
    //         );
    //     })}
    // </div>
  );
};

export default Pagination;
