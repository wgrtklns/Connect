import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import '../styles/List.css';
import '../styles/Music.css';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const MusicForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedReceiver, setSelectedReceiver] = useState('');
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleReceiverChange = (e) => {
        setSelectedReceiver(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleArtistChange = (e) => {
        setArtist(e.target.value);
    };

    const shareData = async (event) => {
        event.preventDefault();
        if (!selectedFile || !selectedReceiver || !name || !artist) {
            alert('Please fill in all fields!');
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("radio", selectedReceiver);
        formData.append("name", name);
        formData.append("artist", artist);

        console.log('Form data:');
        console.log('File:', selectedFile);
        console.log('Receiver:', selectedReceiver);
        console.log('Name:', name);
        console.log('Artist:', artist);

        
    };
    
    return (
        <div className='list-container'>
            <h2>Add Music</h2>
            <form onSubmit={shareData}>
                <label className='upload-box'>
                    {selectedFile ? selectedFile.name : "Choose a file"}
                    <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept='.mp3' />
                </label>
                <div>
                    <label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter song name"
                            className="auth-input"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="text"
                            value={artist}
                            onChange={handleArtistChange}
                            placeholder="Enter artist name"
                            className="auth-input"
                            required
                        />
                    </label>
                </div>
                <p>With...</p>
                <div className='radio-group'>
                    <label>
                        <input type="radio" name="uploadType" value="friends" onChange={handleReceiverChange} /> Friends
                    </label>
                    <label>
                        <input type="radio" name="uploadType" value="others" onChange={handleReceiverChange} /> Others
                    </label>
                </div>
                <button className='add-button' type="submit">
                    <FontAwesomeIcon size='2x' icon={faFileImport} style={{ color: "#1c1c1c" }} />
                </button>
            </form>
        </div>
    );
};

export default MusicForm;