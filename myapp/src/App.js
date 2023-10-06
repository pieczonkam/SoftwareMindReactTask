import './styles/App.css';
import { useState } from 'react';
import dayjs from 'dayjs'

import { Select, 
         MenuItem, 
         InputLabel, 
         FormControl, 
         TextField, 
         Button,          
         ThemeProvider, 
         AppBar } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { getCurrentDate, getCurrentDateString, getDateFromDayjsObject } from './utils/utils';
import { form_component_margin, font_sizes,
         page_theme_normal, page_theme_large,
         date_picker_theme_normal, date_picker_theme_large,
         continents, errors} from './utils/variables';  

function App() {
  const [continent_idx, setContinentIdx] = useState(0);
  const [date, setDate] = useState(dayjs(getCurrentDateString()));
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error_messages, setErrorMessages] = useState([]);
  const [button_disabled, setButtonDisabled] = useState(false);
  const [use_large_font, setUseLargeFont] = useState(false);

  const validateForm = () => {
    var error_messages_list = [];

    // Validate continent field
    if (continents[continent_idx] === 'Europa' && firstname.length < 2) {
      error_messages_list.push({ name: 'unsatisfied_criteria', message: errors.unsatisfied_criteria });
    }

    // Validate firstname field
    if (firstname.length === 0) {
      error_messages_list.push({ name: 'missing_required_field', message: errors.missing_required_field });
    }
  
    setErrorMessages(error_messages_list);

    if (error_messages_list.length === 0) {
      alert('Sukces');
    }
  }

  const renderErrorMessage = (error_name) => {
    const error_message = error_messages.find(em => em.name === error_name);

    // If error message of given name was found in a list, put it on the screen
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

    // Disable submit button if selected date is > than today date
    birth_date > current_date ? setButtonDisabled(true) : setButtonDisabled(false);

    // Increase font size if user's age is > 60 years
    birth_date.setFullYear(birth_date.getFullYear() + 60);
    birth_date <= current_date ? setUseLargeFont(true) : setUseLargeFont(false);
  }

  return (
    <ThemeProvider theme={use_large_font ? page_theme_large : page_theme_normal}>
      <AppBar position='static' className='App-bar' style={use_large_font ? {fontSize: String(font_sizes.app_bar_font_size_large) + 'px'} : {fontSize: String(font_sizes.app_bar_font_size_normal) + 'px'}}>
        Software Mind Interview Task
      </AppBar>
      
      <div className='App'>
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
                style={{marginTop: String(form_component_margin) + 'px'}}
                id='outlined-basic' 
                label='Imię'
                variant='outlined'
                onChange={(e) => setFirstname(e.target.value)} 
              />
              {renderErrorMessage('missing_required_field')}

              
              <TextField
                style={{marginTop: String(form_component_margin) + 'px'}}
                id='outlined-basic' 
                label='Nazwisko' 
                variant='outlined' 
                onChange={(e) => setLastname(e.target.value)}
              />

              <ThemeProvider theme={use_large_font ? date_picker_theme_large : date_picker_theme_normal}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >  
                  <DatePicker label='Data urodzenia' value={date} onChange={handleDateChange}
                  sx={{ mt: String(form_component_margin) + 'px'}} 
                  format="DD/MM/YYYY"/>
                </LocalizationProvider>
              </ThemeProvider> 
              
              { button_disabled ? 
                <Button className='form-component' variant='contained' 
                style={{marginTop: String(form_component_margin) + 'px' }} disabled>
                  Wyślij
                </Button> :
                
                <Button className='form-component' variant='contained'
                onClick={validateForm} style={{marginTop: String(form_component_margin) + 'px' }}>
                  Wyślij
                </Button>
              }
            </FormControl>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;