import { useContext } from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';

import AboutUs from './pages/pagesPublic/AboutUs';
import Contact from './pages/pagesPublic/Contact';
import Donation from './pages/pagesPublic/Donation';
import Donations from './pages/pagesPublic/Donations';
import Gallery from './pages/pagesPublic/Gallery';
import GroupPresentation from './pages/pagesPublic/GroupPresentation';
import Home from './pages/pagesPublic/Home';
import LayoutPublic from './pages/pagesPublic/LayoutPublic';
import Login from './pages/pagesPublic/Login';

import ClosedEvents from './pages/pagesPrivate/ClosedEvents';
import ClosedEventView from './pages/pagesPrivate/ClosedEventView';
import Contributors from './pages/pagesPrivate/Contributors';
import DonationCategories from './pages/pagesPrivate/DonationCategories';
import EditContributors from './pages/pagesPrivate/EditContributors';
import EditDependent from './pages/pagesPrivate/EditDependent';
import EditDonationCategory from './pages/pagesPrivate/EditDonationCategory';
import EditEntities from './pages/pagesPrivate/EditEntities';
import EditFamilies from './pages/pagesPrivate/EditFamilies';
import EditFamilyDonation from './pages/pagesPrivate/EditFamilyDonation';
import EditGroups from './pages/pagesPrivate/EditGroups';
import Entities from './pages/pagesPrivate/Entities';
import EventInProgress from './pages/pagesPrivate/EventInProgress';
import Families from './pages/pagesPrivate/Families';
import FamilyDonations from './pages/pagesPrivate/FamilyDonations';
import Groups from './pages/pagesPrivate/Groups';
import LayoutPrivate from './pages/pagesPrivate/LayoutPrivate';
import NewContributors from './pages/pagesPrivate/NewContributors';
import NewDependent from './pages/pagesPrivate/NewDependent';
import NewDonationCategory from './pages/pagesPrivate/NewDonationCategory';
import NewEntities from './pages/pagesPrivate/NewEntities';
import NewFamilies from './pages/pagesPrivate/NewFamilies';
import NewFamilyDonation from './pages/pagesPrivate/NewFamilyDonation';
import NewGroups from './pages/pagesPrivate/NewGroups';

import { AuthContext, AuthProvider } from './context/auth';
import Albums from './pages/pagesPrivate/Albums';

function PrivateRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

function MainRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutPublic />}>
            <Route index element={<Home />} />
            <Route path="/sobre" element={<AboutUs />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/grupos" element={<GroupPresentation />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/doacoes" element={<Donations />} />
            <Route path="/doacoes/:id" element={<Donation />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="/adm" element={<PrivateRoute><LayoutPrivate /></PrivateRoute>}>

            <Route
              index
              element={(
                <PrivateRoute>
                  <EventInProgress />
                </PrivateRoute>
                        )}
            />

            <Route
              path="eventosencerrados"
              element={(
                <PrivateRoute>
                  <ClosedEvents />
                </PrivateRoute>
                        )}
            />

            <Route
              path="eventosencerrados/view/:id"
              element={(
                <PrivateRoute>
                  <ClosedEventView />
                </PrivateRoute>
                        )}
            />

            <Route
              path="colaboradores"
              element={(
                <PrivateRoute>
                  <Contributors />
                </PrivateRoute>
                        )}
            />

            <Route
              path="colaboradores/new"
              element={(
                <PrivateRoute>
                  <NewContributors />
                </PrivateRoute>
                        )}
            />
            <Route
              path="colaboradores/edit/:id"
              element={(
                <PrivateRoute>
                  <EditContributors />
                </PrivateRoute>
                        )}
            />

            <Route
              path="entidades"
              element={(
                <PrivateRoute>
                  <Entities />
                </PrivateRoute>
                        )}
            />

            <Route
              path="entidades/new"
              element={(
                <PrivateRoute>
                  <NewEntities />
                </PrivateRoute>
                        )}
            />
            <Route
              path="entidades/edit/:id"
              element={(
                <PrivateRoute>
                  <EditEntities />
                </PrivateRoute>
                        )}
            />

            <Route
              path="albuns"
              element={(
                <PrivateRoute>
                  <Albums />
                </PrivateRoute>
                        )}
            />

            <Route
              path="grupos"
              element={(
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>
                        )}
            />

            <Route
              path="grupos/new"
              element={(
                <PrivateRoute>
                  <NewGroups />
                </PrivateRoute>
                        )}
            />
            <Route
              path="grupos/edit/:id"
              element={(
                <PrivateRoute>
                  <EditGroups />
                </PrivateRoute>
                        )}
            />

            <Route
              path="categoriasdoacao"
              element={(
                <PrivateRoute>
                  <DonationCategories />
                </PrivateRoute>
                        )}
            />

            <Route
              path="categoriasdoacao/edit/:id"
              element={(
                <PrivateRoute>
                  <EditDonationCategory />
                </PrivateRoute>
                        )}
            />

            <Route
              path="categoriasdoacao/new"
              element={(
                <PrivateRoute>
                  <NewDonationCategory />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias"
              element={(
                <PrivateRoute>
                  <Families />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familia/new"
              element={(
                <PrivateRoute>
                  <NewFamilies />
                </PrivateRoute>
                        )}
            />
            <Route
              path="familia/edit/:id"
              element={(
                <PrivateRoute>
                  <EditFamilies />
                </PrivateRoute>
                        )}
            />

            <Route
              path="dependentes/new"
              element={(
                <PrivateRoute>
                  <NewDependent />
                </PrivateRoute>
                        )}
            />

            <Route
              path="dependentes/edit/:id"
              element={(
                <PrivateRoute>
                  <EditDependent />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias/doacoes"
              element={(
                <PrivateRoute>
                  <FamilyDonations />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias/doacoes/edit/:id"
              element={(
                <PrivateRoute>
                  <EditFamilyDonation />
                </PrivateRoute>
                        )}
            />
            <Route
              path="familias/doacoes/new"
              element={(
                <PrivateRoute>
                  <NewFamilyDonation />
                </PrivateRoute>
                        )}
            />

          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default MainRoutes;
