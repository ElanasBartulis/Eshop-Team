import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext.js";
import chess from "../../assets/Public/chess.png";

export default function UserDashboard({ activeSection }) {
  const { userData } = useContext(SessionContext);

  return (
    <>
      {activeSection === "dashboard" && (
        <div>
          <div className="sm:w-full w-5/6">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <ul className="text-lg">
              <li className="grid grid-cols-4 grid-rows-1 gap-2 mb-1">
                <div className="font-semibold">Name:</div>
                <div className="col-span-3 pl-3 sm:pl-4">
                  {userData.firstName} {userData.lastName}
                </div>
              </li>
              <li className="grid grid-cols-4 grid-rows-1 gap-2 mb-1">
                <div className="font-semibold">Email:</div>
                <div className="col-span-3 pl-3 sm:pl-4">{userData.email}</div>
              </li>
              <li className="grid grid-cols-4 grid-rows-1 gap-2 mb-1">
                <div className="font-semibold">Address:</div>
                <div className="col-span-3 pl-3 sm:pl-4">
                  {userData.address || "You havent added your address"}
                </div>
              </li>
              <li className="grid grid-cols-4 grid-rows-1 gap-2 mb-1">
                <div className="font-semibold">Phone:</div>
                <div className="col-span-3 pl-3 sm:pl-4">
                  {userData.phoneNumber || "You havent added your phone number"}
                </div>
              </li>
              <li className="grid grid-cols-4 grid-rows-1 gap-2 mb-1">
                <div className="font-semibold">Post Code:</div>
                <div className="col-span-3 pl-3 sm:pl-4">
                  {userData.postCode || "You havent added your phone number"}
                </div>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex size-40 w-full justify-end">
            <img src={chess} alt="chess image" className="size-40 p-2" />
          </div>
        </div>
      )}
    </>
  );
}
