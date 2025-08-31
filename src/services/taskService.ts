import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';

/**
 * Task Service - Business Logic Layer
 * 
 * This service manages the in-memory task storage and business logic.
 * In a real application, this would interface with a database.
 * 
 * TODO: Implement the service methods
 */

// In-memory storage (for this interview - normally you'd use a database)
const tasks: Task[] = [];

export class TaskService {
  
  static async getAllTasks(queryParams?: TaskQueryParams): Promise<Task[]> {
    // TODO: Implement getting all tasks with filtering
    // - Filter by status if provided
    // - Filter by priority if provided  
    // - Sort by priority (high -> medium -> low) then by createdAt
    // - Return filtered and sorted tasks

    // Define priority order
    const order = { high: 1, medium: 2, low: 3 };

    // Do filtering
    const filteredTasks = tasks.filter((task) => {
      const matchStatus = queryParams?.status ? task.status === queryParams.status : true;
      const matchPriority = queryParams?.priority ? task.priority === queryParams.priority : true;

      return matchStatus && matchPriority;
    });

    // Sort and return
    return filteredTasks.sort((a, b) => {
      const sortByPriority = order[a.priority] - order[b.priority];

      // I chose not to use `calculateDaysDifference` helper function because it only returns the difference in days
      const sortByTime = a.createdAt.getTime() - b.createdAt.getTime();

      return sortByPriority || sortByTime;
    });
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    // TODO: Implement creating a new task
    // - Generate UUID for id
    // - Set default status to 'pending'
    // - Set createdAt and updatedAt to current time
    // - Add to tasks array
    // - Return created task

    // Create task
    const task: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate,
    };

    // Add task to mock DB (in-memory storage)
    tasks.push(task);
    return task;
  }

  // Test helper method - clears all tasks for testing
  static async clearAllTasks(): Promise<void> {
    tasks.length = 0;
  }
} 