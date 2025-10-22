import { StudentData } from "@/types/StudentData";

export function validateStudentData(formData: FormData): { success: true; data: StudentData } | { success: false; errors: string[] } {
  const errors: string[] = [];

  const firstName = formData.get('firstName')?.toString()?.trim();
  const lastName = formData.get('lastName')?.toString()?.trim();
  const middleName = formData.get('middleName')?.toString()?.trim();
  const groupIdStr = formData.get('groupId')?.toString()?.trim();

  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!middleName) errors.push('Middle name is required');

  let groupId: number | null = null;
  if (!groupIdStr) {
    errors.push('Group ID is required');
  } else {
    const parsed = Number(groupIdStr);
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed <= 0) {
      errors.push('Group ID must be a positive integer');
    } else {
      groupId = parsed;
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      firstName: firstName!,
      lastName: lastName!,
      middleName: middleName!,
      groupId: groupId!,
    },
  };
}