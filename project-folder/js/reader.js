class ReaderNote {
    constructor() {
        this.notes = [];
    }

    retrieveNotes() {
        const storedNotes = JSON.parse(localStorage.getItem("notes"));
        this.notes = storedNotes ? storedNotes : [];
        return this.notes;
    }
}

class ReaderUI {
    constructor() {
        this.note = new ReaderNote();
        this.displayNotes();
    }

    displayNotes() {
        const notes = this.note.retrieveNotes();
        const notesList = document.getElementById("notes");
        notesList.innerHTML = "";

        const rowDiv = document.createElement("div");

        notes.forEach((note) => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("mb-3", "note-card");

            const card = `
                <div class="card">
                    <div class="card-body">
                        <textarea class="form-control note-textarea" readonly>${note}</textarea>
                    </div>
                </div>
            `;
            cardDiv.innerHTML = card;

            // Append card to the row
            rowDiv.appendChild(cardDiv);
        });

        // Append row to the notesList
        notesList.appendChild(rowDiv);

        const timestamp = new Date().toLocaleTimeString();
        document.getElementById("timestamp").textContent = `${TIMESTAMP_SAVED} ${timestamp}`;
    }
}



class Reader {
    constructor() {
        this.noteUI = new ReaderUI();
        this.autoRetrieve();
    }

    autoRetrieve() {
        setInterval(() => {
            this.noteUI.displayNotes();
        }, 2000); 
    }
}

// Initialize the reader page
const reader = new Reader();
