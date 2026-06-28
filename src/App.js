import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useEffect, useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.body.style.background = mode === 'dark'
      ? 'linear-gradient(135deg, #07111d 0%, #10233f 100%)'
      : 'linear-gradient(135deg, #f7f8ff 0%, #eef4ff 100%)';
    document.body.style.color = mode === 'dark' ? '#e8f2ff' : '#14213d';
    document.documentElement.style.setProperty('--app-surface', mode === 'dark' ? 'rgba(8, 21, 36, 0.92)' : 'rgba(255,255,255,0.86)');
    document.documentElement.style.setProperty('--app-border', mode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(15, 46, 78, 0.12)');
    document.documentElement.style.setProperty('--app-text', mode === 'dark' ? '#e8f2ff' : '#14213d');
    document.documentElement.style.setProperty('--app-muted', mode === 'dark' ? '#8da3c1' : '#6f7b93');
    document.documentElement.style.setProperty('--app-accent', mode === 'dark' ? '#4fd1c5' : '#2563eb');
  }, [mode]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  };

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
    showAlert(`${nextMode === 'dark' ? 'Dark' : 'Light'} mode has been enabled`, 'success');
  };

  return (
    <div className={`app-shell theme-${mode}`}>
      <Router>
        <Navbar title="Text Utility Studio" aboutText="About" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <main className="content-shell">
          <Switch>
            <Route exact path="/about">
              <About mode={mode} />
            </Route>
            <Route exact path="/">
              <TextForm showAlert={showAlert} heading="Turn rough text into polished content in seconds" mode={mode} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;