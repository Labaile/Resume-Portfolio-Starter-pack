# Resume Portfolio Backend API

A Node.js/Express backend with PostgreSQL database for managing contact form submissions from the resume portfolio website.

## 🗄️ Database: PostgreSQL

This backend uses **PostgreSQL** as the primary database with **Sequelize ORM** for data modeling and queries.

### Database Schema

The `contacts` table includes:
- `id` - Auto-incrementing primary key
- `name` - Contact name (required, max 100 chars)
- `email` - Contact email (required, validated)
- `subject` - Message subject (optional, max 200 chars)
- `message` - Contact message (required, max 2000 chars)
- `status` - Message status: 'new', 'read', 'replied', 'archived'
- `ipAddress` - Client IP address
- `userAgent` - Client user agent string
- `createdAt` - Timestamp when message was sent
- `updatedAt` - Timestamp when message was last updated

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- PostgreSQL installed and running
- npm or yarn

### 2. Setup Database
```bash
# From project root
./setup-postgres.sh
```

This script will:
- Check if PostgreSQL is running
- Create the `resume_portfolio` database
- Create a `.env` file with your credentials
- Install backend dependencies

### 3. Manual Setup (Alternative)
```bash
cd backend

# Create .env file
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Install dependencies
npm install

# Create database manually
psql -U your_username -c "CREATE DATABASE resume_portfolio;"
```

### 4. Start Server
```bash
npm run dev
```

The server will start on port 5000 and automatically create the database tables.

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resume_portfolio
DB_USER=postgres
DB_PASSWORD=postgres

# Admin Authentication
ADMIN_KEY=admin123

# Optional: JWT Secret for future authentication
JWT_SECRET=your_jwt_secret_here
```

## 📡 API Endpoints

### Contact Form API (`/api/contact`)

#### POST `/api/contact`
Submit a new contact message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I'd like to discuss a project."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello, I'd like to discuss a project.",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/api/contact`
Get all contact submissions (for admin use).

#### GET `/api/contact/:id`
Get a specific contact submission.

#### PATCH `/api/contact/:id`
Update contact status.

**Request Body:**
```json
{
  "status": "read"
}
```

### Admin API (`/api/admin`)

**Authentication Required:** Include `x-admin-key` header with your admin key.

#### GET `/api/admin/contacts`
Get paginated contacts with filtering and search.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status
- `search` - Search in name, email, subject, or message

**Headers:**
```
x-admin-key: admin123
```

#### GET `/api/admin/contacts/stats`
Get contact statistics.

#### PATCH `/api/admin/contacts/:id/status`
Update contact status.

#### DELETE `/api/admin/contacts/:id`
Delete a contact submission.

## 🛡️ Security Features

- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Express-validator for request validation
- **SQL Injection Protection**: Sequelize ORM with parameterized queries
- **Rate Limiting**: Basic request limiting (can be enhanced)

## 🔍 Database Queries

### Example Queries

```javascript
// Find all new messages
const newMessages = await Contact.findAll({
  where: { status: 'new' },
  order: [['createdAt', 'DESC']]
});

// Search messages
const searchResults = await Contact.findAll({
  where: {
    [Op.or]: [
      { name: { [Op.iLike]: `%${searchTerm}%` } },
      { email: { [Op.iLike]: `%${searchTerm}%` } }
    ]
  }
});

// Get statistics
const stats = await Contact.findAll({
  attributes: [
    'status',
    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
  ],
  group: ['status']
});
```

## 🧪 Testing

Test the API endpoints:

```bash
# From project root
node test-api.js
```

This will test:
- Health check endpoint
- Contact form submission
- Admin authentication

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check if PostgreSQL is running
   - Verify credentials in `.env`
   - Ensure database `resume_portfolio` exists

2. **Port Already in Use**
   - Change `PORT` in `.env`
   - Kill process using port 5000

3. **Validation Errors**
   - Check request body format
   - Ensure required fields are present
   - Verify email format

4. **Admin Access Denied**
   - Check `ADMIN_KEY` in `.env`
   - Include `x-admin-key` header in requests

### Logs

Check server logs for detailed error information:
```bash
cd backend
npm run dev
```

## 🔮 Future Enhancements

- **JWT Authentication**: Replace basic admin key with JWT tokens
- **Email Notifications**: Send emails when new messages arrive
- **File Uploads**: Allow file attachments in contact form
- **Rate Limiting**: Implement proper rate limiting
- **Logging**: Add structured logging with Winston
- **Testing**: Add unit and integration tests

## 📚 Dependencies

- **express**: Web framework
- **sequelize**: ORM for PostgreSQL
- **pg**: PostgreSQL client
- **express-validator**: Request validation
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logging
- **dotenv**: Environment variable management

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.
