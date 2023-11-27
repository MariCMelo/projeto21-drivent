import { prisma } from "@/config";

export async function createBooking({ roomId, userId }: any) {
    return prisma.booking.create({
        data: {
          userId,
          roomId,
        },
      });
    }