import React, { useState, useEffect } from 'react';

const LocaleStorageSettings = () => {
  // States for different settings
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
  }, []);

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <div>
    </div>
  );
};

export default LocaleStorageSettings;
