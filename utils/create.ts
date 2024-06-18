import axios from "axios";
import { BACKEND_URL } from "../constants";
const uploadMetadata = async ({ file, name, description }: any) => {
  const data = new FormData();
  data.append("fileData", file);
  data.append("name", name);
  data.append("description", description);

  try {
    const metadata = await axios.post(
      `${BACKEND_URL}/create/collectible/upload`,
      data,
    );
    const meta = metadata.data?.metadata;
    console.log(meta);
    return meta;
  } catch (err) {
    return { error: err };
  }
};

export { uploadMetadata };
