import { IGarrisonCreateDTO, IGarrisonDTO } from "@/dtos/IGarrisonDTO";
import prisma from "@/lib/prismaDB";
import { connectDB, disconnectDB } from "@/utils/connectionDB";

export const createGarrison = async (
  data: IGarrisonCreateDTO
): Promise<IGarrisonDTO> => {
  await connectDB();

  const garrison = await prisma.garrison.create({
    data: {
      militaryIds: data.militaryIds,
      vehiclesIds: data.vehiclesIds,
    },
  });

  await disconnectDB();

  return garrison;
};

export const listGarrisonById = async (
  id: string
): Promise<IGarrisonDTO | null> => {
  await connectDB();

  const garrison = await prisma.garrison.findFirst({
    where: {
      id,
    },
  });

  await disconnectDB();

  return garrison;
};

export const listAllGarrisons = async (): Promise<IGarrisonDTO[]> => {
  await connectDB();

  const garrisons = await prisma.garrison.findMany({});

  return garrisons;
};

export const updateGarrison = async (id: string, data: IGarrisonCreateDTO) => {
  await connectDB();

  await prisma.garrison.update({
    where: {
      id,
    },
    data,
  });

  await disconnectDB();
};

export const deleteGarrison = async (id: string): Promise<void> => {
  await connectDB();

  await prisma.garrison.delete({
    where: {
      id,
    },
  });

  await disconnectDB();
};
