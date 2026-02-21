import { 
  Zap, Droplets, Hammer, Paintbrush, ShieldCheck, 
  Wind, Tv, Laptop, Car, Scissors, HeartPulse, Camera 
} from "lucide-react-native";

export const technicians=[
  {
    "id": "tech-001",
    "name": "Arjun Sharma",
    "role": "Electrician",
    "experience_years": 8,
    "rating": 4.8,
    "profilePicture":"https://dummyimage.com/300",
    "availability": "available",
    "skills": [
      { "name": "Residential Wiring", "level": "Expert", "certified": true },
      { "name": "Smart Home Installation", "level": "Advanced", "certified": true },
      { "name": "Circuit Breaker Repair", "level": "Expert", "certified": false }
    ],
    "contact": {
      "phone": "+91-98765-43210",
      "email": "arjun.fixit@example.com"
    }
  },
  {
    "id": "tech-002",
    "name": "Sarah Jenkins",
    "role": "HVAC Specialist",
    "experience_years": 5,
    "rating": 4.9,
    "profilePicture":"https://dummyimage.com/300",
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
    "id": "tech-003",
    "name": "Michael Chen",
    "role": "Plumber",
    "experience_years": 12,
    "rating": 4.7,
    "availability": "available",
    "profilePicture":"https://dummyimage.com/300",
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
export default function utils(){
  return null
}


