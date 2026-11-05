
const steps = [
{
    label: "STEP 01 — CONNECTION",
    title: "Start MongoDB Shell",
    description: "Open your terminal and connect to a running MongoDB server.",
    hint: "Run this command in your system terminal.",
    code: "mongosh"
},
{
    label: "STEP 02 — DATABASE",
    title: "Create and select a database",
    description: "Select CollegeDB. MongoDB creates the database when data is first stored.",
    hint: "Use db to display the selected database.",
    code: `use CollegeDB

db`
},
{
    label: "STEP 03 — COLLECTION",
    title: "Create a collection",
    description: "Create a collection named students and display all collections.",
    hint: "Run each command separately.",
    code: `db.createCollection("students")

show collections`
},
{
    label: "STEP 04 — INSERT",
    title: "Insert documents",
    description: "insertOne() inserts a single record. insertMany() inserts multiple records.",
    hint: "Student records from the experiment.",
    code: `db.students.insertOne({
  rollNo: 101,
  name: "Arun",
  department: "CSE",
  age: 20,
  mark: 85
})

db.students.insertMany([
  { rollNo: 102, name: "Priya", department: "IT", age: 21, mark: 92 },
  { rollNo: 103, name: "Kumar", department: "CSE", age: 19, mark: 78 },
  { rollNo: 104, name: "Divya", department: "ECE", age: 20, mark: 88 },
  { rollNo: 105, name: "Ravi", department: "CSE", age: 22, mark: 67 }
])`
},
{
    label: "STEP 05 — RETRIEVE",
    title: "Retrieve documents",
    description: "Use find() to retrieve records and findOne() to retrieve one matching record.",
    hint: "pretty() displays records in readable format.",
    code: `db.students.find()

db.students.find().pretty()

db.students.find({ name: "Priya" })

db.students.findOne({ department: "CSE" })`
},
{
    label: "STEP 06 — FILTER",
    title: "Apply conditions to queries",
    description: "Use comparison and membership operators to filter student records.",
    hint: "Operators: $gt, $gte, $lte, $in and $lt.",
    code: `db.students.find({ mark: { $gt: 80 } })

db.students.find({
  age: { $gte: 20, $lte: 21 }
})

db.students.find({
  department: { $in: ["CSE", "IT"] }
})

db.students.find({ mark: { $lt: 80 } })`
},
{
    label: "STEP 07 — UPDATE",
    title: "Update documents",
    description: "updateOne() modifies one record. updateMany() modifies multiple matching records.",
    hint: "$set assigns a value and $inc increases a numeric value.",
    code: `db.students.updateOne(
  { rollNo: 101 },
  { $set: { mark: 90 } }
)

db.students.updateMany(
  { department: "CSE" },
  { $inc: { mark: 5 } }
)

db.students.find()`
},
{
    label: "STEP 08 — DELETE",
    title: "Delete documents",
    description: "deleteOne() removes one matching document. deleteMany() removes all matching documents.",
    hint: "Verify the remaining records.",
    code: `db.students.deleteOne({ rollNo: 105 })

db.students.deleteMany({
  mark: { $lt: 70 }
})

db.students.find()`
},
{
    label: "STEP 09 — SORT & LIMIT",
    title: "Sort and limit query results",
    description: "sort() arranges records. limit() restricts the number of returned documents.",
    hint: "A value of -1 sorts in descending order.",
    code: `db.students.find().sort({ mark: -1 })

db.students.find()
  .sort({ mark: -1 })
  .limit(3)`
},
{
    label: "STEP 10 — COUNT",
    title: "Count documents",
    description: "countDocuments() returns the total number of matching documents.",
    hint: "The second command counts only CSE students.",
    code: `db.students.countDocuments()

db.students.countDocuments({
  department: "CSE"
})`
},
{
    label: "STEP 11 — DATABASE INFO",
    title: "Display database information",
    description: "Display available databases, database statistics and student document count.",
    hint: "Execute each command in MongoDB Shell.",
    code: `show dbs

db.stats()

db.students.countDocuments()`
}
];

function showStep(index) {
    const step = steps[index];

    document.getElementById("stepLabel").textContent = step.label;
    document.getElementById("stepTitle").textContent = step.title;
    document.getElementById("stepDescription").textContent = step.description;
    document.getElementById("command").textContent = step.code;
    document.getElementById("hint").textContent = step.hint;
    document.getElementById("feedback").textContent = "";

    const buttons = document.querySelectorAll(".steps button");

    buttons.forEach((button, i) => {
        button.classList.toggle("active", i === index);
    });
}

async function copyCommand() {
    const command = document.getElementById("command").textContent;
    const feedback = document.getElementById("feedback");

    try {
        await navigator.clipboard.writeText(command);
        feedback.textContent = "✓ Command copied successfully!";
    } catch (error) {
        feedback.textContent = "Clipboard unavailable. Select and copy the command manually.";
    }
}

function toggleMenu() {
    document.getElementById("navbar").classList.toggle("open");
}

// Close mobile menu after selecting a section
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navbar").classList.remove("open");
    });
});
