export const TOPICS: Record<string, string[]> = {
  class1: ["Spatial Sense", "Comparison", "Numbers 1-9", "Addition up to 9", "Subtraction up to 9", "Numbers 10-20", "Addition up to 20", "Subtraction up to 20", "Numbers 21-100", "Measurement Basics", "Time Basics", "Shapes", "Patterns", "Data Handling"],
  class2: ["Numbers up to 1000", "Place Value", "Number Names", "Comparison of Numbers", "Addition with Carry", "Subtraction with Borrow", "Multiplication Basics", "Tables (2,3,4,5,10)", "Money", "Length Measurement", "Weight", "Capacity", "Time (Days & Months)", "3D Shapes", "Number Patterns"],
  class3: ["Numbers up to 9999", "Ascending & Descending Order", "Addition (3-digit numbers)", "Subtraction (4-digit numbers)", "Multiplication", "Division Basics", "Fractions (1/2, 1/4, 3/4)", "Measurement Conversion", "Weight & Volume", "Time (Clock, AM/PM)", "Basic Geometry", "Symmetry", "Data (Tally Marks)"],
  class4: ["Large Numbers (5-6 digits)", "Addition & Subtraction", "Multiplication (multi-digit)", "Division", "Factors & Multiples", "Fractions (Like & Unlike)", "Decimals", "Measurement", "Money (Unitary Method)", "Angles", "Circle Parts", "Perimeter", "Area", "Patterns & Tiling", "Data (Bar Graphs)"],
  class5: ["Large Numbers (7-9 digits)", "Roman Numerals", "BODMAS", "HCF & LCM", "Fractions (Advanced)", "Decimals (All Operations)", "Percentage", "Profit & Loss", "Simple Interest", "Measurement (Metric System)", "Time (24-hour format)", "Triangles", "Angles with Protractor", "Properties of Shapes", "Area & Volume", "Average", "3D Nets", "Maps & Directions"],
};

export const CLASS_META: { id: keyof typeof TOPICS; label: string; sub: string; emoji: string }[] = [
  { id: "class1", label: "Class 1", sub: "Beginner", emoji: "1" },
  { id: "class2", label: "Class 2", sub: "Foundations", emoji: "2" },
  { id: "class3", label: "Class 3", sub: "Building Up", emoji: "3" },
  { id: "class4", label: "Class 4", sub: "Intermediate", emoji: "4" },
  { id: "class5", label: "Class 5", sub: "Advanced", emoji: "5" },
];
