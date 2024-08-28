import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faClipboard,
  faTags,
  faBirthdayCake,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();

  // Verifica se a rota atual é exatamente "/dashboard"
  const isDashboardActive = location.pathname === '/dashboard';

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={isDashboardActive ? 'active' : ''}
              end
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/clientes"
              className={location.pathname.startsWith('/dashboard/clientes') ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/formulario"
              className={location.pathname.startsWith('/dashboard/formulario') ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faClipboard} />
              <span>Questionário</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/cupons"
              className={location.pathname.startsWith('/dashboard/cupons') ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faTags} />
              <span>Cupons</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/aniversarios"
              className={location.pathname.startsWith('/dashboard/aniversarios') ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faBirthdayCake} />
              <span>Aniversários</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/relatorios"
              className={location.pathname.startsWith('/dashboard/relatorios') ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faChartBar} />
              <span>Relatórios</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
