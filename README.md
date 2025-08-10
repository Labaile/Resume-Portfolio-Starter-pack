# Resume Portfolio Starter Pack

A modern, responsive resume portfolio website built with React and Tailwind CSS. Perfect for developers, designers, and professionals looking to showcase their work online.

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React**: Built with React 18 and modern hooks
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Easy Customization**: All content stored in `resumeData.json`
- **Contact Form**: Interactive contact form with validation
- **Portfolio Showcase**: Display your projects with images and descriptions
- **Testimonials**: Showcase client feedback and recommendations
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🆕 NEW: Full-Stack Contact Form with Database

The contact form now includes a **full-stack backend** with **PostgreSQL database** for storing and managing contact submissions!

### 🗄️ Backend Features
- **Node.js/Express API** with RESTful endpoints
- **PostgreSQL database** with Sequelize ORM
- **Contact form storage** with status tracking
- **Admin dashboard** for managing submissions
- **Search, filtering, and pagination**
- **Security features** (CORS, Helmet, validation)

### 🎯 Quick Start for Full-Stack Features

1. **Setup PostgreSQL** (if not already done):
   ```bash
   ./setup-postgres.sh
   ```

2. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the Frontend**:
   ```bash
   npm start
   ```

4. **Access Admin Dashboard**:
   - Open your browser in development mode
   - Admin dashboard appears below the contact form
   - Use admin key: `admin123` (set in `.env`)

For detailed backend documentation, see [backend/README.md](backend/README.md).

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (for full-stack features)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd Resume-Portfolio-Starter-pack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Customize your content**:
   - Edit `public/resumeData.json` with your information
   - Replace images in `public/images/` with your own
   - Update colors and styling in `src/index.css`

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📝 Customization

### Content Updates

All content is stored in `public/resumeData.json`. Simply edit this file to update:

- Personal information
- Work experience
- Skills and education
- Portfolio projects
- Testimonials
- Contact details

### Styling Changes

- **Colors**: Update CSS variables in `src/index.css`
- **Layout**: Modify component files in `src/Components/`
- **Responsiveness**: Adjust Tailwind classes in components

### Adding New Sections

1. Create a new component in `src/Components/`
2. Add it to `src/App.js`
3. Include any necessary data in `resumeData.json`

## 🎨 Component Structure

- `Header.js` - Navigation and hero section
- `About.js` - Personal introduction
- `Resume.js` - Work experience and skills
- `Portfolio.js` - Project showcase
- `Testimonials.js` - Client feedback
- `Contact.js` - Contact form
- `Footer.js` - Social links and footer
- `AdminDashboard.js` - Contact management (development only)

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App
- `npm run dev` - Start backend server (in backend directory)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌟 Technologies Used

- **Frontend**: React 18, Tailwind CSS, React Scripts
- **Backend**: Node.js, Express.js, PostgreSQL, Sequelize
- **Styling**: Tailwind CSS, CSS3
- **Build Tool**: Create React App

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing your portfolio, please open an issue on GitHub.

---

**Happy coding! 🚀**
