import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function findBookingById(roomId: number) {
  return prisma.booking.findMany({
    where: { roomId },
    include: { Room: true },
  });
}

async function createBooking({ userId, roomId }: any) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
export const bookingRepository = {
  findBooking,
  findBookingById,
  createBooking,
};
