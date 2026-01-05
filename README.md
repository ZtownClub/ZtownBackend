# zTown Backend API

Backend API for zTown Fashion Delivery Platform built with Node.js, Express, and MongoDB.

## Features

- Contact form submissions
- Partner application management
- MongoDB database integration
- RESTful API endpoints
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ztown
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ztown
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Contact Form
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (Admin)
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

### Partner Applications
- `POST /api/partners` - Submit partner application
- `GET /api/partners` - Get all partners (Admin)
- `GET /api/partners?status=pending` - Filter by status
- `GET /api/partners/:id` - Get single partner
- `PATCH /api/partners/:id/status` - Update partner status
- `DELETE /api/partners/:id` - Delete partner

## Request Examples

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I have a question..."
  }'
```

### Submit Partner Application
```bash
curl -X POST http://localhost:5000/api/partners \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@brand.com",
    "brandName": "Fashion Brand",
    "contactNumber": "9876543210",
    "website": "https://brand.com",
    "storeAddress": "123 Main St, Gurugram"
  }'
```

## Database Schema

### Contact
- name (String, required)
- email (String, required)
- subject (String, required)
- message (String, required)
- status (enum: new, read, replied)
- timestamps

### Partner
- name (String, required)
- email (String, required, unique)
- brandName (String, required)
- contactNumber (String, required, 10 digits)
- website (String, optional)
- storeAddress (String, required)
- status (enum: pending, approved, rejected)
- timestamps

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── contactController.js
│   └── partnerController.js
├── models/
│   ├── Contact.js
│   └── Partner.js
├── routes/
│   ├── contact.js
│   └── partner.js
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main server file
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Error Handling

All endpoints return JSON responses with:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {} // if applicable
}
```

## CORS Configuration

CORS is enabled for `http://localhost:8080` (frontend URL).

## License

ISC
# ZtownBackend
# ZtownBackend
