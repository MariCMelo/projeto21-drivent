import { prisma } from '@/config';

async function findWithTicketType() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function findTicketsByEnrollmentId(enrollmentId: number) {
    const result = await prisma.ticket.findUnique({
        where: {enrollmentId},
        include: {TicketType: true}
    })
    return result
}



export const ticketsRepository = {
    findWithTicketType,
    findTicketsByEnrollmentId
}