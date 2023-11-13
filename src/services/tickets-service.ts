import { notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import { ticketsRepository } from '@/repositories/tickets-repository';

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

export const ticketsService = {
  findWithTicketType,
  findTicketsByUser,
};
