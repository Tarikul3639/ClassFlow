// =====================
// ACADEMIC STRUCTURE
// =====================

/* ---------- Department ---------- */
export interface IDepartment {
  _id: string;
  code: string; // CSE
  name: string; // Computer Science & Engineering
}

/* ---------- Intake ---------- */
export interface IIntake {
  _id: string;
  departmentId: string;
  number: number; // 49
  year: number;   // 2024
}

/* ---------- Section ---------- */
export interface ISection {
  _id: string;
  intakeId: string;
  name: string; // A / B / C
}

/* ---------- Class Section (FULL) ---------- */
export interface IClassSection {
  _id: string;
  department: IDepartment;
  intake: IIntake;
  section: ISection;
}

/* ---------- Lightweight summary (Auth/UI) ---------- */
export interface IClassSectionSummary {
  _id: string;
  departmentCode: string; // CSE
  intakeNumber: number;   // 49
  sectionName: string;    // A
}
