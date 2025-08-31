import { Request, Response, NextFunction } from 'express';
// Import your validation schemas when ready
import { validateTaskQuery } from '../validation/taskValidation';
import { TaskService } from '../services/taskService';
import { createError } from '../middleware/errorHandler';
import { formatDate } from '../utils/helpers';

/**
 * Task Controller
 * 
 * TODO: Implement the controller methods for basic task operations
 * Remember to:
 * - Use proper TypeScript types
 * - Validate input data  
 * - Handle errors appropriately
 * - Return proper HTTP status codes
 * - Use the task service for business logic
 */

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement get all tasks
    // - Extract query parameters for filtering (status, priority)
    // - Call task service method
    // - Sort by priority then by createdAt
    // - Return filtered and sorted tasks

    const validation = validateTaskQuery(req.query);
    if (validation.error) {
      return next(createError(validation.error.message, 400));
    }

    const tasks = await TaskService.getAllTasks(req.query);

    // Use `formatDate` in controller layer to keep date consistent for JSON transport
    const formattedTasks = tasks.map((task) => ({
      ...task,
      createdAt: formatDate(task.createdAt),
      updatedAt: formatDate(task.updatedAt),
      dueDate: task.dueDate ? formatDate(task.dueDate) : undefined,
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    next(createError('Internal server error', 500));
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement create task
    // - Validate request body using Joi schema
    // - Call task service to create task
    // - Return 201 with created task
    
    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
}; 