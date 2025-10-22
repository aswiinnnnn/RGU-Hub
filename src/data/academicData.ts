export interface Subject {
  id: string;
  name: string;
  year: number;
}

export interface Material {
  id: string;
  title: string;
  type: 'notes' | 'pyq' | 'question-bank' | 'syllabus' | 'practical';
  subject: string;
  year: number;
  fileType: string;
  size: string;
  uploadDate: string;
  downloadUrl: string;
}

export const years = [
  {
    year: "1st Year",
    academicYear: "2022-23",
    subjectCount: 8,
    current: false
  },
  {
    year: "2nd Year",
    academicYear: "2023-24",
    subjectCount: 8,
    current: false
  },
  {
    year: "3rd Year",
    academicYear: "2024-25",
    subjectCount: 6,
    current: true
  },
  {
    year: "4th Year",
    academicYear: "2025-26",
    subjectCount: 5,
    current: false
  }
];

export const subjects: Subject[] = [
  // 1st Year
  { id: "1-1", name: "Communicative English", year: 1 },
  { id: "1-2", name: "Applied Anatomy & Physiology", year: 1 },
  { id: "1-3", name: "Applied Sociology", year: 1 },
  { id: "1-4", name: "Applied Psychology", year: 1 },
  { id: "1-5", name: "Applied Nutrition & Biochemistry", year: 1 },
  { id: "1-6", name: "Nursing Foundations I", year: 1 },
  { id: "1-7", name: "Nursing Foundations II", year: 1 },
  { id: "1-8", name: "First Aid & Health Assessment", year: 1 },
  
  // 2nd Year
  { id: "2-1", name: "Pharmacology I", year: 2 },
  { id: "2-2", name: "Pharmacology II", year: 2 },
  { id: "2-3", name: "Pathology I", year: 2 },
  { id: "2-4", name: "Pathology II", year: 2 },
  { id: "2-5", name: "Microbiology & Infection Control", year: 2 },
  { id: "2-6", name: "Adult Health Nursing I", year: 2 },
  { id: "2-7", name: "Adult Health Nursing II", year: 2 },
  { id: "2-8", name: "Nursing Informatics & Technology", year: 2 },
  
  // 3rd Year
  { id: "3-1", name: "Child Health Nursing I", year: 3 },
  { id: "3-2", name: "Child Health Nursing II", year: 3 },
  { id: "3-3", name: "Mental Health Nursing I", year: 3 },
  { id: "3-4", name: "Mental Health Nursing II", year: 3 },
  { id: "3-5", name: "Community Health Nursing I", year: 3 },
  { id: "3-6", name: "Nursing Education & Teaching Technology", year: 3 },
  
  // 4th Year
  { id: "4-1", name: "Midwifery & Obstetrical Nursing I", year: 4 },
  { id: "4-2", name: "Midwifery & Obstetrical Nursing II", year: 4 },
  { id: "4-3", name: "Community Health Nursing II", year: 4 },
  { id: "4-4", name: "Nursing Research & Statistics", year: 4 },
  { id: "4-5", name: "Nursing Management & Leadership", year: 4 },
];

// Sample materials data
export const materials: Material[] = [
  // Sample data for demonstration
  {
    id: "m1",
    title: "Unit 1 - Introduction to Anatomy",
    type: "notes",
    subject: "Applied Anatomy & Physiology",
    year: 1,
    fileType: "PDF",
    size: "2.3 MB",
    uploadDate: "Aug 15, 2025",
    downloadUrl: "#"
  },
  {
    id: "m2",
    title: "July 2024 Question Paper",
    type: "pyq",
    subject: "Pharmacology I",
    year: 2,
    fileType: "PDF",
    size: "1.2 MB",
    uploadDate: "Aug 10, 2025",
    downloadUrl: "#"
  },
  {
    id: "m3",
    title: "Clinical Skills Checklist",
    type: "practical",
    subject: "Adult Health Nursing I",
    year: 2,
    fileType: "DOC",
    size: "450 KB",
    uploadDate: "Aug 5, 2025",
    downloadUrl: "#"
  },
];

