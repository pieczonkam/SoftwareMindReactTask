import { createTheme } from "@mui/material";

const form_component_margin = 20;

const font_sizes = {
    page_font_size_normal: 14,
    page_font_size_large: 28,
    form_title_font_size_normal: 24,
    form_title_font_size_large: 48,
    app_bar_font_size_normal: 30,
    app_bar_font_size_large: 60,
    date_picker_font_size_normal: 14,
    date_picker_font_size_large: 22,
    error_message_font_size_normal: 12,
    error_message_font_size_large: 24
};

const page_theme_normal = createTheme({
    typography: {
        fontSize: font_sizes.page_font_size_normal
    }
});

const page_theme_large = createTheme({
    typography: {
      fontSize: font_sizes.page_font_size_large
    }
});

const date_picker_theme_normal = createTheme({
    typography: {
      fontSize: font_sizes.date_picker_font_size_normal
    }
});

const date_picker_theme_large = createTheme({
    typography: {
      fontSize: font_sizes.date_picker_font_size_large
    }
});

const continents = ['Afryka', 'Ameryka Południowa', 'Ameryka Północna', 'Antarktyda', 'Australia', 'Azja', 'Europa'];

const errors = {
    unsatisfied_criteria: 'Nie spełnione kryteria',
    missing_required_field: 'To pole jest wymagane'
};

export { form_component_margin, 
         font_sizes, 
         page_theme_normal, page_theme_large, 
         date_picker_theme_normal, date_picker_theme_large, 
         continents, 
         errors };