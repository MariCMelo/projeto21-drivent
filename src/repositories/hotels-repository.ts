import { prisma } from '@/config';
import { Hotel } from '@prisma/client';

async function findHotels(): Promise<Hotel[]> {
  const result = await prisma.hotel.findMany();
  return result;
}

async function findRoomsByHotelId(hotelId: number) {
  const result = await prisma.room.findMany({
    where: { id: hotelId },
    include: { Hotel: true },
  });
  return result;
}

export const hotelsRepository = {
  findHotels,
  findRoomsByHotelId,
};
