import { Chip } from '@mui/material';

import LANGUAGE from '../../utils/language.util.js';
import { COLORS } from './Colors.jsx';

const ChipRequired = () => {
  return (
    <Chip
      label={LANGUAGE.GENERAL.REQUIRED}
      size="small"
      sx={{
        bgcolor: COLORS.SECONDARY,
        color: COLORS.WHITE,
        fontSize: 10,
        height: 20,
        width: 40,
        fontWeight: "bold",
        borderRadius: 0,
      }}
    />
  );
};

export default ChipRequired;