/**
 * Acknowledgement:
 * This code was developed with the assistance of ChatGPT.
 * ChatGPT was used to provide guidance on code structure and documentation.
 */

/**
 * Manages the storage and manipulation of notes.
 * Handles adding, removing, updating, and saving notes to local storage.
 */
class WriterNote {
    /**
     * Initializes the WriterNote instance and loads notes from local storage.
     */
    constructor() {
        const storedNotes = JSON.parse(localStorage.getItem("notes"));
        this.notes = storedNotes ? storedNotes : [];
    }

    /**
     * Initializes the WriterNote instance and loads notes from local storage.
     */
    addNote(note = "") {
        this.notes.push(note);
        this.saveNotes();
    }

    /**
     * Removes a note from the list by index and saves the updated list to local storage.
     * @param {number} index - The index of the note to remove.
     */
    removeNote(index) {
        if (index > -1 && index < this.notes.length) {
            this.notes.splice(index, 1);
            this.saveNotes();
        }
    }

    /**
     * Updates the content of a note at the specified index and saves the updated list to local storage.
     * @param {number} index - The index of the note to update.
     * @param {string} content - The new content for the note.
     */
    updateNote(index, content) {
        if (index > -1 && index < this.notes.length) {
            this.notes[index] = content;
            this.saveNotes();
        }
    }

    /**
     * Saves the current list of notes to local storage and updates the timestamp display.
     */
    saveNotes() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
        const timestamp = new Date().toLocaleTimeString();
        document.getElementById("timestamp").textContent = `${TIMESTAMP_SAVED} ${timestamp}`;
    }

    /**
     * Retrieves the current list of notes.
     * @returns {Array<string>} The list of notes.
     */
    getNotes() {
        return this.notes;
    }
}

/**
 * Retrieves the current list of notes.
 * @returns {Array<string>} The list of notes.
 */
class WriterUI {
    /**
     * Initializes the WriterUI instance and displays existing notes.
     */
    constructor() {
        this.note = new WriterNote();
        this.displayNotes();
    }

    /**
     * Adds a new note to the UI and updates the display.
     */
    addNoteUI() {
        this.note.addNote();
        this.displayNotes();
    }

    /**
     * Removes a note from the UI by index and updates the display.
     * @param {number} index - The index of the note to remove.
     */
    removeNoteUI(index) {
        this.note.removeNote(index);
        this.displayNotes();
    }

     /**
     * Updates the content of a note in the UI by index and updates the display.
     * @param {number} index - The index of the note to update.
     * @param {string} content - The new content for the note.
     */
    updateNoteUI(index, content) {
        this.note.updateNote(index, content);
    }

    /**
     * Displays the notes in the UI, creating and appending UI elements for each note.
     */
    displayNotes() {
        const notes = this.note.getNotes();
        const notesList = document.getElementById("notes");
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("mb-3", "note-card"); 
    
            const card = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <textarea class="form-control note-textarea">${note}</textarea>
                            <button class="btn btn-danger btn-sm ms-3">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            cardDiv.innerHTML = card;
    
            // Find the textarea and delete button within the card
            const textarea = cardDiv.querySelector("textarea");
            const deleteButton = cardDiv.querySelector("button");
    
            // Attach input event to update the note
            textarea.addEventListener("input", () => this.updateNoteUI(index, textarea.value));
    
            // Attach click event to remove the note
            deleteButton.addEventListener("click", () => this.removeNoteUI(index));
    
            notesList.appendChild(cardDiv);
        });
    }
    
}

/**
 * Manages the note writing page, including initializing the WriterUI,
 * setting up the add note button, and auto-saving notes.
 */
class NoteWriter {
    /**
     * Initializes the NoteWriter instance, sets up the WriterUI,
     * and starts the auto-save feature.
     */
    constructor() {
        this.noteUI = new WriterUI();
        this.init();
        this.autoSave();
    }

    /**
     * Sets up the event listener for the add note button.
     */
    init() {
        const addButton = document.getElementById('addNote');
        addButton.addEventListener("click", () => this.noteUI.addNoteUI());
    }

    /**
     * Sets up the event listener for the add note button.
     */
    autoSave() {
        setInterval(() => {
            this.noteUI.note.saveNotes();
        }, 2000);
    }
}

// Initialize the write page
const write = new NoteWriter();
