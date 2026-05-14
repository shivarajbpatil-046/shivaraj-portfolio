// ─── Portfolio Data Layer ─────────────────────────────────────────────────────
// All content lives here. Zero hardcoded strings in components.

export const personal = {
  name: { first: 'SHIVARAJ', last: 'B PATIL' },
  role: 'AI/ML Engineer • Researcher • Full Stack Developer',
  tagline: 'Building intelligent systems using AI, Remote Sensing and Scalable Software.',
  philosophy: 'Focused on building intelligent systems that combine AI, geospatial intelligence, edge computing and scalable software engineering to solve real-world problems at scale.',
  email: 'shivarajbpatil046@gmail.com',
  linkedin: 'www.linkedin.com/in/shivaraj-b-patil-8b5636249',
  github: 'https://github.com/shivarajbpatil-046',
  resume: '/resume.pdf',
  resumeFilename: 'Shivaraj_B_Patil_Resume.pdf',
  formspree: 'https://formspree.io/f/mykopqod', // ← replace YOUR_FORM_ID after deployment
};

export const stats = [
  { value: '12+', label: 'AI/ML Projects' },
  { value: '3', label: 'Research Works' },
  { value: '40+', label: 'Teaching Hours' },
  { value: '1', label: 'Publication' },
  { value: '2', label: 'Edge AI Systems' },
  { value: '3', label: 'Engineering Labs' },
];

export const projects = [
  {
    id: 'mangrove',
    number: '01',
    title: 'Mangrove Mapping Research',
    subtitle: 'Deep Learning · Remote Sensing · GIS',
    description: 'Developed deep learning pipelines for multi-temporal mangrove mapping using Sentinel-2 satellite imagery and CNN-based segmentation architectures. Integrated GIS workflows and Google Earth Engine for large-scale geospatial analysis.',
    tech: ['CNN', 'U-Net', 'VGG19', 'TensorFlow', 'Google Earth Engine', 'QGIS', 'Python'],
    domain: 'Earth Systems Research',
    accent: 'Environmental Intelligence',
    align: 'left',
  },
  {
    id: 'jetbot',
    number: '02',
    title: 'JetBot Collision Avoidance',
    subtitle: 'Edge AI · Robotics · Computer Vision',
    description: 'Designed an edge-AI autonomous navigation system using NVIDIA Jetson Nano with real-time computer vision inference. Implemented collision avoidance at the edge with sub-50ms inference latency.',
    tech: ['Jetson Nano', 'PyTorch', 'OpenCV', 'Python', 'Edge AI', 'Embedded Systems'],
    domain: 'Edge Computing & Robotics',
    accent: 'Autonomous Systems',
    align: 'right',
  },
  {
    id: 'taskmanager',
    number: '03',
    title: 'Task Management System',
    subtitle: 'Backend Engineering · Microservices · REST',
    description: 'Built a production-grade backend system with secure JWT authentication, task orchestration and RESTful microservice-ready architecture. Designed for horizontal scalability and enterprise deployment.',
    tech: ['Java', 'Spring Boot', 'JWT', 'MySQL', 'REST API', 'Docker'],
    domain: 'Backend Engineering',
    accent: 'Scalable Software',
    align: 'left',
  },
];

export const labs = [
  {
    id: 'aviation',
    number: '01',
    title: 'Aviation Systems &\nAerodynamics Lab',
    description: 'Worked on drone systems, RC aircraft engineering and control-line aviation models with hands-on exposure to flight maneuvering, stability control and aerodynamics experimentation.',
    tags: ['Drone Engineering', 'RC Aircraft Systems', 'Control-Line Models', 'Flight Maneuvering', 'Aerodynamics'],
    note: 'Hands-on mechanical and aeronautical engineering exposure in a structured lab environment.',
    align: 'left',
  },
  {
    id: 'edgeai',
    number: '02',
    title: 'NVIDIA Edge AI &\nIntelligent Systems Lab',
    description: 'Developed intelligent edge-computing systems using NVIDIA Jetson Nano with real-time AI inference, computer vision and robotics integration. The JetBot collision avoidance system was developed in this environment.',
    tags: ['Jetson Nano', 'Edge AI', 'Computer Vision', 'AI Bot Development', 'Real-Time Inference', 'Embedded AI'],
    note: 'The JetBot collision avoidance project originated in this lab.',
    align: 'right',
  },
  {
    id: 'gis',
    number: '03',
    title: 'GIS & Earth Systems\nResearch Lab',
    description: 'Worked on geospatial intelligence and environmental monitoring systems focused on wildlife, water, air, soil and ecosystem conservation using AI-driven analytics and remote sensing technologies.',
    tags: ['Remote Sensing', 'Satellite Data Analysis', 'Environmental Monitoring', 'AI Prediction', 'GIS Mapping', 'Conservation Analytics'],
    note: 'The Mangrove Mapping research project was developed in this lab.',
    align: 'left',
  },
];

export const stack = [
  {
    category: 'AI / ML',
    items: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'Keras'],
  },
  {
    category: 'Backend Engineering',
    items: ['Java', 'Spring Boot', 'REST APIs', 'JWT Auth', 'MySQL', 'Microservices'],
  },
  {
    category: 'GIS & Remote Sensing',
    items: ['QGIS', 'Google Earth Engine', 'Sentinel-2', 'Rasterio', 'GeoPandas'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Linux', 'Git', 'CI/CD'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Angular', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Tools & Systems',
    items: ['Jupyter', 'VS Code', 'Postman', 'Maven', 'Bash'],
  },
];

export const leadership = [
  { value: 'Student Head', label: 'GIS Research Center' },
  { value: '40+ hrs', label: 'AI, IoT & GIS Teaching' },
  { value: '3+', label: 'Technical Workshops Conducted' },
  { value: 'Research', label: 'Contributions & Publications' },
];

export const publication = {
  title: 'Role of Artificial Intelligence in Automobiles: A Review',
  type: 'Review Article',
  year: '2023',
  doi: 'https://dx.doi.org/10.2139/ssrn.5015474',
  abstract: 'A comprehensive review of AI applications in modern automotive systems — covering autonomous driving, predictive maintenance, safety intelligence and embedded control systems.',
};
