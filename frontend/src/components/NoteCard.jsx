import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-black p-4 rounded shadow">
      <h2 className="text-xl text-white font-bold">{note.title}</h2>
      <p className="text-white">{note.description}</p>
      <div className="flex justify-end mt-2">
        <button className="text-blue-500 mr-2" onClick={() => onEdit(note)}>
          <FaEdit />
        </button>
        <button className="text-red-500" onClick={() => deleteNote(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
