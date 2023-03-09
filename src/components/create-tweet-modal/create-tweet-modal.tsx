import './create-tweet-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import EventEmitter from 'events';
import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { eventEmitter } from '../../event-emitter/event-emitter';
import { TweetsService } from '../../services/tweets-service';

interface CreateTweetModalProps {
    setVisible?: any;
    visible: boolean;
}

function CreateTweetModal({ setVisible, visible }: CreateTweetModalProps) {
    const [tweetText, setTweetText] = useState<string>('');
    const [tweetImageFiles, setTweetImageFiles] = useState<File[]>([]);
    const [isCreateTweetLoading, setIsCreateTweetLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    async function createTweet() {
        try {
            setIsCreateTweetLoading(true);

            await TweetsService.createTweet(tweetText, tweetImageFiles);

            setTweetText('');
            setTweetImageFiles([]);
            closeCreateTweetModal();
            eventEmitter.emit('create-tweet');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 401) {
                    navigate('/home');
                } else {
                    const responseErrorMessage: string = error.response?.data.message;

                    if (responseErrorMessage) {
                        setErrorMessage(
                            responseErrorMessage.charAt(0).toUpperCase() + responseErrorMessage.slice(1) + '.',
                        );
                    } else {
                        setErrorMessage('Error creating tweet.');
                    }
                }
            }
        } finally {
            setIsCreateTweetLoading(false);
        }
    }

    function closeCreateTweetModal() {
        setVisible(false);
    }

    function changeTweetText(event: BaseSyntheticEvent) {
        setTweetText(event.target.value);
    }

    function tweetButtonOnClick() {
        createTweet();
    }

    function changeFilesInput(event: BaseSyntheticEvent) {
        setTweetImageFiles(Array.from(event.target.files));
    }

    return (
        <div
            className={visible ? 'CreateTweetModal CreateTweetModal_active' : 'CreateTweetModal'}
            onClick={closeCreateTweetModal}
        >
            <div
                className="CreateTweetModal__container"
                onClick={(event: BaseSyntheticEvent) => event.stopPropagation()}
            >
                <div className="CreateTweetModal__header">
                    <img
                        src={require('../../static/images/avatar.png')}
                        alt="avatar"
                        className="CreateTweetModal__user-avatar"
                    />
                    <CloseIcon className="CreateTweetModal__close" onClick={closeCreateTweetModal} />
                </div>

                <div className="CreateTweetModal__body">
                    <textarea
                        value={tweetText}
                        onChange={changeTweetText}
                        className="CreateTweetModal__input"
                        placeholder="What's happening?"
                        maxLength={320}
                    />
                    {isCreateTweetLoading ? (
                        <span className="CreateTweetModal__create-loading">Loading...</span>
                    ) : (
                        <span className="CreateTweetModal__error-message">{errorMessage}</span>
                    )}
                </div>

                <div className="CreateTweetModal__footer">
                    {/* <CropOriginalIcon className="CreateTweetModal__attach-image" /> */}
                    <input type="file" onChange={changeFilesInput} accept="image/*" multiple />
                    <Button variant="outlined" className="CreateTweetModal__tweet-button" onClick={tweetButtonOnClick}>
                        Tweet
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateTweetModal;
