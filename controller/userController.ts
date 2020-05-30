import { IUser } from "../models/user.ts";

let users: Array<IUser> = [
  {
    id: "1",
    name: "jemison vidal",
    email: "jemison.santoos@gmail.com",
  },
  {
    id: "2",
    name: "jemison vidal",
    email: "jemison.vidal@gmail.com",
  },
  {
    id: "3",
    name: "jemison vidal",
    email: "jemison.vidal@hotmail.com",
  },
];

const getUsers = ({ response }: { response: any }) => {
  response.body = users;
};

const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const user: IUser | undefined = users.find((user) => user.id === params.id);

  if (user) {
    response.status = 200;
    response.body = user;
  } else {
    response.status = 404;
    response.body = { message: "User not found." };
  }
};

const addUser = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body(0);
  const user: IUser = body.value;

  users.push(user);
  response.body = { message: "Ok" };
  response.status = 200;
};

const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  let user: IUser | undefined = users.find((user) => user.id === params.id);

  if (user) {
    const body = await request.body();
    const updateUser: { name?: string; email?: string } = body.value;

    user = { ...user, ...updateUser };
    users = [...users.filter((user) => user.id !== params.id), user];
    response.body = { message: "Ok" };
    response.status = 200;
  } else {
    response.status = 404;
    response.body = { message: "User not found." };
  }
};

const deleteUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  users = users.filter((user) => user.id !== params.id);
  response.body = { message: "Ok" };
  response.status = 200;
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
