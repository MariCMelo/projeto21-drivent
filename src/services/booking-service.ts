import { notFoundError } from '@/errors';
import { cannotBookError } from '@/errors/cannot-book-error';
import { bookingRepository, enrollmentRepository, ticketsRepository } from '@/repositories';
import { TicketStatus } from '@prisma/client';

async function validateUserBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw cannotBookError();
  }
}

async function getBooking(userId: number) {
  await validateUserBooking(userId);

  const booking = await bookingRepository.findBooking();
  if (booking.length === 0) throw notFoundError();

  return booking;
}

export const bookingService = {
  getBooking,
};
