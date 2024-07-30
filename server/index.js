import express from 'express';
import connectDB from './db.js';
import userRoutes from './routes/user.routes.js';
import notesRoutes from './routes/notes.routes.js';
import sectionRoutes from './routes/section.routes.js';

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/sections', sectionRoutes);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});