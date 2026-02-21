import {
  Zap, Droplets, Hammer, Paintbrush, ShieldCheck,
  Wind, Tv, Laptop, Car, Scissors, HeartPulse, Camera
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
  {
    "id": "tech-001",
    "name": "Arjun Sharma",
    "role": "Electrician",
    "experience_years": 8,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.8,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AS",
    "availability": "available",
    "skills": [
      { "name": "Residential Wiring", "level": "Expert", "certified": true },
      { "name": "Smart Home Installation", "level": "Advanced", "certified": true },
      { "name": "Circuit Breaker Repair", "level": "Expert", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43210", "email": "arjun.fixit@example.com" }
  },
  {
    "id": "tech-002",
    "name": "Priya Patel",
    "role": "Plumber",
    "experience_years": 5,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.5,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=PP",
    "availability": "busy",
    "skills": [
      { "name": "Pipe Fitting", "level": "Expert", "certified": true },
      { "name": "Leak Detection", "level": "Advanced", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43211", "email": "priya.plumb@example.com" }
  },
  {
    "id": "tech-003",
    "name": "Rohan Das",
    "role": "AC Technician",
    "experience_years": 10,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.9,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=RD",
    "availability": "available",
    "skills": [
      { "name": "HVAC Repair", "level": "Expert", "certified": true },
      { "name": "Gas Charging", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43212", "email": "rohan.ac@example.com" }
  },
  {
    "id": "tech-004",
    "name": "Vikram Singh",
    "role": "Carpenter",
    "experience_years": 12,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.7,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=VS",
    "availability": "available",
    "skills": [
      { "name": "Furniture Assembly", "level": "Expert", "certified": false },
      { "name": "Cabinetry", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43213", "email": "vikram.wood@example.com" }
  },
  {
    "id": "tech-005",
    "name": "Ananya Iyer",
    "role": "Painter",
    "experience_years": 4,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.2,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AI",
    "availability": "available",
    "skills": [
      { "name": "Interior Painting", "level": "Advanced", "certified": true },
      { "name": "Texture Design", "level": "Intermediate", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43214", "email": "ananya.arts@example.com" }
  },
  {
    "id": "tech-006",
    "name": "Suresh Raina",
    "role": "Appliance Repair",
    "experience_years": 7,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.6,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=SR",
    "availability": "busy",
    "skills": [
      { "name": "Washing Machine", "level": "Expert", "certified": true },
      { "name": "Microwave Repair", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43215", "email": "suresh.fix@example.com" }
  },
  {
    "id": "tech-007",
    "name": "Meera Joshi",
    "role": "Cleaning Specialist",
    "experience_years": 3,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.4,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=MJ",
    "availability": "available",
    "skills": [
      { "name": "Deep Cleaning", "level": "Advanced", "certified": true },
      { "name": "Sanitization", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43216", "email": "meera.clean@example.com" }
  },
  {
    "id": "tech-008",
    "name": "Kabir Khan",
    "role": "Electrician",
    "experience_years": 15,
    "basefees": "99",
    "reviews": "20",
    "rating": 5.0,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=KK",
    "availability": "available",
    "skills": [
      { "name": "Industrial Wiring", "level": "Expert", "certified": true },
      { "name": "Solar Panel Setup", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43217", "email": "kabir.volt@example.com" }
  },
  {
    "id": "tech-009",
    "name": "Sneha Reddy",
    "role": "Gardener",
    "experience_years": 6,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.3,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=SR",
    "availability": "available",
    "skills": [
      { "name": "Landscaping", "level": "Advanced", "certified": false },
      { "name": "Pest Control", "level": "Intermediate", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43218", "email": "sneha.green@example.com" }
  },
  {
    "id": "tech-010",
    "name": "Amit Mishra",
    "role": "Plumber",
    "experience_years": 9,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.7,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AM",
    "availability": "busy",
    "skills": [
      { "name": "Water Heater Fix", "level": "Expert", "certified": true },
      { "name": "Drainage Systems", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43219", "email": "amit.pipes@example.com" }
  },
  {
    "id": "tech-011",
    "name": "Zara Sheikh",
    "role": "Interior Designer",
    "experience_years": 5,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.8,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=ZS",
    "availability": "available",
    "skills": [
      { "name": "Space Planning", "level": "Expert", "certified": true },
      { "name": "3D Rendering", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43220", "email": "zara.design@example.com" }
  },
  {
    "id": "tech-012",
    "name": "Rahul Verma",
    "role": "Electrician",
    "experience_years": 2,
    "basefees": "99",
    "reviews": "20",
    "rating": 3.9,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=RV",
    "availability": "available",
    "skills": [
      { "name": "Switch Repair", "level": "Intermediate", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43221", "email": "rahul.e@example.com" }
  },
  {
    "id": "tech-013",
    "name": "Pooja Hegde",
    "role": "Cleaning Specialist",
    "experience_years": 6,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.6,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=PH",
    "availability": "available",
    "skills": [
      { "name": "Sofa Cleaning", "level": "Expert", "certified": true },
      { "name": "Carpet Washing", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43222", "email": "pooja.c@example.com" }
  },
  {
    "id": "tech-014",
    "name": "Manish Malhotra",
    "role": "AC Technician",
    "experience_years": 8,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.5,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=MM",
    "availability": "available",
    "skills": [
      { "name": "Duct Cleaning", "level": "Advanced", "certified": true },
      { "name": "Compressor Repair", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43223", "email": "manish.ac@example.com" }
  },
  {
    "id": "tech-015",
    "name": "Sita Ram",
    "role": "Carpenter",
    "experience_years": 20,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.9,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=SR",
    "availability": "busy",
    "skills": [
      { "name": "Antique Restoration", "level": "Expert", "certified": true },
      { "name": "Wood Carving", "level": "Expert", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43224", "email": "sita.wood@example.com" }
  },
  {
    "id": "tech-016",
    "name": "Deepak Chaurasia",
    "role": "Appliance Repair",
    "experience_years": 11,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.7,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=DC",
    "availability": "available",
    "skills": [
      { "name": "Refrigerator", "level": "Expert", "certified": true },
      { "name": "Dishwasher", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43225", "email": "deepak.a@example.com" }
  },
  {
    "id": "tech-017",
    "name": "Kajal Aggarwal",
    "role": "Painter",
    "experience_years": 7,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.4,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=KA",
    "availability": "available",
    "skills": [
      { "name": "Exterior Painting", "level": "Expert", "certified": true },
      { "name": "Waterproofing", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43226", "email": "kajal.p@example.com" }
  },
  {
    "id": "tech-018",
    "name": "Ishaan Khattar",
    "role": "Plumber",
    "experience_years": 4,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.1,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=IK",
    "availability": "available",
    "skills": [
      { "name": "Pipe Replacement", "level": "Advanced", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43227", "email": "ishaan.p@example.com" }
  },
  {
    "id": "tech-019",
    "name": "Gaurav Kapur",
    "role": "Gardener",
    "experience_years": 10,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.8,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=GK",
    "availability": "busy",
    "skills": [
      { "name": "Horticulture", "level": "Expert", "certified": true },
      { "name": "Organic Farming", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43228", "email": "gaurav.g@example.com" }
  },
  {
    "id": "tech-020",
    "name": "Nidhi Bhanushali",
    "role": "Cleaning Specialist",
    "experience_years": 2,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.0,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=NB",
    "availability": "available",
    "skills": [
      { "name": "Kitchen Cleaning", "level": "Intermediate", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43229", "email": "nidhi.c@example.com" }
  },
  {
    "id": "tech-021",
    "name": "Aryan Khan",
    "role": "Electrician",
    "experience_years": 6,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.6,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AK",
    "availability": "available",
    "skills": [
      { "name": "Inverter Setup", "level": "Expert", "certified": true },
      { "name": "CCTV Installation", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43230", "email": "aryan.e@example.com" }
  },
  {
    "id": "tech-022",
    "name": "Sanya Malhotra",
    "role": "Interior Designer",
    "experience_years": 9,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.9,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=SM",
    "availability": "available",
    "skills": [
      { "name": "Modular Kitchen", "level": "Expert", "certified": true },
      { "name": "Lighting Design", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43231", "email": "sanya.d@example.com" }
  },
  {
    "id": "tech-023",
    "name": "Farhan Akhtar",
    "role": "AC Technician",
    "experience_years": 12,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.7,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=FA",
    "availability": "busy",
    "skills": [
      { "name": "Central AC", "level": "Expert", "certified": true },
      { "name": "VRV Systems", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43232", "email": "farhan.ac@example.com" }
  },
  {
    "id": "tech-024",
    "name": "Kiara Advani",
    "role": "Cleaning Specialist",
    "experience_years": 5,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.5,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=KA",
    "availability": "available",
    "skills": [
      { "name": "Bathroom Deep Clean", "level": "Expert", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43233", "email": "kiara.c@example.com" }
  },
  {
    "id": "tech-025",
    "name": "Ranbir Kapoor",
    "role": "Painter",
    "experience_years": 8,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.6,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=RK",
    "availability": "available",
    "skills": [
      { "name": "Wood Polish", "level": "Expert", "certified": true },
      { "name": "Stenciling", "level": "Advanced", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43234", "email": "ranbir.p@example.com" }
  },
  {
    "id": "tech-026",
    "name": "Alia Bhatt",
    "role": "Gardener",
    "experience_years": 4,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.2,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AB",
    "availability": "available",
    "skills": [
      { "name": "Bonsai Care", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43235", "email": "alia.g@example.com" }
  },
  {
    "id": "tech-027",
    "name": "Varun Dhawan",
    "role": "Carpenter",
    "experience_years": 6,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.4,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=VD",
    "availability": "busy",
    "skills": [
      { "name": "Door Repair", "level": "Expert", "certified": true },
      { "name": "Lock Installation", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43236", "email": "varun.w@example.com" }
  },
  {
    "id": "tech-028",
    "name": "Tiger Shroff",
    "role": "Appliance Repair",
    "experience_years": 3,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.1,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=TS",
    "availability": "available",
    "skills": [
      { "name": "Oven Repair", "level": "Advanced", "certified": false }
    ],
    "contact": { "phone": "+91-98765-43237", "email": "tiger.a@example.com" }
  },
  {
    "id": "tech-029",
    "name": "Kriti Sanon",
    "role": "Cleaning Specialist",
    "experience_years": 7,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.8,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=KS",
    "availability": "available",
    "skills": [
      { "name": "Glass Cleaning", "level": "Expert", "certified": true },
      { "name": "Floor Polishing", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43238", "email": "kriti.c@example.com" }
  },
  {
    "id": "tech-030",
    "name": "Ayushmann Khurrana",
    "role": "Electrician",
    "experience_years": 11,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.9,
    "profilePicture": "https://dummyimage.com/300/172554/ffffff&text=AK",
    "availability": "available",
    "skills": [
      { "name": "Home Theater Setup", "level": "Expert", "certified": true },
      { "name": "Acoustics", "level": "Advanced", "certified": true }
    ],
    "contact": { "phone": "+91-98765-43239", "email": "ayush.e@example.com" }
  },
  {
    "id": "tech-032",
    "name": "Sarah Jenkins",
    "role": "HVAC Specialist",
    "experience_years": 5,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.9,
    "profilePicture": "https://dummyimage.com/300",
    "availability": "busy",
    "skills": [
      { "name": "AC Maintenance", "level": "Expert", "certified": true },
      { "name": "Central Heating", "level": "Intermediate", "certified": true },
      { "name": "Refrigerant Handling", "level": "Advanced", "certified": true }
    ],
    "contact": {
      "phone": "+91-98765-55555",
      "email": "s.jenkins@hvacpro.com"
    }
  },
  {
    "id": "tech-033",
    "name": "Michael Chen",
    "role": "Plumber",
    "experience_years": 12,
    "basefees": "99",
    "reviews": "20",
    "rating": 4.7,
    "availability": "available",
    "profilePicture": "https://dummyimage.com/300",
    "skills": [
      { "name": "Pipe Fitting", "level": "Expert", "certified": true },
      { "name": "Drainage Systems", "level": "Expert", "certified": false },
      { "name": "Solar Water Heater Installation", "level": "Intermediate", "certified": true }
    ],
    "contact": {
      "phone": "+91-98765-11111",
      "email": "chen.plumbing@example.com"
    }
  }
]


export default function utils() {
  return null
}


