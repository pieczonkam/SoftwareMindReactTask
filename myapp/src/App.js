import { useState } from 'react';
import './App.css';

import dayjs from 'dayjs'
import { Select, MenuItem, InputLabel, FormControl, Box, TextField, Button, createTheme, ThemeProvider, AppBar, FormLabel } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const getCurrentDateString = () => {
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}

const getCurrentDate = () => {
  var date = new Date();
  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear()

  return new Date(year, month, day);
}

const getDateFromDayjsObject = (obj) => {
  var day = obj.get('D');
  var month = obj.get('M');
  var year = obj.get('y');

  return new Date(year, month, day);
}

function App() {
  const [continent_idx, setContinentIdx] = useState(0);
  const [date, setDate] = useState(dayjs(getCurrentDateString()));
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error_messages, setErrorMessages] = useState([]);
  const [button_disabled, setButtonDisabled] = useState(false);
  const [use_large_font, setUseLargeFont] = useState(false);

  const form_item_margin = 20;

  const font_sizes = {
    page_font_size_normal: 14,
    page_font_size_large: 28,
    form_title_font_size_normal: 20,
    form_title_font_size_large: 40,
    app_bar_font_size_normal: 30,
    app_bar_font_size_large: 60,
    date_picker_font_size_normal: 14,
    date_picker_font_size_large: 22,
    error_message_font_size_normal: 12,
    error_message_font_size_large: 24
  }

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
  }

  const validateForm = () => {
    var error_messages_list = [];

    if (continents[continent_idx] === 'Europa' && firstname.length < 2) {
      error_messages_list.push({ name: 'unsatisfied_criteria', message: errors.unsatisfied_criteria });
    }

    if (firstname.length === 0) {
      error_messages_list.push({ name: 'missing_required_field', message: errors.missing_required_field });
    }
  
    if (error_messages_list.length === 0) {
      alert('Sukces');
    }

    setErrorMessages(error_messages_list);
  }

  const renderErrorMessage = (error_name) => {
    const error_message = error_messages.find(em => em.name === error_name);

    if (error_message) {
      return <label className='error-message' style={use_large_font ? {fontSize: String(font_sizes.error_message_font_size_large) + 'px'} : {fontSize: String(font_sizes.error_message_font_size_normal) + 'px'}}>
        {error_message.message}
      </label>
    }
  }

  const handleDateChange = (new_date) => {
    setDate(new_date);

    var birth_date = getDateFromDayjsObject(new_date);
    var current_date = getCurrentDate();

    birth_date > current_date ? setButtonDisabled(true) : setButtonDisabled(false);

    birth_date.setFullYear(birth_date.getFullYear() + 60);
    birth_date <= current_date ? setUseLargeFont(true) : setUseLargeFont(false);
  }

  return (
    <ThemeProvider theme={use_large_font ? page_theme_large : page_theme_normal}>
      <AppBar position='static' className='App-bar' style={use_large_font ? {fontSize: String(font_sizes.app_bar_font_size_large) + 'px'} : {fontSize: String(font_sizes.app_bar_font_size_normal) + 'px'}}>
        Software Mind Interview Task
      </AppBar>
      <div className='App' style={use_large_font ? {fontSize: String(font_sizes.page_font_size_large) + 'px'} : {fontSize: String(font_sizes.page_font_size_large) + 'px'}}>
        <form className='form' style={use_large_font ? {fontSize: String(font_sizes.form_title_font_size_large) + 'px'} : {fontSize: String(font_sizes.form_title_font_size_normal) + 'px'}}>
            <label className='form-title'>Formularz</label>
            <FormControl>  
              <InputLabel id='select_continent_dropdown_label'>Kontynent</InputLabel>
              <Select
                labelId='select_continent_dropdown_label'
                id='select_continent_dropdown'
                value={continent_idx}
                label='Kontynent'
                onChange={(e) => setContinentIdx(e.target.value)}
              >
                {continents.map((item, idx) => 
                  <MenuItem key={idx} value={idx}>{item}</MenuItem>
                )}
              </Select>
              {renderErrorMessage('unsatisfied_criteria')}
            

              
              <TextField 
                style={{marginTop: String(form_item_margin) + 'px' }}
                id='outlined-basic' 
                label='Imię'
                variant='outlined'
                onChange={(e) => setFirstname(e.target.value)} 
              />
              {renderErrorMessage('missing_required_field')}

              
              <TextField
                style={{marginTop: String(form_item_margin) + 'px' }}
                id='outlined-basic' 
                label='Nazwisko' 
                variant='outlined' 
                onChange={(e) => setLastname(e.target.value)}
              />

              
              
              <ThemeProvider theme={use_large_font ? date_picker_theme_large : date_picker_theme_normal}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >  
                  <DatePicker label='Data urodzenia' value={date} onChange={handleDateChange}
                  sx={{ mt: String(form_item_margin) + 'px'}} 
                  format="DD/MM/YYYY"/>
                </LocalizationProvider>
              </ThemeProvider> 
              
              
              
              
              { button_disabled ? 
                <Button className='form-component' variant='contained' style={{marginTop: String(form_item_margin) + 'px' }} disabled>Wyślij</Button> :
                <Button className='form-component' variant='contained' onClick={validateForm} style={{marginTop: String(form_item_margin) + 'px' }}>Wyślij</Button>
              }
            </FormControl>
        </form>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
