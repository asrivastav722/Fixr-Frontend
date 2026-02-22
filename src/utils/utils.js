import {
  Camera,
  Car,
  Droplets, Hammer,
  HeartPulse,
  Laptop,
  Paintbrush,
  Scissors,
  ShieldCheck,
  Tv,
  Wind,
  Zap
} from "lucide-react-native";

// Technician Data - Mocked for demonstration

export const CATEGORIES = [
  { id: '1', name: 'Electrician', icon: Zap, color: 'bg-yellow-100', iconColor: '#EAB308' },
  { id: '2', name: 'Plumber', icon: Droplets, color: 'bg-blue-100', iconColor: '#3B82F6' },
  { id: '3', name: 'Carpenter', icon: Hammer, color: 'bg-orange-100', iconColor: '#F97316' },
  { id: '4', name: 'AC Repair', icon: Wind, color: 'bg-cyan-100', iconColor: '#0891B2' },
  { id: '5', name: 'Painting', icon: Paintbrush, color: 'bg-purple-100', iconColor: '#A855F7' },
  { id: '6', name: 'Cleaning', icon: ShieldCheck, color: 'bg-green-100', iconColor: '#22C55E' },
  { id: '7', name: 'Appliance', icon: Tv, color: 'bg-red-100', iconColor: '#EF4444' },
  { id: '8', name: 'IT Support', icon: Laptop, color: 'bg-slate-100', iconColor: '#475569' },
  { id: '9', name: 'CCTV', icon: Camera, color: 'bg-zinc-100', iconColor: '#18181b' },
  { id: '10', name: 'Mechanic', icon: Car, color: 'bg-blue-50', iconColor: '#1d4ed8' },
  { id: '11', name: 'Health', icon: HeartPulse, color: 'bg-rose-100', iconColor: '#e11d48' },
  { id: '12', name: 'Salon', icon: Scissors, color: 'bg-pink-100', iconColor: '#db2777' },
];

// Mock Data for Technicians

