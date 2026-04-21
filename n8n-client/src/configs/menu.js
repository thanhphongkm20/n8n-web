import {
  Workflow,
  Wrench,
  BookOpen,
  Newspaper,
  Building,
  Phone
} from "lucide-react";

import { ROUTES } from "./routes";

const menuTop = [
  {
    mainTitle: "Workflows",
    mainIcon: Workflow,
    path: ROUTES.HOME,
  },
  {
    mainTitle: "Custom Built",
    mainIcon: Wrench,
    path: ROUTES.CUSTOM_BUILT,
  },
  {
    mainTitle: "Resources",
    mainIcon: BookOpen,
    path: ROUTES.RESOURCES,
  },
  {
    mainTitle: "Blog",
    mainIcon: Newspaper,
    path: ROUTES.BLOG,
  },
  {
    mainTitle: "Company",
    mainIcon: Building,
    path: ROUTES.COMPANY,
  },
];

const menuConfigs = {
  topBar: menuTop,
};

export default menuConfigs;