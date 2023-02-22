import { useMemo } from "react";
import { TabHeader } from "../TabHeader";

import styles from './tabhead.module.sass'

type TabHeadProps = {
    activeKey: string | null;
    setActiveKey: (tabKey: string) => void;
    keys: string[];
}

export const TabHead = ({ activeKey, setActiveKey, keys }: TabHeadProps) => {
    
    const tabHeaders = useMemo(() => {
        return keys.map((key, index) => {
            return (
                <TabHeader
                    key={key + index}
                    activeKey={activeKey}
                    tabKey={key}
                    setActiveKey={setActiveKey}
                />
            )
        })
    }, [activeKey]);

    return (
        <div className={styles.tabs}>
            {tabHeaders}
        </div>
    )
}