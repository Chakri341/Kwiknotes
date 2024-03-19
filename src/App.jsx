import { useState, useEffect } from "react";
import KwikNote from "./components/KwikNote";
import supabase from "./utils/supabase";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      let { data, error } = await supabase.from("notes").select("*");
      if (error) throw error;
      setNotes(data);
    } catch (error) {
      console.log("Error in the fetching data", error);
    }
  };

  const addNote = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ id: Date.now(), text: "Click Edit to write your note..." }])
        .select();

        if (error) throw error;

        setNotes([...notes, ...data]);
    } catch (error) {
      console.log("Error in addNote", error);
    }
  };

  const updateNote = async (id, newText) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({ text: newText })
        .eq("id", id)
        .select();

        if (error) throw error;

        setNotes((preNote) => preNote.map((note) => (note.id === id ? { ...note, text: newText } : note)))

    } catch (error) {
      console.log("Error in UpdateNote", error);
    }

    setNotes([...data]);
  };


  const deleteNote = async (id) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      
      if (error) throw error;

      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.log("Error in deleteNote", error);
    }
  };

  return (
    <>
      <h1 className="m-3 text-white font-bold text-5xl italic text-center p-5">
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
      <div className="flex flex-wrap m-3 p-3">
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
