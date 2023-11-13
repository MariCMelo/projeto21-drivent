import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.findWithTicketType();
  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getUsersTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const ticket = await ticketsService.findTicketsByUser(userId);
  return res.status(httpStatus.OK).send(ticket);
}
