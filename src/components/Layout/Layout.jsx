import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layout}>
      <Navigation />
      
      <div className={styles.layout__content}>
        <main className={styles.layout__main}>
          <Outlet />
        </main>
        
        <Sidebar className={styles.layout__sidebar} />
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;
