import { addStudentDb, deleteStudentDb } from "@/db/studentsDb";
import { validateStudentData } from "@/utils/validator";
import { NextApiRequest } from "next";

export async function POST(
    req: Request,
    { params }: {params: {first_name: string, last_name: string, middle_name: string, groupId: number}},
): Promise<Response> {
    const {first_name, last_name, middle_name, groupId} = await req.json();

    const newStudent = await addStudentDb(first_name, last_name, middle_name, groupId);

    return new Response(JSON.stringify({ id: newStudent }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};