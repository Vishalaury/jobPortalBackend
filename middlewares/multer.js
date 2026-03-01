// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");


// import multer from "multer";

// const storage = multer.memoryStorage();

// // 👇 YAHI FINAL LINE
// export const singleUpload = multer({ storage }).single("profilePhoto");



import multer from "multer";

const storage = multer.memoryStorage();

// 🔥 "file" rakho (frontend ke same)
export const singleUpload = multer({ storage }).single("file");
