import {  getTicketType, getUsersTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketType)
  .get('/', getUsersTicket)
  .post('/');

export { ticketsRouter };
