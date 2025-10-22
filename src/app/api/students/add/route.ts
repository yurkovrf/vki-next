import { addStudentDb, deleteStudentDb } from "@/db/studentsDb";
import { validateStudentData } from "@/utils/validator";
import { NextApiRequest } from "next";

export async function POST(
    req: Request,
    { params }: {params: {firstName: string, lastName: string, middleName: string, groupId: number}},
): Promise<Response> {
    const {firstName, lastName, middleName, groupId} = await req.json();

    const newStudent = await addStudentDb({firstName, lastName, middleName, groupId});

    return new Response(JSON.stringify({ id: newStudent }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};