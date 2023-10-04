import { useState } from 'react';
import './App.css';

import dayjs from 'dayjs'
import {Select, MenuItem, InputLabel, FormControl, Box, TextField, Button} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const getCurrentDate = () => {
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}

function App() {
  const [continent, setContinent] = useState('');
  const [date, setDate] = useState(dayjs(getCurrentDate()));

  const handleDropdownChange = (e) => {
    setContinent(e.target.value);
  }

  return (
    <div className="App">
      <form>
        <Box sx={{minWidth: 120, maxWidth: 300}}>
          <FormControl fullWidth>
            <InputLabel id='select_continent_dropdown_label'>Kontynent</InputLabel>
            <Select
              labelId='select_continent_dropdown_label'
              id='select_continent_dropdown'
              value={continent}
              label='Kontynent'
              onChange={handleDropdownChange}
            >
              <MenuItem value={0}>Afryka</MenuItem>
              <MenuItem value={1}>Ameryka Południowa</MenuItem>
              <MenuItem value={2}>Ameryka Północna</MenuItem>
              <MenuItem value={3}>Antarktyda</MenuItem>
              <MenuItem value={4}>Australia</MenuItem>
              <MenuItem value={5}>Azja</MenuItem>
              <MenuItem value={6}>Europa</MenuItem>
            </Select>
            <TextField InputLabelProps={{ required: false }} id='outlined-basic' label='Imię' variant='outlined' required />
            <TextField id='outlined-basic' label='Nazwisko' variant='outlined' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label='Data urodzenia' value={date} onChange={(newDate) => setDate(newDate)} />
            </LocalizationProvider>
            <Button type='submit' variant='contained'>
              Wyślij
            </Button>
          </FormControl>
        </Box>
      </form>
    </div>
  );
}

export default App;
