// 代码生成时间: 2025-09-30 21:20:53
import express, { Request, Response } from 'express';
import { Course } from './models/Course'; // Assuming a Course model is defined in models/Course.ts

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
const router = express.Router();

// Get all courses
router.get('/courses', async (req: Request, res: Response) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Get a single course by ID
router.get('/course/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Fetch a single course by ID from the database
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Create a new course
router.post('/courses', async (req: Request, res: Response) => {
  try {
    // Validate course data
    const course = Course.build(req.body);
    // Save the course to the database
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

// Update a course by ID
router.put('/course/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Find the course to update
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      // Update the course with new data
      const updatedCourse = await course.update(req.body);
      res.status(200).json(updatedCourse);
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete('/course/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Find the course to delete
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      // Delete the course
      await course.destroy();
      res.status(200).json({ message: 'Course deleted successfully' });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Use router in the Express app
app.use('/', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});