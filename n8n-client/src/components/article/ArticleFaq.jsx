import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

const ArticleFaq = ({ items = [] }) => {
  return items.map((item) => (
    <Accordion
      key={item.question}
      sx={{
        mb: 1.2,
        bgcolor: "#080d16",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "12px !important",
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown size={16} color="#94a3b8" />}
      >
        <Typography fontWeight={800} fontSize={14} color="#fff">
          {item.question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          fontSize={14}
          color="#cbd5e1"
          sx={{
            textAlign: "left",
          }}
        >
          {item.answer}
        </Typography>
      </AccordionDetails>
    </Accordion >
  ));
};

export default ArticleFaq;