const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Stylist = require("../models/Stylist");
const { sendConfirmationEmail } = require("../utils/emailService");


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
    const service = await Service.findById(serviceId);
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
    
    // Generate all possible time slots (9 AM to 8:30 PM, 30-minute intervals)
    const timeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
      '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
    ];
    
    const availableSlots = [];
    const bookedSlots = [];
    
    timeSlots.forEach(slot => {
      const proposedEndTime = calculateEndTime(slot, service.duration);
      const proposedEndMinutes = timeToMinutes(proposedEndTime);
      
      // Check if the slot is in the past (for today's date only)
      const selectedDate = new Date(date);
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      
      if (isToday) {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;
        const slotMinutes = timeToMinutes(slot);
        
        if (slotMinutes <= currentTotalMinutes) {
          bookedSlots.push({
            time: slot,
            reason: 'Time slot has already passed'
          });
          return;
        }
      }
      
      // Check if proposed slot would end after 9:00 PM (salon closing)
      if (proposedEndMinutes > timeToMinutes('9:00 PM')) {
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

    
    
    // Validate required fields
    if (!userId || !customerName || !customerEmail || !customerPhone || !serviceId || !stylistId || !appointmentDate || !startTime) {
      console.log('Missing required fields');
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Get service and stylist details
    console.log('Looking for service with ID:', serviceId);
    console.log('Looking for stylist with ID:', stylistId);
    
    const service = await Service.findById(serviceId);
    const stylist = await Stylist.findById(stylistId);
    
    console.log('Found service:', service);
    console.log('Found stylist:', stylist);
    
    if (!service) {
      console.log('Service not found');
      return res.status(404).json({ message: "Service not found" });
    }
    
    if (!stylist) {
      console.log('Stylist not found');
      return res.status(404).json({ message: "Stylist not found" });
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


router.post('/update-payment/:id', async (req, res) => {
  const { id } = req.params;
  const { paid, payment_id } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { paid, payment_id },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Dashboard Statistics - Appointment Stats
router.get("/stats", async (req, res) => {
  try {
    // Total appointments count
    const totalAppointments = await Appointment.countDocuments();
    
    // Today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: { $gte: today, $lt: tomorrow }
    });

    // This month's appointments and revenue
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthlyAppointments = await Appointment.find({
      appointmentDate: { $gte: currentMonth },
      status: { $in: ['confirmed', 'completed'] }
    });

    // Calculate monthly revenue
    const monthlyRevenue = monthlyAppointments.reduce((total, appointment) => {
      const price = parseFloat(appointment.servicePrice?.replace(/[₹,]/g, '')) || 0;
      return total + price;
    }, 0);

    // Appointment status counts
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });

    // Recent appointments (last 10)
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('customerName serviceName startTime status appointmentDate')
      .lean();

    // Format recent appointments for frontend
    const formattedRecentAppointments = recentAppointments.map(appointment => ({
      id: appointment._id,
      customerName: appointment.customerName,
      service: appointment.serviceName,
      time: appointment.startTime,
      status: appointment.status,
      date: appointment.appointmentDate
    }));

    // Popular services (top 5)
    const popularServices = await Appointment.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: '$serviceName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Weekly stats for trend calculation
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const weeklyAppointments = await Appointment.countDocuments({
      appointmentDate: { $gte: lastWeek }
    });

    res.json({
      totalAppointments,
      todayAppointments,
      monthlyRevenue,
      monthlyAppointments: monthlyAppointments.length,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      recentAppointments: formattedRecentAppointments,
      popularServices,
      weeklyAppointments,
      // Growth calculations
      appointmentGrowth: weeklyAppointments > 0 ? ((weeklyAppointments / Math.max(totalAppointments - weeklyAppointments, 1)) * 100).toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment statistics", error: error.message });
  }
});

// Admin: Get all appointments with filtering
router.get("/admin/all", async (req, res) => {
  try {
    const { status, search, date } = req.query;
    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by date if provided
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }

    let appointments = await Appointment.find(query)
      .sort({ appointmentDate: -1, startTime: 1 });

    // Filter by search term if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      appointments = appointments.filter(apt => 
        searchRegex.test(apt.customerName) ||
        searchRegex.test(apt.serviceName) ||
        searchRegex.test(apt.stylistName)
      );
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
});

// Admin: Update appointment status
router.put("/admin/status/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment status updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment status", error: error.message });
  }
});

// Admin: Update payment status
router.put("/admin/payment/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { paid } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { paid },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Payment status updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error: error.message });
  }
});


router.put("/confirm/:id", async (req, res) => {
  console.log(req.body);
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // update status
    appointment.status = "confirmed";
    await appointment.save();

    // pull details from appointment itself
    const userDetails = {
      username: appointment.customerName,
      email: appointment.customerEmail,
      phone: appointment.customerPhone,
      date: appointment.appointmentDate,
      service: appointment.serviceName
    };

    try {
      await sendConfirmationEmail(userDetails.email, userDetails);
      console.log("📧 Email sent to", userDetails.email);
    } catch (emailErr) {
      console.error("Email error:", emailErr.message);
    }

    res.json({
      message: "Appointment confirmed and notification sent",
      appointment
    });
  } catch (err) {
    console.error("Confirm route error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
