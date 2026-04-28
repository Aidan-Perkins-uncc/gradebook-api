import {
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
 } from '../services/assignmentService.js';

 export async function getAllAssignmentsHandler(req,res){
   try{
    const { courseId, title } = req.query; 
    const assignments = await getAllAssignments({ courseId, title });
    res.status(200).json(assignments);
   } catch (error) {
      next(error);
   }
 }

 export async function getAssignmentByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const post = await getAssignmentById(id);
    res.status(200).json(post);
 }

 export async function createAssignmentHandler(req, res){
    const id = parseInt(req.params.id);
    const {title, description,  grades} = req.body;
    const newAssignment = await createAssignment({ title, description, courseId: id, grades });
    res.status(201).json(newAssignment);
 }

 export async function updateAssignmentHandler(req, res){
    const id = parseInt(req.params.id);
    const updatedAssignment = await updateAssignment(id, req.body);
    res.status(204).send();
 }

 export async function deleteAssignmentHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteAssignment(id);
    res.status(204).send();
 }