import { invalidDataError, notFoundError } from '@/errors';
import { cannotGetHotelsError } from '@/errors/cannot-get-hotels-error';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { hotelsRepository } from '@/repositories/hotels-repository';
import { TicketStatus } from '@prisma/client';

async function validateBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError()

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotGetHotelsError();
  }
}

async function getHotels(userId: number) {
  await validateBooking(userId);
  const hotels = await hotelsRepository.findHotels();

  if (hotels.length === 0) throw notFoundError();
  return hotels;
}

async function getRoomsByHotelId(userId: number, hotelId: number) {
  await validateBooking(userId);

  const rooms = await hotelsRepository.findRoomsByHotelId(hotelId);
  if (!rooms) throw notFoundError();

  if (!hotelId || isNaN(hotelId)) {
    throw invalidDataError('hotelId');
  }

  return rooms;
}

export const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};
