import mongoose from 'mongoose';

// Define schema for system health status
const SystemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['healthy', 'degraded', 'unhealthy'],
    default: 'healthy',
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: String,
    required: true,
  },
});

// Use mongoose model or create it if it doesn't exist
export const System = mongoose.models.System || mongoose.model('System', SystemSchema); 