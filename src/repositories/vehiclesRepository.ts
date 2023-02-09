import { IVehicleCreateDTO, IVehicleDTO } from "@/dtos/IVehicleDTO";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";

export const createVehicle = async (
  data: IVehicleCreateDTO
): Promise<IVehicleDTO> => {
  await connectDB();

  const vehicles = await prisma.vehicle.create({
    data,
  });

  await disconnectDB();

  return vehicles;
};

export const listVehicleById = async (
  id: string
): Promise<IVehicleDTO | null> => {
  await connectDB();

  const vehicle = await prisma.vehicle.findFirst({
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
  console.log("dentro repositório");

  await connectDB();

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      name,
    },
  });

  console.log("veículos", vehicle);

  await disconnectDB();

  return vehicle;
};

export const listAllVehicles = async (): Promise<IVehicleDTO[]> => {
  await connectDB();

  const vehicles = await prisma.vehicle.findMany({
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

  await prisma.vehicle.update({
    where: {
      id,
    },
    data,
  });

  await disconnectDB();
};

export const deleteVehicle = async (id: string): Promise<void> => {
  await connectDB();

  await prisma.vehicle.delete({
    where: {
      id,
    },
  });

  await disconnectDB();
};
