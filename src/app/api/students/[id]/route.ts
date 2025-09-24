import { deleteStudentDb } from "@/db/studentsDb";
import { NextApiRequest } from "next";

export async function DELETE(
    req: NextApiRequest,
    { params }: {params: {id: number}}
): Promise<Response> {
    const p = await params;
    const studentId = await p.id;

    const deletedStudentId = await deleteStudentDb(studentId);

    return new Response(JSON.stringify({ deletedStudentId }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};