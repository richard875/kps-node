import Joi from 'joi';

/**
 * Task Validation Schemas
 * 
 * TODO: Implement Joi validation schemas for task operations
 * Reference the task requirements in README.md
 */

const priority = ['low', 'medium', 'high'];

export const createTaskSchema = Joi.object({
  // TODO: Define validation schema for creating a task
  // Remember the requirements:
  // - title: required, string, max 100 characters
  // - description: optional, string, max 500 characters  
  // - priority: required, one of 'low', 'medium', 'high'
  // - dueDate: optional, valid date
  // Note: status, id, and timestamps are set automatically

  title: Joi.string().max(100).required().messages({
    'string.empty': 'title is required',
    'string.max': 'title has a maximum length of 100 characters',
  }),
  description: Joi.string().max(500).optional().messages({
    'string.max': 'description has a maximum length of 500 characters',
  }),
  priority: Joi.string().valid(...priority).required().messages({
      'string.empty': 'priority is required',
      'string.valid': 'priority must be one of the following: low, medium, high',
  }),
  dueDate: Joi.date().optional().messages({
    'date.base': 'dueDate must be a valid date',
  }),
}).unknown(false); // Reject unknown fields

export const taskQuerySchema = Joi.object({
  // TODO: Define validation schema for query parameters
  // - status: optional, valid task status
  // - priority: optional, valid task priority
}).unknown(false); // Reject unknown query params

// Validation helper functions
export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.validate(data);
};

export const validateTaskQuery = (data: unknown) => {
  return taskQuerySchema.validate(data);
}; 