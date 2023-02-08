import { IMilitaryCreateDTO, IMilitaryDTO } from "@/dtos/IMilitaryDTO";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";
import { omitFieldsOfUsers } from "@/utils/omitFields";

export const createMilitary = async (
  data: IMilitaryCreateDTO
): Promise<void> => {
  await connectDB();

  await prisma.military.create({
    data,
  });

  await disconnectDB();
};

export const listMilitaryById = async (
  id: string
): Promise<IMilitaryDTO | null> => {
  await connectDB();

  const military = await prisma.military.findFirst({
    where: {
      id,
    },
  });

  await disconnectDB();

  return military;
};

export const listAllMilitary = async (): Promise<IMilitaryDTO[]> => {
  await connectDB();

  const military = await prisma.user.findMany();

  return military;
};

export const updateMilitary = async (id: string, data: IMilitaryCreateDTO) => {
  await connectDB();

  await prisma.military.update({
    where: {
      id,
    },
    data,
  });

  await disconnectDB();
};
