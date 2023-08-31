import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const createNoteMutation = api.notes.create.useMutation();
  const getAllNotesQuery = api.notes.getAll.useQuery();

  const [text, setText] = useState<string>();

  function createNote() {
    if (!text) {
      return;
    }

    createNoteMutation.mutate(
      { text },
      {
        async onSuccess() {
          await getAllNotesQuery.refetch();
        },
      },
    );
  }

  return (
    <>
      <Head>
        <title>NotesApp</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex items-center space-x-4">
            <input
              className="w-[300px] rounded p-2 text-black"
              onChange={(e) => setText(e.target.value)}
            />
            {createNoteMutation.isLoading ? (
              <div className="w-[180px]">Inserting note...</div>
            ) : (
              <button
                className="w-[180px] rounded bg-[hsl(280,100%,70%)] p-2 hover:bg-[hsl(280,100%,70%)]/70"
                onClick={createNote}
              >
                Insert new note
              </button>
            )}
          </div>
          {getAllNotesQuery.isLoading ? (
            <div>Loading notes...</div>
          ) : (
            <>
              {getAllNotesQuery.data ? (
                <div className="flex flex-col items-center">
                  <div className="mb-3 text-2xl">Notes:</div>
                  {getAllNotesQuery.data.map((note) => (
                    <div key={note.id}>{note.text}</div>
                  ))}
                </div>
              ) : (
                <div>Could not retrieve notes.</div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
