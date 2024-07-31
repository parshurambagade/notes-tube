import express, { urlencoded } from 'express';
import connectDB from './db.js';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import sectionRoutes from './routes/section.routes.js';
import cors from 'cors';
import { PORT } from './constants.js';
const app = express();

connectDB();


app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/sections', sectionRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});