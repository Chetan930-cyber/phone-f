import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { closeComplaint, getComplaint } from "../../features/complaints/complaintSlice";
import { useParams } from "react-router-dom";
import { createNote, getNotes } from "../../features/notes/noteSlice";

const SingleComplaint = () => {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { complaint, isLoading, isError, message } = useSelector((state) => state.complaints);
  const { notes, isLoading: noteLoading, isError: noteError, message: noteErrorMessage } = useSelector((state) => state.notes);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ id, text }));
    setText("");
  };

  const handleCloseComplaint = () => {
    dispatch(closeComplaint(id));
  };

  useEffect(() => {
    dispatch(getComplaint(id));
    dispatch(getNotes(id));

    if ((isError && message) || (noteError && noteErrorMessage)) {
      toast.error(message);
    }
  }, [dispatch, id, isError, message, noteError, noteErrorMessage]);

  if (isLoading || noteLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <BackButton url={user.access ? "/admin/complaints" : "/complaints"} />

      {/* Complaint Details */}
      <div className="border rounded-md p-5 sm:p-6 my-5 flex flex-col sm:flex-row items-center justify-between bg-white shadow-md transition-transform transform hover:scale-105">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold my-2 text-blue-600">Device: {complaint.model}</h1>
          <h2 className="text-md sm:text-lg my-2 text-gray-800">Date: {new Date(complaint.createdAt).toLocaleDateString("en-IN")}</h2>
          <p className="text-sm sm:text-md my-2 text-gray-700">Serial No.: {complaint.serial_number}</p>
          <p className="my-2 sm:my-3">
            Status:
            <span className={`py-1 px-3 rounded-full font-semibold text-white ${complaint.status === "closed" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
              {complaint.status}
            </span>
          </p>
          <p className="text-sm sm:text-md my-2 sm:my-3 text-gray-700 font-bold max-w-sm">{complaint.description}</p>
        </div>
        <img className="h-40 sm:h-56 rounded-lg border shadow-sm mt-4 sm:mt-0" src={complaint.product_image} alt={complaint.model} />
      </div>

      {/* Notes Section */}
      <div className="p-5 sm:p-6 border rounded-md bg-white shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">Add Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Note Here"
            className="border p-3 sm:p-4 w-full rounded-md placeholder:text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          />
          <button className="mt-3 bg-purple-500 text-white p-2 sm:p-3 rounded-md w-full hover:bg-purple-700 transition duration-300">
            Submit
          </button>

          <div className="mt-4">
            {notes.map((note) => (
              <div key={note._id} className={note.isStaff ? "p-3 sm:p-4 border rounded-md my-2 bg-slate-200" : "p-3 sm:p-4 border rounded-md my-2"}>
                <h1 className="text-lg sm:text-xl font-bold my-1 text-blue-600">{note.text}</h1>
                <p className="text-xs sm:text-sm text-gray-500 my-1">{note.user}</p>
                <p className="text-xs sm:text-sm text-gray-500 my-1">{new Date(note.createdAt).toLocaleDateString("en-IN")}</p>
              </div>
            ))}
          </div>
        </form>
      </div>

      {/* Close Complaint Button */}
      <button
        onClick={() => handleCloseComplaint(complaint._id)}
        className="mt-4 bg-red-500 w-full p-2 sm:p-3 text-white rounded-md hover:bg-red-900 duration-200 disabled:bg-gray-600 cursor-pointer"
        disabled={complaint.status === "closed"}
      >
        <p className="font-bold">{complaint.status === "closed" ? "CLOSED" : "CLOSE COMPLAINT NOW"}</p>
      </button>
    </div>
  );
};

export default SingleComplaint;
