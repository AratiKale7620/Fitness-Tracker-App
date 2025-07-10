const form = document.getElementById('fitness-form');
const entryList = document.getElementById('entry-list');
const clearBtn = document.getElementById('clear-btn');
const dateDisplay = document.getElementById('date-display');


const today = new Date().toISOString().split('T')[0];
// dateDisplay.innerText = `📆 Date: ${today}`;


window.onload = () => {
  const stored = JSON.parse(localStorage.getItem('fitnessEntries')) || {};
  const todayEntries = stored[today] || [];
  todayEntries.forEach(addEntryToList);
};


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const activity = document.getElementById('activity').value.trim();
  const duration = document.getElementById('duration').value.trim();
  const calories = document.getElementById('calories').value.trim();

  if (!activity || !duration || !calories) return;

  const entry = { activity, duration, calories };
  addEntryToList(entry);
  storeEntry(entry);
  form.reset();
});

// Add entry to DOM
function addEntryToList(entry) {
  const li = document.createElement('li');
  li.textContent = `${entry.activity} - ${entry.duration} mins - ${entry.calories} cal`;
  entryList.appendChild(li);
}

function storeEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('fitnessEntries')) || {};
  if (!entries[today]) entries[today] = [];
  entries[today].push(entry);
  localStorage.setItem('fitnessEntries', JSON.stringify(entries));
}

clearBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear today's entries?")) {
    const entries = JSON.parse(localStorage.getItem('fitnessEntries')) || {};
    delete entries[today];
    localStorage.setItem('fitnessEntries', JSON.stringify(entries));
    entryList.innerHTML = '';
  }
});
