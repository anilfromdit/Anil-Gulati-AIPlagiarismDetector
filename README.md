# AI Plagiarism Detector

A modern web application that uses Claude AI to detect plagiarism in text documents. Built with React, Tailwind CSS, and the Anthropic Claude API.

## 🌟 Features

- Real-time plagiarism detection using Claude AI
- Support for multiple file formats (TXT, DOC, DOCX, PDF)
- Responsive design for mobile, tablet, and desktop
- Detailed plagiarism reports with source matching
- User-friendly interface with drag-and-drop file upload
- Comprehensive result analysis and visualization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A valid Claude AI API key from Anthropic

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/ai-plag-detector.git
cd ai-plag-detector
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Claude API key:
```env
REACT_APP_CLAUDE_API_KEY=your-api-key-here
```

⚠️ **IMPORTANT**: Never commit your `.env` file to version control. The `.env` file is already added to `.gitignore`.

4. Start the development server
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

### Production Build

To create a production build:
```bash
npm run build
# or
yarn build
```

## 📦 Dependencies

### Core Dependencies
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.0
- @anthropic-ai/sdk: ^0.31.0
- lucide-react: ^0.263.1
- mammoth: ^1.6.0
- pdfjs-dist: 3.11.174
- react-pdf: ^7.5.1

### Development Dependencies
- tailwindcss: ^3.4.14
- @tailwindcss/forms: ^0.5.9
- @tailwindcss/typography: ^0.5.15
- autoprefixer: ^10.4.20
- postcss: ^8.4.47
- vite: ^5.1.0
- @vitejs/plugin-react: ^4.2.1

## 🎨 Styling

The project uses Tailwind CSS for styling with additional plugins:
- @tailwindcss/forms for form styling
- @tailwindcss/typography for rich text styling

## 🔒 Security Notes

1. Always keep your Claude API key secret
2. Never commit sensitive information to version control
3. Use environment variables for all sensitive configurations
4. Implement proper rate limiting and error handling

## 🌐 API Configuration

The application requires a Claude AI API key from Anthropic. To obtain one:

1. Sign up at [Anthropic's website](https://www.anthropic.com/)
2. Generate an API key from your dashboard
3. Add the key to your `.env` file:
```env
REACT_APP_CLAUDE_API_KEY=your-api-key-here
```

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for the Claude AI API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework

## ⚠️ Important Notes

1. The free tier of Claude AI API has rate limits. Monitor your usage to avoid disruptions.
2. Large documents may take longer to process. Consider implementing a loading state.
3. Some file formats may require additional processing time.
4. Keep your dependencies updated for security and performance improvements.