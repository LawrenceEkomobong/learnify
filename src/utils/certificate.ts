import { Certificate, Course, Student } from '../types';

export function generateCertificateNumber(courseId: string): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  const prefix = courseId.replace('course-', 'C');
  return `LNF-CERT-${prefix}-${rand}`;
}

export function generateVerificationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${code.slice(0, 4)}-${code.slice(4, 8)}`;
}

export function createCertificateForCourse(student: Student, course: Course): Certificate {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return {
    id: `cert-${course.id}-${Date.now()}`,
    certificateNumber: generateCertificateNumber(course.id),
    courseId: course.id,
    courseTitle: course.title,
    studentName: student.name,
    instructorName: course.instructor.name,
    issueDate: formattedDate,
    verificationCode: generateVerificationCode(),
    gradePercent: 100
  };
}
