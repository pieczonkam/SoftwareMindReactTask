import { useState } from 'react';
import './App.css';

import dayjs from 'dayjs'
import { Select, MenuItem, InputLabel, FormControl, Box, TextField, Button, createTheme, ThemeProvider } from '@mui/material'
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

  const font_size = 14;

  const theme1 = createTheme({
    typography: {
      fontSize: font_size
    }
  });

  const theme2 = createTheme({
    typography: {
      fontSize: font_size * 2
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
  
    setErrorMessages(error_messages_list);
  }

  const renderErrorMessage = (error_name) => {
    const error_message = error_messages.find(em => em.name === error_name);

    if (error_message) {
      return <label className='form-error-label'>{error_message.message}</label>
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
    <ThemeProvider theme={use_large_font ? theme2 : theme1}>
      <div className='App'>
        <form>
          <Box sx={{minWidth: 120, maxWidth: 300}}>
            <FormControl fullWidth>
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
                id='outlined-basic' 
                label='Imię'
                variant='outlined'
                onChange={(e) => setFirstname(e.target.value)} 
              />
              {renderErrorMessage('missing_required_field')}

              <TextField 
                id='outlined-basic' 
                label='Nazwisko' 
                variant='outlined' 
                onChange={(e) => setLastname(e.target.value)}
              />
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label='Data urodzenia' value={date} onChange={handleDateChange} />
              </LocalizationProvider>
              
              { button_disabled ? 
                <Button variant='contained' onClick={validateForm} disabled>Wyślij</Button> :
                <Button variant='contained' onClick={validateForm}>Wyślij</Button>
              }
            </FormControl>
          </Box>
        </form>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
