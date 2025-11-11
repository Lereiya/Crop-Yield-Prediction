# Backend Integration Guide

## Overview

This React frontend is designed to connect to your Python/XGBoost backend API. The frontend provides a beautiful, modern interface for crop yield prediction while your Python backend handles the ML model and data processing.

## Architecture

```
┌─────────────────────┐         HTTP/REST API         ┌──────────────────────┐
│  React Frontend     │◄──────────────────────────────►│  Python Backend      │
│  (This App)         │         JSON Data Exchange     │  (Your ML System)    │
│                     │                                 │                      │
│  - User Interface   │                                 │  - XGBoost Model     │
│  - Form Validation  │                                 │  - Data Processor    │
│  - Visualizations   │                                 │  - API Integration   │
└─────────────────────┘                                 └──────────────────────┘
```

## Backend API Requirements

Your Python backend should expose the following endpoint:

### POST /predict

**Request Body:**
```json
{
  "cropType": "rice",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "area": 10.5,
  "season": "kharif"
}
```

**Response Body:**
```json
{
  "predictedYield": 4.25,
  "confidence": 92.5,
  "cropType": "rice",
  "area": 10.5,
  "dataSourcesUsed": [
    "NASA Earth Data (MODIS)",
    "OpenWeatherMap API",
    "FAO Soils Portal"
  ],
  "featureContributions": [
    { "name": "Rainfall", "value": 0.28 },
    { "name": "Temperature", "value": 0.22 },
    { "name": "NDVI", "value": 0.18 },
    { "name": "Soil pH", "value": 0.15 },
    { "name": "Soil Nitrogen", "value": 0.17 }
  ],
  "historicalComparison": [
    { "month": "Jan", "yield": 3.2 },
    { "month": "Feb", "yield": 3.4 },
    { "month": "Mar", "yield": 3.6 },
    { "month": "Apr", "yield": 3.8 },
    { "month": "May", "yield": 4.0 },
    { "month": "Jun", "yield": 3.9 }
  ]
}
```

## Integration Steps

### 1. Update the API Endpoint

In `src/pages/Index.tsx`, locate the `handlePredict` function and replace the mock implementation with your actual backend URL:

```typescript
const handlePredict = async (formData: any) => {
  setLoading(true);
  
  try {
    // Replace with your actual backend URL
    const response = await fetch('https://your-backend-url.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Prediction request failed');
    }

    const data = await response.json();
    setPredictionData(data);
    
    toast({
      title: "Prediction Complete",
      description: "Yield prediction generated successfully using XGBoost model",
    });
  } catch (error) {
    toast({
      title: "Prediction Failed",
      description: error.message || "Unable to generate prediction",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};
```

### 2. Handle CORS

Your Python backend must enable CORS to allow requests from the frontend:

**Flask Example:**
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['https://your-frontend-url.com'])
```

**FastAPI Example:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-url.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Deploy Your Python Backend

Deploy your Python backend to a cloud platform:

- **Render**: Easy Python deployment with free tier
- **Railway**: Fast deployment with automatic HTTPS
- **Heroku**: Classic platform with good documentation
- **AWS Lambda**: Serverless deployment for cost efficiency
- **Google Cloud Run**: Containerized deployment

### 4. Environment Variables (Optional)

For development, you can create a `.env.local` file (not committed to git):

```env
VITE_API_URL=http://localhost:5000
```

Then access it in your code:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-production-backend.com';
```

## Development Workflow

### Frontend (This App)
```bash
npm install
npm run dev
```

### Backend (Your Python App)
```bash
pip install -r requirements.txt
python app.py  # or uvicorn main:app --reload for FastAPI
```

## Example Python Backend Structure

```
backend/
├── app.py                 # Main Flask/FastAPI application
├── data_processor.py      # DataProcessor class with API integration
├── prediction_engine.py   # PredictionEngine with XGBoost model
├── models/
│   └── xgboost_model.pkl # Trained model
├── requirements.txt       # Python dependencies
└── .env                   # API keys (not committed)
```

## Testing the Integration

1. Start your Python backend locally
2. Update the frontend API URL to `http://localhost:5000` (or your port)
3. Test predictions through the UI
4. Check browser console for any errors
5. Verify the response matches the expected format

## Error Handling

The frontend includes comprehensive error handling:
- Form validation before API calls
- Toast notifications for success/failure
- Graceful fallback for network errors
- Loading states during prediction

## Security Considerations

- **Never expose API keys in frontend code**
- Store sensitive keys in backend environment variables
- Use HTTPS for production deployments
- Implement rate limiting on your backend
- Validate all inputs on both frontend and backend

## Performance Optimization

- Backend should respond within 10 seconds (as per SRS requirements)
- Consider caching frequently requested predictions
- Implement request timeouts on frontend
- Use compression for large responses

## Deployment

### Frontend Deployment (Lovable)
1. Click "Publish" in the top right
2. Your React app will be deployed to Lovable's CDN
3. Get your public URL

### Backend Deployment
1. Push your Python code to GitHub
2. Connect to your chosen platform (Render, Railway, etc.)
3. Add environment variables (API keys)
4. Deploy
5. Get your backend URL
6. Update frontend API endpoint

## Need Help?

- Check browser console for errors
- Verify backend is running and accessible
- Test backend endpoint with Postman/curl
- Ensure CORS is properly configured
- Check network tab in browser DevTools

## Contact

For questions about this frontend application, refer to the main README.md.
For backend implementation, consult your Python documentation and capstone project guidelines.
