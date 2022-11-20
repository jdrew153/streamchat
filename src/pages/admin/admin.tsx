import React, {useEffect, useState} from 'react';
import'./adminStyles.css';
import {useCookies} from 'react-cookie';
import {UserContext} from "../../utils/context";
import {nanoid} from "nanoid";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const Admin:React.FC = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [streamCookie, setStreamCookie, removeStreamCookie] = useCookies(['stream-id'])
    const user = cookie['user'] as UserContext;

    const [playerReady, setPlayerReady] = useState(false);
    const [streamID, setStreamID] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        (async function() {
                const response = await fetch('http://174.138.37.218:8080/api/status',
                    {
                        method: 'GET'
                    }
                );
                const data = await response.json()
                if (data.online === true) {
                    const id = nanoid();
                    setStreamID(id)
                    setPlayerReady(true)
                } else {
                    setPlayerReady(false)
                }
            }
        )();
        console.log('player status', playerReady)
    }, [playerReady])

    if (user?.role === "ADMIN") {
        return (
            <div className='main-admin-page-container'>
                Admin user {user.username} is logged in.

                <div className='stream-preview'>

                    { playerReady ? (
                        <>
                        <iframe
                            src={"http://174.138.37.218:8080/embed/video"}
                            title="titties"
                            width={1050}
                            height={"100%"}
                            className='stream-iframe'
                            allowFullScreen
                        >
                        </iframe>
                            <Button onClick={() => {
                                setStreamCookie('stream-id', streamID)

                                setTimeout(() => {
                                    navigate(`/stream/${streamID}`)

                                }, 500)
                            }
                            }>
                                Publish Stream
                            </Button>
                        </>
                    ) : (
                        <>
                          <div className='placeholder-loading-container'>
                              <h2>
                                  Stream not ready to be published...
                                  Check OBS for streaming status...
                              </h2>
                              <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/9afd3b92ab41ffca7f368a8fcbd6d39a75894efe0edbc14cf1f067cf625e6678.png" alt="Loading dino pic"/>

                          </div>
                        </>
                    )
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='main-admin-page-container'>
                No user has been set...
            </div>
        </>
    );
};

export default Admin;
