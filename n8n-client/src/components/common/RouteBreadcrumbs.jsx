import { Home, Settings, User, UserCog, Users } from "lucide-react";
import { useMatches } from "react-router-dom";

import CustomBreadcrumbs from "./CustomBreadcrumbs";

const ICONS = {
  home: Home,
  users: Users,
  user: User,
  settings: Settings,
  account: UserCog,
};

const RouteBreadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches.flatMap((m) => {
    const b = m.handle?.breadcrumb;
    if (!b) return [];
    return Array.isArray(b) ? b : [b];
  });

  const items = crumbs.map((c, i) => {
    const Icon = c.iconKey ? ICONS[c.iconKey] : null;

    return {
      label: c.label,
      path: i === crumbs.length - 1 ? undefined : c.path,
      icon: Icon ? <Icon size={16} /> : undefined,
    };
  });

  if (items.length === 0) return null;

  return <CustomBreadcrumbs items={items} />;
};

export default RouteBreadcrumbs;