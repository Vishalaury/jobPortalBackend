// import DataUriParser from "datauri/parser.js"

// import path from "path";

// const getDataUri = (file) =>{
//     const parser = new DataUriParser();
//     const extName = path.extname(file.origunalname).toString();
//     return parser.format(extName, file.buffer);
// }
// export default getDataUri;


// import DataUriParser from "datauri/parser.js";
// import path from "path";

// const getDataUri = (file) => {
//   const parser = new DataUriParser();
//   const extName = path.extname(file.originalname).toString(); // ✅ FIXED
//   return parser.format(extName, file.buffer);
// };

// export default getDataUri;


import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) return null;   // IMPORTANT SAFETY CHECK

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
