import { useState } from "react";
import { useConversations } from "../../../contexts/ConversationsProvider";
import { OpenConversation } from "../OpenConversation";
import { Sidebar } from '../Sidebar';
import styles from './dashboard.module.sass';

import cat from '../../../assets/cat.gif';
import anime from '../../../assets/anime.gif';

type DashboardProps = {
    userId: string;
};

export const Dashboard = ({
    userId,
}: DashboardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { selectedConversation } = useConversations()

    return (
        <div className={styles.container}>
            <Sidebar setModalOpen={setModalOpen} modalOpen={modalOpen} userId={userId} />
            {!selectedConversation && !modalOpen &&
                <div className={styles.welcomeMessage}>
                    <div className={styles.innerWelcome}>
                        <h1 className={styles.welcomeTitle}>Welcome to Demo Chat App.</h1>
                        <img src={cat} alt="A silly non-important animation of a cat dancing." className={styles.animation} />
                        <br />
                        <span>This App was built by <a target="_blank" href="https://github.com/olifg/">Me</a></span>
                        <br />
                        <span>For the full experience <a target="_blank" href="https://github.com/olifg/socketio-react-demo-messaging-app">clone this repo</a> and run the project locally.</span>
                        <br />
                        <span>Instructions: </span>
                        <br />
                        <span>Navigate to /client and run 'npm run dev', then navigate to /server, in there you can either run </span>
                        <span>the Demo Chat App Server Docker image, or you can run 'npm run start' to start the local server.</span>
                        <br />
                        <span>To Add new contacts Click 'Contacts' and 'Add Contact'.</span>
                        <br />
                        <img src={anime} alt="A silly non-important animation." className={styles.animation} />
                        <br />
                        <span>Once you've added contacts, click 'Conversations' and</span>
                        <span>'New Conversation' to start chatting.</span>

                        <br />
                    </div>
                </div>
            }
            {selectedConversation && <OpenConversation />}
        </div>
    )
};
