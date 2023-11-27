import { notFoundError } from '@/errors';
import { cannotBookError } from '@/errors/cannot-book-error';
import { bookingRepository, enrollmentRepository, ticketsRepository } from '@/repositories';
import { roomRepository } from '@/repositories/room-repository';
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

async function validateRoom(roomId: number) {
  const room = await roomRepository.findById(roomId);
  if (!room) throw notFoundError();

  const booking = await bookingRepository.findBookingById(roomId);
  if (room.capacity <= booking.length) throw cannotBookError();
}

async function getBooking(userId: number) {
  await validateUserBooking(userId);

  const booking = await bookingRepository.findBookingById(userId);
  if (booking.length === 0) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await validateUserBooking(userId);
  await validateRoom(roomId);

  return bookingRepository.createBooking({ userId, roomId });
}

async function changeBooking(userId: number, roomId: number) {
  await validateUserBooking(userId);
  if (!roomId) throw notFoundError();

  const booking = await bookingRepository.findBooking(userId);
  if (!booking || booking.userId !== userId) throw cannotBookError();

  return bookingRepository.upsertBooking({
    id: booking.id,
    roomId,
    userId,
  });
}

export const bookingService = {
  getBooking,
  createBooking,
  changeBooking
};
