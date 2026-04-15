import {
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
 } from '../services/assignmentService.js';

 export async function getAllAssignmentsHandler(req,res){
    const {} = req.query; // fill in for searching sorting and pagination
    const options = {}; // fill in for seaching sorting and pagination
    let assignments = await getAllAssignments(options);
    res.status(200).json(assignments);
 }

 export async function getAssignmentByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const post = await getAssignmentById(id);
    res.status(200).json(post);
 }

 export async function createAssignmentHandler(req, res){
    const {title, description, courseId, grades} = req.body;
    const newAssignment = await createAssignment({ title, description, courseId, grades, authorId: req.user.id });
    res.status(201).json(newPost);
 }

 export async function updateAssignmentHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteAssignment(id);
    res.status(204).send();
 }

 export async function deleteAssignmentHandler(req, res) {
    const id = parseInt(req.params.id);
    await deletePost(id);
    res.status(204).send();
 }