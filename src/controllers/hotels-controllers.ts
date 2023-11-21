import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const hotels = await hotelsService.getHotels(userId);
  return res.status(httpStatus.OK).send(hotels);
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);
  const rooms = await hotelsService.getRoomsByHotelId(userId, hotelId);

  return res.send(httpStatus.OK).send(rooms);
}
