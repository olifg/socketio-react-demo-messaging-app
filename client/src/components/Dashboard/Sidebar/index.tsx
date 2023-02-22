import { Dispatch, SetStateAction, useState } from 'react'
import { useConversations } from '../../../contexts/ConversationsProvider';
import { Snow } from '../../Snow';
import { TabContent } from '../../Tabs/TabContent';
import { TabHead } from '../../Tabs/TabHeadContainer';
import { Contacts } from '../Contacts';
import { Conversations } from '../Conversations';
import { NewContactModal } from '../Modals/NewContactModal';
import { NewConversationModal } from '../Modals/NewConversationModal';

import styles from './sidebar.module.sass';

type SidebarProps = {
    userId: string;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    modalOpen: boolean;
}

export const CONVERSATIONS_KEY = 'conversations';
export const CONTACTS_KEY = 'contacts';

export const TAB_KEYS = ['conversations', 'contacts'];

export const TabContentMap: Map<string, React.ReactNode> = new Map();
TabContentMap.set(CONVERSATIONS_KEY, <Conversations />)
TabContentMap.set(CONTACTS_KEY, <Contacts />)


export const Sidebar = ({
    userId,
    setModalOpen,
    modalOpen
}: SidebarProps) => {
    const [activeKey, setActiveKey] = useState<string>(CONVERSATIONS_KEY)

    const closeModal = () => {
        setModalOpen((opened) => !opened)
    }

    const signOut = async () => {
        await localStorage.removeItem('messaging-app-id')
        window.location.reload()
    }

    const conversationOpen = activeKey === CONVERSATIONS_KEY

    return (
        <div className={styles.container}>
            <TabHead keys={TAB_KEYS} activeKey={activeKey} setActiveKey={setActiveKey} />
            <TabContent keys={TAB_KEYS} activeKey={activeKey} />


            <div className={styles.welcome} >
                Welcome, <span >{userId}</span>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.sidebarButton} onClick={() => { setModalOpen(true) }}>
                    {conversationOpen ? 'New Conversation' : 'Add Contact'}
                </button>
                <button className={styles.sidebarButton} onClick={() => signOut()}>
                    Sign out
                </button>
            </div>

            {modalOpen && (
                <>
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h2>New {conversationOpen ? 'Conversation' : 'Contact'}</h2>
                                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                            </div>
                            <div className={styles.modalBody}>
                                {conversationOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
                    <Snow particleAmount={200} />
                    </div>
                </>
            )
            }
        </div>

    )
}
