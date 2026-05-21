import {
  Workflow,
  Wrench,
  BookOpen,
  Newspaper,
  Building,
  Phone,
  Users,
  Info,
} from "lucide-react";

import { ROUTES } from "./routes";
import { APP_STATE, ROLES } from "./constants";

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
    mainTitle: "About Us",
    mainIcon: Info,
    path: ROUTES.ABOUT,
  },
];

const menuAdmin = [
  {
    mainTitle: "USER",
    mainIcon: Users,
    appState: APP_STATE.USER,
    path: ROUTES.USER.LIST,
    roles: [ROLES.ADMIN],
  },
  {
    mainTitle: "ARTICLE",
    mainIcon: BookOpen,
    appState: APP_STATE.ARTICLE,
    path: ROUTES.ARTICLE.LIST,
    roles: [ROLES.ADMIN],
  },
  {
    mainTitle: "RESOURCES",
    mainIcon: BookOpen,
    appState: APP_STATE.RESOURCES,
    path: ROUTES.RESOURCE.LIST,
    roles: [ROLES.ADMIN],
  },
  {
    mainTitle: "BLOG",
    mainIcon: BookOpen,
    appState: APP_STATE.BLOG,
    path: ROUTES.BLOG_ADMIN.LIST,
    roles: [ROLES.ADMIN],
  },
];

const menuConfigs = {
  topBar: menuTop,
  menuAdminBar: menuAdmin,
};

export default menuConfigs;
