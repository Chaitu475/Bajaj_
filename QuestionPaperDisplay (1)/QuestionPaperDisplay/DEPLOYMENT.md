# Deployment Instructions for Render

This guide will help you deploy your VIT Full Stack API application to Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at https://render.com)
3. Your project code pushed to a GitHub repository

## Step-by-Step Deployment Guide

### 1. Prepare Your Code

1. **Download your project** as a ZIP file from Replit
2. **Extract the ZIP file** on your local machine
3. **Create a new GitHub repository**:
   - Go to GitHub.com and create a new repository
   - Name it something like `vit-fullstack-api`
   - Make it public
4. **Upload your code to GitHub**:
   - You can either use Git commands or GitHub's web interface to upload files
   - Make sure all your project files are included

### 2. Deploy to Render

1. **Login to Render**: Go to https://render.com and sign in
2. **Create a New Web Service**:
   - Click "New +" button
   - Select "Web Service"
3. **Connect Your Repository**:
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account if not already connected
   - Select your repository (`vit-fullstack-api`)
4. **Configure the Service**:
   - **Name**: `vit-fullstack-api` (or your preferred name)
   - **Region**: Choose the closest region to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repository)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && node build.js`
   - **Start Command**: `node dist/start.js`
5. **Environment Variables**:
   - Add environment variable: `NODE_ENV` = `production`
   - Render will automatically set the `PORT` variable
6. **Instance Type**: Select "Free" for testing
7. **Click "Create Web Service"**

### 3. Monitor Deployment

1. **Watch the Build Process**: Render will show you the build logs in real-time
2. **Wait for Deployment**: The process usually takes 3-5 minutes
3. **Get Your URL**: Once deployed, Render will provide you with a public URL like:
   ```
   https://vit-fullstack-api.onrender.com
   ```

### 4. Test Your API

1. **Access your application**: Visit the URL provided by Render
2. **Test the API endpoint**: Your API will be available at:
   ```
   https://your-app-name.onrender.com/api/bfhl
   ```
3. **Use the web interface**: The frontend testing interface will be available at the main URL

## Important Notes

- **Free Tier Limitations**: 
  - Free apps sleep after 15 minutes of inactivity
  - First request after sleeping may take 30+ seconds
  - 750 hours per month limit
- **Custom Domain**: You can add a custom domain in Render's dashboard
- **HTTPS**: Render automatically provides SSL certificates
- **Auto-Deploy**: Render will automatically redeploy when you push changes to GitHub

## API Endpoint Information

Once deployed, your API will be accessible at:
- **Method**: POST
- **URL**: `https://your-app-name.onrender.com/api/bfhl`
- **Request Format**: 
  ```json
  {
    "data": ["a","1","334","4","R","$"]
  }
  ```

## Troubleshooting

1. **Build Fails**: Check the build logs for error messages
2. **App Won't Start**: Verify your `package.json` scripts are correct
3. **API Not Responding**: Check that your PORT environment variable is set correctly
4. **Need Support**: Check Render's documentation or contact their support

## Next Steps

After successful deployment:
1. Test all API functionality
2. Share your API endpoint URL
3. Consider upgrading to a paid plan for production use
4. Set up monitoring and logging if needed

Your application is now live and accessible to the world!