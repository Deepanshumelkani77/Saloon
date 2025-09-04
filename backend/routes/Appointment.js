const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Stylist = require("../models/Stylist");

// Helper function to convert time string to minutes
const timeToMinutes = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes;
  
  if (period === 'PM' && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hours === 12) {
    totalMinutes = minutes;
  }
  
  return totalMinutes;
};

// Helper function to convert minutes to time string
const minutesToTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  
  return `${hours}:${mins.toString().padStart(2, '0')} ${period}`;
};

// Helper function to calculate end time based on start time and duration
const calculateEndTime = (startTime, durationMinutes) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + durationMinutes;
  return minutesToTime(endMinutes);
};

// Check if two time slots overlap
const timeSlotsOverlap = (start1, end1, start2, end2) => {
  const start1Min = timeToMinutes(start1);
  const end1Min = timeToMinutes(end1);
  const start2Min = timeToMinutes(start2);
  const end2Min = timeToMinutes(end2);
  
  return start1Min < end2Min && start2Min < end1Min;
};

// Get all services
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
});

// Get all stylists
router.get("/stylists", async (req, res) => {
  try {
    const stylists = await Stylist.find({ isActive: true });
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stylists", error: error.message });
  }
});

// Check availability for a specific stylist on a specific date
router.post("/check-availability", async (req, res) => {
  try {
    const { stylistId, date, serviceId } = req.body;
    
    // Get service duration
    const service = await Service.findOne({ serviceId });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    // Get existing appointments for the stylist on the specified date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingAppointments = await Appointment.find({
      stylistId,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Generate all possible time slots (9 AM to 8 PM, 30-minute intervals)
    const timeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
      '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'
    ];
    
    const availableSlots = [];
    const bookedSlots = [];
    
    timeSlots.forEach(slot => {
      const proposedEndTime = calculateEndTime(slot, service.duration);
      const proposedEndMinutes = timeToMinutes(proposedEndTime);
      
      // Check if proposed slot would end after 8:30 PM (salon closing)
      if (proposedEndMinutes > timeToMinutes('8:30 PM')) {
        bookedSlots.push({
          time: slot,
          reason: 'Service would extend beyond salon hours'
        });
        return;
      }
      
      // Check for conflicts with existing appointments
      let hasConflict = false;
      let conflictReason = '';
      
      for (const appointment of existingAppointments) {
        if (timeSlotsOverlap(slot, proposedEndTime, appointment.startTime, appointment.endTime)) {
          hasConflict = true;
          conflictReason = `Stylist busy with ${appointment.serviceName}`;
          break;
        }
      }
      
      if (hasConflict) {
        bookedSlots.push({
          time: slot,
          reason: conflictReason
        });
      } else {
        availableSlots.push({
          time: slot,
          endTime: proposedEndTime
        });
      }
    });
    
    res.json({
      availableSlots,
      bookedSlots,
      serviceDuration: service.duration
    });
    
  } catch (error) {
    res.status(500).json({ message: "Error checking availability", error: error.message });
  }
});

// Create new appointment
router.post("/book", async (req, res) => {
  try {
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      stylistId,
      appointmentDate,
      startTime,
      notes
    } = req.body;
    
    // Get service and stylist details
    const service = await Service.findOne({ serviceId });
    const stylist = await Stylist.findOne({ stylistId });
    
    if (!service || !stylist) {
      return res.status(404).json({ message: "Service or stylist not found" });
    }
    
    // Calculate end time
    const endTime = calculateEndTime(startTime, service.duration);
    
    // Double-check availability before booking
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const conflictingAppointments = await Appointment.find({
      stylistId,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Check for time conflicts
    for (const appointment of conflictingAppointments) {
      if (timeSlotsOverlap(startTime, endTime, appointment.startTime, appointment.endTime)) {
        return res.status(409).json({ 
          message: "Time slot no longer available. Please choose another time." 
        });
      }
    }
    
    // Create new appointment
    const newAppointment = new Appointment({
      userId,
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
      stylistId,
      stylistName: stylist.name,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      notes: notes || ''
    });
    
    await newAppointment.save();
    
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment
    });
    
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
});

// Get user appointments
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId }).sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
});

// Cancel appointment
router.put("/cancel/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error: error.message });
  }
});

module.exports = router;
