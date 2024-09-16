/**
 * Acknowledgement:
 * This code was developed with the assistance of ChatGPT.
 * ChatGPT was used to provide guidance on code structure and documentation.
 */

/**
 * Represents a note reader.
 * Retrieves notes from local storage and manages their state.
 */
class ReaderNote {
    /**
     * Initializes an empty list of notes.
     */
    constructor() {
        this.notes = [];
    }

    /**
     * Retrieves notes from local storage.
     * If notes are found, they are loaded into the instance.
     * If no notes are found, an empty list is used.
     * @returns {Array<string>} The list of notes retrieved from local storage.
     */
    retrieveNotes() {
        const storedNotes = JSON.parse(localStorage.getItem("notes"));
        this.notes = storedNotes ? storedNotes : [];
        return this.notes;
    }
}

/**
 * Handles the UI for displaying notes.
 * Manages the rendering of notes on the reader page.
 */
class ReaderUI {
    /**
     * Initializes the ReaderUI, creates a new ReaderNote instance,
     * and displays the notes on the page.
     */
    constructor() {
        this.note = new ReaderNote();
        this.displayNotes();
    }

     /**
     * Displays the notes on the page.
     * Creates and appends a card for each note, setting up the layout
     * and displaying the last updated timestamp.
     */
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


/**
 * Manages the auto-retrieval of notes and updates the UI.
 */
class Reader {
    /**
     * Initializes the Reader instance, sets up the ReaderUI,
     * and starts auto-retrieving notes.
     */
    constructor() {
        this.noteUI = new ReaderUI();
        this.autoRetrieve();
    }

    /**
     * Sets up an interval to retrieve and display notes every 2 seconds.
     */
    autoRetrieve() {
        setInterval(() => {
            this.noteUI.displayNotes();
        }, 2000); 
    }
}

// Initialize the reader page
const reader = new Reader();
