import { IUserCreateDTO, IUserDTO, IUserPublicDTO } from "@/dtos/IUserDTO";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";
import { omitFieldsOfUsers } from "@/utils/omitFields";

export const createUser = async (data: IUserCreateDTO): Promise<void> => {
  await connectDB();

  await prisma.user.create({
    data,
  });

  await disconnectDB();
};

export const listUserById = async (id: string): Promise<IUserDTO | null> => {
  await connectDB();

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  await disconnectDB();

  return user;
};

export const listAllUsers = async (): Promise<IUserPublicDTO[]> => {
  await connectDB();

  const users = await prisma.user.findMany();

  const usersPublic: IUserPublicDTO[] = users.map((user: IUserDTO) => {
    return omitFieldsOfUsers(user, ["password"]);
  });

  return usersPublic;
};

export const updateUser = async (id: string, data: Omit<IUserDTO, "id">) => {
  await connectDB();

  await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  await disconnectDB();
};
