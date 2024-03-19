import { useState } from "react";
import KwikNote from "./components/KwikNote";

function App() {
  const [notes, setNotes] = useState([]);
  const addNote = () => {
    setNotes([
      ...notes,
      { id: Date.now(), text: "Click Edit to write your note..." },
    ]);
  };
  const updateNote = (id, newText) => {
    setNotes((preNote) =>
      preNote.map((note) => note.id === id ? { ...note, text:newText } : note
      )
    );
    console.log(notes);
  };
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  return (
    <>
      <h1 className="m-3 ml-5 text-white font-bold text-5xl italic text-center p-3">
        Kwik Note
      </h1>
      <div className="text-center m-2">
        <button
          onClick={addNote}
          className="text-white bg-green-700 hover:bg-green-800 px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg"
        >
          ADD NOTE
        </button>
      </div>
      <div className="flex flex-wrap">
        {notes.map((note) => (
          <KwikNote
            key={note.id}
            id={note.id}
            text={note.text}
            onUpdate={updateNote}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
