import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import TaskModel from '../models/TaskModel';
import { config } from '../config/config';

// Connect to DB before running any tests
beforeAll(async () => {
  await mongoose.connect(config.mongo.url, {
    writeConcern: {
      w: 'majority'
    },
    retryWrites: true
  });
});

// Close DB connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

// Clear all data from DB before each test
beforeEach(async () => {
  await TaskModel.deleteMany({});
});

// Test case: GET => all tasks
describe('GET /api/task/get', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/api/task/get');
    expect(res.statusCode).toEqual(200);
  });
});

// Test case: POST => Create a new task
describe('POST /api/task/create', () => {
  it('should create a new task', async () => {
    const res = await request(app).post('/api/task/create').send({
      task: 'Test task'
    });
    expect(res.statusCode).toEqual(201);
  });
});

// Test case: PUT => Update a task
describe('PUT /api/task/update/:id', () => {
  it('should update the task of given id', async () => {
    const task = new TaskModel({ task: 'Initial Task', completed: false });
    await task.save();

    const res = await request(app).put(`/api/task/update/${task._id}`).send({
      task: 'Updated Task',
      completed: true
    });
    expect(res.statusCode).toEqual(200);
  });
});

// Test case: DELETE => Delete a task
describe('DELETE /api/task/delete/:id', () => {
  it('should delete the task for given id', async () => {
    const task = new TaskModel({ task: 'Task to delete', completed: false });
    await task.save();

    const res = await request(app).delete(`/api/task/delete/${task._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
