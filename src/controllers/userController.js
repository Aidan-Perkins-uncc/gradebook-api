import {createUser, 
findUserByEmail,
findUserById,
getAllUsers,
updateUser,
deleteUser,
updateUserRole
} from '../services/userService.js';




// export async function getUserHandler(req, res) {
//     const { id } = req.user;
//     const user = await findUserById(id);
//     res.status(200).json(user);

// }

export async function getUserByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const user = await findUserById(id);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res) {
  const { id } = req.params;
  const numId = parseInt(id, 10)
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const { name, email, password } = req.body;
  const updatedUser = await updateUser(numId, { name, email, password });
  res.status(200).json(updatedUser);
}

export async function getAllUsersHandler(req, res) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function updateUserRoleHandler(req, res) {
  const id = parseInt(req.params.id);
  const { role } = req.body;
  const updatedUser = await updateUserRole(id, role);
  res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteUser(id);
  res.status(204).send();
}