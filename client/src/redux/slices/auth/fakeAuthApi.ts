// src/store/auth/fakeAuthApi.ts
import { SignInPayload } from "@/types/auth";
import { IAdminProfile, IStudentProfile, IUserProfile } from "@/types/profile";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  studentId?: string;
  classSectionId?: string;
}

export const fakeSignInApi = async (
  data: SignInPayload,
): Promise<{ token: string; user: IUserProfile }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password !== "123456")
        return reject(new Error("Invalid password"));

      if (data.email === "student@test.com") {
        resolve({
          token: "fake-student-token",
          user: {
            _id: "65a1b2c3d4e5f6a7b8c9d0e1",
            name: "Alex Rivera",
            email: "alex.rivera@edu.university.com",
            role: "student",
            studentId: "ST-2024-089",
            classSectionId: "cs-001",
            department: "Computer Science & Engineering",
            intake: "Spring 2024",
            section: "A-1",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2026-01-20T14:45:00Z",
          } as IStudentProfile,
        });
      } else if (data.email === "admin@test.com") {
        resolve({
          token: "fake-admin-token",
          user: {
            _id: "65a1b2c3d4e5f6a7b8c9d0e2",
            name: "Dr. Sarah Johnson",
            email: "sarah.johnson@edu.university.com",
            role: "admin",
            adminId: "ADM-2023-001",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            permissions: {
              canCreateClassroom: true,
              canAssignAdmin: true,
              canRemoveAdmin: true,
              canManageStudents: true,
              canManageTeachers: true,
              canEditClassContent: true,
            },
            instituteId: "inst-001",
            departmentId: "dept-cse-001",
            managedStudents: [
              {
                _id: "75b2c3d4e5f6a7b8c9d0e1f2",
                name: "Alex Rivera",
                email: "alex.rivera@edu.university.com",
                avatarUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                studentId: "ST-2024-089",
                blocked: false,
                role: "student",
              },
              {
                _id: "85c3d4e5f6a7b8c9d0e1f203",
                name: "Mia Chen",
                email: "mia.chen@edu.university.com",
                avatarUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
                studentId: "ST-2024-090",
                blocked: true,
                role: "student",
              },
              {
                _id: "95d4e5f6a7b8c9d0e1f203a",
                name: "Liam Smith",
                email: "liam.smith@edu.university.com",
                avatarUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
                adminId: "ADM-2024-005",
                blocked: false,
                role: "co_admin",
              },
            ],
            createdAt: "2023-08-01T09:00:00Z",
            updatedAt: "2026-01-25T11:30:00Z",
          } as IAdminProfile,
        });
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
};

export const fakeSignUpApi = async (
  data: SignUpPayload,
): Promise<{ token: string; user: IUserProfile }> => {
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
