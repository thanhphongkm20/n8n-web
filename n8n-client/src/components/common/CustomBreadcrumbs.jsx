import { Breadcrumbs } from '@mui/material';
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BreadcrumbItem from './BreadcrumbItem';
import { BG_COLORS } from './Colors';

const CustomBreadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      separator={
        <ChevronRight
          size={20}
          color={BG_COLORS.ARROW_RIGHT}
        />
      }
      aria-label="breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <BreadcrumbItem
            key={index}
            label={item.label}
            icon={item.icon}
            isLast={isLast}
            onClick={() => navigate(item.path)}
          />
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;