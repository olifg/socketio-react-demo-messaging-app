import { useMemo } from "react";
import { TabContentMap } from "../../Dashboard/Sidebar";
import styles from './tabcontent.module.sass';

type TabContentProps = {
    activeKey: string | null;
    keys: string[];
};

export const TabContent = ({ activeKey, keys }: TabContentProps) => {

    const tabsContents = useMemo(() => {
        return keys.map((tabKey, index) => {
            return (<div key={tabKey + index}>
                {(activeKey === tabKey &&
                    <div key={tabKey} className={`${styles.tabPane}`}>
                        {TabContentMap.get(tabKey)}
                    </div>
                )}
            </div>)
        })
    }, [activeKey])

    return (
        <div className={`${styles.tabContent}`}>
            {tabsContents}
        </div>
    )
}