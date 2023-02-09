import { IVehicleCreateDTO, IVehicleDTO } from "@/dtos/IVehicleDTO";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";

export const createVehicle = async (
  data: IVehicleCreateDTO
): Promise<IVehicleDTO> => {
  await connectDB();

  const vehicles = await prisma.vehicles.create({
    data,
  });

  await disconnectDB();

  return vehicles;
};

export const listVehicleById = async (
  id: string
): Promise<IVehicleDTO | null> => {
  await connectDB();

  const vehicle = await prisma.vehicles.findFirst({
    where: {
      id,
    },
  });

  await disconnectDB();

  return vehicle;
};

export const listVehicleByName = async (
  name: string
): Promise<IVehicleDTO | null> => {
  await connectDB();

  const vehicle = await prisma.vehicles.findUnique({
    where: {
      name,
    },
  });

  await disconnectDB();

  return vehicle;
};

export const listAllVehicles = async (): Promise<IVehicleDTO[]> => {
  await connectDB();

  const vehicles = await prisma.vehicles.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return vehicles;
};

export const updateVehicle = async (id: string, data: IVehicleCreateDTO) => {
  await connectDB();

  await prisma.vehicles.update({
    where: {
      id,
    },
    data,
  });

  await disconnectDB();
};

export const deleteVehicle = async (id: string): Promise<void> => {
  await connectDB();

  await prisma.vehicles.delete({
    where: {
      id,
    },
  });

  await disconnectDB();
};
