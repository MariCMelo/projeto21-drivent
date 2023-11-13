import { prisma } from '@/config';
import { newTicket } from '@/protocols';

async function findWithTicketType() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function findTicketsByEnrollmentId(enrollmentId: number) {
  const result = await prisma.ticket.findUnique({
    where: { enrollmentId },
    include: { TicketType: true },
  });
  return result;
}

async function createTicket(ticket: newTicket) {
  const result = await prisma.ticket.create({
    data: ticket,
    include: { TicketType: true },
  });
  return result;
}

export const ticketsRepository = {
  createTicket,
  findWithTicketType,
  findTicketsByEnrollmentId,
};
