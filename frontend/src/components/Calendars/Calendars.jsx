import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './Calendars.module.css';
import HomePage from '../HomePage/HomePage';
import SubscribedEvents from './SubscribedEvents/SubscribedEvents';

const Calendars = ({ isAuthenticated, userId, userFullName }) => {
  return (
    <Tabs className={styles.tabs}>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Eventos
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Suscripciones
        </Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <HomePage isAuthenticated={isAuthenticated} userId={userId} />
      </TabPanel>
      <TabPanel className={styles.tabPanel}>
        <SubscribedEvents isAuthenticated={isAuthenticated} userId={userId} userFullName={userFullName} />
      </TabPanel>
    </Tabs>
  );
};

export default Calendars;
