import React, {useEffect, useState} from 'react';
import './streamStyles.css';
import {DefaultGenerics, StreamChat} from "stream-chat";
import {nanoid} from "nanoid";
import axios from "axios";
import {Avatar, Button, Modal, TextInput} from "@mantine/core";

import {Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window} from "stream-chat-react";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import Donation from "../../components/donation";

const Stream:React.FC = () => {
    const [client, setClient] = useState<StreamChat<DefaultGenerics> | null>(null);
    console.log('Client Object',client)
    const [channel, setChannel] = useState(undefined)
    console.log('Channel Object',channel)

    const [userID, setUserID] = useState<string | undefined>(undefined);
    console.log('Stream user ID',userID)

    const [cookie, setCookie, removeCookie] = useCookies(['active-stream-user'])
    const [user, setUser] = useState<string | null>(null);

    const streamID = useParams();
    console.log("stream-id ---> ", streamID.stream_id)

    const [showDonationModal, setShowDonationModal] = useState(false)

    // @ts-ignore
    useEffect(() => {
        (async function result() {
            if (streamID === undefined) return;

            const chatClient = await StreamChat.getInstance("yt87ffbuwxzy")
            setClient(chatClient)

            if (chatClient === null) return;

            if (userID === undefined) {
                console.log('User id is undefined, please enter a user id')
                return
            }
            const activeUser:string | null = cookie["active-stream-user"]
            if (activeUser === null) {
                setUser(null)
                return;
            }
            setUser(activeUser);
            console.log('input user ---> ', user)

            const id = nanoid();
            const response = await axios.post("http://localhost:8000/create-stream-user", {
                'user_id' : id,
                'name' : activeUser
            })

            if (response) {
                try {
                    const connection =   await client?.connectUser({
                        'id': id,
                        'name' : activeUser,
                    }, response.data)

                    if (connection === undefined) {
                        console.log('connection could not be established...')
                        return
                    }

                    console.log('Connection result',connection)
                    if (streamID === null) {
                        console.log('cannot  make channel until stream is ready...')
                        return
                    }
                    const streamChannel =  client?.channel('livestream', streamID.stream_id, {
                        name: 'Wedding Stream'
                    })

                    // @ts-ignore
                    setChannel(streamChannel)
                    console.log(streamChannel?.listeners)
                } catch (e) {
                    console.log(e)
                }

            } else {
                return 'No response from go server generating token'
            }
            // @ts-ignore
            await channel?.watch();
            return  () => {
                client?.disconnectUser();
                setChannel(undefined)
                setUser(null)
            }
        })();
    }, [channel, client, streamID, cookie])
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='nav-bar-container'>
                {(user === null) ? (
                    <>
                        <Button
                            className='enter-stream-button'
                            onClick={() => {
                                if (showModal) {
                                    return
                                } else {
                                    setShowModal(true)
                                }
                            }
                            }>
                            Enter Stream
                        </Button>
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
            <div className='main-page-container'>

                    <div className='react-player-container'>
                        <iframe
                            src={"http://174.138.37.218:8080/embed/video"}
                            title="test"
                            width={1050}
                            height={850}
                            className='stream-iframe'
                            allowFullScreen
                            scrolling={'off'}
                            ref={null}
                        >
                        </iframe>
                        <div className='video-description-container'>
                            <div className='streamer-details-container'>
                                <Avatar
                                    radius='xl'
                                    style={{
                                    marginRight: '0.75rem',
                                    marginLeft: '0.75rem',
                                    borderRadius: '20px'
                                }}
                                        size='lg'

                                />
                                <header className='streamer-username'>
                                    Josh and Katykat
                                </header>
                            </div>

                           <div className='honey-moon-button-container'>
                               <Button className='honey-moon-button' onClick={() => setShowDonationModal(true)}>
                                   Honey Moon Fund
                               </Button>
                           </div>
                        </div>
                    </div>
                <Modal opened={showDonationModal} onClose={() => setShowDonationModal(false)} size='lg'>
                    <Donation/>
                </Modal>
                {client && channel &&

                    <div className='chat-container'>
                        <Chat client={client} theme={'str-chat__theme-dark'}>
                            <Channel channel={channel}>
                                <Window>
                                    <ChannelHeader />
                                    <div className='message-list-container'>
                                        <MessageList />
                                    </div>
                                    <MessageInput />
                                </Window>
                                <Thread />
                            </Channel>
                        </Chat>
                    </div>
                }
            </div>
            <Modal opened={showModal} onClose={() => setShowModal(false)}>
                <div>
                    <form className='enter-stream-form' title='Stream Member Details'>
                        <TextInput
                            className='username-input'
                            placeholder='Enter your username'
                            onChange={(e) => setUserID(e.target.value)}
                        />
                        <Button className='submit-stream-button' onClick={(e:any) => {
                            e.preventDefault()
                            setTimeout(() =>  {
                                setCookie('active-stream-user', userID)
                                setShowModal(false)
                            }, 500)
                        }
                        }>
                            Submit
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Stream;
