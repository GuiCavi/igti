import fs from "fs";
import Grades from "../grades.json";

function Grade({ student, subject, type, value }) {
  return {
    id: Grades.nextId++,
    student,
    subject,
    type,
    value,
    timestamp: new Date(),
  };
}

const persistChanges = (data) => {
  try {
    fs.writeFileSync(`./grades.json`, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

class GradeController {
  index(req, res) {
    return res.json({ ...Grades, nextId: undefined });
  }

  find(req, res) {
    const { id } = req.params;

    const grade = Grades.grades.find((grade) => grade.id.toString() === id);

    if (!grade) {
      return res.json({ message: "Grade not found" });
    }

    return res.json({
      grade,
    });
  }

  store(req, res) {
    const grade = new Grade({ ...req.body });

    Grades.grades.push(grade);

    persistChanges(Grades);

    return res.json({ ...Grades, nextId: undefined });
  }

  update(req, res) {
    const { id } = req.params;

    const index = Grades.grades.findIndex(
      (grade) => grade.id.toString() === id
    );

    if (index === -1) {
      return res.json({ message: "Grade not found" });
    }

    Grades.grades = [
      ...Grades.grades.slice(0, index),
      {
        ...Grades.grades.find((grade) => grade.id.toString() === id),
        ...req.body,
      },
      ...Grades.grades.slice(index + 1),
    ];

    persistChanges(Grades);

    return res.json({ ...Grades, nextId: undefined });
  }

  delete(req, res) {
    const { id } = req.params;

    Grades.grades = [
      ...Grades.grades.filter((grade) => grade.id.toString() !== id),
    ];

    persistChanges(Grades);

    return res.json({ ...Grades, nextId: undefined });
  }

  totalGrade(req, res) {
    const { student, subject } = req.params;

    const grades = Grades.grades
      .filter((grade) => grade.student === student)
      .filter((grade) => grade.subject === subject);

    const total = grades.reduce((prev, curr) => prev + curr.value, 0);

    return res.json({
      grades,
      total,
    });
  }

  avgGrade(req, res) {
    const { type, subject } = req.params;

    const grades = Grades.grades
      .filter((grade) => grade.subject === subject)
      .filter((grade) => grade.type === type);

    const total = grades.reduce((prev, curr) => prev + curr.value, 0);
    const avg = total / grades.length;

    return res.json({
      grades,
      avg,
    });
  }

  bestGrade(req, res) {
    const { type, subject } = req.params;

    const grades = Grades.grades
      .filter((grade) => grade.subject === subject)
      .filter((grade) => grade.type === type)
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

    return res.json({
      grades,
    });
  }
}

export default new GradeController();
