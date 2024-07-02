import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './Setting.module.css';
import Account from './Account/Account';
import SubscriptionOptions from './SubscriptionOptions/SubscriptionOptions';

const Setting = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    if (savedTabIndex !== null) {
      setSelectedTabIndex(parseInt(savedTabIndex, 10));
    }
  }, []);

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
    localStorage.setItem('selectedTabIndex', index);
  };

  return (
    <Tabs className={styles.tabs} selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Cuenta
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Preferencias
        </Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <div className={styles.scroll}>
          <Account />
        </div>
      </TabPanel>
      <TabPanel className={styles.tabPanel}>
        <div className={styles.scroll}>
          <SubscriptionOptions />
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default Setting;
