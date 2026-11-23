import { createAdminPublishHandler } from "../../server/admin-api.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default createAdminPublishHandler();
