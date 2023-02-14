import {
  IServiceExchangeCreateDTO,
  IServiceExchangeDTO,
} from "@/dtos/IServiceExchange";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";

export const createServiceExchange = async (
  data: IServiceExchangeCreateDTO
): Promise<IServiceExchangeDTO> => {
  await connectDB();

  const serviceExchange = await prisma.serviceExchange.create({
    data: {
      replaced: {
        connect: {
          id: data.replacedId,
        },
      },
      substitute: {
        connect: {
          id: data.substituteId,
        },
      },
      initial: data.initial,
      final: data.final,
    },
  });

  await disconnectDB();

  return serviceExchange;
};

export const deleteAllServiceExchanges = async (): Promise<void> => {
  await connectDB();

  await prisma.serviceExchange.deleteMany();

  await disconnectDB();
};

/*
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
  await connectDB();

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      name,
    },
  });

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
}; */
