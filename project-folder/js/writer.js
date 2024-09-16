class WriterNote {
    constructor() {
        const storedNotes = JSON.parse(localStorage.getItem("notes"));
        this.notes = storedNotes ? storedNotes : [];
    }

    addNote(note = "") {
        this.notes.push(note);
        this.saveNotes();
    }

    removeNote(index) {
        if (index > -1 && index < this.notes.length) {
            this.notes.splice(index, 1);
            this.saveNotes();
        }
    }

    updateNote(index, content) {
        if (index > -1 && index < this.notes.length) {
            this.notes[index] = content;
            this.saveNotes();
        }
    }

    saveNotes() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
        const timestamp = new Date().toLocaleTimeString();
        document.getElementById("timestamp").textContent = `${TIMESTAMP_UPDATED} ${timestamp}`;
    }

    getNotes() {
        return this.notes;
    }
}

class WriterUI {
    constructor() {
        this.note = new WriterNote();
        this.displayNotes();
    }

    addNoteUI() {
        this.note.addNote();
        this.displayNotes();
    }

    removeNoteUI(index) {
        this.note.removeNote(index);
        this.displayNotes();
    }

    updateNoteUI(index, content) {
        this.note.updateNote(index, content);
    }

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


class NoteWriter {
    constructor() {
        this.noteUI = new WriterUI();
        this.init();
        this.autoSave();
    }

    init() {
        const addButton = document.getElementById('addNote');
        addButton.addEventListener("click", () => this.noteUI.addNoteUI());
    }

    autoSave() {
        setInterval(() => {
            this.noteUI.note.saveNotes();
        }, 2000);
    }
}

// Initialize the write page
const write = new NoteWriter();
