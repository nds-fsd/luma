import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './Calendars.module.css';
import MyEvents from './MyEvents/MyEvents';
import SubscribedEvents from './SubscribedEvents/SubscribedEvents';

const Calendars = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    const savedTabIndex = localStorage.getItem('calendarsSelectedTabIndex');
    if (savedTabIndex !== null) {
      setSelectedTabIndex(parseInt(savedTabIndex, 10));
    }
  }, []);

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
    localStorage.setItem('calendarsSelectedTabIndex', index);
  };

  return (
    <Tabs className={styles.tabs} selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Eventos
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Suscripciones
        </Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <div className={styles.scroll}>
          <MyEvents />
        </div>
      </TabPanel>
      <TabPanel className={styles.tabPanel}>
        <div className={styles.scroll}>
          <SubscribedEvents />
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default Calendars;
