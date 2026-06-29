// STEP 1 — DEFINE THE CRITERIA


const CRITERIA = [
    {
        label: "At least 8 characters",
        test: (password) => password.length >= 8
        // .length gives us the number of characters in the string
    },
    {
        label: "Uppercase letter (A–Z)",
        test: (password) => /[A-Z]/.test(password)
        // /[A-Z]/ matches any uppercase letter A through Z
    },
    {
        label: "Lowercase letter (a–z)",
        test: (password) => /[a-z]/.test(password)
        // /[a-z]/ matches any lowercase letter a through z
    },
    {
        label: "Number (0–9)",
        test: (password) => /[0-9]/.test(password)
        // /[0-9]/ matches any digit from 0 to 9
    },
    {
        label: "Special character (!@#$%...)",
        test: (password) => /[^A-Za-z0-9]/.test(password)
        // [^A-Za-z0-9] means "anything that is NOT a letter or number"
        // The ^ inside square brackets means "not"
    }
];

// STEP 2 — DEFINE STRENGTH LEVELS


const LEVELS = [
    null,                                        // 0 criteria — no input yet
    { segs: 1, color: "#E24B4A", label: "Too weak" },  // 1/5 criteria
    { segs: 2, color: "#E24B4A", label: "Weak" },  // 2/5 criteria
    { segs: 3, color: "#EF9F27", label: "Fair" },  // 3/5 criteria
    { segs: 4, color: "#378ADD", label: "Good" },  // 4/5 criteria
    { segs: 4, color: "#639922", label: "Strong" }   // 5/5 criteria
];

// STEP 3 — THE MAIN FUNCTION

function checkPassword(password) {

    // Count how many criteria the password satisfies
    // .filter() keeps only the items where test() returns true
    // .length tells us how many were kept
    const score = password.length === 0
        ? 0
        : CRITERIA.filter((c) => c.test(password)).length;

    // Look up the matching level object
    const level = LEVELS[score];


    // --- UPDATE THE STRENGTH BAR ---
    // Loop through segments 1 to 4
    for (let i = 1; i <= 4; i++) {
        const segment = document.getElementById("seg" + i);

        if (level && i <= level.segs) {
            segment.style.background = level.color; // fill with level colour
        } else {
            segment.style.background = "#e0e0e0";   // reset to grey
        }
    }


    // --- UPDATE THE STRENGTH LABEL ---
    const label = document.getElementById("strengthLabel");
    const display = document.getElementById("scoreDisplay");

    if (level) {
        label.textContent = level.label;
        label.style.color = level.color;
        display.textContent = score + " / 5 criteria met";
    } else {
        label.textContent = "Enter a password to begin";
        label.style.color = "#aaa";
        display.textContent = "";
    }


    // --- UPDATE THE CRITERIA LIST ---
    renderCriteria(password);
}

// STEP 4 — RENDER THE CRITERIA LIST

function renderCriteria(password) {
    const container = document.getElementById("criteriaList");

    container.innerHTML = CRITERIA.map((c) => {
        const met = password.length > 0 && c.test(password);

        return `
          <div class="criterion">
            <span class="icon ${met ? "met" : "unmet"}">${met ? "✅" : "⚪"}</span>
            <span class="label ${met ? "met" : "unmet"}">${c.label}</span>
          </div>
        `;
    }).join("");
}

// STEP 5 — SHOW / HIDE PASSWORD TOGGLE

function toggleVisibility() {
    const input = document.getElementById("passwordInput");

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// INITIALISE
renderCriteria("");
