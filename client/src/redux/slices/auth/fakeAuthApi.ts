// src/store/auth/fakeAuthApi.ts
import { AuthUser, IStudentProfile, IAdminProfile, SignInPayload } from "@/types/auth";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  studentId?: string;
  classSectionId?: string;
}

export const fakeSignInApi = async (data: SignInPayload): Promise<{ token: string; user: AuthUser }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password !== "123456") return reject(new Error("Invalid password"));

      if (data.email === "student@test.com") {
        resolve({
          token: "fake-student-token",
          user: {
            _id: "stu_1",
            name: "Student User",
            email: data.email,
            role: "student",
            studentId: "CSE-221",
            classSectionId: "cls_123",
            classInfo: {
              _id: "cls_123",
              departmentCode: "CSE",
              intakeNumber: 49,
              sectionName: "A",
            },
          } as IStudentProfile,
        });
      } else if (data.email === "admin@test.com") {
        resolve({
          token: "fake-admin-token",
          user: {
            _id: "adm_1",
            name: "Admin User",
            email: data.email,
            role: "admin",
            adminId: "ADM-01",
          } as IAdminProfile,
        });
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
};

export const fakeSignUpApi = async (data: SignUpPayload): Promise<{ token: string; user: AuthUser }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.role === "student") {
        resolve({
          token: "fake-student-token",
          user: {
            _id: "stu_" + Math.random().toString(36).slice(2),
            name: data.name,
            email: data.email,
            role: "student",
            studentId: data.studentId || "CSE-000",
            classSectionId: data.classSectionId || "cls_000",
            classInfo: {
              _id: data.classSectionId || "cls_000",
              departmentCode: "CSE",
              intakeNumber: 49,
              sectionName: "A",
            },
          } as IStudentProfile,
        });
      } else {
        resolve({
          token: "fake-admin-token",
          user: {
            _id: "adm_" + Math.random().toString(36).slice(2),
            name: data.name,
            email: data.email,
            role: "admin",
            adminId: "ADM-" + Math.floor(Math.random() * 1000),
          } as IAdminProfile,
        });
      }
    }, 1000);
  });
};
