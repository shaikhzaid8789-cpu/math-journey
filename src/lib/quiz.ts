// Quiz engine: dynamic question generators per topic

export type Question = {
  q: string;
  options: string[];
  answer: string;
  visual?: string; // emoji string
};

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const repeat = (emoji: string, n: number) => emoji.repeat(n);

const mcq = (answer: number | string, distractors: (number | string)[]): { options: string[]; answer: string } => {
  const ans = String(answer);
  const opts = shuffle([ans, ...distractors.map(String).filter((d) => d !== ans)]).slice(0, 4);
  if (!opts.includes(ans)) opts[0] = ans;
  return { options: shuffle(opts), answer: ans };
};

const numDistract = (n: number, spread = 5): number[] => {
  const set = new Set<number>();
  while (set.size < 6) {
    const d = n + rand(-spread, spread);
    if (d !== n && d >= 0) set.add(d);
  }
  return [...set].slice(0, 5);
};

// ─── Generators ──────────────────────────────────────────────────────────────

const gens: Record<string, () => Question> = {
  // Class 1
  "Spatial Sense": () => {
    const opts = ["Above", "Below", "Left", "Right", "Inside", "Outside"];
    const a = pick(opts);
    const map: Record<string, string> = {
      Above: "🐦☁️ The bird is ___ the cloud.",
      Below: "☁️\n🐦 The bird is ___ the cloud.",
      Left: "🐱 🐶 The cat is on the ___ of the dog.",
      Right: "🐶 🐱 The cat is on the ___ of the dog.",
      Inside: "📦🎈 The balloon is ___ the box.",
      Outside: "📦 🎈 The balloon is ___ the box.",
    };
    return { q: map[a], ...mcq(a, opts.filter((o) => o !== a)) };
  },
  Comparison: () => {
    const a = rand(1, 9), b = rand(1, 9);
    const ans = a > b ? "Greater" : a < b ? "Less" : "Equal";
    return { q: `Compare: ${a} ___ ${b}`, ...mcq(ans, ["Greater", "Less", "Equal"]) };
  },
  "Numbers 1-9": () => {
    const n = rand(1, 9);
    return { q: "Count the apples", visual: repeat("🍎", n), ...mcq(n, numDistract(n, 4)) };
  },
  "Addition up to 9": () => {
    const a = rand(1, 5), b = rand(1, 9 - a);
    return { q: `${a} + ${b} = ?`, visual: repeat("⭐", a) + " + " + repeat("⭐", b), ...mcq(a + b, numDistract(a + b)) };
  },
  "Subtraction up to 9": () => {
    const a = rand(2, 9), b = rand(1, a);
    return { q: `${a} − ${b} = ?`, ...mcq(a - b, numDistract(a - b)) };
  },
  "Numbers 10-20": () => {
    const n = rand(10, 20);
    return { q: `What comes after ${n}?`, ...mcq(n + 1, numDistract(n + 1, 3)) };
  },
  "Addition up to 20": () => {
    const a = rand(1, 10), b = rand(1, 10);
    return { q: `${a} + ${b} = ?`, ...mcq(a + b, numDistract(a + b)) };
  },
  "Subtraction up to 20": () => {
    const a = rand(5, 20), b = rand(1, a);
    return { q: `${a} − ${b} = ?`, ...mcq(a - b, numDistract(a - b)) };
  },
  "Numbers 21-100": () => {
    const n = rand(21, 99);
    const t = pick(["after", "before"]);
    return { q: `What comes ${t} ${n}?`, ...mcq(t === "after" ? n + 1 : n - 1, numDistract(n, 5)) };
  },
  "Measurement Basics": () => {
    const items = [
      ["Pencil", "cm"], ["Road", "km"], ["Book", "cm"], ["River", "km"],
      ["Finger", "cm"], ["City", "km"],
    ];
    const [it, u] = pick(items);
    return { q: `Best unit to measure a ${it}?`, ...mcq(u, ["cm", "km", "g", "L"]) };
  },
  "Time Basics": () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const i = rand(0, 6);
    return { q: `Which day comes after ${days[i]}?`, ...mcq(days[(i + 1) % 7], days.filter((_, j) => j !== (i + 1) % 7)) };
  },
  Shapes: () => {
    const map: [string, string][] = [["⭕", "Circle"], ["🔺", "Triangle"], ["⬛", "Square"], ["🔶", "Diamond"], ["⭐", "Star"]];
    const [emoji, name] = pick(map);
    return { q: "What shape is this?", visual: emoji, ...mcq(name, map.map((m) => m[1]).filter((n) => n !== name)) };
  },
  Patterns: () => {
    const start = rand(1, 10), step = rand(1, 5);
    const seq = [start, start + step, start + 2 * step];
    return { q: `Next: ${seq.join(", ")}, ?`, ...mcq(start + 3 * step, numDistract(start + 3 * step)) };
  },
  "Data Handling": () => {
    const a = rand(2, 9), b = rand(2, 9), c = rand(2, 9);
    const total = a + b + c;
    return { q: `Apples:${a}, Bananas:${b}, Cherries:${c}. Total fruits?`, visual: "🍎".repeat(a) + " 🍌".repeat(b) + " 🍒".repeat(c), ...mcq(total, numDistract(total)) };
  },

  // Class 2
  "Numbers up to 1000": () => {
    const n = rand(100, 999);
    return { q: `What comes after ${n}?`, ...mcq(n + 1, numDistract(n + 1, 5)) };
  },
  "Place Value": () => {
    const n = rand(100, 999);
    const s = String(n);
    const pos = rand(0, 2);
    const names = ["Hundreds", "Tens", "Ones"];
    const value = parseInt(s[pos]) * Math.pow(10, 2 - pos);
    return { q: `In ${n}, place value of ${s[pos]} (${names[pos]} place)?`, ...mcq(value, [parseInt(s[pos]), value * 10, value / 10 || 1, value + 100]) };
  },
  "Number Names": () => {
    const names: Record<number, string> = { 10: "Ten", 20: "Twenty", 30: "Thirty", 40: "Forty", 50: "Fifty", 100: "Hundred" };
    const keys = Object.keys(names).map(Number);
    const k = pick(keys);
    return { q: `Number name of ${k}?`, ...mcq(names[k], keys.filter((x) => x !== k).map((x) => names[x])) };
  },
  "Comparison of Numbers": () => {
    const a = rand(100, 999), b = rand(100, 999);
    return { q: `Which is greater?`, ...mcq(a > b ? a : b, [a, b, a + b, Math.abs(a - b)]) };
  },
  "Addition with Carry": () => {
    const a = rand(15, 89), b = rand(15, 89);
    return { q: `${a} + ${b} = ?`, ...mcq(a + b, numDistract(a + b, 8)) };
  },
  "Subtraction with Borrow": () => {
    const a = rand(40, 99), b = rand(15, a - 1);
    return { q: `${a} − ${b} = ?`, ...mcq(a - b, numDistract(a - b, 6)) };
  },
  "Multiplication Basics": () => {
    const a = rand(2, 5), b = rand(2, 5);
    return { q: `${a} × ${b} = ?`, ...mcq(a * b, numDistract(a * b, 4)) };
  },
  "Tables (2,3,4,5,10)": () => {
    const t = pick([2, 3, 4, 5, 10]);
    const x = rand(1, 10);
    return { q: `${t} × ${x} = ?`, ...mcq(t * x, numDistract(t * x, 5)) };
  },
  Money: () => {
    const a = rand(5, 50), b = rand(5, 50);
    return { q: `You have ₹${a + b}. You spend ₹${a}. Left?`, ...mcq(b, numDistract(b)) };
  },
  "Length Measurement": () => {
    const m = rand(1, 9);
    return { q: `${m} m = ? cm`, ...mcq(m * 100, [m * 10, m * 1000, m + 100, m * 100 + 50]) };
  },
  Weight: () => {
    const kg = rand(1, 9);
    return { q: `${kg} kg = ? grams`, ...mcq(kg * 1000, [kg * 100, kg * 10, kg + 1000, kg * 500]) };
  },
  Capacity: () => {
    const l = rand(1, 9);
    return { q: `${l} L = ? mL`, ...mcq(l * 1000, [l * 100, l * 10, l + 1000, l * 500]) };
  },
  "Time (Days & Months)": () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const i = rand(0, 11);
    return { q: `Which month comes after ${months[i]}?`, ...mcq(months[(i + 1) % 12], months.filter((_, j) => j !== (i + 1) % 12)) };
  },
  "3D Shapes": () => {
    const map: [string, string][] = [["⚽", "Sphere"], ["🧊", "Cube"], ["🥫", "Cylinder"], ["🍦", "Cone"]];
    const [e, n] = pick(map);
    return { q: "Name this 3D shape", visual: e, ...mcq(n, map.map((m) => m[1]).filter((x) => x !== n)) };
  },
  "Number Patterns": () => {
    const start = rand(2, 20), step = rand(2, 10);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    return { q: `Next number: ${seq.join(", ")}, ?`, ...mcq(start + 4 * step, numDistract(start + 4 * step)) };
  },

  // Class 3
  "Numbers up to 9999": () => {
    const n = rand(1000, 9998);
    return { q: `What comes after ${n}?`, ...mcq(n + 1, numDistract(n + 1, 10)) };
  },
  "Ascending & Descending Order": () => {
    const nums = Array.from({ length: 4 }, () => rand(100, 999));
    const asc = pick([true, false]);
    const sorted = [...nums].sort((a, b) => asc ? a - b : b - a);
    return { q: `${asc ? "Smallest" : "Largest"} of ${nums.join(", ")}?`, ...mcq(sorted[0], nums.filter((n) => n !== sorted[0])) };
  },
  "Addition (3-digit numbers)": () => {
    const a = rand(100, 999), b = rand(100, 999);
    return { q: `${a} + ${b} = ?`, ...mcq(a + b, numDistract(a + b, 20)) };
  },
  "Subtraction (4-digit numbers)": () => {
    const a = rand(2000, 9999), b = rand(1000, a - 1);
    return { q: `${a} − ${b} = ?`, ...mcq(a - b, numDistract(a - b, 50)) };
  },
  Multiplication: () => {
    const a = rand(11, 25), b = rand(2, 9);
    return { q: `${a} × ${b} = ?`, ...mcq(a * b, numDistract(a * b, 10)) };
  },
  "Division Basics": () => {
    const b = rand(2, 9), q = rand(2, 12);
    const a = b * q;
    return { q: `${a} ÷ ${b} = ?`, ...mcq(q, numDistract(q, 4)) };
  },
  "Fractions (1/2, 1/4, 3/4)": () => {
    const fr = pick([
      ["Half of 8", 4], ["Quarter of 8", 2], ["3/4 of 8", 6],
      ["Half of 10", 5], ["Quarter of 12", 3], ["3/4 of 12", 9],
      ["Half of 20", 10], ["Quarter of 20", 5], ["3/4 of 20", 15],
    ]) as [string, number];
    return { q: `${fr[0]} = ?`, ...mcq(fr[1], numDistract(fr[1], 4)) };
  },
  "Measurement Conversion": () => {
    const km = rand(1, 9);
    return { q: `${km} km = ? m`, ...mcq(km * 1000, [km * 100, km * 10, km + 1000, km * 500]) };
  },
  "Weight & Volume": () => {
    const opts = [["3 kg", "5 kg"], ["1 L", "2 L"], ["500 g", "1 kg"]];
    const [a, b] = pick(opts);
    return { q: `Which is heavier/more: ${a} or ${b}?`, ...mcq(b, [a, b, "Equal", "Cannot say"]) };
  },
  "Time (Clock, AM/PM)": () => {
    const h = rand(1, 12);
    const ampm = pick(["AM", "PM"]);
    return { q: `${h}:00 ${ampm} is in the ${ampm === "AM" ? "morning" : "afternoon/evening"}. What is 3 hours later?`, ...mcq(`${((h + 2) % 12) + 1}:00`, [`${h}:00`, `${(h + 1) % 13 || 1}:00`, `${(h + 4) % 13 || 1}:00`, `${(h + 5) % 13 || 1}:00`]) };
  },
  "Basic Geometry": () => {
    const map: [string, number][] = [["Triangle", 3], ["Square", 4], ["Pentagon", 5], ["Hexagon", 6], ["Octagon", 8]];
    const [n, s] = pick(map);
    return { q: `How many sides does a ${n} have?`, ...mcq(s, map.map((m) => m[1]).filter((x) => x !== s)) };
  },
  Symmetry: () => {
    const map: [string, number][] = [["Square", 4], ["Equilateral Triangle", 3], ["Rectangle", 2], ["Circle", Infinity], ["Regular Pentagon", 5]];
    const [n, l] = pick(map.filter((m) => m[1] !== Infinity));
    return { q: `Lines of symmetry in a ${n}?`, ...mcq(l, [l + 1, l - 1, l + 2, 1]) };
  },
  "Data (Tally Marks)": () => {
    const n = rand(3, 15);
    const tally = "𝍷".repeat(Math.floor(n / 5)) + "|".repeat(n % 5);
    return { q: "How many tally marks?", visual: tally || "|", ...mcq(n, numDistract(n, 3)) };
  },

  // Class 4
  "Large Numbers (5-6 digits)": () => {
    const n = rand(10000, 999999);
    return { q: `What comes after ${n.toLocaleString()}?`, ...mcq(n + 1, numDistract(n + 1, 100)) };
  },
  "Addition & Subtraction": () => {
    const a = rand(1000, 9999), b = rand(1000, 9999);
    const op = pick(["+", "−"]);
    const r = op === "+" ? a + b : Math.abs(a - b);
    return { q: `${Math.max(a, b)} ${op} ${Math.min(a, b)} = ?`, ...mcq(r, numDistract(r, 50)) };
  },
  "Multiplication (multi-digit)": () => {
    const a = rand(11, 99), b = rand(11, 99);
    return { q: `${a} × ${b} = ?`, ...mcq(a * b, numDistract(a * b, 30)) };
  },
  Division: () => {
    const b = rand(2, 12), q = rand(10, 50);
    return { q: `${b * q} ÷ ${b} = ?`, ...mcq(q, numDistract(q, 5)) };
  },
  "Factors & Multiples": () => {
    const n = pick([6, 8, 10, 12, 15, 18, 20, 24]);
    const factors: Record<number, number[]> = { 6: [1, 2, 3, 6], 8: [1, 2, 4, 8], 10: [1, 2, 5, 10], 12: [1, 2, 3, 4, 6, 12], 15: [1, 3, 5, 15], 18: [1, 2, 3, 6, 9, 18], 20: [1, 2, 4, 5, 10, 20], 24: [1, 2, 3, 4, 6, 8, 12, 24] };
    const f = factors[n];
    return { q: `How many factors does ${n} have?`, ...mcq(f.length, [f.length + 1, f.length - 1, f.length + 2, f.length + 3]) };
  },
  "Fractions (Like & Unlike)": () => {
    const d = pick([4, 6, 8, 10, 12]);
    const a = rand(1, d - 1), b = rand(1, d - a);
    return { q: `${a}/${d} + ${b}/${d} = ?`, ...mcq(`${a + b}/${d}`, [`${a + b}/${d * 2}`, `${a * b}/${d}`, `${a + b + 1}/${d}`, `${a + b - 1}/${d}`]) };
  },
  Decimals: () => {
    const a = (rand(10, 99) / 10).toFixed(1);
    const b = (rand(10, 99) / 10).toFixed(1);
    const r = (parseFloat(a) + parseFloat(b)).toFixed(1);
    return { q: `${a} + ${b} = ?`, ...mcq(r, [(parseFloat(r) + 0.1).toFixed(1), (parseFloat(r) - 0.1).toFixed(1), (parseFloat(r) + 1).toFixed(1), (parseFloat(r) - 1).toFixed(1)]) };
  },
  Measurement: () => {
    const m = rand(2, 9);
    return { q: `${m} m ${rand(10, 99)} cm = ? cm`, ...mcq(m * 100 + 50, [m * 100, m * 1000, m * 10 + 50, m + 50]) };
  },
  "Money (Unitary Method)": () => {
    const items = rand(2, 10), price = rand(5, 50), n = rand(2, 10);
    return { q: `${items} pens cost ₹${items * price}. Cost of ${n} pens?`, ...mcq(n * price, numDistract(n * price, 10)) };
  },
  Angles: () => {
    const map: [string, string][] = [["90°", "Right"], ["45°", "Acute"], ["120°", "Obtuse"], ["180°", "Straight"], ["30°", "Acute"], ["100°", "Obtuse"]];
    const [a, t] = pick(map);
    return { q: `What type of angle is ${a}?`, ...mcq(t, ["Right", "Acute", "Obtuse", "Straight"]) };
  },
  "Circle Parts": () => {
    const map: [string, string][] = [["Center to edge", "Radius"], ["Across through center", "Diameter"], ["Around the circle", "Circumference"], ["Part of edge", "Arc"]];
    const [d, n] = pick(map);
    return { q: `${d} of a circle is called?`, ...mcq(n, ["Radius", "Diameter", "Circumference", "Arc"]) };
  },
  Perimeter: () => {
    const l = rand(3, 15), w = rand(3, 15);
    return { q: `Perimeter of rectangle ${l}×${w}?`, ...mcq(2 * (l + w), [l * w, l + w, 2 * l * w, 2 * (l + w) + 2]) };
  },
  Area: () => {
    const l = rand(3, 15), w = rand(3, 15);
    return { q: `Area of rectangle ${l}×${w}?`, ...mcq(l * w, [2 * (l + w), l + w, l * w + 1, l * w - 1]) };
  },
  "Patterns & Tiling": () => {
    const start = rand(2, 10), step = rand(2, 8);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    return { q: `Next: ${seq.join(", ")}, ?`, ...mcq(start + 4 * step, numDistract(start + 4 * step, 6)) };
  },
  "Data (Bar Graphs)": () => {
    const a = rand(5, 20), b = rand(5, 20), c = rand(5, 20);
    const max = Math.max(a, b, c);
    return { q: `Bars - A:${a}, B:${b}, C:${c}. Highest?`, visual: `A ${"█".repeat(a)}\nB ${"█".repeat(b)}\nC ${"█".repeat(c)}`, ...mcq(max === a ? "A" : max === b ? "B" : "C", ["A", "B", "C", "Equal"]) };
  },

  // Class 5
  "Large Numbers (7-9 digits)": () => {
    const n = rand(1000000, 999999999);
    return { q: `Predecessor of ${n.toLocaleString()}?`, ...mcq(n - 1, numDistract(n - 1, 1000)) };
  },
  "Roman Numerals": () => {
    const map: [number, string][] = [[1, "I"], [4, "IV"], [5, "V"], [9, "IX"], [10, "X"], [40, "XL"], [50, "L"], [90, "XC"], [100, "C"], [500, "D"]];
    const [n, r] = pick(map);
    return { q: `Roman numeral for ${n}?`, ...mcq(r, map.map((m) => m[1]).filter((x) => x !== r)) };
  },
  BODMAS: () => {
    const a = rand(2, 10), b = rand(2, 10), c = rand(2, 10);
    return { q: `${a} + ${b} × ${c} = ?`, ...mcq(a + b * c, [(a + b) * c, a + b + c, a * b + c, a * b * c]) };
  },
  "HCF & LCM": () => {
    const pairs: [number, number, number, number][] = [
      [12, 18, 6, 36], [8, 12, 4, 24], [10, 15, 5, 30], [6, 9, 3, 18], [4, 6, 2, 12], [9, 12, 3, 36],
    ];
    const [a, b, h, l] = pick(pairs);
    const ask = pick(["HCF", "LCM"]);
    return { q: `${ask} of ${a} and ${b}?`, ...mcq(ask === "HCF" ? h : l, [h, l, a + b, a * b]) };
  },
  "Fractions (Advanced)": () => {
    const a = rand(1, 5), b = rand(2, 6), c = rand(1, 5), d = rand(2, 6);
    return { q: `${a}/${b} × ${c}/${d} = ?`, ...mcq(`${a * c}/${b * d}`, [`${a + c}/${b + d}`, `${a * c}/${b + d}`, `${a + c}/${b * d}`, `${a * d}/${b * c}`]) };
  },
  "Decimals (All Operations)": () => {
    const a = (rand(10, 99) / 10).toFixed(1);
    const b = (rand(2, 9)).toString();
    const r = (parseFloat(a) * parseFloat(b)).toFixed(1);
    return { q: `${a} × ${b} = ?`, ...mcq(r, [(parseFloat(r) + 1).toFixed(1), (parseFloat(r) - 1).toFixed(1), (parseFloat(r) + 0.1).toFixed(1), (parseFloat(r) / 2).toFixed(1)]) };
  },
  Percentage: () => {
    const p = pick([10, 20, 25, 50, 75]);
    const n = pick([100, 200, 400, 80, 60]);
    const r = (p * n) / 100;
    return { q: `${p}% of ${n} = ?`, ...mcq(r, numDistract(r, 5)) };
  },
  "Profit & Loss": () => {
    const cp = rand(50, 500), profit = rand(10, 100);
    return { q: `CP=₹${cp}, SP=₹${cp + profit}. Profit?`, ...mcq(profit, numDistract(profit, 5)) };
  },
  "Simple Interest": () => {
    const p = pick([100, 200, 500, 1000]);
    const r = pick([5, 10, 15, 20]);
    const t = pick([1, 2, 3]);
    const si = (p * r * t) / 100;
    return { q: `SI: P=₹${p}, R=${r}%, T=${t}yr?`, ...mcq(si, numDistract(si, 10)) };
  },
  "Measurement (Metric System)": () => {
    const km = rand(1, 9), m = rand(100, 999);
    return { q: `${km} km ${m} m = ? m`, ...mcq(km * 1000 + m, [km * 100 + m, km + m, km * 1000 - m, km * 10 + m]) };
  },
  "Time (24-hour format)": () => {
    const h = rand(13, 23);
    return { q: `${h}:00 in 12-hour format?`, ...mcq(`${h - 12}:00 PM`, [`${h}:00 AM`, `${h - 12}:00 AM`, `${h}:00 PM`, `${h - 11}:00 PM`]) };
  },
  Triangles: () => {
    const map: [string, string][] = [["3 equal sides", "Equilateral"], ["2 equal sides", "Isosceles"], ["No equal sides", "Scalene"], ["One 90° angle", "Right"]];
    const [d, n] = pick(map);
    return { q: `Triangle with ${d}?`, ...mcq(n, ["Equilateral", "Isosceles", "Scalene", "Right"]) };
  },
  "Angles with Protractor": () => {
    const a = rand(10, 170);
    const t = a < 90 ? "Acute" : a === 90 ? "Right" : a < 180 ? "Obtuse" : "Straight";
    return { q: `${a}° is what type of angle?`, ...mcq(t, ["Acute", "Right", "Obtuse", "Straight"]) };
  },
  "Properties of Shapes": () => {
    const map: [string, string][] = [["4 equal sides, 4 right angles", "Square"], ["Opposite sides equal, 4 right angles", "Rectangle"], ["4 equal sides, no right angles", "Rhombus"], ["One pair of parallel sides", "Trapezium"]];
    const [d, n] = pick(map);
    return { q: `Shape with ${d}?`, ...mcq(n, ["Square", "Rectangle", "Rhombus", "Trapezium"]) };
  },
  "Area & Volume": () => {
    const s = rand(2, 10);
    const ask = pick(["Area of square", "Volume of cube"]);
    const r = ask === "Area of square" ? s * s : s * s * s;
    return { q: `${ask} side ${s}?`, ...mcq(r, [s * 4, s * 6, r + s, r - s]) };
  },
  Average: () => {
    const nums = Array.from({ length: 4 }, () => rand(10, 50));
    const avg = Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
    return { q: `Average of ${nums.join(", ")}?`, ...mcq(avg, numDistract(avg, 5)) };
  },
  "3D Nets": () => {
    const map: [string, string][] = [["6 squares", "Cube"], ["2 circles + rectangle", "Cylinder"], ["Circle + triangle", "Cone"], ["4 triangles", "Tetrahedron"]];
    const [d, n] = pick(map);
    return { q: `Net of ${d} forms?`, ...mcq(n, ["Cube", "Cylinder", "Cone", "Tetrahedron"]) };
  },
  "Maps & Directions": () => {
    const dirs = ["North", "South", "East", "West"];
    const opp: Record<string, string> = { North: "South", South: "North", East: "West", West: "East" };
    const d = pick(dirs);
    return { q: `Opposite of ${d}?`, ...mcq(opp[d], dirs.filter((x) => x !== opp[d])) };
  },
};

export function generateQuestion(topic: string, history: Set<string>): Question {
  const gen = gens[topic];
  if (!gen) {
    // Fallback
    const a = rand(1, 20), b = rand(1, 20);
    return { q: `${a} + ${b} = ?`, ...mcq(a + b, numDistract(a + b)) };
  }
  for (let i = 0; i < 30; i++) {
    const q = gen();
    const key = q.q + "|" + q.answer;
    if (!history.has(key)) {
      history.add(key);
      if (history.size > 200) {
        const first = history.values().next().value;
        if (first) history.delete(first);
      }
      return q;
    }
  }
  return gen();
}
