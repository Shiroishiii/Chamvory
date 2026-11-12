import { Router } from 'express';
import * as historyController from '../controllers/history.controller';
import * as ticketController from '../controllers/ticket.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

// Todas as rotas de chamados exigem autenticação; as restrições por perfil ficam em cada rota.
router.use(requireAuth);

router.get('/', ticketController.list);
router.post('/', requireRole('SOLICITANTE'), ticketController.create);

router.get('/:id', ticketController.getOne);
router.put('/:id', requireRole('SOLICITANTE'), ticketController.update);
router.delete('/:id', requireRole('SOLICITANTE'), ticketController.remove);

router.patch('/:id/assign', requireRole('TECNICO'), ticketController.assign);
router.patch('/:id/finish', requireRole('TECNICO'), ticketController.finish);

router.get('/:id/history', historyController.listByTicket);
router.post('/:id/history', requireRole('TECNICO'), ticketController.addHistory);

export default router;
