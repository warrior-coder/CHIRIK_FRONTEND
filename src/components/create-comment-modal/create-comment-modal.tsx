import './create-comment-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { eventEmitter } from '../../event-emitter/event-emitter';
import { RecordsEntity } from '../../interfaces/records-entity';
import { CommentsService } from '../../services/comments-service';

interface CreateCommentModalProps {
    parentRecord: RecordsEntity;
    setVisibleCreateCommentModal?: any;
    isVisibleCreateCommentModal: boolean;
}

function CreateCommentModal({
    isVisibleCreateCommentModal,
    parentRecord,
    setVisibleCreateCommentModal,
}: CreateCommentModalProps) {
    const [commentText, setCommentText] = useState<string>('');
    const [commentImageFiles, setCommentImageFiles] = useState<File[]>([]);
    const [isCreateCommentLoading, setIsCreateCommentLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    async function createComment() {
        try {
            setIsCreateCommentLoading(true);

            await CommentsService.createComment(parentRecord.id, commentText, commentImageFiles);

            setCommentText('');
            setCommentImageFiles([]);
            setVisibleCreateCommentModal(false);

            eventEmitter.emit('create-comment');
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
            setIsCreateCommentLoading(false);
        }
    }

    function closeCreateCommentModal(event: BaseSyntheticEvent) {
        event.stopPropagation();

        setVisibleCreateCommentModal(false);
    }

    function changeCommentText(event: BaseSyntheticEvent) {
        setCommentText(event.target.value);
    }

    function commentButtonOnClick() {
        createComment();
    }

    function changeFilesInput(event: BaseSyntheticEvent) {
        setCommentImageFiles(Array.from(event.target.files));
    }

    return (
        <div
            className={
                isVisibleCreateCommentModal ? 'CreateCommentModal CreateCommentModal_active' : 'CreateCommentModal'
            }
            onClick={closeCreateCommentModal}
        >
            <div
                className="CreateCommentModal__container"
                onClick={(event: BaseSyntheticEvent) => event.stopPropagation()}
            >
                <div className="CreateCommentModal__header">
                    <img
                        src={require('../../static/images/avatar.png')}
                        alt="avatar"
                        className="CreateCommentModal__user-avatar"
                    />
                    <CloseIcon className="CreateCommentModal__close" onClick={closeCreateCommentModal} />
                </div>

                <div className="CreateCommentModal__body">
                    <span className="CreateCommentModal__replying-to">Replying to{parentRecord.author.name}</span>
                    <textarea
                        value={commentText}
                        onChange={changeCommentText}
                        className="CreateCommentModal__input"
                        placeholder="Add a comment"
                        maxLength={320}
                    />
                    {isCreateCommentLoading ? (
                        <span>loading...</span>
                    ) : (
                        <span className="CreateCommentModal__error-message">{errorMessage}</span>
                    )}
                </div>

                <div className="CreateCommentModal__footer">
                    {/* <CropOriginalIcon className="CreateCommentModal__attach-image" /> */}
                    <input type="file" onChange={changeFilesInput} accept="image/*" multiple />
                    <Button
                        variant="outlined"
                        className="CreateCommentModal__comment-button"
                        onClick={commentButtonOnClick}
                    >
                        Comment
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateCommentModal;
