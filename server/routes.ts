import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.session?.authenticated) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Authentication required' });
    }
  };

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple admin credentials (you can change these)
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (username === adminUsername && password === adminPassword) {
        req.session.authenticated = true;
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.authenticated = false;
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Check auth status
  app.get("/api/auth-status", (req, res) => {
    res.json({ authenticated: !!req.session?.authenticated });
  });

  // Create transporter for sending emails
  const createTransporter = () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your_email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your_app_password'
      }
    });
  };

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Store in database
      const contact = await storage.createContact(contactData);
      
      // Send email notification
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER || 'your_email@gmail.com',
          to: 'velscolorenz21@gmail.com',
          subject: `New Contact Form Submission: ${contactData.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to velscolorenz21@gmail.com');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails, but log it
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        id: contact.id 
      });
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again." 
        });
      }
    }
  });

  // Get all contacts endpoint (for admin purposes) - PROTECTED
  app.get("/api/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
