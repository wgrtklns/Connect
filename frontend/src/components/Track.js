import React from 'react';

const Track = () => {
    return (
        <div style={styles.container}>
            <h2>username</h2>
            <div style={styles.profileCircle}></div>
            <h3>TRACK NAME - ARTIST</h3>
            <div style={styles.trackControls}>
                <button style={styles.trackButton}>S</button>
                <button style={styles.trackButton}>L</button>
            </div>
            <button style={styles.playButton}>▶︎ / ❚❚</button>
        </div>
    );
};


  // MusicForm Component
  const MusicForm = () => (
    <div style={styles.container}>
      <h2>Connect</h2>
      <div style={styles.uploadBox}>...</div>
      <p>with...</p>
      <div style={styles.radioGroup}>
        <label>
          <input type="radio" name="uploadType" value="friends" /> friends
        </label>
        <label>
          <input type="radio" name="uploadType" value="others" /> others
        </label>
      </div>
      <button style={styles.addButton}>+</button>
    </div>
  );
  
  // Styles
  const styles = {
    addButton: {
      backgroundColor: 'lime',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      fontSize: '24px',
      color: 'black',
      cursor: 'pointer',
    },
    button: {
      backgroundColor: 'transparent',
      border: '2px solid lime',
      borderRadius: '5px',
      color: 'lime',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    authButton: {
      backgroundColor: 'lime',
      border: 'none',
      borderRadius: '5px',
      color: 'black',
      padding: '10px 20px',
      fontSize: '18px',
      cursor: 'pointer',
      margin: '10px 0',
    },
    uploadBox: {
      width: '100px',
      height: '50px',
      backgroundColor: '#555',
      margin: '20px auto',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioGroup: {
      margin: '10px 0',
    },
    trackControls: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0',
    },
    trackButton: {
      backgroundColor: 'transparent',
      border: '2px solid lime',
      borderRadius: '5px',
      color: 'lime',
      padding: '10px 20px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    playButton: {
      backgroundColor: 'lime',
      border: 'none',
      borderRadius: '5px',
      color: 'black',
      padding: '10px 20px',
      fontSize: '18px',
      cursor: 'pointer',
    },
  };

export default Track;