// Semester-wise subjects (2022 onwards batch)
export const semesterSubjects = [
  // Semester 1
  { id: "s1-1", name: "Anatomy", semester: 1, code: "NSG101", credits: 4 },
  { id: "s1-2", name: "Physiology", semester: 1, code: "NSG102", credits: 4 },
  { id: "s1-3", name: "Biochemistry", semester: 1, code: "NSG103", credits: 3 },
  { id: "s1-4", name: "Nutrition and Dietetics", semester: 1, code: "NSG104", credits: 3 },
  { id: "s1-5", name: "Psychology", semester: 1, code: "NSG105", credits: 3 },
  
  // Semester 2
  { id: "s2-1", name: "Sociology", semester: 2, code: "NSG201", credits: 3 },
  { id: "s2-2", name: "Microbiology", semester: 2, code: "NSG202", credits: 3 },
  { id: "s2-3", name: "Pathology", semester: 2, code: "NSG203", credits: 3 },
  { id: "s2-4", name: "Genetics", semester: 2, code: "NSG204", credits: 2 },
  { id: "s2-5", name: "English", semester: 2, code: "NSG205", credits: 3 },
  
  // Semester 3
  { id: "s3-1", name: "Pharmacology", semester: 3, code: "NSG301", credits: 4 },
  { id: "s3-2", name: "Nursing Foundation", semester: 3, code: "NSG302", credits: 5 },
  { id: "s3-3", name: "Community Health Nursing I", semester: 3, code: "NSG303", credits: 4 },
  { id: "s3-4", name: "Environmental Science", semester: 3, code: "NSG304", credits: 2 },
  { id: "s3-5", name: "Nursing Informatics", semester: 3, code: "NSG305", credits: 2 },
  
  // Semester 4
  { id: "s4-1", name: "Medical Surgical Nursing I", semester: 4, code: "NSG401", credits: 5 },
  { id: "s4-2", name: "Mental Health Nursing", semester: 4, code: "NSG402", credits: 4 },
  { id: "s4-3", name: "Child Health Nursing", semester: 4, code: "NSG403", credits: 4 },
  { id: "s4-4", name: "Nursing Research", semester: 4, code: "NSG404", credits: 3 },
  { id: "s4-5", name: "Clinical Practice I", semester: 4, code: "NSG405", credits: 4 },
  
  // Semester 5
  { id: "s5-1", name: "Medical Surgical Nursing II", semester: 5, code: "NSG501", credits: 5 },
  { id: "s5-2", name: "Obstetrics and Gynecological Nursing", semester: 5, code: "NSG502", credits: 5 },
  { id: "s5-3", name: "Community Health Nursing II", semester: 5, code: "NSG503", credits: 4 },
  { id: "s5-4", name: "Clinical Practice II", semester: 5, code: "NSG504", credits: 6 },
  
  // Semester 6
  { id: "s6-1", name: "Critical Care Nursing", semester: 6, code: "NSG601", credits: 4 },
  { id: "s6-2", name: "Nursing Education", semester: 6, code: "NSG602", credits: 3 },
  { id: "s6-3", name: "Nursing Administration", semester: 6, code: "NSG603", credits: 3 },
  { id: "s6-4", name: "Clinical Practice III", semester: 6, code: "NSG604", credits: 8 },
  
  // Semester 7
  { id: "s7-1", name: "Emergency and Disaster Nursing", semester: 7, code: "NSG701", credits: 4 },
  { id: "s7-2", name: "Geriatric Nursing", semester: 7, code: "NSG702", credits: 3 },
  { id: "s7-3", name: "Professional Development", semester: 7, code: "NSG703", credits: 2 },
  { id: "s7-4", name: "Internship I", semester: 7, code: "NSG704", credits: 10 },
  
  // Semester 8
  { id: "s8-1", name: "Nursing Leadership", semester: 8, code: "NSG801", credits: 3 },
  { id: "s8-2", name: "Evidence Based Practice", semester: 8, code: "NSG802", credits: 3 },
  { id: "s8-3", name: "Project Work", semester: 8, code: "NSG803", credits: 4 },
  { id: "s8-4", name: "Internship II", semester: 8, code: "NSG804", credits: 10 }
];

export const materialTypes = [
  {
    id: "notes",
    title: "Notes",
    description: "Subject-wise organized handouts and study materials",
    icon: "BookOpen",
    color: "primary"
  },
  {
    id: "pyq",
    title: "Previous Year Questions",
    description: "University question papers from past examinations",
    icon: "FileText",
    color: "accent"
  },
  {
    id: "question-bank",
    title: "Question Bank",
    description: "Unit-wise and chapter-wise practice questions",
    icon: "HelpCircle",
    color: "success"
  },
  {
    id: "syllabus",
    title: "Syllabus",
    description: "RGU/INC curriculum and course structure",
    icon: "ClipboardList",
    color: "secondary"
  },
  {
    id: "practical",
    title: "Practical Resources",
    description: "Clinical logbook, skill checklists, lab guides",
    icon: "Stethoscope",
    color: "primary"
  }
];