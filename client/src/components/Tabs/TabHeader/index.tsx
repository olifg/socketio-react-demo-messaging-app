import styles from './tab.module.sass';

type TabHeaderProps = {
    tabKey: string;
    activeKey: string | null;
    setActiveKey: (tabKey: string) => void;
};

export const TabHeader = ({ activeKey, tabKey, setActiveKey }: TabHeaderProps) => {

    const handleTabClick = () => {
        if (tabKey) setActiveKey(tabKey);
    };

    return (
        <div
            className={`${styles.tab} ${tabKey === activeKey ? `${styles.active}` : ''}`}
            onClick={handleTabClick}>
            <span className={styles.title} >{tabKey}</span>
        </div>
    );
};