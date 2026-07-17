import * as React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

export interface SelectOption {
  value: string;
  label: string;
  caption?: string;
}

// Show exactly 4 options, then scroll the remainder.
const VISIBLE_OPTIONS = 4;
const OPTION_HEIGHT = 56; // roomy two-line item
const MENU_MAX_HEIGHT = VISIBLE_OPTIONS * OPTION_HEIGHT + 8;

interface ScrollableSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
  required?: boolean;
  id?: string;
}

export default function ScrollableSelect({
  label,
  value,
  onChange,
  options,
  helperText,
  error,
  required,
  id = "scrollable-select",
}: ScrollableSelectProps) {
  const labelId = `${id}-label`;
  return (
    <FormControl fullWidth error={error} required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        MenuProps={{
          // Cap the dropdown to 4 visible options; the rest scroll.
          PaperProps: {
            sx: {
              maxHeight: MENU_MAX_HEIGHT,
              borderRadius: 2,
              boxShadow: "0 20px 45px -20px rgba(15,23,42,0.35)",
              mt: 0.5,
            },
          },
          transitionDuration: 250,
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ minHeight: OPTION_HEIGHT }}>
            <ListItemText
              primary={opt.label}
              secondary={
                opt.caption ? (
                  <Typography variant="caption" color="text.secondary">
                    {opt.caption}
                  </Typography>
                ) : undefined
              }
            />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
