const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex >= 0) {
    //  const filteredNotes = notes.filter((note) => note.id !== id);
    // await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    notes.splice(noteIndex, 1);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen(`Note with id: ${id} was removed!`));
  } else {
    console.log(chalk.bgRed(`Note with id: ${id} not found!`));
  }
}

async function editNote(id, newNote) {
  const notes = await getNotes();
  notes.forEach((note) => {
    if (note.id === id) {
      note.title = newNote;
    }
  });
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen(`Note with id: ${id} was changed!`));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
  editNote,
};
