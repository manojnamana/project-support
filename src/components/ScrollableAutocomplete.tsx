import * as React from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";

export interface AutocompleteOption {
  value: string;
  label: string;
  caption?: string;
}

// Show exactly 4 options in the popup list; the rest scroll.
const VISIBLE_OPTIONS = 4;
const OPTION_HEIGHT = 58;
const LIST_MAX_HEIGHT = VISIBLE_OPTIONS * OPTION_HEIGHT;

interface ScrollableAutocompleteProps {
  label: string;
  value: AutocompleteOption | null;
  onChange: (value: AutocompleteOption | null) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
}

export default function ScrollableAutocomplete({
  label,
  value,
  onChange,
  options,
  placeholder,
  helperText,
  error,
  required,
}: ScrollableAutocompleteProps) {
  return (
    <Autocomplete
      value={value}
      onChange={(_, next) => onChange(next)}
      options={options}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      getOptionLabel={(o) => o.label}
      slotProps={{
        listbox: {
          sx: { maxHeight: LIST_MAX_HEIGHT, py: 0 },
        },
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: "0 20px 45px -20px rgba(15,23,42,0.35)",
            mt: 0.5,
          },
        },
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props as React.HTMLAttributes<HTMLLIElement> & {
          key: string;
        };
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ minHeight: OPTION_HEIGHT, display: "block !important", py: 1 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {option.label}
            </Typography>
            {option.caption && (
              <Typography variant="caption" color="text.secondary">
                {option.caption}
              </Typography>
            )}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          required={required}
        />
      )}
    />
  );
}
