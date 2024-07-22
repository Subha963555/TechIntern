import React, { useState } from 'react';

const RegForm = ({ setres }) => {
  const [nam, setNam] = useState('');
  const [com, setCom] = useState('');
  const [year, setYear] = useState('');

  const handle = async (e) => {
    if (nam.trim() !== '' && com.trim() !== '' && year.trim() !== '') {
    const fdata = { nam, com, year };

    try {
      const res = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      });
      if (res.ok) {
        const udata = await fetch('http://localhost:3001/data');
        const ud = await udata.json();
        setres(ud);
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setNam('');
    setCom('');
    setYear('');
}
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handle}>
        <input
          type='text'
          placeholder='Enter Your Name'
          value={nam}
          onChange={(e) => setNam(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter Your Company'
          value={com}
          onChange={(e) => setCom(e.target.value)}
        />
        <input
          type='number'
          placeholder='Enter Your Joining Year'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default RegForm;
