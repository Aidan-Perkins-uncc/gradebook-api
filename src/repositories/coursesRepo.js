import prisma from '../config/db.js'

export async function getAll({}){
    // implement business logic here
    const courses = await prisma.courses.findMany({});
    return courses;
}

export async function getById(id){
    const course = await prisma.courses.findUnique({ where: { id } });
    return course;
}

export function create (courseData) {
    const newCourse = prisma.courses.create({ data: courseData });
    return newCourse;
}

export async function update(id, updatedData){
    try{
        const updatedCourse = await prisma.courses.update({
            where: { id },
            data: updatedData,
        });
        return updatedCourse;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try{ 
        const deletedCourse = await prisma.courses.delete({
            where: { id },
        });
        return deletedCourse;
    } catch (error) {
        if(error.code === 'P2025') return null;
        throw error;
    }
}