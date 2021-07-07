const fs = require("fs");
const chalk = require("chalk");
var Table = require("cli-table");
const ora = require("ora");

const addStudent = (id, name, mark, comment) => {
  const students = loadStudents();
  const duplicateData = students.filter((student) => student.id === id);
  if (duplicateData.length === 0) {
    students.push({
      id,
      name,
      mark,
      comment,
    });
    saveStudents(students);
    console.log(chalk.green("Student has been added Successfully."));
  } else {
    console.log(chalk.red("Watch out!!,Duplicate ID"));
  }
};

const deleteStudent = (id) => {
  const students = loadStudents();
  const keepStudents = students.filter((student) => student.id !== id);
  if (students > keepStudents) {
    console.log(chalk.cyanBright("ID(" + id + ") has been deleted."));
    saveStudents(keepStudents);
  } else {
    console.log(chalk.yellowBright("ID(" + id + ") Not found."));
  }
};

const listStudents = () => {
  const spinner = ora("Loading Students").start();
  setTimeout(() => {
    spinner.succeed("Students List");
    spinner.clear();
    spinner.stop();
  }, 1000);
  setTimeout(() => {
    const students = loadStudents();
    if (students == 0) {
      console.log(
        chalk.redBright("Empty Student list ") +
          chalk.red(" *Add Students first.*")
      );
    } else {
      var table = new Table({
        head: ["Student Name", "Mark"],
        colWidths: [20, 12],
      });
      students.forEach((student) => {
        table.push([student.name, student.mark]);
      });
      console.log(table.toString());
    }
  }, 1100);
};

const readStudent = (id) => {
  const students = loadStudents();
  try {
    const gotStudent = students.find((student) => student.id == id);
    var table = new Table({
      head: ["Student ID", "Student Name", "Mark", "Comment"],
      colWidths: [12, 20, 12, 20],
    });
    table.push([
      gotStudent.id,
      gotStudent.name,
      gotStudent.mark,
      gotStudent.mark,
    ]);
    console.log(chalk.cyanBright.bold("Student Details:"));
    console.log(table.toString());
  } catch (error) {
    console.log(chalk.red("Student not found"));
  }
};

const saveStudents = (students) => {
  const saveData = JSON.stringify(students);
  fs.writeFileSync("students.json", saveData);
};

const loadStudents = () => {
  try {
    const dataBuffer = fs.readFileSync("students.json").toString();
    return JSON.parse(dataBuffer);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addStudent,
  deleteStudent,
  listStudents,
  readStudent,
};
