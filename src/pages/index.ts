//ส่งออกไฟล์ในโฟลเดอร์เดียวกัน
//ไฟล์อื่นสามารถ import ชื่อฟังก์ชันที่อยู่ในแต่ละไฟล์เหล่านี้ได้เลย โดยไม่ต้อง import ทีละไฟล์
//เช่น import { showError, startGeneration, displayResults } from "./utils";

export * from "./error";
export * from "./generate";
export * from "./results";
