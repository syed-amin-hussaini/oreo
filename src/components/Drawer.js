import { signOut, useSession } from "next-auth/react";
import { destroyCookie } from "nookies";
import React from "react";
import Avatar from "@/src/images/avatar.png";
import Link from "next/link";

const Drawer = () => {
  const { data: session } = useSession();

  const handleSignout = (e) => {
    e.preventDefault();
    destroyCookie(null, "user", { path: "/" });
    signOut();
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
        {/* <h5 className="me-3 ms-1 mt-1 text-danger text-capitalize"> */}
         Hello  {session?.user?.name || "guest"}
        </h5>
        {/* </h5> */}
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={handleSignout}
            className="btn btn-outline-primary d-flex align-items-center me-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div className="offcanvas-body">
        <Link className="" href="/profile">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Drawer;
