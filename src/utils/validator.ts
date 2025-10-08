import { StudentData } from "@/types/StudentData";

export function validateStudentData(formData: FormData): { success: true; data: StudentData } | { success: false; errors: string[] } {
  const errors: string[] = [];

  const first_name = formData.get('first_name')?.toString()?.trim();
  const last_name = formData.get('last_name')?.toString()?.trim();
  const middle_name = formData.get('middle_name')?.toString()?.trim();
  const groupIdStr = formData.get('groupId')?.toString()?.trim();

  if (!first_name) errors.push('First name is required');
  if (!last_name) errors.push('Last name is required');
  if (!middle_name) errors.push('Middle name is required');

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
      first_name: first_name!,
      last_name: last_name!,
      middle_name: middle_name!,
      groupId: groupId!,
    },
  };
}