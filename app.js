const yargs = require("yargs");
const grading = require("./grading");
const chalk = require("chalk");

// ================= Add ==============================

yargs.command({
  command: "add",
  describe: "Add a new studednt",
  builder: {
    id: {
      describe: "Each Student Unique ID",
      demandOption: true,
      type: "number",
      number: true,
      string: false,
    },
    name: {
      describe: " Student Name",
      demandOption: true,
      type: "string",
    },
    mark: {
      describe: " Student Mark",
      demandOption: true,
      type: "number",
      number: true,
    },
    Comment: {
      describe: " Student grade comment",
      type: "string",
      number: true,
      string: false,
    },
  },
  handler: (argv) => {
    if (isNaN(argv.id) && isNaN(argv.mark)) {
      console.log(chalk.red("ID and Mark should be Numbers."));
    } else if (isNaN(argv.mark)) {
      console.log(chalk.red("Mark Should be a number."));
    } else if (isNaN(argv.id)) {
      console.log(chalk.red("ID should be a number"));
    } else {
      grading.addStudent(argv.id, argv.name, argv.mark, argv.Comment);
    }
  },
});

// ================= Delete ==============================

yargs.command({
  command: "delete",
  describe: "delet a studednt",
  builder: {
    id: {
      describe: "Each Student Unique ID",
      demandOption: true,
      type: "number",
    },
  },
  handler: (argv) => {
    grading.deleteStudent(argv.id);
  },
});

// ================= List ==============================

yargs.command({
  command: "list",
  describe: "list all studednts",
  handler: (argv) => {
    grading.listStudents(argv);
  },
});

// ================= Read ==============================

yargs.command({
  command: "read",
  describe: "Search for student",
  builder: {
    id: {
      describe: "Each Student Unique ID",
      demandOption: true,
      type: "number",
    },
  },
  handler: (argv) => {
    grading.readStudent(argv.id);
  },
});
yargs.parse();
