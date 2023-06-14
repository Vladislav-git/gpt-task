import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import api from './api/api';
import { useEffect, useState } from 'react';

function App() {

  const [word, setWord] = useState('')
  const [wordInfo, setWordInfo] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  const onClick = async () => {
    try {
      const res = await api.getWordInfo(word)
      setWordInfo({...res.data, forms: JSON.parse(res.data.forms), phrases: JSON.parse(res.data.phrases)})
      setWord('')
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 5000)
  }, [errorMessage])

  return (
    <Box sx={{ width: '100%', display: 'flex', maxWidth: 500, justifyContent: 'center', alignSelf: 'center', flexDirection: 'column ' }}>
      <Box sx={{display: 'flex', flexDirection: 'row', mt: 1}}>
        <TextField sx={{width: '70%', mr: 1}} placeholder='Search' value={word} onChange={(input) => setWord(input.target.value)} />
        <Button variant="contained" onClick={onClick}>Go!</Button>
      </Box>
      {errorMessage ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      ) : null}
      {wordInfo !== undefined && wordInfo.length !== 0 ? (
        <Box sx={{mt: 2}}>
          <Typography variant="h4" gutterBottom>
            {wordInfo.word}
          </Typography>
          <Typography sx={{color: '#979797'}} variant="h4" gutterBottom>
            {wordInfo.transcription}
          </Typography>
          <Typography variant="h4" gutterBottom sx={{border: {borderBottom: '1px solid black'}}}>
            Forms
          </Typography>
          {wordInfo.forms.map((form, i) => (
            <Box key={i} sx={{display:'flex',flexDirection: 'row'}}>
              <Typography variant="h5" gutterBottom>
                {form.form}{' '}{form.pronunciation}
              </Typography>
            </Box>
          ))}
          <Typography variant="h4" gutterBottom sx={{border: {borderBottom: '1px solid black'}}}>
            Synonyms
          </Typography>
          <Typography variant="h5" gutterBottom>
            {wordInfo.synonyms.join(', ')}
          </Typography>
          <Typography variant="h4" gutterBottom sx={{border: {borderBottom: '1px solid black'}}}>
            Phrases
          </Typography>
          {wordInfo.phrases.map((phrase, i) => (
            <Box key={i} sx={{display:'flex',flexDirection: 'column', border: {borderBottom: '1px solid black'}}}>
              <Typography variant="h5" gutterBottom>
                {phrase.phrase}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Meaning: {phrase.meaning}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default App;
