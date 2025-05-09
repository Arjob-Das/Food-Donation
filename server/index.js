import authRoutes from './routes/auth.routes.js';
import foodDonationRoutes from './routes/fooddonation.routes.js';
import allFoodRoutes from './routes/allfood.routes.js';
import userRoutes from './routes/user.routes.js';
import bodyParser from 'body-parser';
import connectDB from './config/mongo.js';
import cors from 'cors';
import express from 'express';
import adminRoutes from "./routes/adminRoutes.js";

const app = express();  
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use("/api/admin", adminRoutes);
app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', authRoutes);
app.use('/', foodDonationRoutes);
app.use('/', allFoodRoutes);
app.use('/', userRoutes);

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});