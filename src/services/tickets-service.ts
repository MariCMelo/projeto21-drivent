import { invalidDataError, notFoundError } from '@/errors';
import { newTicket } from '@/protocols';
import { enrollmentRepository } from '@/repositories';
import { ticketsRepository } from '@/repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';

async function findWithTicketType() {
  const result = await ticketsRepository.findWithTicketType();
  return result;
}

async function findTicketsByUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketsByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  if (!ticketTypeId) throw invalidDataError('missing ticket type Id');

  const ticketData: newTicket = {
    enrollmentId: enrollment.id,
    ticketTypeId,
    status: TicketStatus.RESERVED,
  };

  const ticket = await ticketsRepository.createTicket(ticketData);
  return ticket;
}

export const ticketsService = {
  createTicket,
  findWithTicketType,
  findTicketsByUser,
};