export const technicians = [

/* =========================
   ELECTRICIANS (4)
========================= */

{
  id: "tech_001",
  name: "Rajesh Kumar",
  phone: "+91 9876543210",
  email: "rajesh.kumar@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/11.jpg",
  profession: "Electrician",
  skills: ["Wiring", "Fan Installation", "Switch Board Repair", "Inverter Setup"],
  experience_years: 8,
  experience_type: "Residential & Commercial",
  about: "Experienced electrician specializing in home wiring and inverter installations. Known for punctual and clean work.",
  starting_price: 299,
  price_unit: "per visit",
  location: {
    address: "Gomti Nagar, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226010",
    coordinates: { latitude: 27.1450112, longitude: 83.7582848 }
  },
  service_radius_km: 10,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "09:00", end: "18:00" }
  },
  emergency_available: true,
  response_time_minutes: 15,
  response_badge: "Fast Responder",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 94,
  joined_at: "2024-11-15",
  rating: 4.8,
  total_reviews: 5,
  reviews: [
    { id: "rev_001", user_name: "Amit", rating: 5, comment: "Very professional work.", date: "2025-04-01" },
    { id: "rev_002", user_name: "Neha", rating: 5, comment: "Installed inverter quickly.", date: "2025-04-12" },
    { id: "rev_003", user_name: "Rohit", rating: 4, comment: "Good service.", date: "2025-04-18" },
    { id: "rev_004", user_name: "Priya", rating: 5, comment: "Highly recommended.", date: "2025-05-01" },
    { id: "rev_005", user_name: "Karan", rating: 5, comment: "Very punctual.", date: "2025-05-09" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?1"],
  contact_clicks: 240,
  profile_views: 1280,
  is_featured: true,
  is_active: true
},

{
  id: "tech_002",
  name: "Sunil Yadav",
  phone: "+91 9123409876",
  email: "sunil.yadav@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/12.jpg",
  profession: "Electrician",
  skills: ["Switch Repair","MCB Fixing","Lighting Setup"],
  experience_years: 5,
  experience_type: "Residential",
  about: "Affordable and reliable electrician for small home fixes.",
  starting_price: 249,
  price_unit: "per visit",
  location: {
    address: "Alambagh, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226005",
    coordinates: { latitude: 27.1530112, 
  longitude: 83.7502848  }
  },
  service_radius_km: 8,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "19:00" }
  },
  emergency_available: false,
  response_time_minutes: 25,
  response_badge: "Quick Responder",
  is_verified: true,
  verification_badges: ["ID Verified"],
  reliability_score: 86,
  joined_at: "2025-01-10",
  rating: 4.3,
  total_reviews: 3,
  reviews: [
    { id: "rev_006", user_name: "Ravi", rating: 4, comment: "Solved wiring issue.", date: "2025-03-02" },
    { id: "rev_007", user_name: "Manoj", rating: 5, comment: "Good electrician.", date: "2025-04-14" },
    { id: "rev_008", user_name: "Anita", rating: 4, comment: "Affordable service.", date: "2025-05-03" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?2"],
  contact_clicks: 95,
  profile_views: 410,
  is_featured: false,
  is_active: true
},

{
  id: "tech_003",
  name: "Arvind Singh",
  phone: "+91 9988776655",
  email: "arvind.singh@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/13.jpg",
  profession: "Electrician",
  skills: ["Industrial Wiring","Generator Setup"],
  experience_years: 12,
  experience_type: "Commercial",
  about: "Industrial and commercial electrical specialist.",
  starting_price: 599,
  price_unit: "per visit",
  location: {
    address: "Indira Nagar, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226016",
    coordinates: { latitude: 27.1900112, 
  longitude: 83.7202848  }
  },
  service_radius_km: 15,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "09:00", end: "17:00" }
  },
  emergency_available: false,
  response_time_minutes: 40,
  response_badge: "Responds Within 1 Hour",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 90,
  joined_at: "2024-08-05",
  rating: 4.7,
  total_reviews: 4,
  reviews: [
    { id: "rev_009", user_name: "Deepak", rating: 5, comment: "Very knowledgeable.", date: "2025-02-10" },
    { id: "rev_010", user_name: "Vivek", rating: 4, comment: "Good service.", date: "2025-03-15" },
    { id: "rev_011", user_name: "Ramesh", rating: 5, comment: "Handled complex wiring.", date: "2025-04-18" },
    { id: "rev_012", user_name: "Alok", rating: 5, comment: "Professional work.", date: "2025-05-02" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?3"],
  contact_clicks: 180,
  profile_views: 950,
  is_featured: true,
  is_active: true
},

{
  id: "tech_004",
  name: "Mohit Tiwari",
  phone: "+91 9012345678",
  email: "mohit.tiwari@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/14.jpg",
  profession: "Electrician",
  skills: ["Home Wiring","Ceiling Fan Repair"],
  experience_years: 3,
  experience_type: "Residential",
  about: "Young and energetic electrician providing affordable services.",
  starting_price: 199,
  price_unit: "per visit",
  location: {
    address: "Chinhat, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226028",
    coordinates: { latitude: 26.8902, longitude: 81.0412 }
  },
  service_radius_km: 6,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "08:00", end: "16:00" }
  },
  emergency_available: false,
  response_time_minutes: 35,
  response_badge: "Responds Within 1 Hour",
  is_verified: false,
  verification_badges: [],
  reliability_score: 75,
  joined_at: "2025-02-20",
  rating: 4.1,
  total_reviews: 2,
  reviews: [
    { id: "rev_013", user_name: "Suresh", rating: 4, comment: "Decent service.", date: "2025-03-20" },
    { id: "rev_014", user_name: "Anil", rating: 4, comment: "Affordable pricing.", date: "2025-04-05" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?4"],
  contact_clicks: 60,
  profile_views: 260,
  is_featured: false,
  is_active: true
},


/* =========================
   PLUMBERS (4)
========================= */

{
  id: "tech_005",
  name: "Imran Ali",
  phone: "+91 9123456780",
  email: "imran.ali@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/21.jpg",
  profession: "Plumber",
  skills: ["Pipe Repair","Leak Fixing","Bathroom Fitting","Tap Installation"],
  experience_years: 6,
  experience_type: "Residential",
  about: "Reliable plumber for leak repairs and bathroom fittings. Quick emergency support available.",
  starting_price: 249,
  price_unit: "per visit",
  location: {
    address: "Alambagh, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226005",
    coordinates: { latitude: 26.7606, longitude: 80.8967 }
  },
  service_radius_km: 8,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    working_hours: { start: "08:00", end: "20:00" }
  },
  emergency_available: true,
  response_time_minutes: 20,
  response_badge: "Quick Responder",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 89,
  joined_at: "2025-02-15",
  rating: 4.6,
  total_reviews: 4,
  reviews: [
    { id: "rev_015", user_name: "Sneha", rating: 5, comment: "Fixed leakage fast!", date: "2025-03-10" },
    { id: "rev_016", user_name: "Vijay", rating: 4, comment: "Good work.", date: "2025-03-25" },
    { id: "rev_017", user_name: "Arti", rating: 5, comment: "Very professional.", date: "2025-04-14" },
    { id: "rev_018", user_name: "Nitin", rating: 4, comment: "Reasonable charges.", date: "2025-05-01" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?5"],
  contact_clicks: 140,
  profile_views: 620,
  is_featured: false,
  is_active: true
},

{
  id: "tech_006",
  name: "Rakesh Gupta",
  phone: "+91 9001987654",
  email: "rakesh.gupta@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/22.jpg",
  profession: "Plumber",
  skills: ["Water Tank Cleaning","Drain Block Removal"],
  experience_years: 9,
  experience_type: "Residential & Commercial",
  about: "Specialist in drainage and tank cleaning services.",
  starting_price: 399,
  price_unit: "per job",
  location: {
    address: "Indira Nagar, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226016",
    coordinates: { latitude: 26.8781, longitude: 80.9990 }
  },
  service_radius_km: 12,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "09:00", end: "18:00" }
  },
  emergency_available: false,
  response_time_minutes: 45,
  response_badge: "Responds Within 1 Hour",
  is_verified: true,
  verification_badges: ["ID Verified"],
  reliability_score: 91,
  joined_at: "2024-09-12",
  rating: 4.7,
  total_reviews: 3,
  reviews: [
    { id: "rev_019", user_name: "Rahul", rating: 5, comment: "Solved drainage issue.", date: "2025-02-05" },
    { id: "rev_020", user_name: "Pooja", rating: 4, comment: "Clean work.", date: "2025-03-22" },
    { id: "rev_021", user_name: "Sameer", rating: 5, comment: "Highly recommended.", date: "2025-04-30" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?6"],
  contact_clicks: 175,
  profile_views: 820,
  is_featured: true,
  is_active: true
},

{
  id: "tech_007",
  name: "Aslam Khan",
  phone: "+91 9887766554",
  email: "aslam.khan@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/23.jpg",
  profession: "Plumber",
  skills: ["Tap Replacement","Bathroom Renovation"],
  experience_years: 4,
  experience_type: "Residential",
  about: "Affordable plumbing and bathroom fittings specialist.",
  starting_price: 199,
  price_unit: "per visit",
  location: {
    address: "Chinhat, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226028",
    coordinates: { latitude: 26.8902, longitude: 81.0412 }
  },
  service_radius_km: 7,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "08:00", end: "17:00" }
  },
  emergency_available: false,
  response_time_minutes: 30,
  response_badge: "Responds Within 30 Min",
  is_verified: false,
  verification_badges: [],
  reliability_score: 78,
  joined_at: "2025-03-01",
  rating: 4.2,
  total_reviews: 2,
  reviews: [
    { id: "rev_022", user_name: "Ritu", rating: 4, comment: "Quick tap replacement.", date: "2025-03-20" },
    { id: "rev_023", user_name: "Kunal", rating: 4, comment: "Decent service.", date: "2025-04-11" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?7"],
  contact_clicks: 70,
  profile_views: 300,
  is_featured: false,
  is_active: true
},

{
  id: "tech_008",
  name: "Deepak Mishra",
  phone: "+91 9345678901",
  email: "deepak.mishra@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/24.jpg",
  profession: "Plumber",
  skills: ["Sewer Line Repair","Water Heater Installation"],
  experience_years: 11,
  experience_type: "Commercial",
  about: "Expert in large plumbing and water heater installations.",
  starting_price: 499,
  price_unit: "per job",
  location: {
    address: "Hazratganj, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226001",
    coordinates: { latitude: 26.8469, longitude: 80.9462 }
  },
  service_radius_km: 15,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "18:00" }
  },
  emergency_available: true,
  response_time_minutes: 18,
  response_badge: "Fast Responder",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 95,
  joined_at: "2024-07-18",
  rating: 4.9,
  total_reviews: 6,
  reviews: [
    { id: "rev_024", user_name: "Ajay", rating: 5, comment: "Excellent work.", date: "2025-02-01" },
    { id: "rev_025", user_name: "Nidhi", rating: 5, comment: "Very professional.", date: "2025-02-20" },
    { id: "rev_026", user_name: "Harsh", rating: 4, comment: "Good service.", date: "2025-03-15" },
    { id: "rev_027", user_name: "Rohan", rating: 5, comment: "Quick response.", date: "2025-04-01" },
    { id: "rev_028", user_name: "Megha", rating: 5, comment: "Highly recommended.", date: "2025-04-20" },
    { id: "rev_029", user_name: "Sanjana", rating: 5, comment: "Top quality.", date: "2025-05-10" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?8"],
  contact_clicks: 260,
  profile_views: 1500,
  is_featured: true,
  is_active: true
},

/* =========================
   AC TECHNICIANS (4)
========================= */

{
  id: "tech_009",
  name: "Vikas Sharma",
  phone: "+91 9988776655",
  email: "vikas.sharma@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/31.jpg",
  profession: "AC Technician",
  skills: ["AC Installation","Gas Refill","AC Service","Cooling Issue Repair"],
  experience_years: 10,
  experience_type: "Residential & Commercial",
  about: "Certified AC technician providing installation and maintenance services.",
  starting_price: 499,
  price_unit: "per visit",
  location: {
    address: "Indira Nagar, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226016",
    coordinates: { latitude: 26.8781, longitude: 80.9990 }
  },
  service_radius_km: 12,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "19:00" }
  },
  emergency_available: true,
  response_time_minutes: 22,
  response_badge: "Quick Responder",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 93,
  joined_at: "2024-06-10",
  rating: 4.8,
  total_reviews: 5,
  reviews: [
    { id: "rev_030", user_name: "Arjun", rating: 5, comment: "Best AC service.", date: "2025-02-11" },
    { id: "rev_031", user_name: "Pooja", rating: 5, comment: "Cooling fixed quickly.", date: "2025-03-08" },
    { id: "rev_032", user_name: "Rakesh", rating: 4, comment: "Good technician.", date: "2025-03-25" },
    { id: "rev_033", user_name: "Anjali", rating: 5, comment: "Professional and clean work.", date: "2025-04-14" },
    { id: "rev_034", user_name: "Nikhil", rating: 5, comment: "Highly skilled.", date: "2025-05-02" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?9"],
  contact_clicks: 210,
  profile_views: 1100,
  is_featured: true,
  is_active: true
},

{
  id: "tech_010",
  name: "Sandeep Yadav",
  phone: "+91 9876501234",
  email: "sandeep.yadav@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/32.jpg",
  profession: "AC Technician",
  skills: ["Window AC Repair","Split AC Cleaning"],
  experience_years: 5,
  experience_type: "Residential",
  about: "Affordable AC cleaning and repair specialist.",
  starting_price: 349,
  price_unit: "per visit",
  location: {
    address: "Gomti Nagar Extension, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226010",
    coordinates: { latitude: 26.8500, longitude: 80.9900 }
  },
  service_radius_km: 8,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "09:00", end: "18:00" }
  },
  emergency_available: false,
  response_time_minutes: 30,
  response_badge: "Responds Within 30 Min",
  is_verified: false,
  verification_badges: [],
  reliability_score: 82,
  joined_at: "2025-01-12",
  rating: 4.2,
  total_reviews: 3,
  reviews: [
    { id: "rev_035", user_name: "Meena", rating: 4, comment: "AC cleaned properly.", date: "2025-03-10" },
    { id: "rev_036", user_name: "Karan", rating: 4, comment: "Affordable pricing.", date: "2025-04-05" },
    { id: "rev_037", user_name: "Ritu", rating: 5, comment: "Satisfied service.", date: "2025-05-01" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?10"],
  contact_clicks: 120,
  profile_views: 540,
  is_featured: false,
  is_active: true
},

{
  id: "tech_011",
  name: "Aman Verma",
  phone: "+91 9765432109",
  email: "aman.verma@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/33.jpg",
  profession: "AC Technician",
  skills: ["Commercial AC Setup","Gas Charging"],
  experience_years: 9,
  experience_type: "Commercial",
  about: "Commercial AC expert with fast response time.",
  starting_price: 599,
  price_unit: "per visit",
  location: {
    address: "Hazratganj, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226001",
    coordinates: { latitude: 26.8469, longitude: 80.9462 }
  },
  service_radius_km: 14,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "19:00" }
  },
  emergency_available: true,
  response_time_minutes: 18,
  response_badge: "Fast Responder",
  is_verified: true,
  verification_badges: ["ID Verified"],
  reliability_score: 91,
  joined_at: "2024-05-01",
  rating: 4.7,
  total_reviews: 4,
  reviews: [
    { id: "rev_038", user_name: "Sahil", rating: 5, comment: "Excellent setup.", date: "2025-02-02" },
    { id: "rev_039", user_name: "Ramesh", rating: 4, comment: "Good technician.", date: "2025-03-15" },
    { id: "rev_040", user_name: "Pankaj", rating: 5, comment: "Fast and reliable.", date: "2025-04-01" },
    { id: "rev_041", user_name: "Nisha", rating: 5, comment: "Very professional.", date: "2025-05-06" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?11"],
  contact_clicks: 195,
  profile_views: 900,
  is_featured: true,
  is_active: true
},

{
  id: "tech_012",
  name: "Rohit Saxena",
  phone: "+91 9654321870",
  email: "rohit.saxena@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/34.jpg",
  profession: "AC Technician",
  skills: ["AC Maintenance","Cooling Coil Cleaning"],
  experience_years: 4,
  experience_type: "Residential",
  about: "Dedicated AC maintenance professional.",
  starting_price: 299,
  price_unit: "per visit",
  location: {
    address: "Chinhat, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226028",
    coordinates: { latitude: 26.8902, longitude: 81.0412 }
  },
  service_radius_km: 6,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "09:00", end: "17:00" }
  },
  emergency_available: false,
  response_time_minutes: 35,
  response_badge: "Responds Within 1 Hour",
  is_verified: false,
  verification_badges: [],
  reliability_score: 76,
  joined_at: "2025-03-05",
  rating: 4.0,
  total_reviews: 2,
  reviews: [
    { id: "rev_042", user_name: "Asha", rating: 4, comment: "Good service.", date: "2025-04-01" },
    { id: "rev_043", user_name: "Kunal", rating: 4, comment: "Satisfied.", date: "2025-04-20" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?12"],
  contact_clicks: 70,
  profile_views: 310,
  is_featured: false,
  is_active: true
},


/* =========================
   AC TECHNICIANS (4)
========================= */

{
  id: "tech_009",
  name: "Vikas Sharma",
  phone: "+91 9988776655",
  email: "vikas.sharma@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/31.jpg",
  profession: "AC Technician",
  skills: ["AC Installation","Gas Refill","AC Service","Cooling Issue Repair"],
  experience_years: 10,
  experience_type: "Residential & Commercial",
  about: "Certified AC technician providing installation and maintenance services.",
  starting_price: 499,
  price_unit: "per visit",
  location: {
    address: "Indira Nagar, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226016",
    coordinates: { latitude: 27.1450112, longitude: 83.7582848 }
  },
  service_radius_km: 12,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "19:00" }
  },
  emergency_available: true,
  response_time_minutes: 22,
  response_badge: "Quick Responder",
  is_verified: true,
  verification_badges: ["ID Verified","Background Checked"],
  reliability_score: 93,
  joined_at: "2024-06-10",
  rating: 4.8,
  total_reviews: 5,
  reviews: [
    { id: "rev_030", user_name: "Arjun", rating: 5, comment: "Best AC service.", date: "2025-02-11" },
    { id: "rev_031", user_name: "Pooja", rating: 5, comment: "Cooling fixed quickly.", date: "2025-03-08" },
    { id: "rev_032", user_name: "Rakesh", rating: 4, comment: "Good technician.", date: "2025-03-25" },
    { id: "rev_033", user_name: "Anjali", rating: 5, comment: "Professional and clean work.", date: "2025-04-14" },
    { id: "rev_034", user_name: "Nikhil", rating: 5, comment: "Highly skilled.", date: "2025-05-02" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?9"],
  contact_clicks: 210,
  profile_views: 1100,
  is_featured: true,
  is_active: true
},
{
  id: "tech_010",
  name: "Sandeep Yadav",
  phone: "+91 9876501234",
  email: "sandeep.yadav@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/32.jpg",
  profession: "AC Technician",
  skills: ["Window AC Repair","Split AC Cleaning"],
  experience_years: 5,
  experience_type: "Residential",
  about: "Affordable AC cleaning and repair specialist.",
  starting_price: 349,
  price_unit: "per visit",
  location: {
    address: "Gomti Nagar Extension, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226010",
    coordinates: { latitude: 26.8500, longitude: 80.9900 }
  },
  service_radius_km: 8,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "09:00", end: "18:00" }
  },
  emergency_available: false,
  response_time_minutes: 30,
  response_badge: "Responds Within 30 Min",
  is_verified: false,
  verification_badges: [],
  reliability_score: 82,
  joined_at: "2025-01-12",
  rating: 4.2,
  total_reviews: 3,
  reviews: [
    { id: "rev_035", user_name: "Meena", rating: 4, comment: "AC cleaned properly.", date: "2025-03-10" },
    { id: "rev_036", user_name: "Karan", rating: 4, comment: "Affordable pricing.", date: "2025-04-05" },
    { id: "rev_037", user_name: "Ritu", rating: 5, comment: "Satisfied service.", date: "2025-05-01" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?10"],
  contact_clicks: 120,
  profile_views: 540,
  is_featured: false,
  is_active: true
},
{
  id: "tech_011",
  name: "Aman Verma",
  phone: "+91 9765432109",
  email: "aman.verma@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/33.jpg",
  profession: "AC Technician",
  skills: ["Commercial AC Setup","Gas Charging"],
  experience_years: 9,
  experience_type: "Commercial",
  about: "Commercial AC expert with fast response time.",
  starting_price: 599,
  price_unit: "per visit",
  location: {
    address: "Hazratganj, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226001",
    coordinates: { latitude: 26.8469, longitude: 80.9462 }
  },
  service_radius_km: 14,
  availability: {
    is_available_now: true,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    working_hours: { start: "10:00", end: "19:00" }
  },
  emergency_available: true,
  response_time_minutes: 18,
  response_badge: "Fast Responder",
  is_verified: true,
  verification_badges: ["ID Verified"],
  reliability_score: 91,
  joined_at: "2024-05-01",
  rating: 4.7,
  total_reviews: 4,
  reviews: [
    { id: "rev_038", user_name: "Sahil", rating: 5, comment: "Excellent setup.", date: "2025-02-02" },
    { id: "rev_039", user_name: "Ramesh", rating: 4, comment: "Good technician.", date: "2025-03-15" },
    { id: "rev_040", user_name: "Pankaj", rating: 5, comment: "Fast and reliable.", date: "2025-04-01" },
    { id: "rev_041", user_name: "Nisha", rating: 5, comment: "Very professional.", date: "2025-05-06" }
  ],
  languages: ["Hindi","English"],
  portfolio: ["https://picsum.photos/200/300?11"],
  contact_clicks: 195,
  profile_views: 900,
  is_featured: true,
  is_active: true
},
{
  id: "tech_012",
  name: "Rohit Saxena",
  phone: "+91 9654321870",
  email: "rohit.saxena@example.com",
  profile_image: "https://randomuser.me/api/portraits/men/34.jpg",
  profession: "AC Technician",
  skills: ["AC Maintenance","Cooling Coil Cleaning"],
  experience_years: 4,
  experience_type: "Residential",
  about: "Dedicated AC maintenance professional.",
  starting_price: 299,
  price_unit: "per visit",
  location: {
    address: "Chinhat, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "226028",
    coordinates: { latitude: 26.8902, longitude: 81.0412 }
  },
  service_radius_km: 6,
  availability: {
    is_available_now: false,
    working_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    working_hours: { start: "09:00", end: "17:00" }
  },
  emergency_available: false,
  response_time_minutes: 35,
  response_badge: "Responds Within 1 Hour",
  is_verified: false,
  verification_badges: [],
  reliability_score: 76,
  joined_at: "2025-03-05",
  rating: 4.0,
  total_reviews: 2,
  reviews: [
    { id: "rev_042", user_name: "Asha", rating: 4, comment: "Good service.", date: "2025-04-01" },
    { id: "rev_043", user_name: "Kunal", rating: 4, comment: "Satisfied.", date: "2025-04-20" }
  ],
  languages: ["Hindi"],
  portfolio: ["https://picsum.photos/200/300?12"],
  contact_clicks: 70,
  profile_views: 310,
  is_featured: false,
  is_active: true
},
{
  "id": "tech-021",
  "name": "Sandeep Verma",
  "role": "Carpenter",
  "experience_years": 11,
  "basefees": "299",
  "reviews_count": 64,
  "rating": 4.7,
  "profilePicture": "https://dummyimage.com/300/78350f/ffffff&text=SV",
  "availability": "available",
  "about": "Specialized in custom furniture, modular kitchen fittings, and door installations. Known for precision finishing and long-lasting woodwork.",
  "location": {
    "city": "Delhi",
    "area": "Janakpuri",
    "coordinates": {
      "latitude": 28.6219,
      "longitude": 77.0878
    }
  },
  "skills": [
    { "name": "Custom Furniture", "level": "Expert", "certified": true },
    { "name": "Door Installation", "level": "Expert", "certified": false },
    { "name": "Modular Kitchen Fitting", "level": "Advanced", "certified": true }
  ],
  "contact": {
    "phone": "+91-98765-12001",
    "email": "sandeep.fixr@example.com"
  },
  "stats": {
    "jobs_completed": 312,
    "repeat_customers": 78,
    "response_time_minutes": 18,
    "on_time_rate": 94,
    "cancellation_rate": 4
  },
  "verification": {
    "is_verified": true,
    "background_checked": true,
    "aadhaar_verified": true
  },
  "pricing": {
    "inspection_fee": 199,
    "emergency_available": true,
    "emergency_fee": 399
  },
  "working_hours": {
    "start": "09:00",
    "end": "19:00",
    "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  "reviews": [
    {
      "user": "Anita Kapoor",
      "rating": 5,
      "comment": "Excellent custom wardrobe work. Very neat finishing.",
      "date": "2025-01-11"
    },
    {
      "user": "Rahul Mehta",
      "rating": 4,
      "comment": "Good service but arrived slightly late.",
      "date": "2025-01-25"
    },
    {
      "user": "Vikas Arora",
      "rating": 5,
      "comment": "Highly skilled carpenter. Recommended!",
      "date": "2025-02-02"
    }
  ]
},
{
  "id": "tech-022",
  "name": "Imran Khan",
  "role": "Painter",
  "experience_years": 9,
  "basefees": "249",
  "reviews_count": 51,
  "rating": 4.4,
  "profilePicture": "https://dummyimage.com/300/1e293b/ffffff&text=IK",
  "availability": "busy",
  "about": "Professional interior and exterior painter. Specializes in texture finishes and waterproof coatings.",
  "location": {
    "city": "Mumbai",
    "area": "Andheri East",
    "coordinates": {
      "latitude": 19.1136,
      "longitude": 72.8697
    }
  },
  "skills": [
    { "name": "Interior Painting", "level": "Expert", "certified": true },
    { "name": "Texture Finishing", "level": "Advanced", "certified": true },
    { "name": "Waterproof Coating", "level": "Advanced", "certified": false }
  ],
  "contact": {
    "phone": "+91-98765-12002",
    "email": "imran.fixr@example.com"
  },
  "stats": {
    "jobs_completed": 221,
    "repeat_customers": 54,
    "response_time_minutes": 22,
    "on_time_rate": 89,
    "cancellation_rate": 6
  },
  "verification": {
    "is_verified": true,
    "background_checked": true,
    "aadhaar_verified": true
  },
  "pricing": {
    "inspection_fee": 149,
    "emergency_available": false,
    "emergency_fee": 0
  },
  "working_hours": {
    "start": "08:30",
    "end": "18:00",
    "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  "reviews": [
    {
      "user": "Sneha Joshi",
      "rating": 4,
      "comment": "Clean and smooth painting work.",
      "date": "2025-01-15"
    },
    {
      "user": "Karan Shah",
      "rating": 5,
      "comment": "Texture wall finish looks amazing!",
      "date": "2025-02-03"
    },
    {
      "user": "Deepa Rao",
      "rating": 4,
      "comment": "Professional but slightly over schedule.",
      "date": "2025-02-09"
    }
  ]
},
{
  "id": "tech-023",
  "name": "Rohit Bansal",
  "role": "Appliance Repair Specialist",
  "experience_years": 12,
  "basefees": "199",
  "reviews_count": 89,
  "rating": 4.9,
  "profilePicture": "https://dummyimage.com/300/0f766e/ffffff&text=RB",
  "availability": "available",
  "about": "Expert in washing machines, refrigerators, and microwave repair. Fast diagnosis and genuine spare parts.",
  "location": {
    "city": "Bangalore",
    "area": "Whitefield",
    "coordinates": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  },
  "skills": [
    { "name": "Washing Machine Repair", "level": "Expert", "certified": true },
    { "name": "Refrigerator Repair", "level": "Expert", "certified": true },
    { "name": "Microwave Repair", "level": "Advanced", "certified": true }
  ],
  "contact": {
    "phone": "+91-98765-12003",
    "email": "rohit.fixr@example.com"
  },
  "stats": {
    "jobs_completed": 487,
    "repeat_customers": 112,
    "response_time_minutes": 14,
    "on_time_rate": 97,
    "cancellation_rate": 2
  },
  "verification": {
    "is_verified": true,
    "background_checked": true,
    "aadhaar_verified": true
  },
  "pricing": {
    "inspection_fee": 99,
    "emergency_available": true,
    "emergency_fee": 299
  },
  "working_hours": {
    "start": "09:00",
    "end": "20:00",
    "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  "reviews": [
    {
      "user": "Priya Nair",
      "rating": 5,
      "comment": "Fixed my washing machine within 30 minutes!",
      "date": "2025-01-08"
    },
    {
      "user": "Manoj Pillai",
      "rating": 5,
      "comment": "Very professional and polite.",
      "date": "2025-01-19"
    },
    {
      "user": "Arvind Kumar",
      "rating": 4,
      "comment": "Quick service and fair pricing.",
      "date": "2025-02-10"
    }
  ]
},
{
  "id": "tech-023",
  "name": "Rohit Bansal",
  "role": "Appliance Repair Specialist",
  "experience_years": 12,
  "basefees": "199",
  "reviews_count": 89,
  "rating": 4.9,
  "profilePicture": "https://dummyimage.com/300/0f766e/ffffff&text=RB",
  "availability": "available",
  "about": "Expert in washing machines, refrigerators, and microwave repair. Fast diagnosis and genuine spare parts.",
  "location": {
    "city": "Bangalore",
    "area": "Whitefield",
    "coordinates": {
      "latitude": 12.9698,
      "longitude": 77.7499
    }
  },
  "skills": [
    { "name": "Washing Machine Repair", "level": "Expert", "certified": true },
    { "name": "Refrigerator Repair", "level": "Expert", "certified": true },
    { "name": "Microwave Repair", "level": "Advanced", "certified": true }
  ],
  "contact": {
    "phone": "+91-98765-12003",
    "email": "rohit.fixr@example.com"
  },
  "stats": {
    "jobs_completed": 487,
    "repeat_customers": 112,
    "response_time_minutes": 14,
    "on_time_rate": 97,
    "cancellation_rate": 2
  },
  "verification": {
    "is_verified": true,
    "background_checked": true,
    "aadhaar_verified": true
  },
  "pricing": {
    "inspection_fee": 99,
    "emergency_available": true,
    "emergency_fee": 299
  },
  "working_hours": {
    "start": "09:00",
    "end": "20:00",
    "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  "reviews": [
    {
      "user": "Priya Nair",
      "rating": 5,
      "comment": "Fixed my washing machine within 30 minutes!",
      "date": "2025-01-08"
    },
    {
      "user": "Manoj Pillai",
      "rating": 5,
      "comment": "Very professional and polite.",
      "date": "2025-01-19"
    },
    {
      "user": "Arvind Kumar",
      "rating": 4,
      "comment": "Quick service and fair pricing.",
      "date": "2025-02-10"
    }
  ]
}



];


export default function utils() {
  return null
}


